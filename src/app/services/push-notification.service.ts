import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface PushSubscriptionData {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  private readonly VAPID_PUBLIC_KEY = environment.vapidPublicKey || '';
  private swRegistration: ServiceWorkerRegistration | null = null;

  constructor(private http: HttpClient) {}

  public initializePushNotifications(): Observable<PushSubscription | null> {
    if (!this.isPushSupported()) {
      return throwError(() => new Error('Push notifications not supported'));
    }

    return from(navigator.serviceWorker.ready).pipe(
      switchMap(registration => {
        this.swRegistration = registration;
        return from(registration.pushManager.getSubscription());
      }),
      switchMap(existingSubscription => {
        if (existingSubscription) {
          return from(Promise.resolve(existingSubscription));
        }
        return this.subscribeUserToPush();
      }),
      catchError(error => {
        console.error('Push notification initialization failed:', error);
        return throwError(() => error);
      })
    );
  }

  public subscribeToPushNotifications(): Observable<boolean> {
    return this.initializePushNotifications().pipe(
      switchMap(subscription => {
        if (!subscription) {
          return throwError(() => new Error('Subscription failed'));
        }
        return this.sendSubscriptionToBackend(subscription);
      })
    );
  }

  public unsubscribeFromPush(): Observable<boolean> {
    if (!this.swRegistration) {
      return throwError(() => new Error('Service worker not registered'));
    }

    return from(this.swRegistration.pushManager.getSubscription()).pipe(
      switchMap(subscription => {
        if (!subscription) {
          return from(Promise.resolve(true));
        }
        return from(subscription.unsubscribe()).pipe(
          switchMap(success => {
            if (success) {
              return this.removeSubscriptionFromBackend(subscription);
            }
            return from(Promise.resolve(false));
          })
        );
      })
    );
  }

  public requestPermission(): Observable<NotificationPermission> {
    if (!('Notification' in window)) {
      return throwError(() => new Error('Notifications not supported'));
    }

    return from(Notification.requestPermission());
  }

  public isPushSupported(): boolean {
    return 'serviceWorker' in navigator &&
           'PushManager' in window &&
           'Notification' in window;
  }

  public getPermissionStatus(): NotificationPermission {
    if (!('Notification' in window)) {
      return 'denied';
    }
    return Notification.permission;
  }

  private subscribeUserToPush(): Observable<PushSubscription> {
    if (!this.swRegistration) {
      return throwError(() => new Error('Service worker not registered'));
    }

    const applicationServerKey = this.urlBase64ToUint8Array(this.VAPID_PUBLIC_KEY);

    return from(
      this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey
      })
    );
  }

  private sendSubscriptionToBackend(subscription: PushSubscription): Observable<boolean> {
    const subscriptionData = this.extractSubscriptionData(subscription);

    return this.http.post<any>(
      `${environment.apiUrl}/api/notificaciones/push/subscribe`,
      subscriptionData
    ).pipe(
      switchMap(() => from(Promise.resolve(true))),
      catchError(error => {
        console.error('Failed to save subscription:', error);
        return throwError(() => error);
      })
    );
  }

  private removeSubscriptionFromBackend(subscription: PushSubscription): Observable<boolean> {
    const subscriptionData = this.extractSubscriptionData(subscription);

    return this.http.post<any>(
      `${environment.apiUrl}/api/notificaciones/push/unsubscribe`,
      subscriptionData
    ).pipe(
      switchMap(() => from(Promise.resolve(true))),
      catchError(error => {
        console.error('Failed to remove subscription:', error);
        return throwError(() => error);
      })
    );
  }

  private extractSubscriptionData(subscription: PushSubscription): PushSubscriptionData {
    const rawKey = subscription.getKey('p256dh');
    const rawAuthSecret = subscription.getKey('auth');

    return {
      endpoint: subscription.endpoint,
      keys: {
        p256dh: rawKey ? this.arrayBufferToBase64(rawKey) : '',
        auth: rawAuthSecret ? this.arrayBufferToBase64(rawAuthSecret) : ''
      }
    };
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
