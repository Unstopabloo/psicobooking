"use server"

import { auth } from "@clerk/nextjs/server";
import { turso } from "@/server/db";
import { ContactInfo, PatientTicket } from "@/types/entities";
import { contactDTO, PatientTicketDTO } from "../dtos";
import { authAction } from "@/lib/safe-action";
import { PatientSchema, TreatmentSchema } from "@/types/schemas";

export const updatePatient = authAction
  .schema(PatientSchema)
  .action(async ({ parsedInput }) => {
    try {
      console.log('parsedeInput', parsedInput)
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

      if (rowsAffected > 0) {
        console.log('se actualizo la ficha', lastInsertRowid)
        return { data: lastInsertRowid }
      }

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
    console.log('rows', rows)
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
