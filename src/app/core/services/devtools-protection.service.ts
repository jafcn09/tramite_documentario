import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DevToolsProtectionService {

  private devtoolsOpen = false;
  private threshold = 160;

  constructor() {
    if (environment.production) {
      this.initProtection();
    }
  }

  private initProtection(): void {
    this.detectDevToolsByWindowSize();

    setInterval(() => {
      this.detectDevToolsByWindowSize();
    }, 1000);

    this.disableRightClick();

    this.disableKeyboardShortcuts();

    this.antiDebugger();
  }


  private detectDevToolsByWindowSize(): void {
    const widthThreshold = window.outerWidth - window.innerWidth > this.threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > this.threshold;

    if (widthThreshold || heightThreshold) {
      if (!this.devtoolsOpen) {
        this.devtoolsOpen = true;
        this.onDevToolsOpen();
      }
    } else {
      this.devtoolsOpen = false;
    }
  }


  private onDevToolsOpen(): void {
    document.body.style.filter = 'blur(5px)';

    const message = document.createElement('div');
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 2rem;
      border-radius: 8px;
      z-index: 999999;
      text-align: center;
      font-family: Arial, sans-serif;
    `;
    message.innerHTML = `
      <h2>⚠️ Advertencia de Seguridad</h2>
      <p>Las herramientas de desarrollo están abiertas.</p>
      <p>Por razones de seguridad, algunas funcionalidades están deshabilitadas.</p>
      <p>Cierre las DevTools para continuar.</p>
    `;
    document.body.appendChild(message);

    setTimeout(() => {
      if (!this.devtoolsOpen) {
        document.body.style.filter = '';
        message.remove();
      }
    }, 2000);
  }

  /**
   * Deshabilita el click derecho
   */
  private disableRightClick(): void {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      return false;
    });
  }


  private disableKeyboardShortcuts(): void {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }

      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }

      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
      }

      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
        return false;
      }

      return true;
    });
  }


  private antiDebugger(): void {
    setInterval(() => {
      const startTime = performance.now();
      debugger;
      const endTime = performance.now();

      if (endTime - startTime > 100) {
        this.onDevToolsOpen();
      }
    }, 1000);
  }

 
  public obfuscateSensitiveData(): void {
    const sensitiveElements = document.querySelectorAll('.sensitive');
    sensitiveElements.forEach(el => {
      el.textContent = '****';
    });
    
  }
}
