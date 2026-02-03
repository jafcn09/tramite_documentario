self.addEventListener('push', (event) => {
  if (!event.data) {
    return;
  }

  let notificationData;
  try {
    notificationData = event.data.json();
  } catch (error) {
    notificationData = {
      title: 'Nueva Notificación',
      body: event.data.text(),
      icon: '/icons/icon-192x192.png'
    };
  }

  const title = notificationData.title || 'Sistema de Trámites';
  const options = {
    body: notificationData.body || notificationData.mensaje || '',
    icon: notificationData.icon || '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    data: {
      url: notificationData.url || notificationData.rutaDestino || '/',
      tramiteId: notificationData.tramiteId || notificationData.tramiteRelacionadoId,
      notificationId: notificationData.id
    },
    tag: notificationData.tag || `notification-${Date.now()}`,
    requireInteraction: notificationData.prioridad === 'ALTA' || notificationData.requireInteraction,
    silent: false,
    vibrate: notificationData.prioridad === 'ALTA' ? [200, 100, 200, 100, 200] : [200, 100, 200],
    actions: [
      {
        action: 'open',
        title: 'Ver',
        icon: '/icons/icon-72x72.png'
      },
      {
        action: 'close',
        title: 'Cerrar'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url.includes(urlToOpen) && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

self.addEventListener('notificationclose', (event) => {
  const notificationId = event.notification.data?.notificationId;

  if (notificationId) {
    fetch('/api/notificaciones/' + notificationId + '/marcar-leida', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch(() => {});
  }
});

self.addEventListener('pushsubscriptionchange', (event) => {
  event.waitUntil(
    self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: self.vapidPublicKey
    })
    .then((subscription) => {
      return fetch('/api/notificaciones/push/update-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          oldEndpoint: event.oldSubscription ? event.oldSubscription.endpoint : null,
          newSubscription: subscription
        })
      });
    })
  );
});
