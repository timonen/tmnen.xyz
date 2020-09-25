var log = (txt, lvl) => {
		switch(lvl){
			case 'alert':
				console.warn('\n '+txt+'\n ');
				break;
			case 'err':
				console.error('\n '+txt+'\n ');
				break;
			default:
				console.log(txt);
				break;
		}
	},
	$ = (id) => document.getElementById(id),
	evt = (id, e, f) => id.addEventListener(e, f, true);

class Windw {
	constructor(e, w, h){
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
	update(w, h){
		this.e.width = w;
		this.e.height = h;
		this.c = this.e.getContext('2d');
	}
	tick(f){
		this.run = f;
	}
}
