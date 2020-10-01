
var win = new Windw($('bg'), innerWidth, innerHeight),
	ctx = win.c;
	
var circles = [];

if(typeof(w) == "undefined"){
	w = new Syncs('../js/worker.js');
}

var newCircs = () => {
	let newcs = [];
	for (var i = 0; i < 25; i++) {
		newcs[i] = new Circl();
	}
	return newcs;
}

w.listen((e)=>{
	if(e.data.length > 5){
		circles = e.data; 
	}
})

win.tick(() => {
	ctx.strokeStyle = 'rgba(255,255,255,0.1)';
	ctx.fillStyle = 'rgba(0,0,0,0.4)';
	ctx.clearRect(0, 0, innerWidth, innerHeight);
	for (var i = 0; i < circles.length; i++) {
		ctx.beginPath();
		ctx.arc(circles[i].x, circles[i].y, circles[i].rad, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();

		if(circles[i].x+circles[i].rad > innerWidth || circles[i].x -circles[i].rad < 0){
			circles[i].dx = -circles[i].dx;
		}
		if(circles[i].y+circles[i].rad > innerHeight || circles[i].y -circles[i].rad < 0){
			circles[i].dy = -circles[i].dy;
		}

		circles[i].x += circles[i].dx;
		circles[i].y += circles[i].dy;
	}
})

evt(window, 'resize', () => {
	win.update(innerWidth, innerHeight);
	win.run();
});

w.command(["get",innerWidth,innerHeight]);


//win.run();
win.loop();
