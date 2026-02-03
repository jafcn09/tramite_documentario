import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'app-modal-base',
    imports: [CommonModule],
    templateUrl: './modal-base.component.html',
    styleUrl: './modal-base.component.css',
    animations: [
        trigger('modalAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('200ms ease-in', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                animate('200ms ease-out', style({ opacity: 0 }))
            ])
        ]),
        trigger('contentAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'scale(0.8) translateY(-50px)' }),
                animate('250ms ease-out', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.8) translateY(-50px)' }))
            ])
        ])
    ]
})
export class ModalBaseComponent implements OnInit, OnDestroy, OnChanges {
  @Input() show = false;
  @Input() title = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() closable = true;
  @Input() showFooter = true;
  @Input() showDefaultButtons = true;
  @Input() loading = false;
  @Input() maxHeight = '';

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {
    if (this.show) {
      document.body.classList.add('modal-open');
    }
  }

  ngOnDestroy() {
    document.body.classList.remove('modal-open');
  }

  ngOnChanges() {
    if (this.show) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }

  onOverlayClick(event: Event) {
    if (event.target === event.currentTarget && this.closable) {
      this.onClose();
    }
  }

  onClose() {
    this.close.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

  onEscapeKey(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.closable && this.show) {
      this.onClose();
    }
  }
}