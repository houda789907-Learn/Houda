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

// لما المستخدم يدوس على الإشعار يفتح له التطبيق
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('index.html')
    );
});
