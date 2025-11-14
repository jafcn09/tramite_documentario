import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MisTramitesService } from '../../../../services/mis-tramites.service';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-rechazar-tramite-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rechazar-tramite-modal.component.html',
  styleUrl: './rechazar-tramite-modal.component.css'
})
export class RechazarTramiteModalComponent implements OnInit {
  @Input() show = false;
  @Input() tramite: any = null; // Acepta TramiteBandeja o MiTramite
  @Output() close = new EventEmitter<void>();
  @Output() rechazado = new EventEmitter<any>();

  motivo = '';
  observaciones = '';
  cargando = false;

  constructor(
    private misTramitesService: MisTramitesService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  confirmar(): void {
    if (!this.tramite || !this.motivo.trim()) {
      this.toastService.warning('Motivo requerido', 'Debe proporcionar un motivo para el rechazo');
      return;
    }

    this.cargando = true;

    this.misTramitesService.rechazarTramite(
      this.tramite.id,
      this.motivo.trim(),
      this.observaciones.trim() || undefined
    ).subscribe({
      next: () => {
        this.cargando = false;
        this.toastService.success(
          'Trámite rechazado',
          `El trámite ${this.tramite?.codigo} ha sido rechazado correctamente`
        );
        this.rechazado.emit({ codigo: this.tramite?.codigo });
        this.cerrar();
      },
      error: () => {
        this.cargando = false;
        this.toastService.error('Error al rechazar', 'No se pudo rechazar el trámite. Intente nuevamente.');
      }
    });
  }

  cerrar(): void {
    this.motivo = '';
    this.observaciones = '';
    this.cargando = false;
    this.close.emit();
  }
}
