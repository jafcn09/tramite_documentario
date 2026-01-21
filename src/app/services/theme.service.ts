import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, interval } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: BehaviorSubject<Theme>;
  public theme$: Observable<Theme>;
  private isBrowser: boolean;
  private readonly THEME_KEY = 'app_theme_preference';
  private readonly AUTO_MODE_KEY = 'app_auto_mode';


  private readonly LIGHT_MODE_START = 7;
  private readonly LIGHT_MODE_END = 19;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);


    const initialTheme = this.determineInitialTheme();
    this.currentTheme = new BehaviorSubject<Theme>(initialTheme);
    this.theme$ = this.currentTheme.asObservable();

    // Aplicar tema inicial
    this.applyTheme(initialTheme);

    
    if (this.isBrowser && this.isAutoModeEnabled()) {
      interval(60000).subscribe(() => {
        this.checkAutoThemeChange();
      });
    }
  }

  private determineInitialTheme(): Theme {
    if (!this.isBrowser) {
      return 'light';
    }

   
    if (!this.isAutoModeEnabled()) {
      const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
      return savedTheme || 'light';
    }


    return this.getThemeByTime();
  }

  private getThemeByTime(): Theme {
    const currentHour = new Date().getHours();

    if (currentHour >= this.LIGHT_MODE_START && currentHour < this.LIGHT_MODE_END) {
      return 'light';
    }

    return 'dark';
  }

  private checkAutoThemeChange(): void {
    if (!this.isAutoModeEnabled()) {
      return;
    }

    const currentTheme = this.currentTheme.value;
    const expectedTheme = this.getThemeByTime();

    if (currentTheme !== expectedTheme) {
      console.log(`🌓 Cambio automático de tema: ${currentTheme} → ${expectedTheme}`);
      this.setTheme(expectedTheme);
    }
  }

  private applyTheme(theme: Theme): void {
    if (!this.isBrowser) {
      return;
    }

    const htmlElement = document.documentElement;

    if (theme === 'dark') {
      htmlElement.classList.add('dark-theme');
      htmlElement.classList.remove('light-theme');
    } else {
      htmlElement.classList.add('light-theme');
      htmlElement.classList.remove('dark-theme');
    }

    htmlElement.setAttribute('data-theme', theme);
  }


  setTheme(theme: Theme, manual: boolean = false): void {
    this.currentTheme.next(theme);
    this.applyTheme(theme);

    if (this.isBrowser) {
      localStorage.setItem(this.THEME_KEY, theme);


      if (manual) {
        this.setAutoMode(false);
      }
    }
  }

  toggleTheme(): void {
    const newTheme = this.currentTheme.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme, true); // true = cambio manual
  }

  getCurrentTheme(): Theme {
    return this.currentTheme.value;
  }


  setAutoMode(enabled: boolean): void {
    if (!this.isBrowser) {
      return;
    }

    localStorage.setItem(this.AUTO_MODE_KEY, enabled.toString());

    if (enabled) {
  
      const autoTheme = this.getThemeByTime();
      this.setTheme(autoTheme);
      console.log('🔄 Modo automático activado. Tema aplicado:', autoTheme);
    } else {
      console.log('⏸️ Modo automático desactivado. Usar preferencia manual.');
    }
  }


  isAutoModeEnabled(): boolean {
    if (!this.isBrowser) {
      return true; // Por defecto activado
    }

    const autoMode = localStorage.getItem(this.AUTO_MODE_KEY);


    if (autoMode === null) {
      return true;
    }

    return autoMode === 'true';
  }

  
  getScheduleInfo(): { lightStart: number; lightEnd: number } {
    return {
      lightStart: this.LIGHT_MODE_START,
      lightEnd: this.LIGHT_MODE_END
    };
  }
}