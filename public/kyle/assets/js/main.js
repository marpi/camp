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