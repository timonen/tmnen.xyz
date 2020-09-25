	
var win = new Windw($('bg'), innerWidth, innerHeight),
	ctx = win.c;
	

win.tick(()=>{
	ctx.moveTo(0, 0);
	ctx.clearRect(0,0,innerWidth,innerHeight);
	ctx.strokeStyle = "darkred";
	ctx.moveTo(0, 200);
	ctx.lineTo(innerWidth, 200);
	ctx.stroke();
})

evt(window, 'resize', ()=>{
	win.update(innerWidth, innerHeight);
	log('resized')
});

win.run();
//win.loop();
