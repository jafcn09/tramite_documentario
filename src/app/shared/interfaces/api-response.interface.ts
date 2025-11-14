export interface ApiResponse<T> {
  success: boolean;
  mensaje: string;
  data?: T;
  cantidad?: number;
  pagina?: number;
  totalPaginas?: number;
  totalElementos?: number;
  timestamp?: string;
  codigo?: string;
}
