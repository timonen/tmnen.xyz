var log = (x) => console.log(x),
	$ = (id) => document.getElementById(id),
	evt = (id, e, f) => id.addEventListener(e, f()),
	init = (id, w, h) => {
		id.width = w;
		id.height = h;
		return id.getContext('2d');
	};