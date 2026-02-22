const CACHE_NAME = 'adhkar-v3'; // غيرنا النسخة لـ v3 عشان المتصفح يعرف إن فيه شغل جديد

// القائمة الكاملة للملفات
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon.png',
  './quran.html',
  './morning.html',
  './evening.html',
  './general-adhkar.html',
  './tasks.html',
  './tasbih.html',
  './quran-duas.html',
  './prophet-duas.html',
  './istighfar.html',
  './ramadan.html',
  './istikhara.html',
  './worry.html'
];

// مرحلة التثبيت
self.addEventListener('install', event => {
  // أمر سحري: بيخلي التحديث ينزل فوراً ويقطع على النسخة القديمة
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('تم تحديث المخزن للنسخة v3');
      return cache.addAll(assets);
    })
  );
});

// مرحلة التفعيل (مسح الكاش القديم)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => {
      // بيجبر كل الصفحات المفتوحة تشتغل بالتحديث الجديد فوراً
      return self.clients.claim();
    })
  );
});

// تشغيل التطبيق بدون نت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request);
    })
  );
});
