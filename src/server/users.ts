"server-only"

import { turso } from "./db";
import { auth } from "@clerk/nextjs/server";
import { UserBase, Appointment } from "@/types/entities";
import { appointmentDTO } from "@/lib/dtos";

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

    console.log('rows', rows)

    if (rows[0]?.length === 0) {
      return { error: new Error('Error updating role') }
    }

    const res_id = rows[0]?.id
    console.log('res_id', res_id)
    return { res_id }
  } catch (error) {
    console.error(error)
    return { error }
  }
}


// =================== Pacientes ===================
export async function getPatientsWithAppointments(): Promise<{ patientsWithAppointments: Appointment[] | undefined, error?: Error }> {
  console.log('getPatientsWithAppointments')
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
              strftime('%Y-%m-%dT%H:%M:%SZ', a.date_from) AS appointmentDate,
              a.state AS appointmentState
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
    console.log('patientsWithAppointments', patientsWithAppointments)

    const result = appointmentDTO(patientsWithAppointments)

    return { patientsWithAppointments: result, error: undefined }

  } catch (error) {
    console.error(error)
    return { patientsWithAppointments: undefined, error: error instanceof Error ? error : new Error('Unknown error') }
  }
}