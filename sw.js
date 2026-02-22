// اسم الكاش - غير الرقم ده كل ما تغير الصورة عشان تتحدث عند الناس
const CACHE_NAME = 'houda-adhkar-v2';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// تثبيت السيرفس وركر وتخزين الملفات المهمة
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// تفعيل السيرفس وركر وحذف الكاش القديم
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// الاستجابة لطلبات الملفات (عشان يشتغل Offline)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// كود الإشعارات اللي كان عندك (دمجتهولك هنا)
self.addEventListener('push', function(event) {
    const options = {
        body: event.data ? event.data.text() : 'حان وقت ذكر الله 🌙',
        icon: 'icon.png',
        badge: 'icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '1'
        }
    };
    event.waitUntil(
        self.registration.showNotification('تطبيق حوده للأذكار', options)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('index.html')
    );
});
