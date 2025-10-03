import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Servicio de ofuscación de HTML
 * Cifra y ofusca el contenido HTML para dificultar la inspección
 */
@Injectable({
  providedIn: 'root'
})
export class HtmlObfuscatorService {

  private obfuscationKey = 'x9K2mP7nQ4vB8wE6';
  private isObfuscated = false;

  constructor() {
    if (environment.production) {
      this.init();
    }
  }

  private init(): void {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.startObfuscation());
    } else {
      this.startObfuscation();
    }
  }

  /**
   * Inicia la ofuscación del HTML
   */
  private startObfuscation(): void {
    // 1. Remover comentarios HTML
    this.removeComments();

    // 2. Ofuscar nombres de clases
    this.obfuscateClassNames();

    // 3. Remover atributos data-*
    this.removeDataAttributes();

    // 4. Ofuscar IDs
    this.obfuscateIds();

    // 5. Remover espacios innecesarios
    this.minifyHTML();

    // 6. Proteger contra copy del HTML
    this.preventHTMLCopy();

    // 7. Detectar cuando inspeccionan elementos
    this.detectElementInspection();

    this.isObfuscated = true;
  }

  /**
   * Remueve todos los comentarios HTML
   */
  private removeComments(): void {
    const iterator = document.createNodeIterator(
      document.documentElement,
      NodeFilter.SHOW_COMMENT
    );

    const comments: Node[] = [];
    let currentNode: Node | null;

    while ((currentNode = iterator.nextNode())) {
      comments.push(currentNode);
    }

    comments.forEach(comment => comment.parentNode?.removeChild(comment));
  }

  /**
   * Ofusca nombres de clases CSS a hash
   */
  private obfuscateClassNames(): void {
    const elements = document.querySelectorAll('[class]');
    const classMap = new Map<string, string>();
    let counter = 0;

    elements.forEach((element: Element) => {
      const classList = Array.from(element.classList);
      const newClassList: string[] = [];

      classList.forEach(className => {
        // No ofuscar clases de Tailwind y Angular
        if (this.shouldPreserveClass(className)) {
          newClassList.push(className);
          return;
        }

        // Generar hash para la clase
        let obfuscatedClass = classMap.get(className);
        if (!obfuscatedClass) {
          obfuscatedClass = this.generateHash(className, counter++);
          classMap.set(className, obfuscatedClass);
        }

        newClassList.push(obfuscatedClass);
      });

      // Reemplazar clases
      element.className = newClassList.join(' ');
    });
  }

  /**
   * Verifica si una clase debe preservarse
   */
  private shouldPreserveClass(className: string): boolean {
    const preservePatterns = [
      /^ng-/, // Angular
      /^fa-/, // FontAwesome
      /^text-/, // Tailwind
      /^bg-/, // Tailwind
      /^flex/, // Tailwind
      /^grid/, // Tailwind
      /^w-/, // Tailwind
      /^h-/, // Tailwind
      /^p-/, // Tailwind
      /^m-/, // Tailwind
      /^antialiased$/, // Tailwind
    ];

    return preservePatterns.some(pattern => pattern.test(className));
  }

  /**
   * Genera un hash ofuscado para un nombre
   */
  private generateHash(input: string, counter: number): string {
    // Generar hash simple basado en el input
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }

    // Convertir a base36 y agregar contador
    return '_' + Math.abs(hash).toString(36) + counter.toString(36);
  }

  /**
   * Remueve atributos data-* que puedan exponer información
   */
  private removeDataAttributes(): void {
    const elements = document.querySelectorAll('[data-*]');

    elements.forEach((element: Element) => {
      const attributes = Array.from(element.attributes);

      attributes.forEach(attr => {
        if (attr.name.startsWith('data-') && !this.shouldPreserveAttribute(attr.name)) {
          element.removeAttribute(attr.name);
        }
      });
    });

    // También remover atributos específicos de Angular en producción
    const angularAttributes = [
      'ng-version',
      'ng-reflect-',
      '_ngcontent-',
      '_nghost-'
    ];

    document.querySelectorAll('*').forEach((element: Element) => {
      const attributes = Array.from(element.attributes);

      attributes.forEach(attr => {
        if (angularAttributes.some(prefix => attr.name.startsWith(prefix))) {
          element.removeAttribute(attr.name);
        }
      });
    });
  }

  /**
   * Verifica si un atributo debe preservarse
   */
  private shouldPreserveAttribute(attrName: string): boolean {
    const preserveAttributes = [
      'data-bs-', // Bootstrap
      'data-toggle',
      'data-target'
    ];

    return preserveAttributes.some(prefix => attrName.startsWith(prefix));
  }

  /**
   * Ofusca IDs de elementos
   */
  private obfuscateIds(): void {
    const elements = document.querySelectorAll('[id]');
    const idMap = new Map<string, string>();
    let counter = 0;

    elements.forEach((element: Element) => {
      const currentId = element.id;

      // No ofuscar IDs críticos
      if (this.shouldPreserveId(currentId)) {
        return;
      }

      // Generar nuevo ID
      let newId = idMap.get(currentId);
      if (!newId) {
        newId = 'x' + counter.toString(36);
        idMap.set(currentId, newId);
        counter++;
      }

      element.id = newId;
    });
  }

  /**
   * Verifica si un ID debe preservarse
   */
  private shouldPreserveId(id: string): boolean {
    const preserveIds = [
      'app-root',
      'security-warning-overlay'
    ];

    return preserveIds.includes(id);
  }

  /**
   * Minifica el HTML removiendo espacios
   */
  private minifyHTML(): void {
    // Remover espacios en blanco innecesarios en text nodes
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );

    const textNodes: Text[] = [];
    let node: Node | null;

    while ((node = walker.nextNode())) {
      textNodes.push(node as Text);
    }

    textNodes.forEach(textNode => {
      const text = textNode.textContent || '';
      const trimmed = text.trim();

      // Solo mantener text nodes con contenido
      if (trimmed.length === 0 && textNode.parentElement?.tagName !== 'PRE') {
        textNode.parentNode?.removeChild(textNode);
      } else if (text !== trimmed) {
        textNode.textContent = trimmed;
      }
    });
  }

  /**
   * Previene copiar el HTML
   */
  private preventHTMLCopy(): void {
    // Prevenir copiar HTML desde el inspector
    document.addEventListener('copy', (e) => {
      const selection = window.getSelection();
      const text = selection?.toString() || '';

      // Si están copiando HTML tags
      if (text.includes('<') || text.includes('>')) {
        e.preventDefault();
        e.clipboardData?.setData('text/plain', '[CONTENIDO PROTEGIDO]');
        return false;
      }

      return true;
    });
  }

  /**
   * Detecta cuando inspeccionan elementos específicos
   */
  private detectElementInspection(): void {
    // Crear un MutationObserver para detectar cambios
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Detectar si están agregando atributos desde DevTools
        if (mutation.type === 'attributes') {
          const target = mutation.target as Element;
          const attrName = mutation.attributeName || '';

          // Si agregan atributos sospechosos
          if (attrName.startsWith('data-devtools-') ||
              attrName.startsWith('__vue') ||
              attrName.startsWith('__react')) {
            target.removeAttribute(attrName);
          }
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true
    });

    // Detectar cuando seleccionan elementos con click derecho
    document.addEventListener('contextmenu', (e) => {
      const target = e.target as HTMLElement;

      // Agregar marca temporal para detectar inspección
      const timestamp = Date.now();
      target.setAttribute('data-inspect-attempt', timestamp.toString());

      // Remover después de 100ms
      setTimeout(() => {
        target.removeAttribute('data-inspect-attempt');
      }, 100);
    });
  }

  /**
   * Cifra un string usando XOR simple
   */
  private xorEncrypt(text: string, key: string): string {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(
        text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return btoa(result); // Base64 encode
  }

  /**
   * Descifra un string
   */
  private xorDecrypt(encrypted: string, key: string): string {
    const decoded = atob(encrypted); // Base64 decode
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      result += String.fromCharCode(
        decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return result;
  }
}
