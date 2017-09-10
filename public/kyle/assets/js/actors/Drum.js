import Actor from './Actor';
export default class Drum extends Actor {

	constructor(scene, opts) {
		super(scene, opts);
		this.raycaster = new THREE.Raycaster();
		this.sound();
		this.addEvents();
	}

	shape() {
		this.container();
	}

	container() {
		var geometry = new THREE.CylinderGeometry( 0.4, 0.3, 1, 128);
		var material = new THREE.MeshPhongMaterial({ shading: 0xffffff });
		var cylinder = new THREE.Mesh( geometry, material );

		cylinder.position.set(
			this.opts.position.x,
			this.opts.position.y,
			this.opts.position.z
		);

	    this.shapes.push(cylinder);
	}

	addEvents() {
		this.event = {};
		document.addEventListener('mousedown', this.onMouseDown.bind(this));
		document.addEventListener('touchstart', this.onTouchStart.bind(this));
	}

	sound() {
		this.audio = new AudioReactive({});
	}

	onMouseDown(evt) {
		evt.preventDefault();
		this.event.x = ( event.clientX / this.renderer.domElement.clientWidth ) * 2 - 1;
		this.event.y = -( event.clientY / this.renderer.domElement.clientHeight ) * 2 + 1;

		this.release = this.onMouseUp.bind(this);
		document.addEventListener('mouseup', this.release);

		this.interact();
	}
	onTouchStart(evt) {
		evt.preventDefault();
		this.event.x = ( event.touches[0].clientX / this.renderer.domElement.clientWidth ) * 2 - 1;
		this.event.y = -( event.touches[0].clientY / this.renderer.domElement.clientHeight ) * 2 + 1;

		this.release = this.onMouseUp.bind(this);
		document.addEventListener('touchend', this.release);

		this.interact();
	}

	onMouseUp() {
		this.stopInteract();
	}
	onTouchEnd() {
		this.onMouseUp();
	}

	interact() {
		this.raycaster.setFromCamera(this.event, this.camera);

		let intersects = this.raycaster.intersectObjects(this.shapes);
		if (intersects.length > 0) {
			try {
				this.audio.playMedia(this.opts.sound || '');
			}
			catch(e) {}
			intersects.forEach(intersect => this.setMaterial(intersect.object, 0xffaaaa));
		}
	}

	stopInteract() {
		this.shapes.forEach(shape => this.setMaterial(shape, 0xffffff));
		document.removeEventListener('touchend', this.release);
		document.removeEventListener('mouseup', this.release);
	}

	setMaterial(shape, hex) {
		shape.material.color.setHex( hex );
	}


}