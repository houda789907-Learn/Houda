const cacheName = 'houda-app-v2'; // غيرنا الرقم من v1 لـ v2
const assets = [
  './',
  './index.html',
  './morning_azkar.html',
  './evening_azkar.html',
  './icon.png',
  './manifest.json'
];

// تثبيت الخدمة وتخزين الملفات
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('بيخزن الملفات عشان يشتغل من غير نت...');
      cache.addAll(assets);
    })
  );
});

// تشغيل التطبيق من المخزن في حالة عدم وجود نت
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(rec => {
      return rec || fetch(evt.request);
    })
  );
});
