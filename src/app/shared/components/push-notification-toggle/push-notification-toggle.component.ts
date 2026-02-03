import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushNotificationService } from '../../../services/push-notification.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-push-notification-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="push-notification-toggle" *ngIf="isPushSupported">
      <button
        class="toggle-button"
        [class.active]="isSubscribed"
        (click)="togglePushNotifications()"
        [disabled]="isProcessing"
        [title]="getTooltipText()">
        <svg
          *ngIf="!isSubscribed"
          class="icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
          </path>
          <line
            x1="4"
            y1="4"
            x2="20"
            y2="20"
            stroke-linecap="round"
            stroke-width="2">
          </line>
        </svg>
        <svg
          *ngIf="isSubscribed"
          class="icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
          </path>
        </svg>
      </button>
    </div>
  `,
  styles: [`
    .push-notification-toggle {
      display: inline-flex;
      align-items: center;
    }

    .toggle-button {
      background: transparent;
      border: none;
      padding: 0.5rem;
      cursor: pointer;
      border-radius: 0.375rem;
      transition: all 0.2s;
      color: var(--text-secondary, #6b7280);
    }

    .toggle-button:hover {
      background: var(--bg-secondary, #f9fafb);
      color: var(--text-primary, #111827);
    }

    .toggle-button.active {
      color: var(--university-primary, #2563eb);
    }

    .toggle-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .icon {
      width: 1.25rem;
      height: 1.25rem;
    }
  `]
})
export class PushNotificationToggleComponent implements OnInit {
  isPushSupported = false;
  isSubscribed = false;
  isProcessing = false;

  constructor(
    private pushService: PushNotificationService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.isPushSupported = this.pushService.isPushSupported();

    if (this.isPushSupported) {
      this.checkSubscriptionStatus();
    }
  }

  async togglePushNotifications(): Promise<void> {
    if (this.isProcessing) {
      return;
    }

    this.isProcessing = true;

    try {
      if (!this.isSubscribed) {
        await this.subscribeToPush();
      } else {
        await this.unsubscribeFromPush();
      }
    } catch (error) {
      this.handleError(error);
    } finally {
      this.isProcessing = false;
    }
  }

  getTooltipText(): string {
    if (!this.isPushSupported) {
      return 'Notificaciones push no soportadas';
    }
    return this.isSubscribed
      ? 'Desactivar notificaciones push'
      : 'Activar notificaciones push';
  }

  private async subscribeToPush(): Promise<void> {
    const permission = await this.requestPermission();

    if (permission !== 'granted') {
      this.toastService.warning(
        'Permisos denegados',
        'Debes permitir las notificaciones en tu navegador'
      );
      return;
    }

    this.pushService.subscribeToPushNotifications().subscribe({
      next: () => {
        this.isSubscribed = true;
        this.toastService.success(
          'Activado',
          'Notificaciones push activadas correctamente'
        );
      },
      error: () => {
        this.toastService.error(
          'Error',
          'No se pudo activar las notificaciones push'
        );
      }
    });
  }

  private async unsubscribeFromPush(): Promise<void> {
    this.pushService.unsubscribeFromPush().subscribe({
      next: () => {
        this.isSubscribed = false;
        this.toastService.success(
          'Desactivado',
          'Notificaciones push desactivadas'
        );
      },
      error: () => {
        this.toastService.error(
          'Error',
          'No se pudo desactivar las notificaciones push'
        );
      }
    });
  }

  private async requestPermission(): Promise<NotificationPermission> {
    return new Promise((resolve) => {
      this.pushService.requestPermission().subscribe({
        next: (permission) => resolve(permission),
        error: () => resolve('denied')
      });
    });
  }

  private checkSubscriptionStatus(): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(registration => registration.pushManager.getSubscription())
        .then(subscription => {
          this.isSubscribed = subscription !== null;
        })
        .catch(() => {
          this.isSubscribed = false;
        });
    }
  }

  private handleError(error: any): void {
    console.error('Push notification error:', error);
    this.toastService.error(
      'Error',
      'Ocurrió un error al procesar las notificaciones'
    );
  }
}
