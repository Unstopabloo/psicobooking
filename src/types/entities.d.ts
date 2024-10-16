import { Roles } from "./global";

type Gender = "male" | "female" | "other";
type Row = Record<string, unknown>

interface Sessions {
  completed: number;
  scheduled: number;
  cancelled: number;
}

export interface ContactBase {
  id: number;
  name: string;
}

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
}

export interface PatientTicket {
  id: number;
  name: string;
  age: number;
  avatar: string | null;
  nationality: string | null;
  consentimientoInformado: 1 | 0;
  numberOfTicket: number;
  email: string;
  phone: string;
  sessionType: "online" | "presencial";
  state: string;
  price: number?;
  contacts: ContactBase[];
  sessions: Sessions;
}

export interface ContactInfo extends ContactBase {
  user_id: number;
  number: string;
  email: string;
}

export interface SinglePatientTicket {
  // from user
  id: number;
  first_name: string;
  last_name: string;
  birth_day: string | null;
  email: string;
  gender: string | null;
  nationality: string | null;
  phone: string | null;
  ocupation: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  street: string | null;
  num_house: string | null;
  // from treatment_sheet
  actual_state: string | null;
  date_from: string | null;
  date_to: string | null;
  motive_end: string | null;
  motive_reason: string | null;
  diagnostic_guidance: string | null;
}