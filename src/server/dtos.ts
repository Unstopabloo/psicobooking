import { Appointment, AppointmentCalendarScheduler, AppointmentCard, AppointmentCardWithPatient, AppointmentForTranscriptionForm, ClinicalHistory, ContactBase, ContactInfo, DailyAvailability, DashboardAppointment, DashboardPatient, NextAppointment, Note, PatientTicket, Row, Sessions, SinglePatientTicket, TranscriptionCard, TranscriptionContent } from "@/types/entities"

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16).replace('T', ' ');
}

export const appointmentDTO = (appointments: Row[]): Appointment[] => {
  return appointments.map(app => ({
    id: app.id as number,
    appointmentId: app.appointmentId as number,
    name: app.name as string,
    email: app.email as string,
    telefono: app.telefono as string,
    nacionalidad: app.nacionalidad as string,
    genero: app.genero as string,
    edad: app.edad as number,
    tipoDeSesion: app.tipoDeSesion as string,
    consentimientoInformado: app.consentimientoInformado as "Firmado" | "Pendiente",
    appointmentDate: new Date(app.appointmentDate as string),
    appointmentState: app.appointmentState as "scheduled" | "completed" | "cancelled"
  }))
}

export const PatientTicketDTO = (patientTicket: Row): PatientTicket => {
  return {
    id: patientTicket.id as number,
    name: patientTicket.name as string,
    age: patientTicket.age as number,
    avatar: patientTicket.avatar as string,
    nationality: patientTicket.nationality as string | null,
    consentimientoInformado: patientTicket.consentimientoInformado as 1 | 0,
    numberOfTicket: patientTicket.numberOfTicket as number,
    email: patientTicket.email as string,
    phone: patientTicket.phone as string,
    sessionType: patientTicket.sessionType as "online" | "presencial",
    state: patientTicket.state as string,
    price: patientTicket.price as number | null,
    contacts: JSON.parse(patientTicket.contacts as string) as ContactBase[],
    sessions: JSON.parse(patientTicket.sessions as string) as Sessions
  }
}

export const contactDTO = (contact: Row): ContactInfo => {
  return {
    id: contact.id as number,
    user_id: contact.user_id as number,
    name: contact.name as string,
    number: contact.number as string,
    email: contact.email as string,
  }
}

export const singlePatientTicketDTO = (singlePatientTicket: Row): SinglePatientTicket => {
  return {
    id: singlePatientTicket.id as number,
    first_name: singlePatientTicket.first_name as string,
    last_name: singlePatientTicket.last_name as string,
    birth_day: singlePatientTicket.birth_day as string,
    email: singlePatientTicket.email as string,
    gender: singlePatientTicket.gender as string,
    nationality: singlePatientTicket.nationality as string,
    phone: singlePatientTicket.phone as string,
    ocupation: singlePatientTicket.ocupation as string,
    country: singlePatientTicket.country as string,
    state: singlePatientTicket.state as string,
    city: singlePatientTicket.city as string,
    street: singlePatientTicket.street as string,
    num_house: singlePatientTicket.num_house as string,
    actual_state: singlePatientTicket.actual_state as string,
    date_from: singlePatientTicket.date_from as string,
    date_to: singlePatientTicket.date_to as string,
    motive_end: singlePatientTicket.motive_end as string,
    motive_reason: singlePatientTicket.motive_reason as string,
    diagnostic_guidance: singlePatientTicket.diagnostic_guidance as string
  }
}

export const clinicalHistoryDTO = (clinicalHistory: Row[]): ClinicalHistory[] => {
  return clinicalHistory.map(history => ({
    id: history.id as number,
    patient_id: history.patient_id as number,
    title: history.title as string,
    content: history.content as string,
    created_at: history.created_at as string
  }))
}

export const singleClinicalHistoryDTO = (clinicalHistory: Row): ClinicalHistory => {
  return {
    id: clinicalHistory.id as number,
    patient_id: clinicalHistory.patient_id as number,
    title: clinicalHistory.title as string,
    content: clinicalHistory.content as string,
    created_at: clinicalHistory.created_at as string
  }
}

export const dashboardAppointmentDTO = (dashboardAppointments: Row[]): DashboardAppointment[] => {
  return dashboardAppointments.map(app => ({
    id: app.id as number,
    patient_id: app.patient_id as number,
    psychologist_id: app.psychologist_id as number,
    name: app.name as string,
    avatar: app.avatar as string | null,
    informed_consent: app.informed_consent as number,
    session_type: app.session_type as string,
    date_from: app.date_from as string
  }))
}

export const dashboardPatientDTO = (dashboardPatients: Row[]): DashboardPatient[] => {
  return dashboardPatients.map(patient => ({
    id: patient.id as number,
    name: patient.name as string,
    email: patient.email as string,
    nacionalidad: patient.nacionalidad as string,
    genero: patient.genero as string,
    telefono: patient.telefono as string
  }))
}

export const appointmentCardDTO = (appointmentCard: Row[]): AppointmentCard[] => {
  return appointmentCard.map(app => ({
    id: app.id as number,
    psychologist_id: app.psychologist_id as number,
    patient_id: app.patient_id as number,
    avatar: app.avatar as string | null,
    name: app.name as string | null,
    date_from: app.date_from as string | null,
    date_to: app.date_to as string | null
  }))
}

export const appointmentCardWithPatientDTO = (appointmentCardWithPatient: Row[]): AppointmentCardWithPatient[] => {
  return appointmentCardWithPatient.map(app => ({
    id: app.id as number,
    psychologist_id: app.psychologist_id as number,
    patient_id: app.patient_id as number,
    avatar: app.avatar as string | null,
    name: app.name as string,
    email: app.email as string,
    phone: app.phone as string,
    nationality: app.nationality as string,
    session_type: app.session_type as string,
    date_from: app.date_from as string,
    date_to: app.date_to as string
  }))
}

export const schedulerAppointmentsDTO = (schedulerAppointments: Row[]): AppointmentCalendarScheduler[] => {
  return schedulerAppointments.map(app => ({
    id: app.id as number,
    start: formatDate(app.start as string),
    end: formatDate(app.end as string),
    people: [app.name as string],
    location: app.session_type as string,
    title: `Cita con ${app.name}`
  }))
}

export const upcomingAppointmentDTO = (upcomingAppointment: Row[]): { date: string, quant: number }[] => {
  return upcomingAppointment.map(app => ({
    date: app.date as string,
    quant: app.quant as number
  }))
}

export const nextAppointmentDTO = (nextAppointment: Row): NextAppointment => {
  return {
    id: nextAppointment.id as number,
    patient_id: nextAppointment.patient_id as number,
    session_type: nextAppointment.session_type as string,
    date_from: nextAppointment.date_from as string,
    state: nextAppointment.state as string,
    avatar: nextAppointment.avatar as string | null,
    name: nextAppointment.name as string,
    email: nextAppointment.email as string
  }
}

export const availabilityDTO = (availability: Row[]): DailyAvailability[] => {
  return availability.map(ava => ({
    day_name: ava.day_name as string,
    availability_slots: ava.availability_slots
      ? JSON.parse(`[${ava.availability_slots as string}]`)
      : []
  }))
}

export const appointmentForTranscriptionFormDTO = (appointmentForTranscriptionForm: Row[]): AppointmentForTranscriptionForm[] => {
  return appointmentForTranscriptionForm.map(app => ({
    id: app.id as number,
    patient: app.patient as string,
    date_from: app.date_from as string,
    session_type: app.session_type as string
  }))
}

export const transcriptionCardDTO = (transcription: Row[]): TranscriptionCard[] => {
  return transcription.map(trans => ({
    id: trans.id as number,
    appointment_id: trans.appointment_id as number,
    title: trans.title as string,
    is_transcribed: trans.is_transcribed as string,
    patient: trans.patient as string,
    patient_avatar: trans.patient_avatar as string | null,
    session_type: trans.session_type as string,
    date_from: trans.date_from as string
  }))
}

export const transcriptionContentDTO = (transcriptionContent: Row): TranscriptionContent => {
  return {
    id: transcriptionContent.id as number,
    title: transcriptionContent.title as string,
    is_transcribed: transcriptionContent.is_transcribed as string,
    audio_url: transcriptionContent.audio_url as string,
    patient: transcriptionContent.patient as string,
    patient_avatar: transcriptionContent.patient_avatar as string | null,
    session_type: transcriptionContent.session_type as string,
    date_from: transcriptionContent.date_from as string,
    content: transcriptionContent.content as string
  }
}

export const getPatientsNamesForNoteDTO = (patients: Row[]): { id: number, name: string, avatar: string | null }[] => {
  return patients.map(patient => ({
    id: patient.id as number,
    name: patient.name as string,
    avatar: patient.avatar as string | null
  }))
}

export const getNotesDTO = (notes: Row[]): Note[] => {
  return notes.map(note => ({
    id: note.id as number,
    content: note.content as string,
    color: note.color as string,
    created_at: note.created_at as string,
    patient_name: note.patient_name as string,
    patient_id: note.patient_id as number,
    psychologist_id: note.psychologist_id as number
  }))
}