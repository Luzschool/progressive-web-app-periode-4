const CACHE_NAME = 'gezondheid-v2';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(STATIC_ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    const url = new URL(event.request.url);
    if (url.origin !== self.location.origin && !url.hostname.includes('fonts.googleapis')) return;
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                fetch(event.request).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        caches.open(CACHE_NAME).then((cache) => { cache.put(event.request, networkResponse.clone()); });
                    }
                }).catch(() => {});
                return cachedResponse;
            }
            return fetch(event.request).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200) return networkResponse;
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => { cache.put(event.request, responseToCache); });
                return networkResponse;
            }).catch(() => {
                if (event.request.mode === 'navigate') return caches.match('/index.html');
                return new Response('Offline - geen verbinding', { status: 503, statusText: 'Service Unavailable', headers: { 'Content-Type': 'text/plain' } });
            });
        })
    );
});
