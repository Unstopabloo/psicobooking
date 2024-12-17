"server-only"

import { turso } from ".";
import { auth } from "@clerk/nextjs/server";
import { UserBase, Appointment, SinglePatientTicket, DashboardAppointment, DashboardPatient, NextAppointment, DailyAvailability, AppointmentForTranscriptionForm, PatientForNote, NewAppointmentProps } from "@/types/entities";
import { appointmentDTO, appointmentForTranscriptionFormDTO, availabilityDTO, dashboardAppointmentDTO, dashboardPatientDTO, getPatientsNamesForNoteDTO, nextAppointmentDTO, patientDashboardDataDTO, psychologistProfileDTO, singlePatientTicketDTO } from "@/server/dtos";
import { addHours } from "date-fns";
import { formatISO } from "date-fns";

export async function userExists(id: string): Promise<Boolean> {
  const { rows } = await turso.execute({
    sql: `SELECT clerk_id FROM psicobooking_user WHERE id = ?`,
    args: [id]
  })

  if (rows[0]?.clerk_id) {
    return true
  }

  return false
}

export async function createUser(data: UserBase) {
  try {
    const { rows } = await turso.execute({
      sql: `INSERT INTO psicobooking_user (clerk_id, first_name, last_name, email, avatar, role) VALUES (:clerk_id, :first_name, :last_name, :email, :avatar, :role) RETURNING id`,
      args: {
        clerk_id: data.clerk_id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        avatar: data.avatar ?? null,
        role: data.role
      }
    })

    if (rows[0]?.length === 0) {
      return { error: new Error('Error creating user') }
    }

    const user = rows[0]?.id as number

    return { user }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

export async function updateRole(role: string) {
  console.log('updateRole')
  const { userId } = auth()

  if (!userId) {
    console.log('No user found')
    throw new Error('No user found')
  }

  try {
    const { rows } = await turso.execute({
      sql: `UPDATE psicobooking_user SET role = ? WHERE clerk_id = ? RETURNING id`,
      args: [role, userId]
    })

    if (rows[0]?.length === 0) {
      return { error: new Error('Error updating role') }
    }

    const res_id = rows[0]?.id
    return { res_id }
  } catch (error) {
    console.error(error)
    return { error }
  }
}
// =================== Pacientes ===================
export async function getPatientsWithAppointments(): Promise<{ patientsWithAppointments: Appointment[] | undefined, error?: Error }> {
  const { userId } = auth()

  if (!userId) {
    console.log('No user found')
    return { patientsWithAppointments: undefined, error: new Error('No user found') }
  }

  try {
    const { rows: res } = await turso.execute({
      sql: `SELECT id FROM psicobooking_user WHERE clerk_id = ?`,
      args: [userId]
    })

    if (!res[0]) {
      console.log('No user found')
      return { patientsWithAppointments: undefined, error: new Error('No user found') }
    }

    const { rows: patientsWithAppointments } = await turso.execute({
      sql: `SELECT
              u.id,
              u.first_name || ' ' || u.last_name AS name,
              u.email,
              COALESCE(CAST(u.phone AS TEXT), '') AS telefono,
              COALESCE(u.nationality, '') AS nacionalidad,
              COALESCE(u.gender, '') AS genero,
              COALESCE(CAST((julianday('now') - julianday(u.birth_day)) / 365.25 AS INTEGER), 0) AS edad,
              a.session_type AS tipoDeSesion,
              CASE WHEN a.informed_consent = true THEN 'Firmado' ELSE 'Pendiente' END AS consentimientoInformado,
              strftime('%Y-%m-%dT%H:%M:%SZ', a.date_from) AS appointmentDate
            FROM
              psicobooking_user u
            INNER JOIN
              psicobooking_appointment a ON u.id = a.patient_id
            WHERE
              u.role = 'patient'
              AND a.psychologist_id = ?
            GROUP BY
              u.id
            ORDER BY
              a.date_from
          `,
      args: [res[0].id!]
    })

    const result = appointmentDTO(patientsWithAppointments)
    return { patientsWithAppointments: result, error: undefined }
  } catch (error) {
    console.error(error)
    return { patientsWithAppointments: undefined, error: error instanceof Error ? error : new Error('Unknown error') }
  }
}

export async function getSinglePatientTicket(user_id: number): Promise<{ singlePatientTicket: SinglePatientTicket | undefined, error?: Error }> {
  const { userId } = auth()

  if (!userId) {
    console.log('Unauthorized')
    return { singlePatientTicket: undefined, error: new Error('Unauthorized') }
  }

  try {
    const { rows } = await turso.execute({
      sql: `
        SELECT
          psicobooking_user.id as id,
          psicobooking_user.first_name,
          psicobooking_user.last_name,
          psicobooking_user.birth_day,
          psicobooking_user.email,
          psicobooking_user.phone,
          psicobooking_user.gender,
          psicobooking_user.nationality,
          psicobooking_user.occupation,
          psicobooking_user.country,
          psicobooking_user.state,
          psicobooking_user.city,
          psicobooking_user.street,
          psicobooking_user.num_house,
          psicobooking_treatment_sheet.actual_state,
          psicobooking_treatment_sheet.date_from,
          psicobooking_treatment_sheet.date_to,
          psicobooking_treatment_sheet.motive_end,
          psicobooking_treatment_sheet.motive_reason,
          psicobooking_treatment_sheet.diagnostic_guidance
        FROM psicobooking_user
        LEFT JOIN psicobooking_treatment_sheet
          ON psicobooking_treatment_sheet.patient_id = psicobooking_user.id
        LEFT JOIN psicobooking_appointment
          ON psicobooking_appointment.patient_id = psicobooking_user.id
        WHERE psicobooking_user.id = ?
      `,
      args: [user_id]
    })

    if (rows[0]?.length === 0 || !rows[0]) {
      console.log('No user found')
      return { singlePatientTicket: undefined, error: new Error('No user found') }
    }

    const singlePatientTicket = rows[0]

    return { singlePatientTicket: singlePatientTicketDTO(singlePatientTicket), error: undefined }
  } catch (error) {
    console.error(error)
    return { singlePatientTicket: undefined, error: error instanceof Error ? error : new Error('Error inesperado') }
  }
}

export async function getDashboardAppointments(): Promise<{ appointments: DashboardAppointment[] | undefined, error?: Error }> {
  console.log('getDashboardAppointments')
  const { userId } = auth()

  if (!userId) {
    return { appointments: undefined, error: new Error('Unauthorized') }
  }

  try {
    const { rows } = await turso.execute({
      sql: `
        SELECT 
          a.id,
          a.patient_id,
          a.psychologist_id,
          p.first_name || ' ' || p.last_name AS name,
          p.avatar AS avatar,
          a.informed_consent,
          a.session_type,
          a.date_from
        FROM 
          psicobooking_appointment a
        LEFT JOIN 
          psicobooking_user p ON p.id = a.patient_id
        LEFT JOIN 
          psicobooking_user psy ON psy.id = a.psychologist_id
        WHERE 
          psy.clerk_id = ?
          AND a.state = 'scheduled'
          AND datetime(a.date_from) > datetime('now', 'localtime')
        LIMIT 4;
      `,
      args: [userId]
    })

    if (rows[0]?.length === 0 || !rows[0]) {
      return { appointments: undefined, error: new Error('No appointments found') }
    }

    const result = dashboardAppointmentDTO(rows)
    return { appointments: result, error: undefined }
  } catch (error) {
    console.error(error)
    return { appointments: undefined, error: error instanceof Error ? error : new Error('Error inesperado') }
  }
}

export async function getDashboardPatients(): Promise<{ patients: DashboardPatient[] | undefined, error?: Error }> {
  console.log('getDashboardPatients')
  const { userId } = auth()

  if (!userId) {
    return { patients: undefined, error: new Error('Unauthorized') }
  }

  try {
    const { rows } = await turso.execute({
      sql: `
        SELECT
          u.id,
          u.first_name || ' ' || u.last_name AS name,
          u.email,
          COALESCE(u.nationality, '') AS nacionalidad,
          COALESCE(u.gender, '') AS genero,
          COALESCE(CAST(u.phone AS TEXT), '') AS telefono
        FROM
          psicobooking_user u
        LEFT JOIN
          psicobooking_user psy ON psy.id = a.psychologist_id
        INNER JOIN
          psicobooking_appointment a ON u.id = a.patient_id
        WHERE
          u.role = 'patient'
          AND psy.clerk_id = ?
        LIMIT 4;
      `,
      args: [userId]
    })

    if (rows[0]?.length === 0 || !rows[0]) {
      return { patients: undefined, error: new Error('No patients found') }
    }

    const result = dashboardPatientDTO(rows)
    return { patients: result, error: undefined }
  } catch (error) {
    console.error(error)
    return { patients: undefined, error: error instanceof Error ? error : new Error('Error inesperado') }
  }
}

export async function getPatientUserName(patient_id: number) {
  const { userId } = auth()

  if (!userId) {
    console.log('Unauthorized')
    return ''
  }

  try {
    const { rows } = await turso.execute({
      sql: `SELECT first_name FROM psicobooking_user WHERE id = ?`,
      args: [patient_id]
    })

    if (rows[0]?.length === 0 || !rows[0]) {
      console.log('No user found')
      return ''
    }

    const patientName = rows[0]?.first_name
    return patientName
  } catch (error) {
    console.error(error)
    return ''
  }
}

export async function getNextAppointment(): Promise<{ nextAppointment: NextAppointment | undefined, error?: Error }> {
  console.log('getNextAppointment')

  const { userId } = auth()

  if (!userId) {
    return { nextAppointment: undefined, error: new Error('Unauthorized') }
  }

  try {
    const { rows: nextAppointment } = await turso.execute({
      sql: `
        SELECT 
          app.id,
          app.patient_id,
          app.session_type,
          app.date_from,
          app.state,
          patient.avatar,
          patient.first_name || ' ' || patient.last_name AS name,
          patient.email
        FROM 
          psicobooking_appointment app
        LEFT JOIN 
          psicobooking_user patient ON patient.id = app.patient_id
        LEFT JOIN 
          psicobooking_user user ON user.id = app.psychologist_id
        WHERE 
          user.clerk_id = ?
          AND app.state = 'scheduled'
          AND datetime(app.date_from) > datetime('now', 'localtime')
        ORDER BY 
          datetime(app.date_from) ASC
        LIMIT 1;
      `,
      args: [userId]
    })

    if (nextAppointment[0]?.length === 0 || !nextAppointment[0]) {
      console.log('No appointments found')
      return { nextAppointment: undefined }
    }

    const result = nextAppointmentDTO(nextAppointment[0])
    console.log("result", result)
    return { nextAppointment: result }
  } catch (error) {
    console.error(error)
    return { nextAppointment: undefined, error: error instanceof Error ? error : new Error('Error inesperado') }
  }
}

export async function getAvailability(): Promise<DailyAvailability[]> {
  const { userId } = auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  try {
    const { rows } = await turso.execute({
      sql: `
        WITH RECURSIVE dias AS (
          SELECT 1 as day_number, 'Lunes' as day_name
          UNION ALL SELECT 2, 'Martes'
          UNION ALL SELECT 3, 'Miércoles'
          UNION ALL SELECT 4, 'Jueves'
          UNION ALL SELECT 5, 'Viernes'
          UNION ALL SELECT 6, 'Sábado'
          UNION ALL SELECT 7, 'Domingo'
        )
        SELECT 
          d.day_name,
          NULLIF(GROUP_CONCAT(
            CASE 
              WHEN app.id IS NOT NULL THEN
                json_object(
                  'id', app.id,
                  'clinic_id', app.clinic_id,
                  'psychologist_id', app.psychologist_id,
                  'hour_from', app.hour_from,
                  'hour_to', app.hour_to,
                  'is_online', app.is_online
                )
              ELSE NULL 
            END
          ), '') as availability_slots
        FROM dias d
        LEFT JOIN psicobooking_availability app ON d.day_number = app.day_of_week
        LEFT JOIN psicobooking_user u ON u.id = app.psychologist_id
        WHERE u.clerk_id = ? OR app.id IS NULL
        GROUP BY d.day_number, d.day_name
        ORDER BY d.day_number
      `,
      args: [userId]
    });

    if (rows[0]?.length === 0 || !rows[0]) {
      console.log('No availability found')
      return []
    }

    const result = availabilityDTO(rows)
    return result
  } catch (error) {
    console.error(error)
    return []
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

    const result = appointmentForTranscriptionFormDTO(rows)
    return { data: result }
  } catch (error) {
    console.error(error)
    return { data: undefined, error: error instanceof Error ? error : new Error('Error inesperado') }
  }
}

export async function getPatientsNamesForNote(): Promise<PatientForNote[] | []> {
  console.log('getPatientsNamesForNote')
  const { userId } = auth()

  if (!userId) {
    console.error('No estas autorizado')
    return []
  }

  try {
    const { rows } = await turso.execute({
      sql: `
        SELECT 
          patient.id, 
          patient.first_name || ' ' || patient.last_name AS name,
          patient.avatar
        FROM 
          psicobooking_user patient
        LEFT JOIN
          psicobooking_user psy ON psy.id = app.psychologist_id
        LEFT JOIN
          psicobooking_appointment app ON app.patient_id = patient.id
        WHERE 
          psy.clerk_id = ?
          AND patient.role = 'patient'
          AND app.psychologist_id = psy.id
      `,
      args: [userId]
    })

    if (rows[0]?.length === 0 || !rows[0]) {
      console.log('No patients found')
      return []
    }

    const result = getPatientsNamesForNoteDTO(rows)
    return result
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function getUserProfile() {
  const { userId } = auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  try {
    const resdb = await turso.batch([
      {
        sql: `
        SELECT 
          psy.id,
          psy.first_name,
          psy.last_name,
          psy.email,
          psy.avatar,
          psy.focus,
          psy.phone,
          psy.nationality,
          psy.gender,
          psy.birth_day,
          psy.country,
          psy.state,
          psy.city,
          psy.street,
          psy.num_house,
          psy.created_at,
          psy.video_presentation_url,
          psy.price
        FROM 
          psicobooking_user psy
        WHERE 
          clerk_id = ?
      `,
        args: [userId]
      },
      {
        sql: `
          SELECT 
            spec.id,
            spec.name,
            spec.description
          FROM psicobooking_psychologist_speciality psyspeciality
          LEFT JOIN psicobooking_user psy ON psy.id = psyspeciality.user_id
          LEFT JOIN psicobooking_speciality spec ON spec.id = psyspeciality.speciality_id
          WHERE psy.clerk_id = ? AND spec.id = psyspeciality.speciality_id
        `,
        args: [userId]
      }
    ], "read")

    if (!resdb[0]?.rows[0] || !resdb[1]?.rows) {
      console.error('No user found')
      throw new Error('No data found')
    }

    const userProfile = resdb[0].rows[0]
    const userSpecialities = resdb[1].rows

    const result = psychologistProfileDTO(userProfile, userSpecialities)
    console.log("result", result)
    return result
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getPatientDashboardData() {
  const { userId } = auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  try {
    const { rows } = await turso.execute({
      sql: `SELECT id, first_name, last_name, email, phone, gender, country FROM psicobooking_user WHERE clerk_id = ?`,
      args: [userId]
    })

    if (rows[0]?.length === 0 || !rows[0]) {
      console.log('No user found')
      throw new Error('No user found')
    }

    const user = patientDashboardDataDTO(rows[0])
    console.log(user)
    return user
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function newAppointment({ psychologistId, selectedDate, user_id }: NewAppointmentProps) {
  console.log('new appointment')

  if (!user_id) {
    console.error('No estas autorizado')
    throw new Error('No estas autorizado')
  }

  try {
    const { rows } = await turso.execute({
      sql: `SELECT id FROM psicobooking_user WHERE clerk_id = :user_id`,
      args: { user_id: user_id }
    })

    if (rows[0]?.length === 0 || !rows[0]) {
      console.error('No se encontró el usuario')
      throw new Error('No se encontró el usuario')
    }

    const patient_id = rows[0]?.id as number
    console.log('patient_id', patient_id)

    const { lastInsertRowid } = await turso.execute({
      sql: `
        INSERT INTO psicobooking_appointment 
          (patient_id, psychologist_id, date_from, date_to, date_from_old, date_to_old, session_type, state) 
        VALUES (:patient_id, :psychologist_id, :date_from, :date_to, 1, 1, :session_type, :state)
      `,
      args: {
        patient_id,
        psychologist_id: psychologistId,
        date_from: selectedDate,
        date_to: formatISO(addHours(new Date(selectedDate), 1)),
        session_type: "online",
        state: "scheduled"
      }
    })

    console.log('lastInsertRowid', Number(lastInsertRowid))

    if (!lastInsertRowid) {
      console.error('No se pudo crear la cita')
      throw new Error('No se pudo crear la cita')
    }

    const appointment_id = Number(lastInsertRowid)
    return { data: appointment_id }
  } catch (error) {
    console.error(error)
    throw error
  }
}