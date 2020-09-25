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
	evt = (id, e, f) => id.addEventListener(e, f()),
	init = (id, w, h) => {
		id.width = w;
		id.height = h;
		return id.getContext('2d');
	};