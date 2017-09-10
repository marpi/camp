/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Actor = function () {
	function Actor(_ref, opts) {
		var scene = _ref.scene,
		    renderer = _ref.renderer,
		    camera = _ref.camera;

		_classCallCheck(this, Actor);

		this.scene = scene;
		this.renderer = renderer;
		this.camera = camera;
		this.opts = opts || {};
		this.shapes = [];
		this.draw();
		return this;
	}

	_createClass(Actor, [{
		key: "shape",
		value: function shape() {}
	}, {
		key: "draw",
		value: function draw() {
			var _this = this;

			this.shape();
			this.shapes.forEach(function (shape) {
				return _this.scene.add(shape);
			});
		}
	}]);

	return Actor;
}();

/* harmony default export */ __webpack_exports__["a"] = (Actor);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actors_Drum__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actors_Skybox__ = __webpack_require__(6);




var camera, scene, renderer, effect, controls, vrControls, light;
var controller1, controller2;
var mobile = false;
var vr = false;

init();
setup();
render();

function init() {

    // renderer aka canvas
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(0, 1.5, 3.5);

    // controls
    controls = new THREE.OrbitControls(camera);
    controls.autoRotate = false;
    controls.enableZoom = false;

    // events
    addEvents();
}

function setup() {

    // lights
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 1, 5);
    scene.add(light);

    var cubeMap = getCubeMap(5);
    var skybox = new __WEBPACK_IMPORTED_MODULE_2__actors_Skybox__["a" /* default */]({ scene: scene, renderer: renderer, camera: camera }, { cubeMap: cubeMap });

    // objects
    var snare = new __WEBPACK_IMPORTED_MODULE_1__actors_Drum__["a" /* default */]({ scene: scene, renderer: renderer, camera: camera }, {
        position: new __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Position */](-1, 0, 0.5),
        sound: 'assets/sound/snare',
        color: 0xffff00,
        keyCode: 70,
        controller1: controller1,
        controller2: controller2
    });

    var highhat = new __WEBPACK_IMPORTED_MODULE_1__actors_Drum__["a" /* default */]({ scene: scene, renderer: renderer, camera: camera }, {
        position: new __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Position */](1, 0, 0.5),
        sound: 'assets/sound/highhat',
        color: 0xff0000,
        keyCode: 74,
        controller1: controller1,
        controller2: controller2
    });
    var bass = new __WEBPACK_IMPORTED_MODULE_1__actors_Drum__["a" /* default */]({ scene: scene, renderer: renderer, camera: camera }, {
        position: new __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Position */](0, 0, 0),
        sound: 'assets/sound/bass',
        color: 0x00ffff,
        keyCode: 32,
        controller1: controller1,
        controller2: controller2
    });

    var china = new __WEBPACK_IMPORTED_MODULE_1__actors_Drum__["a" /* default */]({ scene: scene, renderer: renderer, camera: camera }, {
        position: new __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Position */](1.75, 0, 1.25),
        sound: 'assets/sound/china',
        color: 0x00ff00,
        keyCode: 85,
        controller1: controller1,
        controller2: controller2
    });

    var crash = new __WEBPACK_IMPORTED_MODULE_1__actors_Drum__["a" /* default */]({ scene: scene, renderer: renderer, camera: camera }, {
        position: new __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Position */](-1.75, 0, 1.25), //
        sound: 'assets/sound/crash',
        color: 0x0000ff,
        keyCode: 82,
        controller1: controller1,
        controller2: controller2
    });
}

function render() {
    // var time = Date.now() * 0.001;

    // light.position.x = Math.sin(time);
    // light.position.z = Math.cos(time);

    // vr
    if (vr) {
        vrControls.update();
        controller1.update();
        controller2.update();
        effect.requestAnimationFrame(render);
        effect.render(scene, camera);
        return;
    }

    // web and mobile
    requestAnimationFrame(render);
    controls.update();
    if (mobile) {
        camera.position.set(0, 0, 0);
        camera.translateZ(5);
    }
    renderer.render(scene, camera);
}

function addEvents() {

    if (WEBVR.isAvailable() === true) {
        vrControls = new THREE.VRControls(camera);
        vrControls.standing = true;

        controller1 = new THREE.ViveController(0);
        controller1.standingMatrix = vrControls.getStandingMatrix();
        controller1.castShadow = true;
        scene.add(controller1);
        controller2 = new THREE.ViveController(1);
        controller2.standingMatrix = vrControls.getStandingMatrix();
        controller2.castShadow = true;
        scene.add(controller2);
        var loader = new THREE.OBJLoader();
        loader.setPath('assets/models/vive-controller/');
        loader.load('vr_controller_vive_1_5.obj', function (object) {

            var controller = object.children[0];
            controller.material = new THREE.MeshPhongMaterial({ color: 0xFFFFFF });
            controller1.add(object.clone());
            controller2.add(object.clone());
        });

        effect = new THREE.VREffect(renderer);
        document.body.appendChild(WEBVR.getButton(effect, toggleVR));
    }

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('deviceorientation', setOrientationControls, true);
    window.addEventListener('vrdisplaypresentchange', function (event) {
        //vr = renderer.isPresenting
    }, false);
}

function toggleVR(enabled) {
    vr = enabled;
}

function setOrientationControls(e) {
    if (!e.alpha) {
        return;
    }

    controls = new THREE.DeviceOrientationControls(camera, true);
    controls.connect();
    controls.update();

    window.removeEventListener('deviceorientation', setOrientationControls, true);

    if (renderer.domElement) {
        renderer.domElement.addEventListener('click', function () {

            if (this.requestFullscreen) {
                this.requestFullscreen();
            } else if (this.msRequestFullscreen) {
                this.msRequestFullscreen();
            } else if (this.mozRequestFullScreen) {
                this.mozRequestFullScreen();
            } else if (this.webkitRequestFullscreen) {
                this.webkitRequestFullscreen();
            }
        });

        //renderer = new THREE.StereoEffect(renderer);
        //renderer.setSize(window.innerWidth, window.innerHeight);

        mobile = true;
    }
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function getCubeMap(i) {
    var cubeMap = new THREE.Texture([]);
    cubeMap.format = THREE.RGBFormat;
    cubeMap.flipY = false;

    var envMaps = [{ file: "sunset.jpg", size: 512 }, { file: "Above_The_Sea.jpg", size: 1024 }, { file: "bluecloud.jpg", size: 1024 }, { file: "fog.jpg", size: 512 }, { file: "frozen.jpg", size: 512 }, { file: "op.jpg", size: 1024 }, { file: "shinyblue.jpg", size: 1024 }, { file: "skyboxsun25degtest.jpg", size: 1024 }, { file: "stormydays_large.jpg", size: 1024 }, { file: "violentdays_large.jpg", size: 1024 }, { file: "darkness.jpg", size: 1024 }, { file: "1.jpg", size: 1024 }, { file: "2.jpg", size: 1024 }, { file: "3.jpg", size: 1024 }];

    var loader = new THREE.ImageLoader();
    var pre = "assets/textures/";
    var file = pre + envMaps[i].file;
    var size = envMaps[i].size;
    loader.load(file, function (image) {
        var getSide = function getSide(x, y) {

            var canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;

            var context = canvas.getContext('2d');
            context.drawImage(image, -x * size, -y * size);

            return canvas;
        };

        cubeMap.image[0] = getSide(2, 1); // px
        cubeMap.image[1] = getSide(0, 1); // nx
        cubeMap.image[2] = getSide(1, 0); // py
        cubeMap.image[3] = getSide(1, 2); // ny
        cubeMap.image[4] = getSide(1, 1); // pz
        cubeMap.image[5] = getSide(3, 1); // nz
        cubeMap.needsUpdate = true;
    });

    return cubeMap;
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Position__ = __webpack_require__(4);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Position__["a"]; });



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Position = function Position(x, y, z) {
	_classCallCheck(this, Position);

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	return this;
};

/* harmony default export */ __webpack_exports__["a"] = (Position);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Actor__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Drum = function (_Actor) {
	_inherits(Drum, _Actor);

	function Drum(scene, opts) {
		_classCallCheck(this, Drum);

		var _this = _possibleConstructorReturn(this, (Drum.__proto__ || Object.getPrototypeOf(Drum)).call(this, scene, opts));

		_this.raycaster = new THREE.Raycaster();
		_this.sound();
		_this.addEvents();

		return _this;
	}

	_createClass(Drum, [{
		key: 'shape',
		value: function shape() {
			if (!this.visualizers) this.visualizers = [];
			this.container();
			this.visualizer();
		}
	}, {
		key: 'watchAudio',
		value: function watchAudio() {
			if (this.audio) {
				this.audio.update();
				this.visualize();
				requestAnimationFrame(this.watchAudio.bind(this));
			}
		}
	}, {
		key: 'visualize',
		value: function visualize() {
			for (var i = 0; i < this.visualizers.length; i++) {
				var s = 5 * this.audio.frequencies[i] / 16;
				s = s > 0 ? s : 0.0001;
				this.visualizers[i].scale.set(s, s, s);
			}
		}
	}, {
		key: 'visualizer',
		value: function visualizer() {
			for (var i = 0; i < 256; i++) {
				var geometry = new THREE.BoxGeometry(0.005, 0.005, 0.005);
				var material = new THREE.MeshBasicMaterial({ color: this.opts.color });
				var box = new THREE.Mesh(geometry, material);

				box.position.set(this.opts.position.x, this.opts.position.y + 0.1 * i, this.opts.position.z - 1);

				this.visualizers.push(box);
				this.shapes.push(box);
			}
		}
	}, {
		key: 'container',
		value: function container() {
			var geometry = new THREE.CylinderGeometry(0.4, 0.3, 1, 128);
			var material = new THREE.MeshPhongMaterial({ shading: 0xFFFFFF });
			var cylinder = new THREE.Mesh(geometry, material);

			cylinder.position.set(this.opts.position.x, this.opts.position.y, this.opts.position.z);

			this.shapes.push(cylinder);
		}
	}, {
		key: 'addEvents',
		value: function addEvents() {
			this.event = {};
			if (WEBVR.isAvailable() === true) {
				this.opts.controller1.addEventListener('triggerdown', this.onTriggerDown.bind(this));
				this.opts.controller2.addEventListener('triggerdown', this.onTriggerDown.bind(this));

				this.opts.controller1.addEventListener('triggerup', this.onTriggerUp.bind(this));
				this.opts.controller2.addEventListener('triggerup', this.onTriggerUp.bind(this));
			}
			document.addEventListener('keydown', this.onKeyDown.bind(this));
			document.addEventListener('mousedown', this.onMouseDown.bind(this));
			document.addEventListener('touchstart', this.onTouchStart.bind(this));
		}
	}, {
		key: 'sound',
		value: function sound() {
			this.audio = new AudioReactive({});
			this.watchAudio();
		}
	}, {
		key: 'onKeyDown',
		value: function onKeyDown(evt) {
			if (evt.keyCode === this.opts.keyCode) {
				try {
					this.audio.playMedia(this.opts.sound || '');
				} catch (e) {
					console.error(e);
				}
				this.setMaterial(this.shapes[0], this.opts.color);
			}
			if (evt.keyCode === 13) this.debug({ x: 1, y: 1, z: 1 });

			this.release = this.onKeyUp.bind(this);
			document.addEventListener('keyup', this.release);
		}
	}, {
		key: 'onTriggerDown',
		value: function onTriggerDown(evt) {
			console.log('trigger', evt.target.position);
			console.log('dist', this.shapes[0].position.distanceTo(evt.target.position));

			var vec = new THREE.Vector3();
			vec.setFromMatrixPosition(evt.target.matrix);

			this.interact3d(vec);
		}
	}, {
		key: 'onTriggerUp',
		value: function onTriggerUp() {
			this.stopInteract();
		}
	}, {
		key: 'onKeyUp',
		value: function onKeyUp() {
			document.removeEventListener('keyup', this.release);
			this.stopInteract();
		}
	}, {
		key: 'onMouseDown',
		value: function onMouseDown(evt) {
			evt.preventDefault();
			this.event.x = event.clientX / this.renderer.domElement.clientWidth * 2 - 1;
			this.event.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

			this.release = this.onMouseUp.bind(this);
			document.addEventListener('mouseup', this.release);

			this.interact();
		}
	}, {
		key: 'onTouchStart',
		value: function onTouchStart(evt) {
			evt.preventDefault();
			this.event.x = event.touches[0].clientX / this.renderer.domElement.clientWidth * 2 - 1;
			this.event.y = -(event.touches[0].clientY / this.renderer.domElement.clientHeight) * 2 + 1;

			this.release = this.onMouseUp.bind(this);
			document.addEventListener('touchend', this.release);

			this.interact();
		}
	}, {
		key: 'onMouseUp',
		value: function onMouseUp() {
			document.removeEventListener('mouseup', this.release);
			this.stopInteract();
		}
	}, {
		key: 'onTouchEnd',
		value: function onTouchEnd() {
			document.removeEventListener('touchend', this.release);
			this.onMouseUp();
		}
	}, {
		key: 'interact',
		value: function interact() {
			var _this2 = this;

			this.raycaster.setFromCamera(this.event, this.camera);

			var intersects = this.raycaster.intersectObjects([this.shapes[0]]);
			if (intersects.length > 0) {
				try {
					this.audio.playMedia(this.opts.sound || '');
				} catch (e) {
					console.error(e);
				}
				intersects.forEach(function (intersect) {
					return _this2.setMaterial(intersect.object, _this2.opts.color);
				});
			}
		}
	}, {
		key: 'interact3d',
		value: function interact3d(pos) {
			var dist = pos.distanceTo(this.shapes[0].position);
			console.log('dist', dist);
			if (dist < 0.6) {
				this.audio.playMedia(this.opts.sound || '');
				this.setMaterial(this.shapes[0], this.opts.color);
			}
		}
	}, {
		key: 'debug',
		value: function debug(pos) {
			return;
			var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
			var material = new THREE.MeshPhongMaterial({ shading: 0xFFFFFF });
			var debug = new THREE.Mesh(geometry, material);

			debug.position.set(pos.x, pos.y, pos.z);

			this.scene.add(debug);
		}
	}, {
		key: 'stopInteract',
		value: function stopInteract() {
			this.setMaterial(this.shapes[0], 0xffffff);
		}
	}, {
		key: 'setMaterial',
		value: function setMaterial(shape, hex) {
			shape.material.color.setHex(hex);
		}
	}]);

	return Drum;
}(__WEBPACK_IMPORTED_MODULE_0__Actor__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Drum);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Actor__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Skybox = function (_Actor) {
    _inherits(Skybox, _Actor);

    function Skybox() {
        _classCallCheck(this, Skybox);

        return _possibleConstructorReturn(this, (Skybox.__proto__ || Object.getPrototypeOf(Skybox)).apply(this, arguments));
    }

    _createClass(Skybox, [{
        key: 'shape',
        value: function shape() {
            var cubeShader = THREE.ShaderLib['cube'];
            cubeShader.uniforms['tCube'].value = this.opts.cubeMap;
            var skyBoxMaterial = new THREE.ShaderMaterial({
                fragmentShader: cubeShader.fragmentShader,
                vertexShader: cubeShader.vertexShader,
                uniforms: cubeShader.uniforms,
                depthWrite: false,
                side: THREE.BackSide
            });
            var skyBox = new THREE.Mesh(new THREE.CubeGeometry(1000, 1000, 1000), skyBoxMaterial);
            this.shapes.push(skyBox);
        }
    }]);

    return Skybox;
}(__WEBPACK_IMPORTED_MODULE_0__Actor__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (Skybox);

/***/ })
/******/ ]);