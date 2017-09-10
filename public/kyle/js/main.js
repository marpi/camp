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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actors_Drum__ = __webpack_require__(4);



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
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(0, 3, 5);

    // controls
    controls = new THREE.OrbitControls(camera);
    controls.autoRotate = false;

    // events
    addEvents();
}

function setup() {

    // lights
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 1, 5);
    scene.add(light);

    // objects
    var drum1 = new __WEBPACK_IMPORTED_MODULE_1__actors_Drum__["a" /* default */]({ scene: scene, renderer: renderer, camera: camera }, {
        position: new __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Position */](-0.5, 0, 0),
        sound: 'assets/sound/highhat',
        color: 0xffffff
    });

    var drum2 = new __WEBPACK_IMPORTED_MODULE_1__actors_Drum__["a" /* default */]({ scene: scene, renderer: renderer, camera: camera }, {
        position: new __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Position */](0.5, 0, 0),
        sound: 'assets/sound/low',
        color: 0xffffff
    });

    var drum3 = new __WEBPACK_IMPORTED_MODULE_1__actors_Drum__["a" /* default */]({ scene: scene, renderer: renderer, camera: camera }, {
        position: new __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Position */](1.25, 0, 0.75),
        sound: 'assets/sound/high',
        color: 0xffffff
    });

    var drum4 = new __WEBPACK_IMPORTED_MODULE_1__actors_Drum__["a" /* default */]({ scene: scene, renderer: renderer, camera: camera }, {
        position: new __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* Position */](-1.25, 0, 0.75),
        sound: 'assets/sound/snare',
        color: 0xffffff
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

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Position__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__Position__["a"]; });




/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Actor__ = __webpack_require__(5);
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
			this.container();
		}
	}, {
		key: 'container',
		value: function container() {
			var geometry = new THREE.CylinderGeometry(0.4, 0.3, 1, 128);
			var material = new THREE.MeshPhongMaterial({ shading: 0xffffff });
			var cylinder = new THREE.Mesh(geometry, material);

			cylinder.position.set(this.opts.position.x, this.opts.position.y, this.opts.position.z);

			this.shapes.push(cylinder);
		}
	}, {
		key: 'addEvents',
		value: function addEvents() {
			this.event = {};
			document.addEventListener('mousedown', this.onMouseDown.bind(this));
			document.addEventListener('touchstart', this.onTouchStart.bind(this));
		}
	}, {
		key: 'sound',
		value: function sound() {
			this.audio = new AudioReactive({});
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
			this.stopInteract();
		}
	}, {
		key: 'onTouchEnd',
		value: function onTouchEnd() {
			this.onMouseUp();
		}
	}, {
		key: 'interact',
		value: function interact() {
			var _this2 = this;

			this.raycaster.setFromCamera(this.event, this.camera);

			var intersects = this.raycaster.intersectObjects(this.shapes);
			if (intersects.length > 0) {
				try {
					this.audio.playMedia(this.opts.sound || '');
				} catch (e) {}
				intersects.forEach(function (intersect) {
					return _this2.setMaterial(intersect.object, 0xffaaaa);
				});
			}
		}
	}, {
		key: 'stopInteract',
		value: function stopInteract() {
			var _this3 = this;

			this.shapes.forEach(function (shape) {
				return _this3.setMaterial(shape, 0xffffff);
			});
			document.removeEventListener('touchend', this.release);
			document.removeEventListener('mouseup', this.release);
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
/* 5 */
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

/***/ })
/******/ ]);