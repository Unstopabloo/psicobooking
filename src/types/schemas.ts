import { z } from "zod"

export const PatientSchema = z.object({
  first_name: z.string({ required_error: "El nombre es requerido." }).min(2, {
    message: "Minimo 2 caracteres.",
  }),
  last_name: z.string({ required_error: "El apellido es requerido." }).min(2, {
    message: "Minimo 2 caracteres.",
  }),
  email: z.string({ required_error: "El email es requerido." }).email({ message: "email invalido" }),
  phone: z.number().optional(),
  gender: z.string({ required_error: "Selecciona tu sexo." }).refine((gender) => {
    return ['male', 'female', 'other'].includes(gender.toLowerCase().trim())
  }).optional(),
  birth_day: z.date().optional(),
  ocupation: z.string().min(2, {
    message: "Minimo 2 caracteres.",
  }).optional(),
  country: z.string().min(2, {
    message: "Minimo 2 caracteres.",
  }).optional(),
  state: z.string().min(2, {
    message: "Minimo 2 caracteres.",
  }).optional(),
  city: z.string().min(2, {
    message: "Minimo 2 caracteres.",
  }).optional(),
  street: z.string().min(2, {
    message: "Minimo 2 caracteres.",
  }).optional(),
  num_house: z.string().min(2, {
    message: "Minimo 2 caracteres.",
  }).optional()
})

export const TreatmentSchema = z.object({
  patient_id: z.number().optional(),
  actual_state: z.string().optional(),
  motive_end: z.string().optional(),
  motive_reason: z.string().optional(),
  diagnostic_guidance: z.string().optional(),
  date_from: z.date().optional(),
  date_to: z.date().optional(),
  session_type: z.string().optional()
})

export const ClinicalHistorySchema = z.object({
  id: z.number().optional(),
  patient_id: z.number().optional(),
  title: z.string().optional(),
  content: z.string().optional()
})

export const ClinicSchema = z.object({
  name: z.string(),
  address: z.string(),
  day_of_week: z.string(),
  hour_from: z.string(),
  hour_to: z.string()
})
