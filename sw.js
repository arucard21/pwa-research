// this can be used to cache content that would be used in index.html
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/',
		'/index.html',
		'/favicon.ico'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        caches.open('v1').then(function(cache) {
		  cache.put(event.request, response.clone());
		});
		return response;
		});
    }).catch(function() {
	  return new Response('This is the fallback page');
    })
  );
});
