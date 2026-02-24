const CACHE_NAME = 'adhkar-v8'; // التحديث الجديد

// القائمة الكاملة للملفات - تأكد من صحة الأسماء 100%
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

// مرحلة التثبيت: تحميل "كل" الملفات مسبقاً
self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('جاري تحديث ملفات التطبيق...');
      return cache.addAll(assets);
    })
  );
});

// مرحلة التفعيل: تنظيف الكاش القديم (v4 وأي إصدار قديم)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => {
      return self.clients.claim();
    })
  );
});

// تشغيل التطبيق: استراتيجية ذكية (Network First للـ HTML عشان التحديثات تظهر)
self.addEventListener('fetch', event => {
  // إذا كان الطلب لصفحة HTML، نحاول نجيبها من النت الأول عشان نشوف التحديث
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  // باقي الملفات (صور، أيقونات) نستخدم الكاش الأول للسرعة
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    }).catch(() => {
      console.log('أنت أوفلاين، وهذا الملف غير محفوظ');
    })
  );
});
