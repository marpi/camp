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
    camera.position.set(0, 0, 2);

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
    
    //scene.add(skyBox);

    // objects


    // var material = new THREE.MeshBasicMaterial({shading: THREE.FlatShading, envMap: getCubeMap(10)});
    // var geo = new THREE.TorusKnotBufferGeometry( 10, 3, 100, 16 );
    // var mesh = new THREE.Mesh(geo, material);
    // scene.add(mesh);

    var material = new THREE.MeshPhysicalMaterial({
        metalness: 1, 
        roughness: 0.4, 
        shading: THREE.FlatShading, 
        envMap: getCubeMap(cubeMap)});

    for(var i = 0; i<10000; i++) {
    //generateBubble(0.3,new THREE.Vector3(polarNoise()*range,polarNoise()*range,polarNoise()*range));
    generateDiamonds(0.1,new THREE.Vector3(polarNoise()*range,polarNoise()*range,polarNoise()*range), material);
    }

    var floor = new THREE.PlaneGeometry( 100, 100, 32 );
    var floormesh = new THREE.Mesh(floor, material);
    floormesh.position.y = -range;
    floor.rotateX((-Math.PI / 180)*90);  
    container.add(floormesh);

    var geom = new THREE.Geometry();
    for (var i = 0; i < container.children.length; i++) {
        container.children[i].updateMatrix();
        geom.merge(container.children[i].geometry, container.children[i].matrix);
    }

    container = new THREE.Mesh(geom, material);

    scene.add(container);

}

let bubbles = [];

let range = 10;

function polarNoise() {
    return 0.5 - Math.random();
}


function generateDiamonds(scale, position, material)  {
    
    var geo = new THREE.IcosahedronGeometry( scale, 0 );
    var mesh = new THREE.Mesh(geo, material);
    mesh.position.set(position.x, position.y, position.z);
    container.add(mesh);
    
}

function generateBubble (scale, position) {

    let outergeometry = new THREE.SphereGeometry( scale, 32, 32 );
    let innergeometry = new THREE.SphereGeometry( scale * 0.9, 32, 32 );

    let outermaterial = new THREE.MeshBasicMaterial( {color: 0xffff00, envMap:getCubeMap(10)} );
    let innermaterial = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, envMap:getCubeMap(Math.floor(Math.random()*10)), side:THREE.BackSide} ); // 
    
    let innerBubble = new THREE.Mesh( innergeometry, innermaterial );
    let outerBubble = new THREE.Mesh( outergeometry, outermaterial );

    innerBubble.position.set(position.x, position.y, position.z);
    outerBubble.position.set(position.x, position.y, position.z);

        container.add(outerBubble);
        container.add(innerBubble);

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
        camera.translateZ(Math.sin(time)*20);
    }
   // camera.translateZ(Math.sin(time)*5);
    renderer.render(scene, camera);
}


init();
setup();

render();