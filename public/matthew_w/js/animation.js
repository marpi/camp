var camera, scene, renderer, effect, controls, vrControls, light;
var controller1, controller2;
var mobile = false;
var vr = false;
var audio = new AudioReactive({});
var useLights = false;
var cubeMap = 5;
var container = new THREE.Group();

function init() {

    // renderer

    audio.playMedia('assets/sound/ritual');      
    


    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // scene

    scene = new THREE.Scene();

    // camera

    camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(0, 0, 20);

    // controls

    controls = new THREE.OrbitControls(camera);
    controls.autoRotate = true;

    // events       

    addEvents();

}

let lights = [];
let NUM_LIGHTS = 3;

let envMap = getCubeMap(cubeMap);

function setup() {

    // lights

    if(useLights) {
        for (var i = 0; i<NUM_LIGHTS; i++) {
            var l = new THREE.DirectionalLight(0x333333);
            l.position.set(Math.random(), Math.random(), Math.random());
            lights.push(l);
            scene.add(l);
        }
    }


    var cubeShader = THREE.ShaderLib['cube'];
    cubeShader.uniforms['tCube'].value = getCubeMap(cubeMap);
    
    var skyBoxMaterial = new THREE.ShaderMaterial({
    fragmentShader: cubeShader.fragmentShader,
    vertexShader: cubeShader.vertexShader,
    uniforms: cubeShader.uniforms,
    depthWrite: false,
    side: THREE.BackSide
    });
    
    var skyBox = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 200),skyBoxMaterial);
    
    scene.add(skyBox);

    // objects


    // var material = new THREE.MeshBasicMaterial({shading: THREE.FlatShading, envMap: getCubeMap(10)});
    // var geo = new THREE.TorusKnotBufferGeometry( 10, 3, 100, 16 );
    // var mesh = new THREE.Mesh(geo, material);
    // scene.add(mesh);

    var material = new THREE.MeshBasicMaterial({shading: THREE.FlatShading, envMap: getCubeMap(cubeMap)});

    for(var i = 0; i<10; i++) {
    //generateBubble(0.3,new THREE.Vector3(polarNoise()*range,polarNoise()*range,polarNoise()*range));
    generateRubix(3,new THREE.Vector3(0,i*(3*0.1),0), material);
    }



    animate();

    scene.add(container);

}


function animate() {
    cube.forEach((slice, i)=>{
        TweenLite.to(slice.rotation, 1,{
            delay: 1 - .1 * i,
            y: slice.rotation.y + Math.PI * 2 / cube.length
        })
    })
    TweenLite.delayedCall(2, animate)
}

let bubbles = [];

let range = 10;

function polarNoise() {
    return 0.5 - Math.random();
}

var cube = [];


function generateRubix(scale, position, material)  {
    console.log(position.y)
    var geo = new THREE.BoxGeometry( scale, scale*0.1, scale );
    var mesh = new THREE.Mesh(geo, material);
    mesh.position.set(position.x, position.y, position.z);
    cube.push(mesh);
    container.add(mesh);
}


function render() {
    var time = Date.now() * 0.001;

    if(lights.length > 0) {
    lights.forEach((light, i)=>{
        light.position.x = Math.sin(time*i);
        light.position.z = Math.cos(time*i);
        });
    }

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

    audio.update();

    controls.update();
    if (mobile) {
        camera.position.set(0, 0, 0);
        camera.translateZ(40);
    }
    renderer.render(scene, camera);
}


init();
setup();

render();