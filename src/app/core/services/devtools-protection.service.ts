import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Servicio de protección contra DevTools
 * Detecta cuando se abren las herramientas de desarrollo y toma acciones
 */
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

  /**
   * Inicializa la protección contra DevTools
   */
  private initProtection(): void {
    // Detectar DevTools por diferencia de tamaño de ventana
    this.detectDevToolsByWindowSize();

    // Detectar DevTools periódicamente
    setInterval(() => {
      this.detectDevToolsByWindowSize();
    }, 1000);

    // Deshabilitar click derecho
    this.disableRightClick();

    // Deshabilitar atajos de teclado
    this.disableKeyboardShortcuts();

    // Proteger contra debugger
    this.antiDebugger();
  }

  /**
   * Detecta DevTools comparando tamaño de ventana con viewport
   */
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

  /**
   * Acción cuando se detecta DevTools abierto
   */
  private onDevToolsOpen(): void {
    // Oscurecer contenido
    document.body.style.filter = 'blur(5px)';

    // Mostrar mensaje
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

    // Remover mensaje cuando se cierran las DevTools
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

  /**
   * Deshabilita atajos de teclado comunes para DevTools
   */
  private disableKeyboardShortcuts(): void {
    document.addEventListener('keydown', (e) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+I, Cmd+Option+I
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+J, Cmd+Option+J
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+C, Cmd+Option+C
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
      }

      // Ctrl+U, Cmd+U (ver código fuente)
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
        return false;
      }

      return true;
    });
  }

  /**
   * Protección anti-debugger
   */
  private antiDebugger(): void {
    setInterval(() => {
      const startTime = performance.now();
      // eslint-disable-next-line no-debugger
      debugger;
      const endTime = performance.now();

      // Si el debugger se ejecutó, hubo una pausa significativa
      if (endTime - startTime > 100) {
        this.onDevToolsOpen();
      }
    }, 1000);
  }

  /**
   * Ofusca texto sensible en el DOM
   */
  public obfuscateSensitiveData(): void {
    // Implementar lógica para ofuscar datos sensibles en el DOM
    // Por ejemplo, encriptar valores de inputs, etc.
  }
}
