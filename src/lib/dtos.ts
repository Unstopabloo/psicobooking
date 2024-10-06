import { Appointment, Row } from "@/types/entities"

export const appointmentDTO = (appointments: Row[]): Appointment[] => {
  return appointments.map(app => ({
    id: app.id as number,
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