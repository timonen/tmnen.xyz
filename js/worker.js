var datar = [];
self.addEventListener('message', (e)=>{
	console.log(e.data)

	if(e.data.length > 5){
		datar = e.data;
		console.log("datar = e.data");
		console.log(datar);

		self.postMessage(datar);
	}else if(e.data=="sync"){
		if(datar.length > 5){
			datar = e.data;	
			self.postMessage(datar);
		}else{
			self.postMessage("get");
		}
	}

});