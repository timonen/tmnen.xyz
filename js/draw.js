	
var ctx = init($('bg'), innerWidth, innerHeight);

let style = 0;
ctx.moveTo(0, 0);

updateProxy = (time) => {

	ctx.clearRect(0,0,innerWidth,innerHeight);
	ctx.strokeStyle = "darkred";
	ctx.moveTo(0, 200);
	ctx.lineTo(innerWidth, 200);

	ctx.stroke();

	requestAnimationFrame(updateProxy);
}

updateProxy();
