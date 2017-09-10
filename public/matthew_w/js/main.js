var camera, scene, renderer, effect, controls, vrControls, light;
var controller1, controller2;
var mobile = false;
var vr = false;



function init() {

    // renderer

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // scene

    scene = new THREE.Scene();

    // camera

    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(0, 0, 3);

    // controls

    controls = new THREE.OrbitControls(camera);
    controls.autoRotate = true;

    // events

    addEvents();

}

function setup() {

    // lights

    light = new THREE.DirectionalLight(0xff00FF);
    light.position.set(.2, .1, .2);
    scene.add(light);

    // objects

    var material = new THREE.MeshPhongMaterial({shading: THREE.FlatShading});
    var geo = new THREE.OctahedronGeometry(1, 2);
    var mesh = new THREE.Mesh(geo, material);
    scene.add(mesh);
}

function render() {
    var time = Date.now() * 0.001;

    light.position.x = Math.sin(time);
    light.position.z = Math.cos(time);
    light.color = new THREE.Color(Math.sin(time), Math.sin(time*2), Math.cos(time*6));
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
        camera.translateZ(3);
    }
    renderer.render(scene, camera);
}


init();
setup();

render();