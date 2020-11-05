'use strict';
const preCacheName = "tmnenxyz-cache",
	  preCacheFiles = [
	  	"/",
	  	"/js/functions.js",
	  	"/js/main.js",
	  	"/js/draw.js",
	  	"/js/worker.js",

		"css/def.css",
		"css/main.css"	  	
	  ];


const log = msg => console.log("[SW]: ",msg)

self.addEventListener('install', event => {
	log('Installing precache files');
	caches.open(preCacheName).then(cache=>{
		return cache.addAll(preCacheFiles);
	})
})

self.addEventListener('activate', e=>{
	log('activated!');
	e.caches.keys().then(cacheNames=>{
		return Promise.all(cacheNames.map(cache=>{
			if(cache !== preCacheName){
				log('deleting old cache');
				return caches.delete(cache);
			}
		}))
	})
})


self.addEventListener('fetch', e => {
	e.respondWith(
		caches.match(e.request).then((r) => {
			log('Fetching resource: '+e.request.url);
			return r || fetch(e.request).then((response) => {
				return caches.open("tmnenxyz-cache").then((cache) => {
					log('Caching new resource: '+e.request.url);
					cache.put(e.request, response.clone());
					return response;
        		});
      		});
    	})
  	);
});
