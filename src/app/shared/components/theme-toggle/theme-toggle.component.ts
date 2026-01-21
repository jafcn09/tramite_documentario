import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Theme } from '../../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="theme-toggle-container">
      <button
        (click)="toggleTheme()"
        class="theme-toggle-btn"
        [attr.aria-label]="currentTheme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'"
        title="{{ currentTheme === 'light' ? 'Modo Oscuro' : 'Modo Claro' }}">

        <svg *ngIf="currentTheme === 'light'"
             class="theme-icon sun-icon"
             fill="none"
             stroke="currentColor"
             viewBox="0 0 24 24">
          <path stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>

 
        <svg *ngIf="currentTheme === 'dark'"
             class="theme-icon moon-icon"
             fill="none"
             stroke="currentColor"
             viewBox="0 0 24 24">
          <path stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
      </button>

  
      <div *ngIf="isAutoMode" class="auto-mode-indicator" title="Modo automático activo (7am-7pm claro, 7pm-7am oscuro)">
        <svg class="auto-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span class="auto-text">Auto</span>
      </div>
    </div>
  `,
  styles: [`
    .theme-toggle-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .theme-toggle-btn {
      position: relative;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 0.75rem;
      border: none;
      background-color: var(--bg-tertiary);
      color: var(--text-primary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      box-shadow: var(--shadow-sm);
    }

    .theme-toggle-btn:hover {
      background-color: var(--bg-hover);
      transform: scale(1.05);
      box-shadow: var(--shadow-md);
    }

    .theme-toggle-btn:active {
      transform: scale(0.95);
    }

    .theme-icon {
      width: 1.25rem;
      height: 1.25rem;
      transition: all 0.3s ease;
    }

    .sun-icon {
      color: #f59e0b;
      animation: rotate-sun 20s linear infinite;
    }

    .moon-icon {
      color: #60a5fa;
      animation: fade-in 0.3s ease;
    }

    @keyframes rotate-sun {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    @keyframes fade-in {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }

    .auto-mode-indicator {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.5rem;
      border-radius: 0.5rem;
      background-color: var(--university-primary-light);
      color: var(--university-primary);
      font-size: 0.75rem;
      font-weight: 500;
    }

    .auto-icon {
      width: 0.875rem;
      height: 0.875rem;
    }

    .auto-text {
      white-space: nowrap;
    }

    /* Responsive */
    @media (max-width: 640px) {
      .theme-toggle-btn {
        width: 2.25rem;
        height: 2.25rem;
      }

      .theme-icon {
        width: 1.125rem;
        height: 1.125rem;
      }

      .auto-mode-indicator {
        padding: 0.125rem 0.375rem;
        font-size: 0.625rem;
      }

      .auto-icon {
        width: 0.75rem;
        height: 0.75rem;
      }
    }
  `]
})
export class ThemeToggleComponent implements OnInit {
  currentTheme: Theme = 'light';
  isAutoMode = true;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {

    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });


    this.isAutoMode = this.themeService.isAutoModeEnabled();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();


    this.isAutoMode = this.themeService.isAutoModeEnabled();
  }

  enableAutoMode(): void {
    this.themeService.setAutoMode(true);
    this.isAutoMode = true;
  }
}