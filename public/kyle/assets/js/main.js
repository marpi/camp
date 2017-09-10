import {Position} from './utils';
import Drum from './actors/Drum';

var camera, scene, renderer, effect, controls, vrControls, light;
var controller1, controller2;
var mobile = false;
var vr = false;

init();
setup();
render();

function init() {

    // renderer aka canvas
    renderer = new THREE.WebGLRenderer({antialias: true});
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
    light.position.set(0,1,5);
    scene.add(light);
    
    // objects
    var drum1 = new Drum({scene, renderer, camera}, {
        position: new Position(-0.5, 0, 0),
        sound: 'assets/sound/highhat',
        color: 0xffffff
    });

    var drum2 = new Drum({scene, renderer, camera}, {
        position: new Position(0.5, 0, 0),
        sound: 'assets/sound/low',
        color: 0xffffff
    });

    var drum3 = new Drum({scene, renderer, camera}, {
        position: new Position(1.25, 0, 0.75),
        sound: 'assets/sound/high',
        color: 0xffffff
    });

    var drum4 = new Drum({scene, renderer, camera}, {
        position: new Position(-1.25, 0, 0.75),
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

            var controller = object.children[ 0 ];
            controller.material = new THREE.MeshPhongMaterial({color: 0xFFFFFF})
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

    var envMaps = [
        {file: "sunset.jpg", size: 512},
        {file: "Above_The_Sea.jpg", size: 1024},
        {file: "bluecloud.jpg", size: 1024},
        {file: "fog.jpg", size: 512},
        {file: "frozen.jpg", size: 512},
        {file: "op.jpg", size: 1024},
        {file: "shinyblue.jpg", size: 1024},
        {file: "skyboxsun25degtest.jpg", size: 1024},
        {file: "stormydays_large.jpg", size: 1024},
        {file: "violentdays_large.jpg", size: 1024},
        {file: "darkness.jpg", size: 1024},
        {file: "1.jpg", size: 1024},
        {file: "2.jpg", size: 1024},
        {file: "3.jpg", size: 1024},
    ];

    var loader = new THREE.ImageLoader();
    var pre = "assets/textures/";
    var file = pre + envMaps[i].file;
    var size = envMaps[i].size;
    loader.load(file, function (image) {
        var getSide = function (x, y) {

            var canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;

            var context = canvas.getContext('2d');
            context.drawImage(image, -x * size, -y * size);

            return canvas;

        };

        cubeMap.image[ 0 ] = getSide(2, 1); // px
        cubeMap.image[ 1 ] = getSide(0, 1); // nx
        cubeMap.image[ 2 ] = getSide(1, 0); // py
        cubeMap.image[ 3 ] = getSide(1, 2); // ny
        cubeMap.image[ 4 ] = getSide(1, 1); // pz
        cubeMap.image[ 5 ] = getSide(3, 1); // nz
        cubeMap.needsUpdate = true;

    });

    return cubeMap;
}