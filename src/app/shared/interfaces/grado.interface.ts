export interface Grado {
  id: number;
  numeroRegistro: string;
  numeroLibro: string;
  alumno: string;
  dni: string;
  facultad: string;
  programaAcademico: string;
  numeroInscripcion: string;
  resolucion: string;
  fechaSesionResolucion: string;
  codigoDiploma: string;
  especialidad: string;
  gradoAcademico: string;
  fechaExpedicionGrado: string;
  fechaExpedicionDiploma: string;
  rector: string;
  coordinadorAcademico: string;
  secretarioGeneral: string;
  condicion: string;
}

export interface GradoResponse {
  encontrado: boolean;
  mensaje?: string;
  cantidad?: number;
  grado?: Grado;
  grados?: Grado[];
}

export interface GradoStats {
  total: number;
  facultades: string[];
  tipos: string[];
}

export interface GradoRequest {
  numeroRegistro: string;
  numeroLibro: string;
  alumno: string;
  dni: string;
  facultad: string;
  programaAcademico: string;
  numeroInscripcion: string;
  resolucion: string;
  fechaSesionResolucion: string;
  codigoDiploma: string;
  especialidad: string;
  gradoAcademico: string;
  fechaExpedicionGrado: string;
  fechaExpedicionDiploma: string;
  rector: string;
  coordinadorAcademico: string;
  secretarioGeneral: string;
  condicion: string;
}