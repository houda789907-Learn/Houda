const CACHE_NAME = 'adhkar-v4'; // تحديث الإصدار لضمان مسح القديم

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

// مرحلة التثبيت: تحميل "كل" الملفات مسبقاً (Pre-caching)
self.addEventListener('install', event => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('جاري تحميل كافة الأقسام للعمل أوفلاين...');
      // addAll هنا بتضمن إن كل الملفات تنزل وتتخزن فوراً
      return cache.addAll(assets);
    })
  );
});

// مرحلة التفعيل: تنظيف الكاش القديم وتشغيل التحديث فوراً
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => {
      return self.clients.claim();
    })
  );
});

// تشغيل التطبيق: البحث في المخزن أولاً، ثم النت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => {
      // إذا وجد الملف في المخزن (Cache) يفتحه فوراً بدون نت
      if (res) return res;

      // إذا لم يجده (مثل صور خارجية أو محتوى جديد) يحاول جلبه من النت وتخزينه
      return fetch(event.request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          // تخزين النسخة الجديدة للمرة القادمة
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {
        // إذا كان الشخص أوفلاين والملف مش موجود أصلاً في القائمة
        console.log('هذا الملف غير متوفر أوفلاين حالياً');
      });
    })
  );
});
