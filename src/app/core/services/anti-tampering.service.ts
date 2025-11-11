import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AntiTamperingService {

  private checkInterval: any;
  private originalConsole: any;

  constructor() {
    if (environment.production) {
      this.init();
    }
  }

  private init(): void {
    this.disableConsole();

    this.aggressiveAntiDebug();

    this.detectDOMTampering();

    this.obfuscateRuntime();

    this.preventCodeCopy();

    this.detectDevToolsAdvanced();
  }


  private disableConsole(): void {
  
    this.originalConsole = {
      log: console.log,
      warn: console.warn,
      error: console.error,
      info: console.info,
      debug: console.debug,
      trace: console.trace
    };


    const noop = () => {};
    console.log = noop;
    console.warn = noop;
    console.info = noop;
    console.debug = noop;
    console.trace = noop;
    console.table = noop;
    console.group = noop;
    console.groupEnd = noop;
    console.groupCollapsed = noop;
    console.clear = noop;


    console.error = (...args: any[]) => {
      this.originalConsole.error('[SECURITY]', ...args);
    };

    Object.freeze(console);
  }

  

  private aggressiveAntiDebug(): void {

    setInterval(() => {
      const startTime = performance.now();
      const endTime = performance.now();


      if (endTime - startTime > 100) {
        this.onTamperingDetected('Debugger detectado');
      }
    }, 1000);


    const element = new Image();
    Object.defineProperty(element, 'id', {
      get: () => {
        this.onTamperingDetected('Console abierta');
        return '';
      }
    });

    this.checkInterval = setInterval(() => {
      const threshold = 100;
      const start = performance.now();
      const end = performance.now();

      if (end - start > threshold) {
        this.onTamperingDetected('Performance anormal detectada');
      }
    }, 2000);
  }

 
  private detectDOMTampering(): void {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node: any) => {
          if (node.nodeName === 'SCRIPT') {
            if (!node.src?.includes(window.location.origin)) {
              this.onTamperingDetected('Script externo inyectado');
              node.remove();
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });
  }

 
  private obfuscateRuntime(): void {
 
    const originalLocation = window.location.toString;
    Object.defineProperty(window, 'location', {
      get: () => {
      
        return new Proxy(originalLocation, {
          get: (target, prop) => {
            if (prop === 'toString') {
              return () => '[object Location]';
            }
            return (target as any)[prop];
          }
        });
      }
    });

    Object.freeze(Object.prototype);
    Object.freeze(Array.prototype);
    Object.freeze(Function.prototype);
  }

 

  private preventCodeCopy(): void {
  
    document.addEventListener('selectstart', (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'SCRIPT' || target.tagName === 'STYLE') {
        e.preventDefault();
        return false;
      }
      return true;
    });

    document.addEventListener('copy', (e) => {
      const selection = window.getSelection()?.toString();
      if (selection && selection.length > 500) {
        e.preventDefault();
        this.onTamperingDetected('Intento de copiar código detectado');
        return false;
      }
      return true;
    });
  }

  
  private detectDevToolsAdvanced(): void {

    const checkDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;
      const orientation = widthThreshold ? 'vertical' : heightThreshold ? 'horizontal' : false;

      if (orientation) {
        this.onDevToolsDetected(orientation);
      }
    };

    setInterval(checkDevTools, 500);


    let devtools = { open: false, orientation: null as any };
    const threshold = 160;

    const emitEvent = () => {
      window.dispatchEvent(new CustomEvent('devtoolschange', {
        detail: devtools
      }));
    };

    setInterval(() => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      const orientation = widthThreshold ? 'vertical' : heightThreshold ? 'horizontal' : null;

      if (orientation && !devtools.open) {
        devtools = { open: true, orientation };
        emitEvent();
        this.onDevToolsDetected(orientation);
      } else if (!orientation && devtools.open) {
        devtools = { open: false, orientation: null };
        emitEvent();
      }
    }, 500);
  }



  private onDevToolsDetected(orientation: string): void {
    document.body.style.filter = 'blur(10px) grayscale(100%)';
    document.body.style.userSelect = 'none';
    document.body.style.pointerEvents = 'none';


    const overlay = document.createElement('div');
    overlay.id = 'security-warning-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.95);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Arial, sans-serif;
    `;

    overlay.innerHTML = `
      <div style="background: white; padding: 3rem; border-radius: 12px; max-width: 500px; text-align: center;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">⚠️</div>
        <h2 style="color: #dc2626; margin-bottom: 1rem;">Advertencia de Seguridad</h2>
        <p style="color: #374151; margin-bottom: 1.5rem;">
          Se han detectado herramientas de desarrollo abiertas.<br>
          Por motivos de seguridad, el acceso ha sido restringido.
        </p>
        <p style="color: #6b7280; font-size: 0.875rem;">
          Si esto es un error, cierre las herramientas de desarrollo<br>
          y recargue la página.
        </p>
        <div style="margin-top: 2rem;">
          <button onclick="window.location.reload()" style="
            background: #2563eb;
            color: white;
            padding: 0.75rem 2rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1rem;
          ">
            Recargar Página
          </button>
        </div>
      </div>
    `;

    if (!document.getElementById('security-warning-overlay')) {
      document.body.appendChild(overlay);
    }


    setTimeout(() => {
      const widthOk = window.outerWidth - window.innerWidth <= 160;
      const heightOk = window.outerHeight - window.innerHeight <= 160;

      if (widthOk && heightOk) {
        document.body.style.filter = '';
        document.body.style.userSelect = '';
        document.body.style.pointerEvents = '';
        overlay?.remove();
      }
    }, 3000);
  }

  
  private onTamperingDetected(reason: string): void {

    this.originalConsole?.error?.('[SECURITY]', reason);


  }


  ngOnDestroy(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }
}
