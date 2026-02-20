const cacheName = 'houda-v1';
const assets = [
  './',
  './index.html',
  './morning_azkar.html',
  './evening_azkar.html'
];

// تثبيت التطبيق وتخزين الملفات للعمل بدون إنترنت
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(assets);
    })
  );
});

// استقبال الإشعارات في الخلفية
self.addEventListener('push', evt => {
  const data = evt.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: 'https://cdn-icons-png.flaticon.com/512/2319/2319323.png'
  });
});
