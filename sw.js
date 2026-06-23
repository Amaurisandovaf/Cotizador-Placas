const CACHE_NAME = 'cotizador-v1';
const ASSETS = [
'./',
'./index.html',
'./manifest.json'
];

// Instalar el Service Worker y guardar archivos en caché
self.addEventListener('install', (e) => {
e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
    return cache.addAll(ASSETS);
    })
);
});

// Hacer que funcione Offline interceptando las peticiones
self.addEventListener('fetch', (e) => {
e.respondWith(
    caches.match(e.request).then((response) => {
    return response || fetch(e.request);
    })
);
});