"use server"

import { auth, clerkClient } from "@clerk/nextjs/server";
import { turso } from "@/server/db";
import { AppointmentCardWithPatient, AppointmentForTranscriptionForm, ClinicalHistory, ContactInfo, PatientTicket, PsychologistProfile } from "@/types/entities";
import { appointmentCardDTO, appointmentCardWithPatientDTO, appointmentForTranscriptionFormDTO, clinicalHistoryDTO, contactDTO, PatientTicketDTO, singleClinicalHistoryDTO, upcomingAppointmentDTO } from "../dtos";
import { authAction } from "@/lib/safe-action";
import { ClinicalHistorySchema, ClinicSchema, PatientSchema, TreatmentSchema } from "@/types/schemas";
import { revalidatePath } from "next/cache";
import { OnBoadingData } from "@/app/onboarding/page";
import { deleteDocument, uploadDocument } from "@/lib/upload-files";
import { addHours, formatISO } from "date-fns";
import { getCountryPhoneCode } from "@/lib/get-country-code";
import { countryPhoneCodes } from "@/lib/consts";

interface OnBoardingDataServer extends Omit<OnBoadingData, 'professional'> {
  professional: {
    studyHouse: string;
    studyYear: string;
    studyBranch: string;
    document: string | null;
    recommendationLetter: string | null;
  }
}

export const updatePatient = authAction
  .schema(PatientSchema)
  .action(async ({ parsedInput }) => {
    console.log("parsedInput", parsedInput)
    try {
      const { rows, rowsAffected } = await turso.execute({
        sql: `
          UPDATE psicobooking_user SET 
            first_name = :first_name, 
            last_name = :last_name, 
            email = :email, 
            phone = :phone, 
            gender = :gender, 
            birth_day = :birth_day, 
            occupation = :occupation,
            nationality = :nationality,
            country = :country, 
            state = :state, 
            city = :city, 
            street = :street, 
            num_house = :num_house 
          WHERE email = :email 
          RETURNING *`,
        args: {
          first_name: parsedInput.first_name,
          last_name: parsedInput.last_name,
          email: parsedInput.email,
          phone: parsedInput.phone ?? null,
          gender: parsedInput.gender ?? null,
          birth_day: parsedInput.birth_day ? new Date(parsedInput.birth_day).toISOString() : null,
          occupation: parsedInput.ocupation ?? null,
          nationality: countryPhoneCodes.find(country => country.name === parsedInput.country)?.aliases[parsedInput ? parsedInput.gender === 'male' ? 0 : 1 : 0] ?? null,
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
      console.log("plainUser", plainUser)
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
      const sanitizedContent = JSON.stringify(content).replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

      if (!patient_id || !title || !sanitizedContent) {
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
            content: sanitizedContent,
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
          content: sanitizedContent,
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

export const addConsultorio = authAction
  .schema(ClinicSchema)
  .action(async ({ parsedInput, ctx }) => {
    console.log('parsedInput', parsedInput)
    const userId = ctx.userId

    if (!parsedInput.hour_from || !parsedInput.hour_to || !parsedInput.day_of_week || parsedInput.hour_from === '' || parsedInput.hour_to === '' || parsedInput.day_of_week === '') {
      return { error: new Error('No hay suficiente informacion para crear el consultorio') }
    }

    const { name, address, day_of_week, hour_from, hour_to } = parsedInput

    try {
      const { rows: psychologistId } = await turso.execute({
        sql: `SELECT id FROM psicobooking_user WHERE clerk_id = :clerk_id`,
        args: { clerk_id: userId }
      })
      if (!psychologistId[0]?.id) {
        return { error: new Error('No se pudo encontrar el psicologo') }
      }

      const psychologist = psychologistId[0].id

      const { rowsAffected, lastInsertRowid } = await turso.execute({
        sql: `INSERT INTO psicobooking_clinic (name, address) VALUES (:name, :address)`,
        args: {
          name: name,
          address: address
        }
      })

      if (rowsAffected === 0) {
        console.error('No se pudo crear el consultorio')
        return { error: new Error('No se pudo crear el consultorio') }
      }

      const clinicId = Number(lastInsertRowid)

      const { lastInsertRowid: availabilityId } = await turso.execute({
        sql: `INSERT INTO psicobooking_availability
              (clinic_id, psychologist_id, day_of_week, hour_from, hour_to) 
              VALUES (:clinic_id, :psychologist_id, :day_of_week, :hour_from, :hour_to)`,
        args: {
          clinic_id: clinicId,
          psychologist_id: psychologist,
          day_of_week: day_of_week,
          hour_from: hour_from,
          hour_to: hour_to
        }
      })

      if (!availabilityId) {
        console.error('No se pudo crear la disponibilidad')
        return { error: new Error('No se pudo crear la disponibilidad') }
      }

      return { data: "Se creo el consultorio y la disponibilidad" }
    } catch (error) {
      console.error(error)
      return { error: error instanceof Error ? error : new Error('Ha ocurrido un error inesperado') }
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
      return response
    }

    revalidatePath('/agenda')
    const response = JSON.stringify({ appointments: appointmentCardDTO(rows) })
    return response
  } catch (error) {
    console.error(error)
    const response = JSON.stringify({ appointments: [], error: error instanceof Error ? error : new Error('Error inesperado') })
    return response
  }
}

export async function getUpcommingAppointments(date_from: string): Promise<{ appointments: AppointmentCardWithPatient[] | undefined, error?: Error }> {
  console.log('get upcomming appointments')
  const { userId } = auth()

  if (!userId) {
    console.log('No estas autorizado')
    return { appointments: undefined, error: new Error('No estas autorizado') }
  }

  try {
    const { rows } = await turso.execute({
      sql: `
        SELECT
          app.id,
          app.psychologist_id,
          app.patient_id,
          app.state,
          app.session_type,
          pa.avatar,
          pa.first_name || ' ' || pa.last_name AS name,
          pa.email,
          pa.phone,
          pa.nationality,
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
        AND
          DATE(app.date_from) = DATE(:date_from)
      `,
      args: {
        user_id: userId,
        date_from: date_from
      }
    })

    if (rows.length === 0 || !rows) {
      return { appointments: undefined }
    }

    const appointments = appointmentCardWithPatientDTO(rows)
    return { appointments }
  } catch (error) {
    console.error(error)
    return { appointments: undefined, error: error instanceof Error ? error : new Error('Error inesperado') }
  }
}

export async function getUpcomingAppointmentsData(date_from: string): Promise<{ data: { date: string, quant: number }[] | undefined, error?: Error }> {
  console.log('get upcoming appointment data')
  const { userId } = auth()

  if (!userId) {
    console.log('No estas autorizado')
    return { data: undefined, error: new Error('No estas autorizado') }
  }

  if (!date_from) {
    return { data: undefined, error: new Error('No se proporcionó la fecha de inicio') }
  }

  try {
    const { rows } = await turso.execute({
      sql: `
      WITH date_parts AS (
        SELECT 
          CAST(strftime('%Y', DATE(:date_from)) AS INTEGER) as year,
          CAST(strftime('%m', DATE(:date_from)) AS INTEGER) as month
      )
      SELECT
        DATE(app.date_from) AS date,
        COUNT(*) AS quant
      FROM
        psicobooking_appointment app
      LEFT JOIN
        psicobooking_user user ON user.id = app.psychologist_id
      CROSS JOIN
        date_parts
      WHERE
        user.clerk_id = :user_id
      AND
        strftime('%Y', app.date_from) = CAST(date_parts.year AS TEXT)
      AND
        strftime('%m', app.date_from) = CASE 
          WHEN date_parts.month < 10 THEN '0' || date_parts.month 
          ELSE CAST(date_parts.month AS TEXT) 
        END
      GROUP BY
        DATE(app.date_from)
      ORDER BY
        DATE(app.date_from);
      `,
      args: {
        user_id: userId,
        date_from: date_from
      }
    })

    if (rows.length === 0 || !rows) {
      return { data: undefined }
    }

    return { data: upcomingAppointmentDTO(rows) }
  } catch (error) {
    console.error(error)
    return { data: undefined, error: error instanceof Error ? error : new Error('Error inesperado') }
  }
}

export async function saveAvailability(day: number, startTime: string, endTime: string): Promise<{ data: boolean | undefined, error?: Error }> {
  console.log('save recurring availability')

  const { userId } = auth()

  if (!userId) {
    return { data: false, error: new Error('No estas autorizado') }
  }

  try {
    const { rows } = await turso.execute({
      sql: `SELECT id FROM psicobooking_user WHERE clerk_id = ?`,
      args: [userId]
    })

    if (rows[0]?.length === 0 || !rows[0]) {
      return { data: false, error: new Error('No se encontró el usuario') }
    }

    const psychologistId = rows[0].id as number
    console.log("psychologistId", psychologistId)

    const { rowsAffected } = await turso.execute({
      sql: `
        INSERT INTO psicobooking_availability 
          (clinic_id, psychologist_id, day_of_week, hour_from, hour_to, is_online) 
          VALUES (0, :user_id, :day_of_week, :hour_from, :hour_to, true)
      `,
      args: {
        user_id: psychologistId,
        day_of_week: day,
        hour_from: startTime,
        hour_to: endTime
      }
    })

    if (rowsAffected === 0) {
      return { data: false, error: new Error('No se pudo guardar la disponibilidad') }
    }

    revalidatePath('/agenda')
    return { data: true }
  } catch (error) {
    console.error(error)
    return { data: false, error: error instanceof Error ? error : new Error('Error inesperado') }
  }
}

export async function deleteAvailability(id: number): Promise<boolean> {
  console.log('delete recurring availability')

  const { userId } = auth()

  if (!userId) {
    console.error("No estas autorizado")
    return false
  }

  try {
    const { rowsAffected } = await turso.execute({
      sql: `DELETE FROM psicobooking_availability 
            WHERE id = :id 
            AND psychologist_id = (
              SELECT id 
              FROM psicobooking_user 
              WHERE clerk_id = :clerk_id
            )`,
      args: {
        id: id,
        clerk_id: userId
      }
    })

    if (rowsAffected === 0) {
      return false
    }

    revalidatePath('/agenda')
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function saveSpecificAvailability(
  date: string,
  startTime: string,
  endTime: string
): Promise<{ data: boolean | undefined, error?: Error }> {
  console.log('save specific availability')

  const { userId } = auth()

  if (!userId) {
    return { data: false }
  }

  try {
    // Obtener el ID del psicólogo
    const { rows } = await turso.execute({
      sql: `SELECT id FROM psicobooking_user WHERE clerk_id = ?`,
      args: [userId]
    })

    if (rows[0]?.length === 0 || !rows[0]) {
      return { data: false }
    }

    const psychologistId = rows[0].id as number

    // Verificar si ya existe una excepción para esa fecha
    const { rows: existingException } = await turso.execute({
      sql: `SELECT id FROM psicobooking_online_availability_exception 
            WHERE psychologist_id = ? AND exception_date = ?`,
      args: [psychologistId, date]
    })

    let rowsAffected = 0

    const id = existingException[0]?.id as number

    if (id > 0) {
      // Si existe, actualizar
      const { rowsAffected: updated } = await turso.execute({
        sql: `UPDATE psicobooking_online_availability_exception 
              SET hour_from = :hour_from, 
                  hour_to = :hour_to,
                  is_available = true
              WHERE psychologist_id = :user_id 
              AND exception_date = :exception_date
              AND id = :id`,
        args: {
          user_id: psychologistId,
          exception_date: date,
          hour_from: startTime,
          hour_to: endTime,
          id: id
        }
      })
      rowsAffected = updated
    } else {
      // Si no existe, insertar
      const { rowsAffected: inserted } = await turso.execute({
        sql: `INSERT INTO psicobooking_online_availability_exception 
              (psychologist_id, exception_date, hour_from, hour_to, is_available) 
              VALUES (:user_id, :exception_date, :hour_from, :hour_to, true)`,
        args: {
          user_id: psychologistId,
          exception_date: date,
          hour_from: startTime,
          hour_to: endTime
        }
      })
      rowsAffected = inserted
    }

    if (rowsAffected === 0) {
      return { data: false }
    }

    revalidatePath('/agenda')
    return { data: true }
  } catch (error) {
    console.error(error)
    return { data: false, error: error instanceof Error ? error : new Error('Error inesperado') }
  }
}

export async function getAppointmentsForTranscriptionForm(): Promise<{ data: AppointmentForTranscriptionForm[] | undefined, error?: Error }> {
  console.log('get appointments for transcription form')

  const { userId } = auth()

  if (!userId) {
    console.error('No estas autorizado')
    throw new Error('No estas autorizado')
  }

  try {
    const { rows } = await turso.execute({
      sql: `
        SELECT 
          app.id, 
          user.first_name || ' ' || user.last_name AS patient, 
          app.date_from, 
          app.session_type 
        FROM psicobooking_appointment app
        LEFT JOIN psicobooking_user user ON user.id = app.patient_id
        LEFT JOIN psicobooking_user psy ON psy.id = app.psychologist_id
        WHERE psy.clerk_id = :user_id AND app.state = 'completed'
        ORDER BY app.date_from DESC;
      `,
      args: {
        user_id: userId
      }
    })

    console.log('rows', rows)
    const res = appointmentForTranscriptionFormDTO(rows)
    console.log('res', res)

    return { data: res }
  } catch (error) {
    console.error(error)
    return { data: undefined, error: error instanceof Error ? error : new Error('Error inesperado') }
  }
}

export async function updateUserProfile(profile: Omit<PsychologistProfile, "id" | "avatar" | "nationality" | "created_at" | "video_presentation_url">) {
  console.log('update user profile')

  const { userId } = auth()
  if (!userId) {
    throw new Error('No estas autorizado')
  }

  const { phone, gender, birth_day, country, state, city, street, num_house, specialities, focus, price } = profile
  console.log('profile', profile)

  try {
    const { rows: user } = await turso.execute({
      sql: `SELECT id FROM psicobooking_user WHERE clerk_id = :user_id`,
      args: { user_id: userId }
    })

    if (user[0]?.length === 0 || !user[0]) {
      console.error('No se encontró el usuario')
      throw new Error('No se encontró el usuario')
    }

    const user_id = user[0].id as number
    const specialities_ids = specialities?.map((speciality) => speciality.id)

    // Eliminar las especialidades existentes
    if (specialities_ids && specialities_ids.length > 0) {
      await turso.execute({
        sql: `DELETE FROM psicobooking_psychologist_speciality WHERE user_id = :user_id`,
        args: { user_id }
      })
    }

    // Crear el batch de inserciones
    let batchQueries: {
      sql: string;
      args: {
        user_id: number;
        speciality_id: string;
      };
    }[] = []

    if (specialities_ids && specialities_ids.length > 0) {
      batchQueries = specialities_ids.map(speciality_id => ({
        sql: `INSERT INTO psicobooking_psychologist_speciality (user_id, speciality_id) VALUES (:user_id, :speciality_id)`,
        args: { user_id, speciality_id }
      }))
    }

    await turso.batch([
      {
        sql: `
          UPDATE 
            psicobooking_user 
          SET 
            phone = :phone, 
            gender = :gender, 
            birth_day = :birth_day, 
            country = :country, 
            state = :state, 
            city = :city, 
            street = :street, 
            num_house = :num_house,
            focus = :focus,
            price = :price
          WHERE id = :user_id
        `,
        args: { phone, gender, birth_day, country, state, city, street, num_house, focus, price, user_id }
      },
      ...batchQueries
    ], "write")

    revalidatePath('/dashboard/perfil')
    return { data: true }
  } catch (error) {
    console.error(error)
    return { data: false }
  }
}

export async function enrollNewPsychologist(data: OnBoardingDataServer) {
  console.log('enroll new psychologist')
  const { userId } = auth()
  if (!userId) {
    console.error('No estas autorizado')
    throw new Error('No estas autorizado')
  }
  console.log('data', data)

  try {
    let study_certificate_url: string | null | undefined
    let study_certificate_public_id: string | null | undefined
    let recommendation_letter_url: string | null | undefined
    let recommendation_letter_public_id: string | null | undefined

    // subir certificado de estudios
    if (data.professional.document) {
      const result = await uploadDocument(
        data.professional.document,
        data.personal.name + "-" + data.personal.lastname + "-certificado-de-estudios",
        "certificados-de-estudios"
      )
      const { url, public_id } = result || {}
      if (!url || !public_id) {
        throw new Error('No se pudo subir el certificado de estudios')
      }

      study_certificate_url = url
      study_certificate_public_id = public_id
    }

    // subir carta de recomendaciones
    if (data.professional.recommendationLetter) {
      const result = await uploadDocument(
        data.professional.recommendationLetter,
        data.personal.name + "-" + data.personal.lastname + "-carta-de-recomendacion",
        "carta-de-recomendaciones"
      )
      const { url, public_id } = result || {}
      if (!url || !public_id) {
        throw new Error('No se pudo subir la carta de recomendaciones')
      }

      recommendation_letter_url = url
      recommendation_letter_public_id = public_id
    }

    const { rowsAffected } = await turso.execute({
      sql: `
          UPDATE psicobooking_user 
          SET role = :role, 
              first_name = :first_name,
              last_name = :last_name,
              email = :email,
              focus = :focus,
              phone = :phone,
              country = :country,
              dni = :dni,
              study_house = :study_house,
              study_year = :study_year,
              study_certificate = :study_certificate,
              recommendation_letter = :recommendation_letter,
              conduct_record = :conduct_record,
              conduct_record_detail = :conduct_record_detail,
              consent = :consent,
              occupation = 'psychologist'
          WHERE clerk_id = :user_id 
          RETURNING id
        `,
      args: {
        role: data.firstStep.role,
        user_id: userId,
        first_name: data.personal.name,
        last_name: data.personal.lastname,
        email: data.personal.email,
        focus: data.professional.studyBranch,
        phone: data.personal.phone,
        country: data.personal.country,
        dni: data.personal.dni,
        study_house: data.professional.studyHouse,
        study_year: data.professional.studyYear,
        study_certificate: study_certificate_url!,
        recommendation_letter: recommendation_letter_url || null,
        conduct_record: data.conduct.conductRecord,
        conduct_record_detail: data.conduct.conductRecordDetails || '',
        consent: data.conduct.consent
      }
    })

    if (rowsAffected === 0 || !rowsAffected) {
      console.error('No se pudo actualizar el usuario')
      if (study_certificate_public_id) {
        await deleteDocument(study_certificate_public_id)
      }
      if (recommendation_letter_public_id) {
        await deleteDocument(recommendation_letter_public_id)
      }
      throw new Error('No se pudo actualizar el usuario')
    }

    await clerkClient().users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        role: data.firstStep.role,
      }
    })

    console.log('usuario actualizado', Number(rowsAffected))

    return { data: true }
  } catch (error) {
    console.error(error)
    return { data: false }
  }
}
