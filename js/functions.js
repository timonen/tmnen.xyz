var log = (txt, lvl) => {
		switch(lvl){
			case 'alert':
				return console.warn(txt);
				break;
			case 'err':
				return console.error(txt);
				break;
			default:
				return console.log(txt);
				break;
		}
	},
	$ = (id) => document.getElementById(id),
	evt = (id, e, f) => id.addEventListener(e, f, true),
	timestamp = () => {
		return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
	};

class Windw {
	constructor(e, w, h) {
		this.e = e;
		this.e.width = w;
		this.e.height = h;
		this.c = this.e.getContext('2d', { alpha:false });
	}
	update(w, h) {
		this.e.width = w;
		this.e.height = h;
		this.c = this.e.getContext('2d', { alpha:false });
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