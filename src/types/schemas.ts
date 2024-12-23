import { z } from "zod"

export const PatientSchema = z.object({
  first_name: z.string({ required_error: "El nombre es requerido." }).min(2, {
    message: "Minimo 2 caracteres.",
  }),
  last_name: z.string({ required_error: "El apellido es requerido." }).min(2, {
    message: "Minimo 2 caracteres.",
  }),
  email: z.string({ required_error: "El email es requerido." }).email({ message: "email invalido" }),
  phone: z.string({ invalid_type_error: "Reintenta." })
    .regex(/^\d{9}$/, { message: "El teléfono debe tener exactamente 9 dígitos" })
    .optional(),
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

export const transcriptionFormSchema = z.object({
  transcription_title: z.string({
    required_error: "El título es requerido",
  }).min(2, {
    message: "El título debe tener al menos 2 caracteres",
  }).max(50, {
    message: "El título debe tener menos de 50 caracteres",
  }),
  appointment_id: z.string().optional(),
  audio_file: z.instanceof(File).optional(),
  is_transcribed: z.boolean(),
})

export const CommentActivitySchema = z.object({
  activity_id: z.number(),
  content: z.string()
})

export const EditProfileSchema = z.object({
  first_name: z.string().min(2).max(50).optional(),
  last_name: z.string().min(2).max(50).optional(),
  email: z.string().email({ message: "email invalido" }).optional(),
  phone: z.string({ invalid_type_error: "Reintenta." })
    .regex(/^\d{9}$/, { message: "El teléfono debe tener exactamente 9 dígitos" })
    .optional(),
  gender: z.string().optional(),
  birth_day: z.date().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
  num_house: z.string().optional(),
  focus: z.string().optional(),
  specialities: z.array(z.object({
    label: z.string(),
    value: z.string()
  })).optional(),
  price: z.string({ invalid_type_error: "El precio debe ser un número." })
    .regex(/^\d+$/, { message: "El precio solo debe contener números" })
    .max(3, { message: "El precio debe tener maximo 3 dígitos" })
    .optional(),
})
