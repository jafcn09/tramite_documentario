export interface TramiteResponse {
  id: number;
  codigo: string;
  titulo: string;
  descripcion: string;
  tipo: string;
  estado: string;
  prioridad: string;
  numeroExpediente?: string;
  observaciones?: string;
  usuarioSolicitante?: {
    id: number;
    nombre: string;
    apellidos: string;
    correo: string;
    rol: string;
  };
  areaActual?: {
    id: number;
    nombre: string;
    descripcion: string;
  };
  fechaCreacion: string;
  fechaActualizacion: string;
  fechaVencimiento?: string;
  fechaCompletado?: string;
  documentosAdjuntos?: {
    nombre: string;
    url: string;
    tipo: string;
    tamanio: number;
    fechaSubida: string;
  }[];
}

export interface SearchResult {
  expediente: string;
  fecha: string;
  tipo: string;
  estado: string;
  descripcion: string;
  solicitante: string;
  area: string;
  id: number;
  codigo: string;
  titulo: string;
}

export interface ApiSearchResponse {
  content: TramiteResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}