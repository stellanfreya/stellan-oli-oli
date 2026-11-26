const CACHE_NAME = 'stellan-oli-oli-shell-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './app-icon.svg',
  './app-icon-192.png',
  './app-icon-512.png',
  './site-polish.css?v=14',
  './site-polish.js?v=2',
  './config.js',
  './chat-community.js?v=inline-images-2',
  './account.js?v=avatar-metadata-fix',
  './tour-countdown.js?v=1',
  './era-quiz.js?v=1',
  './chat-signin-gate.js?v=2',
  './holiday-countdowns.js?v=2',
  './reels-feed.js?v=8',
  './scroll-video.js?v=3',
  './pwa.js?v=1'
];
const APP_URLS = APP_SHELL.map(path => new URL(path, self.registration.scope).href);
const INDEX_URL = new URL('./index.html', self.registration.scope).href;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (request.headers.has('range') || /\.(mp4|webm|mov)$/i.test(url.pathname)) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            return caches.open(CACHE_NAME)
              .then(cache => cache.put(INDEX_URL, response.clone()))
              .then(() => response);
          }
          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(INDEX_URL);
          if (cachedPage) return cachedPage;
          return Response.error();
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request)
      .then(cached => cached || fetch(request).then(response => {
        if (response.ok) {
          return caches.open(CACHE_NAME)
            .then(cache => cache.put(request, response.clone()))
            .then(() => response);
        }
        return response;
      }))
  );
});
