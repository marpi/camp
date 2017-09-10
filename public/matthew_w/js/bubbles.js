var camera, scene, renderer, effect, controls, vrControls, light;
var controller1, controller2;
var mobile = false;
var vr = false;
var audio = new AudioReactive({});
var useLights = false;
var cubeMap = 9;
var container = new THREE.Group();

function addEvents() {
    
        if (WEBVR.isAvailable() === true) {
            vrControls = new THREE.VRControls(camera);
            vrControls.standing = true;
    
            controller1 = new THREE.ViveController(0);
            controller1.standingMatrix = vrControls.getStandingMatrix();
            controller1.castShadow = true;
            controller1.addEventListener('triggerdown', controller1Down, false)
            scene.add(controller1);
            controller2 = new THREE.ViveController(1);
            controller2.standingMatrix = vrControls.getStandingMatrix();
            controller2.castShadow = true;
            controller2.addEventListener('triggerdown', controller2Down, false)
            scene.add(controller2);
            var loader = new THREE.OBJLoader();
            loader.setPath('assets/models/vive-controller/');
            loader.load('vr_controller_vive_1_5.obj', function (object) {
    
                var controller = object.children[ 0 ];
               // controller.material = material//new THREE.MeshPhongMaterial({color: 0xFFFFFF})
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
    
    currentBubble = null;
    bubbleStartPos = new THREE.Vector3(0,0,0);
    bubbleEndPos = new THREE.Vector3(0,0,0);

    function bubbleStart(e) {

    } 

    function bubbleEnd(e) {

    }

    function controller1Down() {
    
        var bubbles = generateBubble(0.25);

        bubbles.forEach(mesh=>{
            mesh.matrixAutoUpdate = false;
            mesh.matrix.copy(controller1.matrix);
            mesh.matrixWorldNeedsUpdate = true;
            //mesh.scale.set(15, 15 / 10, 15)
            scene.add(mesh);
         });

    }
    
    function controller2Down() {
        var bubbles = generateBubble(0.25);
        
                bubbles.forEach(mesh=>{
                    mesh.matrixAutoUpdate = false;
                    mesh.matrix.copy(controller1.matrix);
                    mesh.matrixWorldNeedsUpdate = true;
                    //mesh.scale.set(15, 15 / 10, 15)
                    scene.add(mesh);
                 });
    }

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

    // for(var i = 0; i<5; i++) {
    //     var pos = new THREE.Vector3(polarNoise()*range,Math.random()*(range/2),polarNoise()*range);
    //     bubbleAt(0.3, pos);
    // //generateDiamonds(0.1,new THREE.Vector3(polarNoise()*range,polarNoise()*range,polarNoise()*range), material);
    // }

    scene.add(container);

}

let bubbles = [];

let range = 4;

function polarNoise() {
    return 0.5 - Math.random();
}


function bubbleAt(scale, pos) {
    var bubbles = generateBubble(0.3);
    bubbles[0].position.copy(pos);
    bubbles[1].position.copy(pos);
    container.add(bubbles[0]);
    container.add(bubbles[1]);
}

function generateBubble (scale) {

    let geo = new THREE.SphereGeometry( scale, 32, 32 );

    let outermaterial = new THREE.MeshPhysicalMaterial( {color: 0xaaaaaa, envMap:getCubeMap(cubeMap), metalness:1, roughness:0.5} );
    let innermaterial = new THREE.MeshPhysicalMaterial( {color: 0xFFFFFF, envMap:getCubeMap(Math.floor(Math.random()*10)), side:THREE.BackSide} ); // 
    
    let innerBubble = new THREE.Mesh( geo, innermaterial );
    let outerBubble = new THREE.Mesh( geo, outermaterial );

    return [innerBubble, outerBubble];

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