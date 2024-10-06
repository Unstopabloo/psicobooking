"use server"

import { examplePatients, psychologistId } from "@/lib/consts"
import { turso } from "../db"
import { addHours } from "date-fns"

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

export async function addExamplePatients() {
  console.log('addExamplePatients')

  for (const patient of examplePatients) {
    const { rows } = await turso.execute({
      sql: `INSERT INTO psicobooking_user (clerk_id, first_name, last_name, email, role, phone, nationality, gender, birth_day) VALUES (:clerk_id, :first_name, :last_name, :email, :role, :phone, :nationality, :gender, :birth_day) RETURNING id`,
      args: {
        clerk_id: crypto.randomUUID(),
        first_name: patient.first_name,
        last_name: patient.last_name,
        email: patient.email,
        role: patient.role,
        phone: patient.phone,
        nationality: patient.nationality,
        gender: patient.gender,
        birth_day: patient.birth_day
      }
    })

    const insertedUser = rows[0]?.id as number

    const date_from = new Date(new Date().getTime() + (1 + Math.floor(Math.random() * 30)) * 24 * 60 * 60 * 1000).toISOString()
    const date_to = addHours(date_from, Math.random() > 0.5 ? 1 : 2)

    const { rows: appointments } = await turso.execute({
      sql: `INSERT INTO psicobooking_appointment (psychologist_id, patient_id, session_type, informed_consent, state, date_from, date_to, date_from_old, date_to_old) VALUES (:psychologist_id, :patient_id, :session_type, :informed_consent, :state, :date_from, :date_to, :date_from_old, :date_to_old) RETURNING id`,
      args: {
        psychologist_id: psychologistId,
        patient_id: insertedUser,
        session_type: Math.random() > 0.5 ? 'online' : 'presencial',
        informed_consent: Math.random() > 0.3,
        state: 'scheduled' as const,
        date_from,
        date_to,
        date_from_old: 1,
        date_to_old: 2
      }
    })
  }

  console.log('Example patients and appointments added successfully.');
}