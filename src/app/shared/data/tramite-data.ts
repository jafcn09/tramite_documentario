import { TipoTramite, EstadoTramite, PrioridadTramite, AccionTramite } from '../interfaces/tramite.interface';

export const TIPOS_TRAMITE: TipoTramite[] = [
  {
    id: 1,
    nombre: 'Resolución Rectoral',
    descripcion: 'Resoluciones emitidas por la Rectoría',
    requiereAprobacion: true,
    tiempoEstimado: 15,
    activo: true
  },
  {
    id: 2,
    nombre: 'Resolución Decanal',
    descripcion: 'Resoluciones emitidas por las Decanaturas',
    requiereAprobacion: true,
    tiempoEstimado: 10,
    activo: true
  },
  {
    id: 3,
    nombre: 'Certificación de Documentos',
    descripcion: 'Certificación de documentos académicos y administrativos',
    requiereAprobacion: false,
    tiempoEstimado: 5,
    activo: true
  },
  {
    id: 4,
    nombre: 'Autorización de Eventos',
    descripcion: 'Autorización para eventos académicos y culturales',
    requiereAprobacion: true,
    tiempoEstimado: 7,
    activo: true
  },
  {
    id: 5,
    nombre: 'Permisos de Infraestructura',
    descripcion: 'Permisos para uso de instalaciones y laboratorios',
    requiereAprobacion: true,
    tiempoEstimado: 12,
    activo: true
  },
  {
    id: 6,
    nombre: 'Convenios Interinstitucionales',
    descripcion: 'Tramitación de convenios con otras instituciones',
    requiereAprobacion: true,
    tiempoEstimado: 30,
    activo: true
  }
];

export const ESTADOS_TRAMITE: EstadoTramite[] = [
  {
    id: 1,
    nombre: 'Borrador',
    descripcion: 'Trámite en proceso de creación',
    color: '#6c757d',
    icono: 'fas fa-edit',
    esFinal: false,
    permiteEdicion: true
  },
  {
    id: 2,
    nombre: 'Enviado',
    descripcion: 'Trámite enviado para revisión',
    color: '#17a2b8',
    icono: 'fas fa-paper-plane',
    esFinal: false,
    permiteEdicion: false
  },
  {
    id: 3,
    nombre: 'En Revisión',
    descripcion: 'Trámite siendo revisado por el responsable',
    color: '#ffc107',
    icono: 'fas fa-eye',
    esFinal: false,
    permiteEdicion: false
  },
  {
    id: 4,
    nombre: 'Derivado',
    descripcion: 'Trámite derivado a otra área',
    color: '#fd7e14',
    icono: 'fas fa-share',
    esFinal: false,
    permiteEdicion: false
  },
  {
    id: 5,
    nombre: 'Observado',
    descripcion: 'Trámite con observaciones que requiere corrección',
    color: '#dc3545',
    icono: 'fas fa-exclamation-triangle',
    esFinal: false,
    permiteEdicion: true
  },
  {
    id: 6,
    nombre: 'Aprobado',
    descripcion: 'Trámite aprobado',
    color: '#28a745',
    icono: 'fas fa-check-circle',
    esFinal: false,
    permiteEdicion: false
  },
  {
    id: 7,
    nombre: 'Rechazado',
    descripcion: 'Trámite rechazado',
    color: '#dc3545',
    icono: 'fas fa-times-circle',
    esFinal: true,
    permiteEdicion: false
  },
  {
    id: 8,
    nombre: 'Finalizado',
    descripcion: 'Trámite completado exitosamente',
    color: '#20c997',
    icono: 'fas fa-flag-checkered',
    esFinal: true,
    permiteEdicion: false
  },
  {
    id: 9,
    nombre: 'Archivado',
    descripcion: 'Trámite archivado',
    color: '#6f42c1',
    icono: 'fas fa-archive',
    esFinal: true,
    permiteEdicion: false
  }
];

export const PRIORIDADES_TRAMITE: PrioridadTramite[] = [
  {
    id: 2,
    nombre: 'Normal',
    nivel: 2,
    color: '#17a2b8',
    icono: 'fas fa-minus'
  },
  {
    id: 3,
    nombre: 'Alta',
    nivel: 3,
    color: '#ffc107',
    icono: 'fas fa-arrow-up'
  },
  {
    id: 4,
    nombre: 'Urgente',
    nivel: 4,
    color: '#dc3545',
    icono: 'fas fa-exclamation'
  }
];

export const ACCIONES_TRAMITE: AccionTramite[] = [
  {
    id: 1,
    nombre: 'Crear',
    descripcion: 'Trámite creado',
    icono: 'fas fa-plus-circle',
    color: '#28a745'
  },
  {
    id: 2,
    nombre: 'Enviar',
    descripcion: 'Trámite enviado',
    icono: 'fas fa-paper-plane',
    color: '#17a2b8'
  },
  {
    id: 3,
    nombre: 'Revisar',
    descripcion: 'Trámite revisado',
    icono: 'fas fa-eye',
    color: '#ffc107'
  },
  {
    id: 4,
    nombre: 'Derivar',
    descripcion: 'Trámite derivado',
    icono: 'fas fa-share',
    color: '#fd7e14'
  },
  {
    id: 5,
    nombre: 'Observar',
    descripcion: 'Trámite observado',
    icono: 'fas fa-exclamation-triangle',
    color: '#dc3545'
  },
  {
    id: 6,
    nombre: 'Aprobar',
    descripcion: 'Trámite aprobado',
    icono: 'fas fa-check-circle',
    color: '#28a745'
  },
  {
    id: 7,
    nombre: 'Rechazar',
    descripcion: 'Trámite rechazado',
    icono: 'fas fa-times-circle',
    color: '#dc3545'
  },
  {
    id: 8,
    nombre: 'Finalizar',
    descripcion: 'Trámite finalizado',
    icono: 'fas fa-flag-checkered',
    color: '#20c997'
  },
  {
    id: 9,
    nombre: 'Archivar',
    descripcion: 'Trámite archivado',
    icono: 'fas fa-archive',
    color: '#6f42c1'
  }
];

export const TIPOS_DOCUMENTO_PERMITIDOS = [
  { extension: '.pdf', tipo: 'application/pdf', descripcion: 'Documento PDF' },
  { extension: '.docx', tipo: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', descripcion: 'Documento Word' },
  { extension: '.doc', tipo: 'application/msword', descripcion: 'Documento Word (Legacy)' }
];

export const TAMAÑO_MAXIMO_ARCHIVO = 10 * 1024 * 1024; // 10MB