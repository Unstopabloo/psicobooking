import { Appointment, ContactBase, ContactInfo, PatientTicket, Row, Sessions, SinglePatientTicket } from "@/types/entities"

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