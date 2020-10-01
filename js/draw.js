
var win = new Windw($('bg'), innerWidth, innerHeight),
	ctx = win.c;
	
win.tick(() => {
	// do some background stuff on website
	// maby some nice animation or something
})

evt(window, 'resize', () => {
	win.update(innerWidth, innerHeight);
	win.run();
});

win.run();
//win.loop();
