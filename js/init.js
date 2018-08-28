var log = console.log.bind(console);

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

var globeObj = (function() {
    'use strict';

    // 判断浏览器是否支持webgl
    // if(!Detector.webgl) Detector.addGetWebGLMessage();

    var container, stats;
    var camera, scene, renderer;
    var group;
    var mouseX = 0, mouseY = 0;
    var X = 0;
    var winWth = window.innerWidth, winHgt = window.innerHeight;
    // var se = (new c.TextureLoader).load(a.a);
    var $ = {
        x: 2.1 * Math.PI,
        y: Math.PI / 4.5
    };
    var K = {
        x: 0,
        y: 0
    };
    var Z = 1e3, ee = 1e3;
    var we = 0
        , be = !0;
    var c = window.THREE;
    var le = new c.SphereGeometry(3,20,20)
    , ce = new c.MeshBasicMaterial({
      color: 16744001
  });

    function points () {
        var globeTextureLoader = (new THREE.TextureLoader).load('../images/textures/earth.jpg');;
        var e = void 0
            , t = void 0
            , n = void 0
            , i = void 0;
        i = new THREE.SphereGeometry(200,40,30);
        e = B.earth;
        t = window.THREE.UniformsUtils.clone(e.uniforms);
        t.texture.value = globeTextureLoader;
        n = new THREE.ShaderMaterial({
            uniforms: t,
            vertexShader: e.vertexShader,
            fragmentShader: e.fragmentShader
        });
        window.q = new THREE.Mesh(i,n);
        q.name = "scene";
        q.rotation.y = .3 * Math.PI;
        q.receiveShadow = !0;
        q.castShadow = !0;
        group.add(q);
    }

    // 初始化
    function init() {
        container = document.getElementById('earth-container');
        container.style.color='#fff';
        scene = new THREE.Scene();
        // var bgTexture = new THREE.TextureLoader().load("images/textures/starfield.jpg");
        // scene.background = bgTexture;

        const width = .81 * window.innerWidth;
        const height = .81 * window.innerWidth;

        camera = new THREE.PerspectiveCamera(40, 1, 1, 1e4);

        group = new THREE.Scene;
        
        // group.add(new THREE.AmbientLight(16744001));
        points();
        l();
        plate();
        

        // var oe = new THREE.SpotLight(16744001,2,1e3,Math.PI / 12,1,1);
        // oe.target = q;
        // oe.castShadow = !0;
        // oe.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50,1,700,300))
        // oe.shadow.camera.near = 1
        // oe.shadow.camera.far = 1e3
        // oe.shadow.camera.visible = !0
        // oe.shadow.mapSize.Width = 1024
        // oe.shadow.mapSize.Height = 1024
        // camera.add(oe);
        group.add(camera);
        // oe.position.set(-950, -430, -500);

        renderer = new THREE.WebGLRenderer({
            antialias: !0,
            alpha: !0
        });

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = !0;
        renderer.domElement.style.position = "absolute";
        container.appendChild(renderer.domElement);
    }

    // 中心点画圈 
    function u(e, t, n, i, r, o) {
        var a = null
          , s = new THREE.CircleGeometry(15,64)
          , l = new THREE.MeshBasicMaterial({
            color: 16744001
        });
        s.vertices.shift(),
        a = new THREE.LineLoop(s,l),
        a.position.set(e, t, n),
        a.rotation.x = c.Math.degToRad(i),
        a.rotation.y = c.Math.degToRad(r),
        a.name = "hollow-circle " + o,
        group.add(a)
    }
    function m(e, t, n, i, r) {
        function o() {
            te || (a = (a + 1) % s,
            0 !== a ? (l.geometry.setDrawRange(0, a),
            requestAnimationFrame(o)) : w(e, p, d))
        }
        var a = 0
          , s = 300
          , l = null
          , u = new c.CubicBezierCurve3(new c.Vector3(e.x,e.y,e.z),new c.Vector3(t.x,t.y,t.z),new c.Vector3(i.x,i.y,i.z),new c.Vector3(r.x,r.y,r.z))
          , p = 50
          , d = u.getPoints(p)
          , f = u.getPoints(s)
          , h = new c.BufferGeometry
          , m = new Float32Array(3 * s);
        h.addAttribute("position", new c.BufferAttribute(m,3)),
        a = 2,
        h.setDrawRange(0, a);
        var g = new c.LineBasicMaterial({
            color: 16744001,
            linewidth: 1
        });
        l = new c.Line(h,g),
        function(e, t) {
            for (var n = l.geometry.attributes.position.array, i = 0, r = 0, o = e; r < o; r++)
                n[i++] = t[r].x,
                n[i++] = t[r].y,
                n[i++] = t[r].z
        }(s, f),
        group.add(l),
        points()
    }
    function p(e, t, n, i, r, o) {
        // var a = void 0;
        // a = new THREE.CircleGeometry(20,32);
        // var s = new THREE.MeshBasicMaterial({
        //     map: se,
        //     overdraw: .5,
        //     transparent: !0,
        //     side: c.DoubleSide
        // })
        //   , l = new THREE.Mesh(a,s);
        // l.position.set(e, t, n),
        // l.rotation.x = c.Math.degToRad(i),
        // l.rotation.y = c.Math.degToRad(r),
        // l.rotation.z = c.Math.degToRad(o),
        // l.name = "didi-logo",
        // group.add(l)
    }
    function plate () {
        var plateLoader = new THREE.TextureLoader();
        plateLoader.load('images/textures/1.png', function (texture) {
          var globeGgeometry = new THREE.PlaneGeometry(200, 100);
          var globeMaterial = new THREE.MeshStandardMaterial({map: texture});
          var plateMesh = new THREE.Mesh(globeGgeometry, globeMaterial);
          plateMesh.position.x = 200;
          plateMesh.position.y = 100;
          group.add(plateMesh);
        })
     }
    function h(e, t, n, i, r, o) {
        var a = new THREE.CircleGeometry(20,32)
          , s = new THREE.MeshBasicMaterial({
            color: 16744001,
            transparent: !0,
            opacity: 0,
            side: c.DoubleSide
        })
          , l = new THREE.Mesh(a,s);
        l.position.set(e, t, n),
        l.rotation.x = window.THREE.Math.degToRad(i),
        l.rotation.y = window.THREE.Math.degToRad(r),
        l.name = "large-circle target=" + o,
        group.add(l)
    }
    function w(e, t, n) {
        var i = new c.Mesh(le,ce);
        i.position.set(e.x, e.y, e.z),
        group.add(i);
        var r = 0;
        // ue = setInterval(function() {
        //     r++,
        //     r > t ? r = 0 : i.position.set(n[r].x, n[r].y, n[r].z)
        // }, 50)
    }
    function y(e, t, n, i) {
        function r() {
            (o = (o + 1) % a,
            0 !== o ? (s.geometry.setDrawRange(0, o),
            requestAnimationFrame(r)) : w({
                x: u.v0x,
                y: u.v0y,
                z: u.v0z
            }, n, p))
        }
        var o = 0
          , a = 200
          , s = null
          , l = new c.QuadraticBezierCurve3
          , u = b(e[0], e[1], t[0], t[1], i);
        l.v0 = new c.Vector3(u.v0x,u.v0y,u.v0z),
        l.v1 = new c.Vector3(u.v1x,u.v1y,u.v1z),
        l.v2 = new c.Vector3(u.v2x,u.v2y,u.v2z);
        var p = l.getPoints(n)
          , d = l.getPoints(a)
          , f = new c.BufferGeometry
          , h = new Float32Array(3 * a);
        f.addAttribute("position", new c.BufferAttribute(h,3)),
        o = 2,
        f.setDrawRange(0, o);
        var m = new c.LineBasicMaterial({
            color: 16744001,
            linewidth: 1
        });
        s = new c.Line(f,m),
        function(e, t) {
            for (var n = s.geometry.attributes.position.array, i = 0, r = 0, o = e; r < o; r++)
                n[i++] = t[r].x,
                n[i++] = t[r].y,
                n[i++] = t[r].z
        }(a, d),
        group.add(s),
        r()
    }
    function f(e, t, n, i, r, o) {
        function a() {
            p += .01,
            p > 2 && (p = 1),
            u.scale.x = p,
            u.scale.y = p,
            u.material.opacity = .3,
            requestAnimationFrame(a)
        }
        var s = new THREE.CircleGeometry(5,40)
          , l = new THREE.MeshBasicMaterial({
            color: 16744001,
            transparent: !0,
            opacity: 0,
            side: c.DoubleSide
        })
          , u = new THREE.Mesh(s,l);
        u.position.set(e, t, n),
        u.rotation.x = c.Math.degToRad(i),
        u.rotation.y = c.Math.degToRad(r),
        u.name = "twinklin-light target=" + o,
        group.add(u);
        var p = 1;
        a()
    }
    function b(e, t, n, i, r) {
        var o = 0
          , a = 200 * Math.sin(e / 180 * Math.PI);
        o = 200 * Math.cos(e / 180 * Math.PI);
        var s = Math.cos(t / 180 * Math.PI) * o
          , l = Math.sin(t / 180 * Math.PI) * o
          , c = 200 * Math.sin(n / 180 * Math.PI);
        o = 200 * Math.cos(n / 180 * Math.PI);
        var u = Math.cos(i / 180 * Math.PI) * o
          , p = Math.sin(i / 180 * Math.PI) * o
          , d = E({
            v0x: s,
            v0y: a,
            v0z: l
        }, {
            v2x: u,
            v2y: c,
            v2z: p
        }, r);
        return {
            v0x: s,
            v0y: a,
            v0z: l,
            v1x: d.v1x,
            v1y: d.v1y,
            v1z: d.v1z,
            v2x: u,
            v2y: c,
            v2z: p
        }
    }
    function E(e, t, n) {
        var i = e.v0x
          , r = e.v0y
          , o = e.v0z
          , a = t.v2x
          , s = t.v2y
          , l = t.v2z
          , c = (i + a) / 2
          , u = (r + s) / 2
          , p = (o + l) / 2
          , d = Math.sqrt(Math.pow(a - i, 2) + Math.pow(s - r, 2) + Math.pow(l - o, 2))
          , f = Math.pow(d, 2) / (Math.pow(c, 2) + Math.pow(u, 2) + Math.pow(p, 2))
          , h = !1;
        f > 3 && f < 10 ? f = 2 : f > 10 && (f = 14,
        h = !0);
        var m = c + f * c / 2
          , g = u + f * u / 2
          , v = p + f * p / 2;
        return "Mexico" === n && (m = c + f * c * .7,
        g = u + f * u * .7,
        v = p + f * p * .7),
        "Brazil" === n && (m = c + f * c * .4,
        g = u + f * u * .4,
        v = p + f * p * .4),
        h && (m -= 250,
        g -= 50,
        v -= 20),
        {
            v1x: m,
            v1y: g,
            v1z: v
        }
    }
    function v(e) {
        var t = {}
          , n = {}
          , i = {}
          , r = void 0
          , o = void 0
          , a = void 0;
        switch (e) {
        case "Brazil":
            r = 190,
            t = {
                x: -1.3472 * r,
                y: r,
                z: -.1773 * r
            },
            o = 130,
            n = {
                x: -1.3472 * r,
                y: r,
                z: -.1773 * r
            },
            a = 30,
            i = {
                x: -6.2762 * a,
                y: a,
                z: -9.2133 * a
            };
            break;
        case "Mexico":
            r = 210,
            t = {
                x: .429 * r,
                y: r,
                z: .225 * r
            },
            o = 200,
            n = {
                x: .046 * o,
                y: o,
                z: .511 * o
            },
            a = 167,
            i = {
                x: .8864 * a,
                y: a,
                z: -.1169 * a
            };
            break;
        default:
            i = {}
        }
        return {
            topPointer: t,
            secondDot: n,
            fourDot: i
        }
    }
    function g(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
          , i = arguments[3]
          , r = new c.Geometry
          , o = new c.QuadraticBezierCurve3
          , a = b(e[0], e[1], t[0], t[1], i);
        o.v0 = new c.Vector3(a.v0x,a.v0y,a.v0z),
        o.v1 = new c.Vector3(a.v1x,a.v1y,a.v1z),
        o.v2 = new c.Vector3(a.v2x,a.v2y,a.v2z);
        for (var s = 0; s <= 40; s++)
            r.vertices.push(o.getPoint(s / 40));
        var l = v(i)
          , u = r.vertices;
        setTimeout(function() {
            return m(u[0], l.secondDot, l.topPointer, l.fourDot, u[40])
        }, n)
    }
    function d(e, t, n, i, r, o) {
        var a = new c.CircleGeometry(5,32)
          , s = new c.MeshBasicMaterial({
            color: 16744001,
            side: c.DoubleSide
        })
          , l = new c.Mesh(a,s);
        l.position.set(e, t, n),
        l.rotation.x = c.Math.degToRad(i),
        l.rotation.y = c.Math.degToRad(r),
        l.name = "solid-circle target=" + o,
        group.add(l)
    }
    function _(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 20
          , i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0
          , r = arguments[4];
        setTimeout(function() {
            return y(e, t, n, r)
        }, i)
    }
    function l() {
        var e = [[42, 122], [2, 130], [13, 156.5], [24.5, 179], [-24, -77], [57.5, -149], [36.1, -6.41], [25, -25], [-38, 89.5]]
          , t = 0;
        t = 138.68;
        p(-.494 * t, t, .914 * t, -50, -20, -18);
        u(-.494 * t, t, .914 * t, -50, -20, "Beijing");
        h(-.494 * t, t, .914 * t, -50, -20, "Beijing");
        t = 138.78,
        f(-.494 * t, t, .914 * t, -50, -20, "Beijing");
        _([40, 120], e[1], 20, 0, "Singapore");
        t = 6.98,
        u(-18.407 * t, t, 21.9366 * t, -5, -40, "Singapore");
        d(-18.407 * t, t, 21.9366 * t, -5, -40, "Singapore");
        h(-18.407 * t, t, 21.9366 * t, -5, -40, "Singapore");
        t = 7,
        f(-18.407 * t, t, 21.9366 * t, -5, -40, "Singapore");
        _([42, 122], e[2], 30, 500, "India");
        t = 45,
        u(-3.9722 * t, t, 1.7271 * t, -35, -65, "India");
        d(-3.9722 * t, t, 1.7271 * t, -35, -65, "India");
        h(-3.9722 * t, t, 1.7271 * t, -35, -65, "India");
        t = 45.55,
        f(-3.9722 * t, t, 1.7271 * t, -35, -65, "India");
        _([42, 122], e[3], 35, 1e3, "theMiddleEast");
        t = 83,
        u(-2.19397 * t, t, .0382956 * t, -81, -65, "theMiddleEast");
        d(-2.19397 * t, t, .0382956 * t, -81, -65, "theMiddleEast");
        h(-2.19397 * t, t, .0382956 * t, -81, -65, "theMiddleEast");
        t = 83.2,
        f(-2.19397 * t, t, .0382956 * t, -81, -65, "theMiddleEast");
        g([45, 122], e[4], 1500, "Brazil");
        t = -81.34,
        u(-.50524 * t, t, 2.18847 * t, -25, -10, "Brazil");
        d(-.50524 * t, t, 2.18847 * t, -25, -10, "Brazil");
        h(-.50524 * t, t, 2.18847 * t, -25, -10, "Brazil");
        t = -81.45,
        f(-.50524 * t, t, 2.18847 * t, -25, -10, "Brazil");
        _([47, 122], e[5], 40, 2e3, "Europe");
        t = 168.7,
        u(-.54608 * t, t, -.32812 * t, 71, 28, "Europe");
        d(-.54608 * t, t, -.32812 * t, 71, 28, "Europe");
        h(-.54608 * t, t, -.32812 * t, 71, 28, "Europe");
        t = 168.8,
        f(-.54608 * t, t, -.32812 * t, 71, 28, "Europe");
        _([44, 115], e[6], 25, 2500, "America");
        t = 117.84,
        u(1.363 * t, t, -.1531 * t, -95, 56, "America");
        d(1.363 * t, t, -.1531 * t, -95, 56, "America");
        h(1.363 * t, t, -.1531 * t, -95, 56, "America");
        t = 117.94,
        f(1.363 * t, t, -.1531 * t, -95, 56, "America");
        _([48, 115], e[7], 25, 2500, "Mexico");
        t = 84.8,
        u(1.944 * t, t, -.906 * t, -130, 55, "Mexico");
        d(1.944 * t, t, -.906 * t, -130, 55, "Mexico");
        h(1.944 * t, t, -.906 * t, -130, 55, "Mexico");
        t = 85,
        f(1.944 * t, t, -.906 * t, -130, 55, "Mexico");
        _([42, 118], e[8], 25, 2500, "Australia");
        t = -123.3,
        u(-.011169456089179526 * t, t, -1.279892895937685 * t, 40, 0, "Australia");
        d(-.011169456089179526 * t, t, -1.279892895937685 * t, 40, 0, "Australia");
        h(-.011169456089179526 * t, t, -1.279892895937685 * t, 40, 0, "Australia");
        f(-.011169456089179526 * t, t, -1.279892895937685 * t, 40, 0, "Australia")
    }
    function M(e) {
        ee -= e,
        ee = ee > 1e3 ? 1e3 : ee,
        ee = ee < 350 ? 350 : ee
    }
    // 渲染
    function render() {
        // group.rotation.y -= 0.0005;
        M(X);
        be && (we === $.x * $.x + $.y) ? $.x -= .005 : we = $.x + $.y;
        // console.log(K.x);
        K.x += .1 * ($.x - K.x);
        K.y += .1 * ($.y - K.y);
        Z += .3 * (ee - Z);

        // console.log(Z);
        
        camera.position.x = Z * Math.sin(K.x) * Math.cos(K.y);
        camera.position.y = Z * Math.sin(K.y);
        camera.position.z = Z * Math.cos(K.x) * Math.cos(K.y);
        camera.lookAt(q.position);
        renderer.render(group, camera);

        // camera.up.x = 0;
        // camera.up.y = 1;
        // camera.up.z = 0;
        // camera.position.x = 0;
        // camera.position.y = 0;
        // camera.position.z = 400;
        // camera.lookAt(0,0,0);
    }

    // 动画
    function animate() {
        requestAnimationFrame(animate);
        render();
        // stats.update();
    }

    init();
    animate();
})();