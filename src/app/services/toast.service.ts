import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { ToastMessage, ToastType, ToastConfig } from '../shared/interfaces/toast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts = new BehaviorSubject<ToastMessage[]>([]);
  public toasts$ = this.toasts.asObservable();

  private defaultConfig: ToastConfig = {
    position: 'top-right',
    maxToasts: 5,
    defaultDuration: 5000,
    closeOnClick: true,
    preventDuplicates: true
  };

  private config: ToastConfig = { ...this.defaultConfig };

  constructor() {}

  configure(config: Partial<ToastConfig>) {
    this.config = { ...this.config, ...config };
  }

  show(toast: Omit<ToastMessage, 'id' | 'timestamp'>): void {
    const newToast: ToastMessage = {
      ...toast,
      id: this.generateId(),
      timestamp: new Date(),
      duration: toast.duration ?? this.config.defaultDuration,
      showCloseButton: toast.showCloseButton ?? true
    };

    // Prevenir duplicados si está habilitado
    if (this.config.preventDuplicates && this.isDuplicate(newToast)) {
      return;
    }

    const currentToasts = this.toasts.value;
    let updatedToasts = [...currentToasts, newToast];

    // Limitar número máximo de toasts
    if (this.config.maxToasts && updatedToasts.length > this.config.maxToasts) {
      updatedToasts = updatedToasts.slice(-this.config.maxToasts);
    }

    this.toasts.next(updatedToasts);

    // Auto-remove toast después del duration
    if (newToast.duration && newToast.duration > 0) {
      timer(newToast.duration).subscribe(() => {
        this.remove(newToast.id!);
      });
    }
  }

  success(title: string, message: string, duration?: number): void {
    this.show({
      type: 'success',
      title,
      message,
      duration
    });
  }

  error(title: string, message: string, duration?: number): void {
    this.show({
      type: 'error',
      title,
      message,
      duration: duration ?? 8000 // Errores duran más tiempo
    });
  }

  warning(title: string, message: string, duration?: number): void {
    this.show({
      type: 'warning',
      title,
      message,
      duration
    });
  }

  info(title: string, message: string, duration?: number): void {
    this.show({
      type: 'info',
      title,
      message,
      duration
    });
  }

  remove(id: string): void {
    const currentToasts = this.toasts.value;
    const updatedToasts = currentToasts.filter(toast => toast.id !== id);
    this.toasts.next(updatedToasts);
  }

  clear(): void {
    this.toasts.next([]);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private isDuplicate(newToast: ToastMessage): boolean {
    const currentToasts = this.toasts.value;
    return currentToasts.some(toast => 
      toast.title === newToast.title && 
      toast.message === newToast.message &&
      toast.type === newToast.type
    );
  }
}