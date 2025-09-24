export interface ToastMessage {
  id?: string;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
  showCloseButton?: boolean;
  actions?: ToastAction[];
  timestamp?: Date;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastAction {
  label: string;
  action: () => void;
  style?: 'primary' | 'secondary';
}

export interface ToastConfig {
  position?: ToastPosition;
  maxToasts?: number;
  defaultDuration?: number;
  closeOnClick?: boolean;
  preventDuplicates?: boolean;
}

export type ToastPosition = 
  | 'top-right' 
  | 'top-left' 
  | 'top-center' 
  | 'bottom-right' 
  | 'bottom-left' 
  | 'bottom-center';