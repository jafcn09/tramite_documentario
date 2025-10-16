import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private readonly isProduction = environment.production;


  log(message: string, ...args: any[]): void {
    if (!this.isProduction) {
      console.log(`[INFO] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (!this.isProduction) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  error(message: string, ...args: any[]): void {
    console.error(`[ERROR] ${message}`, ...args);
  }

  debug(message: string, ...args: any[]): void {
    if (!this.isProduction) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }

  table(data: any): void {
    if (!this.isProduction) {
      console.table(data);
    }
  }

  group(label: string): void {
    if (!this.isProduction) {
      console.group(label);
    }
  }

  groupEnd(): void {
    if (!this.isProduction) {
      console.groupEnd();
    }
  }
}
