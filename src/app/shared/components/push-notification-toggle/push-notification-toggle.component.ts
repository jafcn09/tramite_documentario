import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushNotificationService } from '../../../services/push-notification.service';
import { ToastService } from '../../../services/toast.service';
import { ThemeService } from '../../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-push-notification-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="push-container" *ngIf="isPushSupported">
      <div class="push-card" [class.subscribed]="isSubscribed">
        <div class="card-header">
          <div class="icon-wrapper" [class.active]="isSubscribed">
            <svg class="bell-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9">
              </path>
            </svg>
            <div class="pulse" *ngIf="isSubscribed"></div>
          </div>
          <div class="header-content">
            <h3 class="title">Notificaciones Push</h3>
            <p class="subtitle">
              {{ isSubscribed ? 'Activas' : 'Inactivas' }}
            </p>
          </div>
        </div>

        <p class="description">
          {{ isSubscribed
            ? 'Recibirás notificaciones incluso con la app cerrada'
            : 'Activa para recibir notificaciones en tiempo real' }}
        </p>

        <button
          class="toggle-btn"
          [class.subscribed]="isSubscribed"
          [disabled]="isProcessing"
          (click)="togglePushNotifications()">
          <span class="btn-text" *ngIf="!isProcessing">
            {{ isSubscribed ? 'Desactivar' : 'Activar' }}
          </span>
          <span class="spinner" *ngIf="isProcessing"></span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .push-container {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
      padding: 1rem;
    }

    .push-card {
      background: var(--bg-primary, #ffffff);
      border: 1px solid var(--border-color, #e5e7eb);
      border-radius: 1rem;
      padding: 1.5rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    }

    :host-context(.dark-theme) .push-card {
      background: #1f2937;
      border-color: #374151;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
    }

    .push-card.subscribed {
      border-color: #3b82f6;
      background: linear-gradient(135deg, var(--bg-primary, #ffffff) 0%, rgba(59, 130, 246, 0.05) 100%);
    }

    :host-context(.dark-theme) .push-card.subscribed {
      background: linear-gradient(135deg, #1f2937 0%, rgba(59, 130, 246, 0.1) 100%);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .icon-wrapper {
      position: relative;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-secondary, #f3f4f6);
      transition: all 0.3s ease;
    }

    :host-context(.dark-theme) .icon-wrapper {
      background: #374151;
    }

    .icon-wrapper.active {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      animation: pulse-ring 2s infinite;
    }

    .bell-icon {
      width: 1.5rem;
      height: 1.5rem;
      color: var(--text-secondary, #6b7280);
      transition: all 0.3s ease;
    }

    .icon-wrapper.active .bell-icon {
      color: white;
      animation: bell-ring 1s ease-in-out infinite;
    }

    .pulse {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: rgba(59, 130, 246, 0.3);
      animation: pulse-wave 2s infinite;
    }

    @keyframes pulse-wave {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }

    @keyframes pulse-ring {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
      }
      50% {
        box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
      }
    }

    @keyframes bell-ring {
      0%, 100% {
        transform: rotate(0deg);
      }
      10%, 30% {
        transform: rotate(-10deg);
      }
      20%, 40% {
        transform: rotate(10deg);
      }
      50% {
        transform: rotate(0deg);
      }
    }

    .header-content {
      flex: 1;
    }

    .title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--text-primary, #111827);
      margin: 0 0 0.25rem 0;
    }

    :host-context(.dark-theme) .title {
      color: #f9fafb;
    }

    .subtitle {
      font-size: 0.875rem;
      color: var(--text-secondary, #6b7280);
      margin: 0;
    }

    :host-context(.dark-theme) .subtitle {
      color: #9ca3af;
    }

    .description {
      font-size: 0.875rem;
      color: var(--text-secondary, #6b7280);
      line-height: 1.5;
      margin: 0 0 1.5rem 0;
    }

    :host-context(.dark-theme) .description {
      color: #9ca3af;
    }

    .toggle-btn {
      width: 100%;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 0.9375rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      background: var(--bg-secondary, #f3f4f6);
      color: var(--text-primary, #111827);
      position: relative;
      overflow: hidden;
    }

    :host-context(.dark-theme) .toggle-btn {
      background: #374151;
      color: #f9fafb;
    }

    .toggle-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    :host-context(.dark-theme) .toggle-btn:hover:not(:disabled) {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    }

    .toggle-btn.subscribed {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: white;
    }

    .toggle-btn:not(.subscribed) {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: white;
    }

    .toggle-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .btn-text {
      display: block;
    }

    .spinner {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.6s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @media (max-width: 640px) {
      .push-container {
        padding: 0.75rem;
      }

      .push-card {
        padding: 1rem;
      }

      .icon-wrapper {
        width: 2.5rem;
        height: 2.5rem;
      }

      .bell-icon {
        width: 1.25rem;
        height: 1.25rem;
      }

      .title {
        font-size: 1rem;
      }

      .description {
        font-size: 0.8125rem;
      }

      .toggle-btn {
        padding: 0.625rem 1.25rem;
        font-size: 0.875rem;
      }
    }
  `]
})
export class PushNotificationToggleComponent implements OnInit, OnDestroy {
  isPushSupported = false;
  isSubscribed = false;
  isProcessing = false;
  private themeSubscription?: Subscription;

  constructor(
    private pushService: PushNotificationService,
    private toastService: ToastService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.isPushSupported = this.pushService.isPushSupported();

    if (this.isPushSupported) {
      this.checkSubscriptionStatus();
    }

    this.themeSubscription = this.themeService.theme$.subscribe();
  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
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
