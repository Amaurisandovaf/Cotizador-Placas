// Cada vez que hagas un cambio en tu app, cambia este número (v1, v2, v3, v4...)
// Esto le avisa al celular que hay código nuevo y borra la caché vieja automáticamente.
const CACHE_NAME = 'cotizador-v3'; 

// Los archivos locales de tu proyecto que la app necesita para funcionar sin internet
const ASSETS = [
'./',
'./index.html',
'./manifest.json',
  // Si tienes íconos o estilos en archivos separados, agrégalos aquí, por ejemplo:
  // './icon.png'
];

// Evento de instalación: Guarda los archivos indispensables en la memoria del celular
self.addEventListener('install', (e) => {
e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
    console.log('Guardando archivos en caché...');
    return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting()) // Fuerza a esta nueva versión a activarse de inmediato
);
});

// Evento de activación: Limpia los archivos de versiones viejas (ej. v1 o v2) para no saturar el cel
self.addEventListener('activate', (e) => {
e.waitUntil(
    caches.keys().then((keys) => {
    return Promise.all(
        keys.map((key) => {
        if (key !== CACHE_NAME) {
            console.log('Borrando caché antigua:', key);
            return caches.delete(key);
        }
        })
    );
    }).then(() => self.clients.claim()) // Toma el control de la app al instante
);
});

// Evento fetch: Intercepta las peticiones. Si hay internet, busca el archivo original;
// si no hay internet o es la librería html2canvas, la sirve desde la caché para que funcione offline.
self.addEventListener('fetch', (e) => {
e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
    if (cachedResponse) {
        return cachedResponse;
    }
    
      // Si no está en la lista fija (como la librería de html2canvas que viene de internet),
      // la descarga la primera vez y la guarda en caché para las siguientes veces que esté offline.
    return fetch(e.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          // Si es un recurso externo como el CDN de html2canvas, lo clonamos y guardamos igual
        if(e.request.url.includes('cdnjs.cloudflare.com')) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseClone);
            });
        }
        return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
        cache.put(e.request, responseToCache);
        });

        return networkResponse;
    }).catch(() => {
        // Fallback por si está completamente offline y el recurso no se precacheó
    });
    })
);
});