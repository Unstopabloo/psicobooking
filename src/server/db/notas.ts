"server-only"

import { auth } from "@clerk/nextjs/server"
import { turso } from "../db"
import { getNotesDTO } from "../dtos"

export async function getNotes({ is_dashboard = false }: { is_dashboard?: boolean } = {}) {
  const { userId } = auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    const { rows } = await turso.execute({
      sql: `
        SELECT 
          note.id,
          note.content,
          note.color,
          note.created_at,
          patient.first_name || ' ' || patient.last_name AS patient_name,
          note.patient_id,
          psy.id AS psychologist_id
        FROM psicobooking_note note
        INNER JOIN psicobooking_user patient ON note.patient_id = patient.id
        INNER JOIN psicobooking_user psy ON note.psychologist_id = psy.id
        WHERE psy.clerk_id = :clerk_id
        ${is_dashboard ? 'LIMIT 3' : ''}
      `,
      args: { clerk_id: userId }
    })

    if (!rows.length) {
      return []
    }

    const result = getNotesDTO(rows)
    return result
  } catch (error) {
    console.error(error)
    return []
  }
}