
var win = new Windw($('bg'), innerWidth, innerHeight),
	ctx = win.c;
	
var circles = [];


win.tick(() => {
	ctx.strokeStyle = 'rgba(255,255,255,0.1)';
	ctx.fillStyle = 'rgba(255,255,255,0.1)';
	ctx.clearRect(0, 0, innerWidth, innerHeight);
	for (var i = 0; i < circles.length; i++) {
		circles[i].update();
		ctx.beginPath();
		ctx.arc(circles[i].x, circles[i].y, circles[i].rad, 0, 2 * Math.PI);
		//ctx.fill();
		ctx.stroke();

	}
})

evt(window, 'resize', () => {
	win.update(innerWidth, innerHeight);
	win.run();
});

for (var i = 0; i < 15; i++) {
	circles[i] = new Circl();
}

//win.run();
win.loop();
