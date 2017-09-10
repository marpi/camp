import Actor from './Actor';
export default class Skybox extends Actor {
    shape() {
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
}