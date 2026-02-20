const cacheName = 'houda-app-v3'; // غيرنا الرقم لـ v3 عشان يجبره يتحدث
self.addEventListener('install', (e) => {
  self.skipWaiting(); // ده بيخلي التحديث ينزل فوراً
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
