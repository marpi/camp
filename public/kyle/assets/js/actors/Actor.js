export default class Actor {
	constructor({scene, renderer, camera}, opts) {
		this.scene = scene;
		this.renderer = renderer;
		this.camera = camera;
		this.opts = opts || {};
		this.shapes = [];
		this.draw();
		return this;
	}

	shape() {}

	draw() {
		this.shape();
		this.shapes.forEach(shape => this.scene.add(shape));
	}
}