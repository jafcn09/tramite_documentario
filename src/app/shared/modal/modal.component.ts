import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ModalService, ModalState } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  modalState: ModalState = {
    isOpen: false,
    config: null,
    resolve: null
  };

  private subscription?: Subscription;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.subscription = this.modalService.modalState$.subscribe(
      state => this.modalState = state
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onOverlayClick() {
    this.onCancel();
  }

  onConfirm() {
    this.modalService.closeModal(true);
  }

  onCancel() {
    this.modalService.closeModal(false);
  }

  getHeaderClass(): string {
    return this.modalState.config?.type || 'info';
  }

  getIcon(): string {
    const icons = {
      warning: 'fas fa-exclamation-triangle',
      error: 'fas fa-times-circle',
      info: 'fas fa-info-circle',
      success: 'fas fa-check-circle'
    };
    return icons[this.modalState.config?.type || 'info'];
  }

  getConfirmButtonClass(): string {
    const classes = {
      warning: 'btn-warning',
      error: 'btn-danger',
      info: 'btn-primary',
      success: 'btn-success'
    };
    return classes[this.modalState.config?.type || 'info'];
  }
}
