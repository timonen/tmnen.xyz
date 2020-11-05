
if('serviceWorker' in navigator){
	navigator.serviceWorker.getRegistrations().then(registrations => {
    	console.log(registrations);
	});
	navigator.serviceWorker.register('../sw.js')
	.then(registration=>log("ServiceWorker registered"))
	.catch(err=>log("ServiceWorker registration failed!\n", err))
}

log("\n Under Development\n ", "alert");

