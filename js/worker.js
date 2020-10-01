var datar = [];
self.addEventListener('message', (e)=>{

	if(e.data.length > 5){
		datar = e.data;

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