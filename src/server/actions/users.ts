"use server"

import { auth } from "@clerk/nextjs/server";
import { turso } from "@/server/db";
import { AppointmentCard, ClinicalHistory, ContactInfo, PatientTicket } from "@/types/entities";
import { appointmentCardDTO, clinicalHistoryDTO, contactDTO, PatientTicketDTO, singleClinicalHistoryDTO } from "../dtos";
import { authAction } from "@/lib/safe-action";
import { ClinicalHistorySchema, PatientSchema, TreatmentSchema } from "@/types/schemas";
import { revalidatePath } from "next/cache";

export const updatePatient = authAction
  .schema(PatientSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { rows, rowsAffected } = await turso.execute({
        sql: `UPDATE psicobooking_user SET first_name = :first_name, last_name = :last_name, email = :email, phone = :phone, gender = :gender, birth_day = :birth_day, occupation = :occupation, country = :country, state = :state, city = :city, street = :street, num_house = :num_house WHERE email = :email RETURNING *`,
        args: {
          first_name: parsedInput.first_name,
          last_name: parsedInput.last_name,
          email: parsedInput.email,
          phone: parsedInput.phone ?? null,
          gender: parsedInput.gender ?? null,
          birth_day: parsedInput.birth_day ? new Date(parsedInput.birth_day).toISOString() : null,
          occupation: parsedInput.ocupation ?? null,
          country: parsedInput.country ?? null,
          state: parsedInput.state ?? null,
          city: parsedInput.city ?? null,
          street: parsedInput.street ?? null,
          num_house: parsedInput.num_house ?? null,
        }
      })

      if (rowsAffected === 0) {
        console.log('No se encontró el usuario')
        return { data: undefined, error: 'No se encontró el usuario' }
      }

      // Asegúrate de que el objeto devuelto sea un objeto plano
      const plainUser = JSON.parse(JSON.stringify(rows[0]))
      return { data: plainUser }
    } catch (error) {
      console.error(error)
      return { data: undefined, error: error instanceof Error ? error : new Error('Ha ocurrido un error inesperado') }
    }
  })


export const createClinicalHistory = authAction
  .schema(ClinicalHistorySchema)
  .action(async ({ parsedInput }) => {
    try {
      const { id, patient_id, title, content } = parsedInput
      const contentString = JSON.stringify(content)

      if (!patient_id || !title || !contentString) {
        return { data: undefined, error: new Error('No hay suficiente informacion para crear la historia clinica') }
      }

      // si existe, actualiza
      if (id) {
        console.log('actualiza')
        const { rowsAffected, lastInsertRowid } = await turso.execute({
          sql: `UPDATE psicobooking_clinic_history SET patient_id = :patient_id, title = :title, content = :content WHERE id = :id`,
          args: {
            id: id!,
            patient_id: patient_id!,
            title: title!,
            content: contentString,
          }
        });

        if (rowsAffected > 0) {
          console.log('se actualizo la ficha', lastInsertRowid)
          return { data: lastInsertRowid }
        }

        return { data: undefined, error: new Error('No se pudo actualizar la historia clinica') }
      }

      console.log('no existe, crea')
      // si no existe, crea
      const { lastInsertRowid: newClinicHistory } = await turso.execute({
        sql: `INSERT INTO psicobooking_clinic_history (patient_id, title, content, created_at) VALUES (:patient_id, :title, :content, :created_at)`,
        args: {
          patient_id: patient_id!,
          title: title!,
          content: contentString,
          created_at: new Date().toISOString()
        }
      });

      if (!newClinicHistory) {
        console.log('No se pudo crear la historia clinica')
        return { data: undefined, error: new Error('No se pudo crear la historia clinica') }
      }

      console.log('Se creo la ficha', newClinicHistory)
      return { data: newClinicHistory }
    } catch (error) {
      console.error(error)
      return { data: undefined, error: error instanceof Error ? error : new Error('Ha ocurrido un error inesperado') }
    }
  })

export const updateTreatmentSheet = authAction
  .schema(TreatmentSchema)
  .action(async ({ parsedInput }) => {
    try {
      const { rowsAffected, lastInsertRowid } = await turso.execute({
        sql: `UPDATE psicobooking_treatment_sheet
              SET actual_state = :actual_state,
                  motive_end = :motive_end,
                  motive_reason = :motive_reason,
                  diagnostic_guidance = :diagnostic_guidance,
                  date_from = :date_from,
                  date_to = :date_to
              WHERE patient_id = :patient_id RETURNING id`,
        args: {
          patient_id: parsedInput.patient_id ?? null,
          actual_state: parsedInput.actual_state ?? null,
          motive_end: parsedInput.motive_end ?? null,
          motive_reason: parsedInput.motive_reason ?? null,
          diagnostic_guidance: parsedInput.diagnostic_guidance ?? null,
          date_from: parsedInput.date_from ? new Date(parsedInput.date_from).toISOString() : null,
          date_to: parsedInput.date_to ? new Date(parsedInput.date_to).toISOString() : null
        }
      });

      // si existe la ficha, actualiza
      if (rowsAffected > 0) {
        console.log('se actualizo la ficha', lastInsertRowid)
        return { data: lastInsertRowid }
      }

      // si no existe, crea
      const { lastInsertRowid: newFicha } = await turso.execute({
        sql: `INSERT INTO psicobooking_treatment_sheet 
              (patient_id, actual_state, motive_end, motive_reason, diagnostic_guidance, date_from, date_to)
              VALUES 
              (:patient_id, :actual_state, :motive_end, :motive_reason, :diagnostic_guidance, :date_from, :date_to)`,
        args: {
          patient_id: parsedInput.patient_id ?? null,
          actual_state: parsedInput.actual_state ?? null,
          motive_end: parsedInput.motive_end ?? null,
          motive_reason: parsedInput.motive_reason ?? null,
          diagnostic_guidance: parsedInput.diagnostic_guidance ?? null,
          date_from: parsedInput.date_from ? new Date(parsedInput.date_from).toISOString() : null,
          date_to: parsedInput.date_to ? new Date(parsedInput.date_to).toISOString() : null
        }
      });

      console.log('se creo la ficha', newFicha)
      return { data: newFicha }
    } catch (error) {
      console.error(error)
      return { data: undefined, error: error instanceof Error ? error : new Error('Ha ocurrido un error inesperado') }
    }
  })


export async function checkUserExists(id: string): Promise<Boolean> {
  const { rows } = await turso.execute({
    sql: `SELECT clerk_id FROM users WHERE id = ?`,
    args: [id]
  })

  if (rows[0]?.length === 0) {
    return false
  }

  return true
}

export async function getPatientTicket(id: number): Promise<{ patientTicket: PatientTicket | undefined, error?: Error }> {
  console.log('get user')
  const { userId } = auth()

  if (!userId) {
    console.log('No user found')
    return { patientTicket: undefined, error: new Error('No user found') }
  }

  try {
    const { rows } = await turso.execute({
      sql: `SELECT 
              psicobooking_user.id as id,
              psicobooking_user.first_name || ' ' || psicobooking_user.last_name AS name,
              COALESCE(CAST((julianday('now') - julianday(psicobooking_user.birth_day)) / 365.25 AS INTEGER), 0) AS age,
              psicobooking_user.avatar,
              psicobooking_user.nationality,
              psicobooking_appointment.informed_consent as consentimientoInformado,
              psicobooking_treatment_sheet.id as numberOfTicket,
              psicobooking_user.email,
              psicobooking_user.phone,
              CASE 
                WHEN psicobooking_appointment.session_type = 'online' THEN 'online'
                ELSE 'presencial'
              END as sessionType,
              psicobooking_treatment_sheet.actual_state as state,
              psicobooking_payment.price,
              (
                SELECT json_group_array(
                  json_object(
                    'id', psicobooking_contact.id,
                    'name', psicobooking_contact.name
                  )
                )
                FROM psicobooking_contact
                WHERE psicobooking_contact.user_id = psicobooking_user.id
              ) as contacts,
              (
                SELECT json_object(
                  'total', COUNT(*),
                  'completed', SUM(CASE WHEN state = 'completed' THEN 1 ELSE 0 END),
                  'scheduled', SUM(CASE WHEN state = 'scheduled' THEN 1 ELSE 0 END),
                  'cancelled', SUM(CASE WHEN state = 'cancelled' THEN 1 ELSE 0 END)
                )
                FROM psicobooking_appointment
                WHERE patient_id = psicobooking_user.id
              ) as sessions
            FROM psicobooking_user
            LEFT JOIN psicobooking_appointment 
              ON psicobooking_user.id = psicobooking_appointment.patient_id
            LEFT JOIN psicobooking_payment
              ON psicobooking_appointment.id = psicobooking_payment.appointment_id
            LEFT JOIN psicobooking_treatment_sheet
              ON psicobooking_treatment_sheet.patient_id = psicobooking_user.id
            WHERE psicobooking_user.id = :user_id;
            `,
      args: {
        user_id: id
      }
    })
    const user = rows[0]

    if (user?.length === 0 || !user) {
      return { patientTicket: undefined, error: new Error('User not found') };
    }

    return { patientTicket: PatientTicketDTO(user) };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { patientTicket: undefined, error: new Error('An error occurred while fetching the user') };
  }
}

export async function getContactInfo(id: number): Promise<{ contactInfo: ContactInfo | undefined, error?: Error }> {
  console.log('get contact info')
  const { userId } = auth()

  if (!userId) {
    console.log('No user found')
    return { contactInfo: undefined, error: new Error('No estas autorizado') }
  }

  try {
    const { rows } = await turso.execute({
      sql: `SELECT * FROM psicobooking_contact WHERE id = ?`,
      args: [id]
    })

    const contactInfo = rows[0]

    if (!contactInfo) {
      return { contactInfo: undefined, error: new Error('Contacto no encontrado') }
    }

    return { contactInfo: contactDTO(contactInfo) }
  } catch (error) {
    console.error(error)
    return { contactInfo: undefined, error: error instanceof Error ? error : new Error('Unknown error') }
  }
}

export async function getClinicalHistories(patientId: number): Promise<{ clinicalHistory: ClinicalHistory[] | undefined, error?: Error }> {
  console.log('get clinical histories')
  const { userId } = auth()

  if (!userId) {
    console.log('No user found')
    return { clinicalHistory: undefined, error: new Error('No estas autorizado') }
  }

  try {
    const { rows } = await turso.execute({
      sql: `SELECT * FROM psicobooking_clinic_history WHERE patient_id = ?`,
      args: [patientId]
    })

    return { clinicalHistory: clinicalHistoryDTO(rows) }
  } catch (error) {
    console.error(error)
    return { clinicalHistory: undefined, error: error instanceof Error ? error : new Error('Error inesperado') }
  }
}

export async function getClinicalHistory(id: number): Promise<{ clinicalHistory: ClinicalHistory | undefined, error?: Error }> {
  console.log('get clinical history')
  const { userId } = auth()

  if (!userId) {
    console.log('No user found')
    return { clinicalHistory: undefined, error: new Error('No estas autorizado') }
  }

  try {
    const { rows } = await turso.execute({
      sql: `SELECT * FROM psicobooking_clinic_history WHERE id = ?`,
      args: [id]
    })

    if (rows[0]?.length === 0 || !rows[0]) {
      return { clinicalHistory: undefined, error: new Error('Historia clinica no encontrada') }
    }

    return { clinicalHistory: singleClinicalHistoryDTO(rows[0]) }
  } catch (error) {
    console.error(error)
    return { clinicalHistory: undefined, error: error instanceof Error ? error : new Error('Error inesperado') }
  }
}

export async function getAppointmentsByDate(date_from?: string, date_to?: string): Promise<string> {
  const { userId } = auth()

  if (!userId) {
    console.log('No user found')
    const response = JSON.stringify({ appointments: undefined, error: 'No estas autorizado' })
    return response
  }

  try {
    let sql = `
      SELECT
        app.id,
        app.psychologist_id,
        app.patient_id,
        pa.avatar,
        pa.first_name || ' ' || pa.last_name AS name,
        app.date_from,
        app.date_to
      FROM
        psicobooking_appointment app
      LEFT JOIN 
        psicobooking_user pa ON pa.id = app.patient_id
      LEFT JOIN 
        psicobooking_user psy ON psy.id = app.psychologist_id
      WHERE
        psy.clerk_id = :user_id
    `

    const args: Record<string, string> = { user_id: userId }

    if (date_from && date_to) {
      sql += ` AND date(substr(app.date_from, 1, 10)) >= date(:date_from) AND date(substr(app.date_to, 1, 10)) <= date(:date_to)`
      args.date_from = date_from
      args.date_to = date_to
    }

    sql += ` ORDER BY app.date_from`

    const { rows } = await turso.execute({ sql, args })

    if (rows.length === 0) {
      const response = JSON.stringify({ appointments: undefined, error: 'No hay citas para esta fecha' })
      console.log('response', response)
      return response
    }

    revalidatePath('/agenda')
    const response = JSON.stringify({ appointments: appointmentCardDTO(rows) })
    console.log('response', response)
    return response
  } catch (error) {
    console.error(error)
    const response = JSON.stringify({ appointments: [], error: error instanceof Error ? error : new Error('Error inesperado') })
    return response
  }
}