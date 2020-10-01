
class Circl {
	constructor(iw,ih){
		this.rad = (Math.random() * 10)*10;
		this.x = Math.random() * (iw - this.rad * 2) + this.rad;
		this.y = Math.random() * (ih - this.rad * 2) + this.rad;
		this.dx = Math.random() - 0.5;
		this.dy = Math.random() - 0.5;
	}
}

var newCircs = (iw,ih) => {
	let newcs = [];
	for (var i = 0; i < 25; i++) {
		newcs[i] = new Circl(iw,ih);
	}
	return newcs;
}

var datar = [];
self.addEventListener('message', (e)=>{

	// Save the circles & sync their position on diffirent pages

	if(e.data[0]=="get"){
		console.log(datar.length)
		if(datar < 5){
			datar = newCircs(e.data[1],e.data[2]);
			console.log("first: "+datar.length)
			self.postMessage(datar);
		}else{
			console.log("after: "+datar.length)
			self.postMessage(datar);
		}
	}

});
