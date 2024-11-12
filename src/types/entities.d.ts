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

export interface NextAppointment {
  id: number;
  patient_id: number;
  session_type: string;
  date_from: string;
  state: string;
  avatar: string | null;
  name: string;
  email: string;
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

export interface ClinicalHistory {
  id: number;
  patient_id: number;
  title: string;
  content: string;
  created_at: string;
}

export interface DashboardAppointment {
  id: number;
  patient_id: number;
  psychologist_id: number;
  name: string;
  avatar: string | null;
  informed_consent: number;
  session_type: string;
  date_from: string;
}

export interface DashboardPatient {
  id: number;
  name: string;
  email: string;
  nacionalidad: string;
  genero: string;
  telefono: string;
}

export interface AppointmentCard {
  id: number;
  psychologist_id: number;
  patient_id: number;
  avatar: string | null;
  name: string | null;
  date_from: string | null;
  date_to: string | null;
}

export interface AppointmentCardWithPatient extends AppointmentCard {
  email: string | null;
  phone: string | null;
  nationality: string | null;
  session_type: string;
}

export interface AppointmentCalendarScheduler {
  id: number;
  title: string;
  start: string;
  end: string;
  people: string[];
  location: string;
}

type AvailabilitySlot = [string, string]

export interface RecurringAvailability {
  day: number;
  slots: AvailabilitySlot[];
}

export interface SpecificAvailability {
  date: string;
  slots: AvailabilitySlot[];
}

export interface AvailabilityResponse {
  recurring: RecurringAvailability[];
  specific: SpecificAvailability[];
}

export interface AvailabilityInterval {
  id: number;
  clinic_id: number;
  psychologist_id: number;
  hour_from: string;
  hour_to: string;
  is_online: number;
}

export interface DailyAvailability {
  day_name: string;
  availability_slots: AvailabilityInterval[];
}