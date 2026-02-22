const CACHE_NAME = 'adhkar-v2'; // غيرنا الاسم لـ v2 عشان المتصفح يحس بالتغيير ويخزن من جديد

// هنا بنضيف كل الملفات اللي عاوزينها تشتغل "Offline"
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

// تثبيت التطبيق وتخزين الملفات
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('جاري حفظ صفحات الأذكار للعمل بدون نت...');
      return cache.addAll(assets);
    })
  );
});

// تفعيل السيرفس وركر وتنظيف الكاش القديم
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

// تشغيل التطبيق وجلب الملفات من المخزن (Cache) عند انقطاع النت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(res => {
      return res || fetch(event.request);
    })
  );
});
