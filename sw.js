const CACHE_NAME = 'pequenosdefe-v8';
const FILES = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES)));
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  clients.claim();
});
self.addEventListener('fetch', (e) => {
  // não cacheia YouTube nem APIs externas, só o shell do app
  if(e.request.url.includes('youtube.com') || e.request.url.includes('ytimg.com')) return;
  e.respondWith(caches.match(e.request).then((cached) => cached || fetch(e.request).catch(() => cached)));
});
