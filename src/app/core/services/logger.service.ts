import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Servicio de logging seguro para producción
 * Reemplaza console.log() con un logger que se desactiva en producción
 */
@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private readonly isProduction = environment.production;

  /**
   * Log de información general
   */
  log(message: string, ...args: any[]): void {
    if (!this.isProduction) {
      console.log(`[INFO] ${message}`, ...args);
    }
  }

  /**
   * Log de advertencia
   */
  warn(message: string, ...args: any[]): void {
    if (!this.isProduction) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  /**
   * Log de error (siempre se muestra, incluso en producción)
   */
  error(message: string, ...args: any[]): void {
    console.error(`[ERROR] ${message}`, ...args);
  }

  /**
   * Log de debug (solo desarrollo)
   */
  debug(message: string, ...args: any[]): void {
    if (!this.isProduction) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  /**
   * Log de información en tabla
   */
  table(data: any): void {
    if (!this.isProduction) {
      console.table(data);
    }
  }

  /**
   * Agrupa logs relacionados
   */
  group(label: string): void {
    if (!this.isProduction) {
      console.group(label);
    }
  }

  /**
   * Cierra grupo de logs
   */
  groupEnd(): void {
    if (!this.isProduction) {
      console.groupEnd();
    }
  }
}
