self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
		'index.html',
		'spinning-circles.svg'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(cachedResponse) {
	  if(cachedResponse != undefined){
		return cachedResponse.clone();
	  }
	  return fetch(event.request);
    }).catch(function() {
	  return new Response('', {'status': '500', 'statusText': 'The non-cached request could not be executed'});
    })
  );
});
