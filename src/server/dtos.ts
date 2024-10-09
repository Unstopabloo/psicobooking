import { Appointment, ContactBase, ContactInfo, PatientTicket, Row, Sessions } from "@/types/entities"

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