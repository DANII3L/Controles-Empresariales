// User
export interface User {
  email: string;
  telefono?: string;
  nombres: string;
  apellidos: string;
  estado?: boolean;
  fechaCreacion?: string;
  fechaNacimiento: string;
  edad: number;
  ubicacion: string;
  numeroEmpleados: number;
}

// Estudios
export interface Estudio {
  id: number;
  usuarioId: number;
  institucion: string;
  fechaInicial: string;
  fechaFinal?: string | null;
  descripcion?: string | null;
}

// Experiencia
export interface ExperienciaLaboral {
  id?: number;
  usuarioId: number;
  empresa: string;
  cargo: string;
  fechaInicio: string;
  fechaFin?: string | null;
  descripcion?: string | null;
}
