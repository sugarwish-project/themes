const CACHE_NAME = 'sugarwish-v1';
const urlsToCache = [
  './view.html',
  './manifest.json',
  './asset/logo.png'
];

// 1. Install Service Worker & Cache Aset Utama
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// 2. Aktifkan Service Worker & Hapus Cache Lama jika Ada Pembaruan
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Menghapus cache lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Tangkap Permintaan (Fetch) & Sajikan dari Cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Kembalikan dari cache jika ada, jika tidak ambil dari jaringan
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => {
          // Fallback opsional jika offline total (misal menampilkan halaman offline khusus)
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
