
var win = new Windw($('bg'), innerWidth, innerHeight),
	ctx = win.c;

if(typeof(w) == "undefined"){
	w = new Syncs('../js/worker.js');
}

//var circles = [];
var objects = [];

w.listen((e)=>{
	if(e.data.length > 5){
		//circles = e.data; 
		//objects = e.data;
	}
})
function Circle(x,y,rad){
	this.rad = rad //(Math.random() * 100)+20;
	this.x = x //Math.random() * (innerWidth - this.rad * 2) + this.rad;
	this.y = y //Math.random() * (innerHeight - this.rad * 2) + this.rad;
	this.mass = 1;
	this.V = {
		x: Math.random() - 0.5,
		y: Math.random() - 0.5
	}
	this.update = objects => {
		for (let i = 0; i < objects.length; i++) {
			if(this === objects[i]) continue;
			if(distance(this.x, this.y, objects[i].x, objects[i].y) - (this.rad + objects[i].rad) < 0){

				resColl(this, objects[i]);

			}
		}

		if(this.x - this.rad <= 0 || this.x + this.rad >= innerWidth) {
			this.V.x = -this.V.x;
		}
		if(this.y - this.rad <= 0 || this.y + this.rad >= innerHeight){
			this.V.y = -this.V.y;
		}

		this.x += this.V.x;
		this.y += this.V.y;
	}
	this.draw = () => {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
	}
};
var	distance = (x1,y1,x2,y2) => {
		const xd = x2 - x1;
		const yd = y2 - y1;
	
		return Math.sqrt(Math.pow(xd, 2) + Math.pow(yd, 2));
	},
	randr = (min,max) => {
		return Math.floor(Math.random() * (max-min+1)+min);
	},
	rotate = (vel, a) => {
		const rV = {
			x: vel.x * Math.cos(a) - vel.y * Math.sin(a),
			y: vel.x * Math.sin(a) + vel.y * Math.cos(a)
		}

		return rV;
	},
	resColl = (obj1, obj2) => {
		const veldif = {
			x:obj1.V.x - obj2.V.x,
			y:obj1.V.y - obj2.V.y
		}
		const dist = {
			x:obj2.x - obj1.x,
			y:obj2.y - obj1.y
		}
		if(veldif.x * dist.x + veldif.y * dist.y >= 0){
			const angle = -Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
			
			const m1 = obj1.mass;
			const m2 = obj2.mass;

			const u1 = rotate(obj1.V, angle);
			const u2 = rotate(obj2.V, angle);

			const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y }
			const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y }

			const f1 = rotate(v1, -angle);
			const f2 = rotate(v2, -angle);

			obj1.V.x = f1.x;
			obj1.V.y = f1.y;

			obj2.V.x = f2.x;
			obj2.V.y = f2.y;
		}

	} 
	newCircs = () => {
		for (var i = 0; i < 15; i++) {
			let rad = (Math.random() * 100)+20;
			//let rad = 60;
			let x = randr(rad, innerWidth-rad)
			let y = randr(rad, innerHeight-rad)


			if(1 !== 0){
				for (let j = 0; j < objects.length; j++) {
					if(distance(x,y, objects[j].x, objects[j].y) - (rad + objects[j].rad) < 0){
						x = randr(rad, innerWidth-rad)
						y = randr(rad, innerHeight-rad)

						j = -1;
					}
				}
			}

			objects.push(new Circle(x,y,rad));
		}
	}

var last = timestamp(),
	step = 1/64,
	now,
	fps,
	dt = 0,
	loop = () => {
		now = timestamp();
		dt = dt + Math.min(1, (now - last) / 1000);
		fps = Math.round(1 / Math.min(1, (now - last) / 1000))

		while(dt > step){
			dt = dt - step;
			update(step);
		}

		ctx.clearRect(0, 0, innerWidth, innerHeight);
		render(dt);

		ctx.font = '9px Arial';
		ctx.fillStyle = 'lightgreen';
		ctx.fillText("FPS: " + fps, innerWidth-50, 50);

		last = now;
		requestAnimationFrame(loop);
	},
	update = (step) => {
		objects.forEach(obj => {
			obj.update(objects);
		})
	},
	render = (dt) => {
		ctx.strokeStyle = 'rgba(255,255,255,0.1)';
		ctx.fillStyle = 'rgba(0,0,0,0)';
		objects.forEach(obj => {
			obj.draw();
		})
	};

evt(window, 'resize', () => {
	win.update(innerWidth, innerHeight);
});

w.command(["get",innerWidth,innerHeight]);

newCircs();
requestAnimationFrame(loop);
