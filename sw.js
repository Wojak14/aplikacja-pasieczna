const CACHE_NAME = 'kalendarz2026-cache-v1';
const urlsToCache = ['index.html','manifest.json','bee_icon_192x192.png','bee_icon_512x512.png'];

self.addEventListener('install', e=>{
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache=>{
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', e=>{
  e.respondWith(
    caches.match(e.request).then(response=>{
      return response || fetch(e.request);
    })
  );
});
