import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ModalConfig {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'warning' | 'error' | 'info' | 'success';
  icon?: string;
  showCancel?: boolean;
}

export interface ModalState {
  isOpen: boolean;
  config: ModalConfig | null;
  resolve: ((value: boolean) => void) | null;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalState = new BehaviorSubject<ModalState>({
    isOpen: false,
    config: null,
    resolve: null
  });

  public modalState$ = this.modalState.asObservable();

  confirm(config: ModalConfig): Promise<boolean> {
    return new Promise((resolve) => {
      this.modalState.next({
        isOpen: true,
        config: {
          confirmText: 'Aceptar',
          cancelText: 'Cancelar',
          type: 'warning',
          showCancel: true,
          ...config
        },
        resolve
      });
    });
  }

  alert(config: Omit<ModalConfig, 'showCancel'>): Promise<boolean> {
    return new Promise((resolve) => {
      this.modalState.next({
        isOpen: true,
        config: {
          confirmText: 'Aceptar',
          type: 'info',
          showCancel: false,
          ...config
        },
        resolve
      });
    });
  }

  closeModal(result: boolean = false) {
    const currentState = this.modalState.value;
    if (currentState.resolve) {
      currentState.resolve(result);
    }

    this.modalState.next({
      isOpen: false,
      config: null,
      resolve: null
    });
  }

  clearAllModals() {
    this.modalState.next({
      isOpen: false,
      config: null,
      resolve: null
    });
  }
}