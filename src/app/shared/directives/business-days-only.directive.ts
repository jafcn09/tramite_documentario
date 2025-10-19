import { Directive, ElementRef, HostListener, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appBusinessDaysOnly]',
  standalone: true
})
export class BusinessDaysOnlyDirective implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    // Agregar estilo CSS para deshabilitar visualmente los fines de semana
    this.addWeekendDisableStyles();
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    // Interceptar clicks en el calendario
    const input = this.el.nativeElement as HTMLInputElement;

    // Si se detecta que se está abriendo el calendario
    setTimeout(() => {
      this.disableWeekendDatesInCalendar();
    }, 100);
  }

  @HostListener('focus', ['$event'])
  onFocus(event: Event) {
    // Cuando el input recibe foco (se abre el calendario)
    setTimeout(() => {
      this.disableWeekendDatesInCalendar();
    }, 100);
  }

  private addWeekendDisableStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* Estilos para deshabilitar fines de semana en calendarios de fecha */
      input[type="date"]::-webkit-calendar-picker-indicator {
        background: transparent;
        bottom: 0;
        color: transparent;
        cursor: pointer;
        height: auto;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: auto;
      }

      /* Deshabilitar visualmente los fines de semana cuando sea posible */
      .weekend-disabled {
        background-color: #f5f5f5 !important;
        color: #ccc !important;
        cursor: not-allowed !important;
        pointer-events: none !important;
      }
    `;

    if (!document.head.querySelector('#business-days-styles')) {
      style.id = 'business-days-styles';
      document.head.appendChild(style);
    }
  }

  private disableWeekendDatesInCalendar() {
    // Intentar encontrar elementos del calendario que representen fines de semana
    // Nota: Esto es limitado porque los navegadores modernos encapsulan los widgets de fecha
    // La mejor práctica es la validación que ya implementamos en el componente

    const input = this.el.nativeElement as HTMLInputElement;

    // Agregar atributo para indicar que solo permite días hábiles
    input.setAttribute('data-business-days-only', 'true');
    input.setAttribute('title', 'Solo se permiten días hábiles (lunes a viernes)');
  }
}