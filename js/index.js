var log = console.log.bind(console);

(function() {
    'use strict';

    // 判断浏览器是否支持webgl
    // if(!Detector.webgl) Detector.addGetWebGLMessage();
    var B = {
        earth: {
            uniforms: {
                texture: {
                    type: "t",
                    value: null
                }
            },
            vertexShader: ["varying vec3 vNormal;", "varying vec2 vUv;", "void main() {", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "vNormal = normalize( normalMatrix * normal );", "vUv = uv;", "}"].join("\n"),
            fragmentShader: ["uniform sampler2D texture;", "varying vec3 vNormal;", "varying vec2 vUv;", "void main() {", "vec3 diffuse = texture2D( texture, vUv ).xyz;", "float intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );", "vec3 atmosphere = vec3( 1.0, 1.0, 1.0 ) * pow( intensity, 6.4 );", "gl_FragColor = vec4( diffuse + atmosphere, 1.0 );", "}"].join("\n")
        },
        atmosphere: {
            uniforms: {},
            vertexShader: ["varying vec3 vNormal;", "void main() {", "vNormal = normalize( normalMatrix * normal );", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
            fragmentShader: ["varying vec3 vNormal;", "void main() {", "float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 12.0 );", "gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;", "}"].join("\n")
        }
    }
    var container, stats;
    var camera, scene, renderer;
    var group;
    var mouseX = 0, mouseY = 0;
    var winWth = window.innerWidth, winHgt = window.innerHeight;
    var Three = window.THREE;
    var orbitControl = null, plateMesh = null, globeMesh = null, markMesh = null;
    var platePostion = {
        x: -100
    }

    var baseRotation = Math.PI / 2;
    var globeRotation = 0, plateRotation = 0, markRotation = 0;;

    var globePos = {
        x: 0,
        y: 0,
        z: 0
    }

    var cameraPos = null;

    var platePos = {
        x: 0,
        y: 0,
        z: 0
    }

    var K = {
        x: 0,
        y: 0,
    };

    var J = {
        x: 0,
        y: 0,
    }

    var $ = {
        x: 1.26 * Math.PI,
        y: Math.PI / 300
    }, we = 0;


    var cameraPos = {};

    var mouseDown = false;

    // longitude经度 lat维度
    function lglt2xyz(longitude,latitude,radius){
        var lg = Three.Math.degToRad(longitude) , lt = Three.Math.degToRad(latitude);
        console.log(lg, lt);
        var y = radius * Math.sin(lt);
        var temp = radius * Math.cos(lt);
        var x = temp * Math.sin(lg);
        var z = temp * Math.cos(lg);
        // console.log(x+","+y+","+z);
        return {x:x , y:y ,z:z}
    }

    // 地球
    function globe () {

        var value = (new Three.TextureLoader).load('../images/textures/ic_dt.png');
        var globe = B.earth;
        var globeGeometry = new Three.SphereGeometry(100,40,30);
        var globeUniforms = Three.UniformsUtils.clone(globe.uniforms);
        globeUniforms.texture.value = value;
        var globeMaterial = new Three.ShaderMaterial({
            uniforms: globeUniforms,
            vertexShader: globe.vertexShader,
            fragmentShader: globe.fragmentShader
        });
        globeMesh = new Three.Mesh(globeGeometry, globeMaterial);
        // globeMesh.rotation.y = .63 * Math.PI;
        console.log(globeMesh)
        globeMesh.receiveShadow = !0;
        globeMesh.castShadow = !0;
        group.add(globeMesh);
        // group.rotation.x = THREE.Math.degToRad(-25);
        // group.rotation.y = THREE.Math.degToRad(90);
        // var globeTextureLoader = new THREE.TextureLoader();
        // globeTextureLoader.load('images/textures/earth.jpg', function (texture) {
        //   var globeGgeometry = new THREE.SphereGeometry(200, 40, 30);
        //   var globeMaterial = new THREE.MeshStandardMaterial({map: texture});
        //   var globeMesh = new THREE.Mesh(globeGgeometry, globeMaterial);
        //   group.add(globeMesh);
        //   group.rotation.x = THREE.Math.degToRad(35);
        //   group.rotation.y = THREE.Math.degToRad(170);
        // });

        globePos = globeMesh.position;
    }

    // 广告牌
    function plate () {
       var plateValue = (new Three.TextureLoader).load('../images/textures/1.png');
       var render = B.earth;
       var plateGeometry = new Three.PlaneGeometry(50, 20),
           plateUniforms = Three.UniformsUtils.clone(render.uniforms);
       plateUniforms.texture.value = plateValue;
       var plateMaterial = new Three.ShaderMaterial({
           uniforms: plateUniforms,
           vertexShader: render.vertexShader,
           fragmentShader: render.fragmentShader
       });
       plateMesh = new Three.Mesh(plateGeometry, plateMaterial);
       plateMesh.position.x = -100;
       plateMesh.position.y = 0;
       plateMesh.position.z = -100;
       plateMesh.rotation.y = THREE.Math.degToRad(-120);
    //    plateMesh.rotation.x = THREE.Math.degToRad(0);
    //    plateMesh.rotation.z = THREE.Math.degToRad(0);
    //    group.rotation.y = THREE.Math.degToRad(135);
       group.add(plateMesh);

       platePos = plateMesh.position;
    }

    // 光
    function lights() {
        var color = new Three.Color('#ffffff');
        var hemisphereLight = new THREE.AmbientLight(16744001);
        group.add(hemisphereLight);
    }

    // 初始化
    function init() {
        container = document.getElementById('earth-container');

        scene = new THREE.Scene();
        // var bgTexture = new THREE.TextureLoader().load("images/textures/starfield.jpg");
        // scene.background = bgTexture;

        camera = new THREE.PerspectiveCamera(25, winWth/winHgt, 1, 1e4);
        // camera.up.x = 0;
        // camera.up.y = 1;
        // camera.up.z = 0;
        camera.position.x = -400;
        camera.position.y = -200;
        camera.position.z = 400;

        var axes = new THREE.AxisHelper(400);
        scene.add(axes);
        // camera.lookAt(0,0,0);

        group = new THREE.Group();
        scene.add(group);

        // 地球
        globe();

        plate();

        // 半球光
        lights();

        mark();

        // 渲染器
        renderer = new THREE.WebGLRenderer({
            antialias: !0,
            alpha: !0
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(winWth, winHgt);
        renderer.shadowMap.enabled = !0;
        renderer.domElement.style.position = "absolute";
        container.appendChild(renderer.domElement);



        // 盘旋控制
        orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
        orbitControl.minDistrance = 20;
        orbitControl.maxDistrance = 50;
        orbitControl.enableZoom = false;
        orbitControl.maxPolarAngle = Math.PI * 2;
        orbitControl.enableRotate = false;
        orbitControl.rotateSpeed = 1.0;
        orbitControl.autoRotate = true;
        orbitControl.autoRotateSpeed = 0.5;

        // 性能测试
        stats = new Stats();
        container.appendChild(stats.domElement);


        // window.$('#earth-container').touchmove(function(e) {
        //     console.log(1);
        // })

        // resize事件
        window.addEventListener('resize', onWindowResize, false);
        console.log(container);
        container.addEventListener('mousedown', function(e) {
            event.preventDefault();
            mouseDown = true;
            mouseX = event.clientX;//出发事件时的鼠标指针的水平坐标
            J.x = $.x;
            J.y = $.y;
            // rotateStart.set( event.clientX, event.clientY );
            container.addEventListener( 'mousemove', mousemove2, false );
        }, false);

        container.addEventListener('mouseup', function(e) {
            mouseDown = false;
            container.removeEventListener("mousemove", mousemove2);
        }, false);
        // container.addEventListener('mousemove', function(e) {
            // console.log(e);
        // }, false);
        // window.addEventListener("mousemove", clickListner, false);
    }

    // var rotateStart;
    // rotateStart = new THREE.Vector2();

    function mousemove2 (e) {
        if(!mouseDown){
            return;
        }
        console.log(e);
        var deltaX = event.clientX - mouseX;
        var deltaY = event.clientX - mouseX;
        // console.log(deltaY);
        // mouseX = event.clientX;
        // mouseY = event.clientY;
        $.x = J.x + .005 * (event.clientX - mouseX);
        $.y = J.y + .005 * (event.clientX - mouseX);

        // $.x = $.x < baseRotation ? baseRotation : $.x
        // rotateScene(deltaX, deltaY);
    }

    function rotateScene(deltaX, deltaY){
        //设置旋转方向和移动方向相反，所以加了个负号
        var degX = deltaX / 200;
        var degY = deltaY / 200;

        cameraPos = {
            y: degY
        };

        //deg 设置模型旋转的弧度
        // globeMesh.rotation.x += degX > baseRotation ? baseRotation : degX;
        // globeMesh.rotation.y += degY < -baseRotation ? -baseRotation : degY;
        // $.x = degY;
        // console.log($.x);
        // globeMesh.rota
        // markMesh.rotation.x += degX;
        // markMesh.rotation.y += degY;
        // render();
    }

    function getClientRect (e, t, n) {
        var i = e.getBoundingClientRect();
        return [(t - i.left) / i.width, (n - i.top) / i.height]
    }

    // function convertTo3DCoordinate (clientX,clientY){
    //     // console.log("cx: " + clientX + ", cy: " + clientY);
    //     var mv = new THREE.Vector3(
    //         (window.innerWidth) - 1,
    //         (window.innerHeight) + 1,
    //         -100 );
    //     console.log("mx: " + mv.x + ", my: " + mv.y+", mz:"+mv.z);
    //     mv.unproject(camera);
    //     console.log("x: " + mv.x + ", y: " + mv.y+", z:"+mv.z);
    //     // console.log(mv);
    //     return mv;
    // }


    // 打点
    function mark() {
        var t = 52;
        function markAnimate() {
            p += .01,
            p > 2 && (p = 1),
            markMesh.scale.x = p,
            markMesh.scale.y = p,
            markMesh.material.opacity = .3,
            requestAnimationFrame(markAnimate)
        }
        var s = new THREE.CircleGeometry(5,40)
          , l = new THREE.MeshBasicMaterial({
            color: 16744001,
            transparent: !0,
            opacity: 0,
            side: Three.DoubleSide
        });
          markMesh = new THREE.Mesh(s,l);
          var a = -25.6401490000;
          var b = 233.4429070000;
          var c = 101;
          var calcuPosition = lglt2xyz(b, a,c);
        markMesh.position.set(calcuPosition.x, calcuPosition.y, calcuPosition.z);
        markMesh.rotation.x = Three.Math.degToRad(-40);
        markMesh.rotation.y = Three.Math.degToRad(40);

        console.log(lglt2xyz(b, a,c));
        console.log(markMesh.position);
        group.add(markMesh);
        var p = 1;
        markAnimate()
    }


    // 窗口大小改变
    function onWindowResize() {
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }


    // 渲染
    function render() {
        // K.y += .1 * (cameraPos.y - K.y);
        // z.position.y = Z * Math.sin(cameraPos.y);
        //(we === $.x * $. x + $.y) ? $.x -= .005 : we = $.x + $.y;
        if (mouseDown) {
            K.x += .1 * ($.x - K.x);
        } else {
            $.x += .01;
            K.x += .01;
        }

        // K.y += .1 * ($.y - K.y);/
        // Z += .3 * (ee - Z),

        // console.log($.x, K.x, $.x - K.x);

        camera.position.x = 1e3 * Math.sin(K.x) * Math.cos(K.y);
        camera.position.y = 1e3 * Math.sin(K.y);
        camera.position.z = 1e3 * Math.cos(K.x) * Math.cos(K.y);

        camera.lookAt(globeMesh.position);
        renderer.render(scene, camera);
    }


    // var pos =
    // 动画
    function animate() {
        // console.log(plateMesh.position, globeMesh.position, camera.position);
        // var plateX = platePostion.x = platePostion.x - 0.1;
        // plateMesh.position.x = plateX;
        // console.log(camera.position.x + 100, camera.position.y, camera.position.y)
        // globeRotation = globeRotation + 0.5;
        // globeMesh.rotation.set(0, Three.Math.degToRad(globeRotation), 0);
        // markRotation = markRotation + 0.5;
        // markMesh.rotation.set(0, Three.Math.degToRad(markRotation), 0);
        // !mouseDown && orbitControl.update();
        render();
        requestAnimationFrame(animate);
        stats.update();
    }

    init();
    animate();
})();