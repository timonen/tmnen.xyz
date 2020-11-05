'use strict';

let g = document.getElementById('gallery');

fetch('../api/images.json')
.then(response=>response.json())
.then(images=>{
	let frag = "";
	for (var i = 0; i < images.length; i++) {
		let tmplt = `
			<div class="images">
				<img src="../i/${images[i]}"/>
			</a>
			</div>
		`;
		frag += tmplt;
	}
	g.innerHTML = frag;
})

