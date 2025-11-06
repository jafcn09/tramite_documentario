export interface AreaJerarquica {
  id: number;
  nombre: string;
  descripcion?: string;
  codigoOrganigrama?: string;
  nivelJerarquico: number;
  rutaJerarquica?: string;
  areaPadreId?: number;
  areaPadreNombre?: string;
  activa: boolean;
  totalUsuarios: number;
  subAreas: AreaJerarquica[];
  expanded?: boolean;
}