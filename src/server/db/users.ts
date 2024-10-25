"server-only"

import { turso } from ".";
import { auth } from "@clerk/nextjs/server";
import { UserBase, Appointment, SinglePatientTicket, DashboardAppointment, DashboardPatient, NextAppointment } from "@/types/entities";
import { appointmentDTO, dashboardAppointmentDTO, dashboardPatientDTO, nextAppointmentDTO, singlePatientTicketDTO } from "@/server/dtos";

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
    // const res_id = await db.update(users).set({ role }).where(eq(users.clerk_id, userId)).returning({ updatedId: users.id })
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