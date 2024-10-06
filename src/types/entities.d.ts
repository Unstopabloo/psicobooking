import { Roles } from "./global";

type Gender = "male" | "female" | "other";
type Row = Record<string, unknown>

export interface UserBase {
  clerk_id: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
  role: Roles;
}

export interface User extends UserBase {
  id: number;
  specialty?: string;
  phone?: number;
  nationality?: string;
  gender?: Gender;
  birthDay?: number;
  occupation?: string;
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  numHouse?: string;
  createdAt?: number;
}

export interface Appointment {
  id: number;
  name: string;
  email: string;
  telefono: string;
  nacionalidad: string;
  genero: string;
  edad: number;
  tipoDeSesion: string;
  consentimientoInformado: "Firmado" | "Pendiente";
  appointmentDate: Date;
  appointmentState: "scheduled" | "completed" | "cancelled";
}