
    "use strict";
    var i = n(798)
      , r = n.n(i)
      , o = n(799)
      , a = n.n(o)
      , s = this
      , l = {}
      , c = window.THREE;
    l.Globe = function(e, t, n) {
        function i() {
            e.style.color = "#fff",
            e.style.font = "13px/20px Arial, sans-serif",
            window.innerWidth < 960 ? (G = N(),
            U = N()) : (G = .454 * window.innerWidth,
            U = .454 * window.innerWidth),
            z = new c.PerspectiveCamera(30,G / U,1,1e4),
            W = new c.Scene,
            W.add(new c.AmbientLight(16744001)),
            o(),
            l(),
            oe = new c.SpotLight(16744001,2,1e3,Math.PI / 12,1,1),
            oe.target = q,
            oe.castShadow = !0,
            oe.shadow = new c.LightShadow(new c.PerspectiveCamera(50,1,700,300)),
            oe.shadow.camera.near = 1,
            oe.shadow.camera.far = 1e3,
            oe.shadow.camera.visible = !0,
            oe.shadow.mapSize.Width = 1024,
            oe.shadow.mapSize.Height = 1024,
            z.add(oe),
            W.add(z),
            oe.position.set(-950, -430, -500),
            V = new c.WebGLRenderer({
                antialias: !0,
                alpha: !0
            }),
            V.setPixelRatio(window.devicePixelRatio),
            V.setSize(G, U),
            V.shadowMap.enabled = !0,
            V.domElement.style.position = "absolute",
            e.appendChild(V.domElement),
            e.addEventListener("mousedown", x, !1),
            e.addEventListener("touchstart", k, !1),
            e.addEventListener("mouseenter", de, !1),
            e.addEventListener("mouseleave", fe, !1),
            e.addEventListener("mousemove", j, !1),
            window.addEventListener("click", he, !1),
            e.addEventListener("touchend", T, !1),
            e.addEventListener("touchmove", S, !1),
            window.addEventListener("resize", P, !1)
        }
        function o() {
            var e = void 0
              , t = void 0
              , n = void 0
              , i = void 0;
            i = new c.SphereGeometry(200,40,30),
            e = B.earth,
            t = c.UniformsUtils.clone(e.uniforms),
            t.texture.value = ae,
            n = new c.ShaderMaterial({
                uniforms: t,
                vertexShader: e.vertexShader,
                fragmentShader: e.fragmentShader
            }),
            q = new c.Mesh(i,n),
            q.name = "scene",
            q.rotation.y = .7 * Math.PI,
            q.receiveShadow = !0,
            q.castShadow = !0,
            W.add(q)
        }
        function l() {
            var e = [[42, 122], [2, 130], [13, 156.5], [24.5, 179], [-24, -77], [57.5, -149], [36.1, -6.41], [25, -25], [-38, 89.5]]
              , t = 0;
            t = 138.68,
            p(-.494 * t, t, .914 * t, -50, -20, -18),
            u(-.494 * t, t, .914 * t, -50, -20, "Beijing"),
            h(-.494 * t, t, .914 * t, -50, -20, "Beijing"),
            t = 138.78,
            f(-.494 * t, t, .914 * t, -50, -20, "Beijing"),
            _([40, 120], e[1], 20, 0, "Singapore"),
            t = 6.98,
            u(-18.407 * t, t, 21.9366 * t, -5, -40, "Singapore"),
            d(-18.407 * t, t, 21.9366 * t, -5, -40, "Singapore"),
            h(-18.407 * t, t, 21.9366 * t, -5, -40, "Singapore"),
            t = 7,
            f(-18.407 * t, t, 21.9366 * t, -5, -40, "Singapore"),
            _([42, 122], e[2], 30, 500, "India"),
            t = 45,
            u(-3.9722 * t, t, 1.7271 * t, -35, -65, "India"),
            d(-3.9722 * t, t, 1.7271 * t, -35, -65, "India"),
            h(-3.9722 * t, t, 1.7271 * t, -35, -65, "India"),
            t = 45.55,
            f(-3.9722 * t, t, 1.7271 * t, -35, -65, "India"),
            _([42, 122], e[3], 35, 1e3, "theMiddleEast"),
            t = 83,
            u(-2.19397 * t, t, .0382956 * t, -81, -65, "theMiddleEast"),
            d(-2.19397 * t, t, .0382956 * t, -81, -65, "theMiddleEast"),
            h(-2.19397 * t, t, .0382956 * t, -81, -65, "theMiddleEast"),
            t = 83.2,
            f(-2.19397 * t, t, .0382956 * t, -81, -65, "theMiddleEast"),
            g([45, 122], e[4], 1500, "Brazil"),
            t = -81.34,
            u(-.50524 * t, t, 2.18847 * t, -25, -10, "Brazil"),
            d(-.50524 * t, t, 2.18847 * t, -25, -10, "Brazil"),
            h(-.50524 * t, t, 2.18847 * t, -25, -10, "Brazil"),
            t = -81.45,
            f(-.50524 * t, t, 2.18847 * t, -25, -10, "Brazil"),
            _([47, 122], e[5], 40, 2e3, "Europe"),
            t = 168.7,
            u(-.54608 * t, t, -.32812 * t, 71, 28, "Europe"),
            d(-.54608 * t, t, -.32812 * t, 71, 28, "Europe"),
            h(-.54608 * t, t, -.32812 * t, 71, 28, "Europe"),
            t = 168.8,
            f(-.54608 * t, t, -.32812 * t, 71, 28, "Europe"),
            _([44, 115], e[6], 25, 2500, "America"),
            t = 117.84,
            u(1.363 * t, t, -.1531 * t, -95, 56, "America"),
            d(1.363 * t, t, -.1531 * t, -95, 56, "America"),
            h(1.363 * t, t, -.1531 * t, -95, 56, "America"),
            t = 117.94,
            f(1.363 * t, t, -.1531 * t, -95, 56, "America"),
            _([48, 115], e[7], 25, 2500, "Mexico"),
            t = 84.8,
            u(1.944 * t, t, -.906 * t, -130, 55, "Mexico"),
            d(1.944 * t, t, -.906 * t, -130, 55, "Mexico"),
            h(1.944 * t, t, -.906 * t, -130, 55, "Mexico"),
            t = 85,
            f(1.944 * t, t, -.906 * t, -130, 55, "Mexico"),
            _([42, 118], e[8], 25, 2500, "Australia"),
            t = -123.3,
            u(-.011169456089179526 * t, t, -1.279892895937685 * t, 40, 0, "Australia"),
            d(-.011169456089179526 * t, t, -1.279892895937685 * t, 40, 0, "Australia"),
            h(-.011169456089179526 * t, t, -1.279892895937685 * t, 40, 0, "Australia"),
            f(-.011169456089179526 * t, t, -1.279892895937685 * t, 40, 0, "Australia")
        }
        function u(e, t, n, i, r, o) {
            var a = null
              , s = new c.CircleGeometry(15,64)
              , l = new c.LineBasicMaterial({
                color: 16744001
            });
            s.vertices.shift(),
            a = new c.LineLoop(s,l),
            a.position.set(e, t, n),
            a.rotation.x = c.Math.degToRad(i),
            a.rotation.y = c.Math.degToRad(r),
            a.name = "hollow-circle " + o,
            W.add(a)
        }
        function p(e, t, n, i, r, o) {
            var a = void 0;
            a = new c.CircleGeometry(20,32);
            var s = new c.MeshBasicMaterial({
                map: se,
                overdraw: .5,
                transparent: !0,
                side: c.DoubleSide
            })
              , l = new c.Mesh(a,s);
            l.position.set(e, t, n),
            l.rotation.x = c.Math.degToRad(i),
            l.rotation.y = c.Math.degToRad(r),
            l.rotation.z = c.Math.degToRad(o),
            l.name = "didi-logo",
            W.add(l)
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
            W.add(l)
        }
        function f(e, t, n, i, r, o) {
            function a() {
                p += .01,
                p > 2 && (p = 1),
                u.scale.x = p,
                u.scale.y = p,
                u.material.opacity = re && re === o ? .3 : ie && ie === o ? .3 : 0,
                requestAnimationFrame(a)
            }
            var s = new c.CircleGeometry(5,40)
              , l = new c.MeshBasicMaterial({
                color: 16744001,
                transparent: !0,
                opacity: 0,
                side: c.DoubleSide
            })
              , u = new c.Mesh(s,l);
            u.position.set(e, t, n),
            u.rotation.x = c.Math.degToRad(i),
            u.rotation.y = c.Math.degToRad(r),
            u.name = "twinklin-light target=" + o,
            W.add(u);
            var p = 1;
            a()
        }
        function h(e, t, n, i, r, o) {
            var a = new c.CircleGeometry(20,32)
              , s = new c.MeshBasicMaterial({
                color: 16744001,
                transparent: !0,
                opacity: 0,
                side: c.DoubleSide
            })
              , l = new c.Mesh(a,s);
            l.position.set(e, t, n),
            l.rotation.x = c.Math.degToRad(i),
            l.rotation.y = c.Math.degToRad(r),
            l.name = "large-circle target=" + o,
            W.add(l)
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
            W.add(l),
            o()
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
        function y(e, t, n, i) {
            function r() {
                te || (o = (o + 1) % a,
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
            W.add(s),
            r()
        }
        function _(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 20
              , i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0
              , r = arguments[4];
            setTimeout(function() {
                return y(e, t, n, r)
            }, i)
        }
        function w(e, t, n) {
            var i = new c.Mesh(le,ce);
            i.position.set(e.x, e.y, e.z),
            W.add(i);
            var r = 0;
            ue = setInterval(function() {
                r++,
                r > t ? r = 0 : i.position.set(n[r].x, n[r].y, n[r].z)
            }, 50)
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
        function x(t) {
            t.preventDefault(),
            me = !0,
            e.addEventListener("mouseup", C, !1),
            Q.x = -t.clientX,
            Q.y = t.clientY,
            J.x = $.x,
            J.y = $.y,
            e.style.cursor = "move"
        }
        function k(e) {
            he(e, !0),
            e.preventDefault(),
            me = !0;
            for (var t = e.changedTouches, n = 0; n < t.length; n++)
                Q.x = -t[n].pageX,
                Q.y = t[n].pageY;
            J.x = $.x,
            J.y = $.y
        }
        function j(e) {
            if (me) {
                Y.x = -e.clientX,
                Y.y = e.clientY;
                var t = Z / 1e3;
                $.x = J.x + .005 * (Y.x - Q.x) * t,
                $.y = J.y + .005 * (Y.y - Q.y) * t,
                $.y = $.y > ne ? ne : $.y,
                $.y = $.y < -ne ? -ne : $.y
            } else
                D(e)
        }
        function S(e) {
            if (e.preventDefault(),
            me) {
                for (var t = e.changedTouches, n = 0; n < t.length; n++)
                    Y.x = -t[n].pageX,
                    Y.y = t[n].pageY;
                var i = Z / 1e3;
                $.x = J.x + .005 * (Y.x - Q.x) * i,
                $.y = J.y + .005 * (Y.y - Q.y) * i,
                $.y = $.y > ne ? ne : $.y,
                $.y = $.y < -ne ? -ne : $.y
            }
            return !1
        }
        function C() {
            me = !1,
            e.removeEventListener("mouseup", C, !1),
            e.style.cursor = "auto"
        }
        function T() {
            me = !1
        }
        function D(t) {
            var n = new c.Vector2
              , i = W.children.filter(function(e) {
                return "scene" !== e.name
            })
              , r = ge(e, t.clientX, t.clientY);
            n.fromArray(r);
            var o = ye(n, i);
            if (o.length > 0)
                for (var a = 0; a < o.length; a++)
                    "" !== o[a].object.name && (o[a].object.name.indexOf("twinklin-light") > -1 && (F(A(o[a].object)),
                    o[a].object.material.opacity = .3,
                    xe()),
                    e.style.cursor = "pointer");
            else
                H(),
                ie || (i.forEach(function(e) {
                    e.name.indexOf("twinklin-light") > -1 && (e.material.opacity = 0)
                }),
                Ee()),
                e.style.cursor = "auto"
        }
        function N() {
            if (window.innerWidth < 960) {
                if (!e)
                    return;
                return window.innerWidth
            }
            return .454 * window.innerWidth
        }
        function P() {
            setTimeout(function() {
                var e = N();
                z.aspect = e / e,
                z.updateProjectionMatrix(),
                V.setSize(e, e)
            }, 300)
        }
        function M(e) {
            ee -= e,
            ee = ee > 1e3 ? 1e3 : ee,
            ee = ee < 350 ? 350 : ee
        }
        function L() {
            te || (requestAnimationFrame(L),
            O())
        }
        function O() {
            M(X),
            be && (we === $.x$.x + $.y ? $.x -= .005 : we = $.x + $.y,
            K.x += .1 * ($.x - K.x),
            K.y += .1 * ($.y - K.y),
            Z += .3 * (ee - Z),
            z.position.x = Z * Math.sin(K.x) * Math.cos(K.y),
            z.position.y = Z * Math.sin(K.y),
            z.position.z = Z * Math.cos(K.x) * Math.cos(K.y)),
            z.lookAt(q.position),
            V.render(W, z)
        }
        function A(e) {
            var t = e.name.match(/target=(.+)/);
            return t ? t[1] : ""
        }
        function I(e) {
            ie = e,
            xe()
        }
        function R() {
            ie = "",
            Ee()
        }
        function F(e) {
            re = e
        }
        function H() {
            re = ""
        }
        t = t || function(e) {
            var t = new c.Color;
            return t.setHSL(.6 - .5 * e, 1, .5),
            t
        }
        ;
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
          , z = void 0
          , W = void 0
          , V = void 0
          , G = void 0
          , U = void 0
          , q = void 0
          , X = 0
          , Y = new c.Vector2
          , Q = {
            x: 0,
            y: 0
        }
          , K = {
            x: 0,
            y: 0
        }
          , $ = {
            x: 2.1 * Math.PI,
            y: Math.PI / 4.5
        }
          , J = {
            x: 0,
            y: 0
        }
          , Z = 1e3
          , ee = 1e3
          , te = !1
          , ne = Math.PI / 2
          , ie = ""
          , re = ""
          , oe = null
          , ae = (new c.TextureLoader).load(r.a)
          , se = (new c.TextureLoader).load(a.a)
          , le = new c.SphereGeometry(3,20,20)
          , ce = new c.MeshBasicMaterial({
            color: 16744001
        })
          , ue = null
          , pe = !1
          , de = function() {
            pe = !0
        }
          , fe = function() {
            pe = !1,
            C()
        }
          , he = function(t, i) {
            var r = document.getElementsByClassName("pc-logo-desc")[0];
            if (!r || !r.contains(t.target)) {
                var o = new c.Vector2
                  , a = W.children
                  , s = [];
                if (i) {
                    var l = t.changedTouches;
                    s = ge(e, l[0].clientX, l[0].clientY)
                } else
                    s = ge(e, t.clientX, t.clientY);
                o.fromArray(s);
                var u = ye(o, a);
                if (u.length) {
                    var p = ""
                      , d = !1;
                    u.some(function(e) {
                        return "scene" === e.object.name ? (d = !0,
                        !0) : !!e.object.name && (p = A(e.object),
                        !0)
                    }),
                    d ? (R(),
                    n("")) : (I(p),
                    n(p))
                } else
                    R(),
                    n("")
            }
        }
          , me = !1
          , ge = function(e, t, n) {
            var i = e.getBoundingClientRect();
            return [(t - i.left) / i.width, (n - i.top) / i.height]
        }
          , ve = new c.Raycaster
          , ye = function(e, t) {
            return Y.set(2 * e.x - 1, -2 * e.y + 1),
            ve.setFromCamera(Y, z),
            ve.intersectObjects(t)
        }
          , _e = function() {
            te = !0,
            s.scene = null,
            s.camera = null,
            s.renderer = null,
            clearInterval(ue),
            e.removeEventListener("mousedown", x),
            e.removeEventListener("mouseenter", de),
            e.removeEventListener("mouseleave", fe),
            e.removeEventListener("mousemove", j),
            window.removeEventListener("click", he),
            e.removeEventListener("touchstart", k),
            e.removeEventListener("touchmove", S),
            e.removeEventListener("touchend", T)
        }
          , we = 0
          , be = !0;
        s.resetRotation = function() {
            $ = {
                x: 1 * Math.PI,
                y: Math.PI / 4.5
            }
        }
        ;
        var Ee = function() {
            be = !0
        }
          , xe = function() {
            be = !1
        };
        return window.stop = xe,
        window.keepRolling = Ee,
        s.stopRolling = xe,
        s.keepRolling = Ee,
        s.removeMarkeAndRoll = R,
        s.onWindowResize = P,
        s.animate = L,
        s.destroy = _e,
        s.init = i,
        s.camera = z,
        s.renderer = V,
        s.scene = W,
        s
    }
    ,
    t.a = l
}

