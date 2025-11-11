import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


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
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.startObfuscation());
    } else {
      this.startObfuscation();
    }
  }


  private startObfuscation(): void {
    this.removeComments();

   
    this.obfuscateClassNames();


    this.removeDataAttributes();


    this.obfuscateIds();
    this.minifyHTML();

 
    this.preventHTMLCopy();

    this.detectElementInspection();

    this.isObfuscated = true;
  }


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


  private obfuscateClassNames(): void {
    const elements = document.querySelectorAll('[class]');
    const classMap = new Map<string, string>();
    let counter = 0;

    elements.forEach((element: Element) => {
      const classList = Array.from(element.classList);
      const newClassList: string[] = [];

      classList.forEach(className => {
        if (this.shouldPreserveClass(className)) {
          newClassList.push(className);
          return;
        }

    
        let obfuscatedClass = classMap.get(className);
        if (!obfuscatedClass) {
          obfuscatedClass = this.generateHash(className, counter++);
          classMap.set(className, obfuscatedClass);
        }

        newClassList.push(obfuscatedClass);
      });

      element.className = newClassList.join(' ');
    });
  }


  private shouldPreserveClass(className: string): boolean {
    const preservePatterns = [
      /^ng-/,
      /^fa-/,
      /^text-/,
      /^bg-/,
      /^flex/, 
      /^grid/, 
      /^w-/, 
      /^h-/, 
      /^p-/, 
      /^m-/, 
      /^antialiased$/,
    ];

    return preservePatterns.some(pattern => pattern.test(className));
  }


  private generateHash(input: string, counter: number): string {

    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }

    return '_' + Math.abs(hash).toString(36) + counter.toString(36);
  }


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

  private shouldPreserveAttribute(attrName: string): boolean {
    const preserveAttributes = [
      'data-bs-', // Bootstrap
      'data-toggle',
      'data-target'
    ];

    return preserveAttributes.some(prefix => attrName.startsWith(prefix));
  }

  private obfuscateIds(): void {
    const elements = document.querySelectorAll('[id]');
    const idMap = new Map<string, string>();
    let counter = 0;

    elements.forEach((element: Element) => {
      const currentId = element.id;

      if (this.shouldPreserveId(currentId)) {
        return;
      }

      let newId = idMap.get(currentId);
      if (!newId) {
        newId = 'x' + counter.toString(36);
        idMap.set(currentId, newId);
        counter++;
      }

      element.id = newId;
    });
  }

  
  private shouldPreserveId(id: string): boolean {
    const preserveIds = [
      'app-root',
      'security-warning-overlay'
    ];

    return preserveIds.includes(id);
  }


  private minifyHTML(): void {

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

      if (trimmed.length === 0 && textNode.parentElement?.tagName !== 'PRE') {
        textNode.parentNode?.removeChild(textNode);
      } else if (text !== trimmed) {
        textNode.textContent = trimmed;
      }
    });
  }

  private preventHTMLCopy(): void {
    document.addEventListener('copy', (e) => {
      const selection = window.getSelection();
      const text = selection?.toString() || '';

      if (text.includes('<') || text.includes('>')) {
        e.preventDefault();
        e.clipboardData?.setData('text/plain', '[CONTENIDO PROTEGIDO]');
        return false;
      }

      return true;
    });
  }

  
  private detectElementInspection(): void {

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
  
        if (mutation.type === 'attributes') {
          const target = mutation.target as Element;
          const attrName = mutation.attributeName || '';

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


    document.addEventListener('contextmenu', (e) => {
      const target = e.target as HTMLElement;


      const timestamp = Date.now();
      target.setAttribute('data-inspect-attempt', timestamp.toString());
      setTimeout(() => {
        target.removeAttribute('data-inspect-attempt');
      }, 100);
    });
  }

  private xorEncrypt(text: string, key: string): string {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(
        text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return btoa(result); 
  }

 
  private xorDecrypt(encrypted: string, key: string): string {
    const decoded = atob(encrypted); 
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      result += String.fromCharCode(
        decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return result;
  }
}
