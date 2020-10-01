var log = (txt, lvl) => {
		switch(lvl){
			case 'alert':
				console.warn(txt);
				break;
			case 'err':
				console.error(txt);
				break;
			default:
				console.log(txt);
				break;
		}
	},
	$ = (id) => document.getElementById(id),
	evt = (id, e, f) => id.addEventListener(e, f, true);

class Windw {
	constructor(e, w, h) {
		this.e = e;
		this.e.width = w;
		this.e.height = h;
		this.c = this.e.getContext('2d');
		this.run = null;
		this.loop = () => {
			this.run()
			requestAnimationFrame(this.loop);
		};
	}
	update(w, h) {
		this.e.width = w;
		this.e.height = h;
		this.c = this.e.getContext('2d');
	}
	tick(f) {
		this.run = f;
	}
}
class Syncs {
	constructor(f){
		this.op = new Worker(f);
	}

	listen(f){
		this.op.addEventListener('message', f);
	}

	command(x){
		this.op.postMessage(x);
	}
}
class Circl {
	constructor(){
		this.rad = (Math.random() * 10)*10;
		this.x = Math.random() * (innerWidth - this.rad * 2) + this.rad;
		this.y = Math.random() * (innerHeight - this.rad * 2) + this.rad;
		this.dx = Math.random() - 0.5;
		this.dy = Math.random() - 0.5;
	}
}