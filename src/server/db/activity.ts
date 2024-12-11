import { auth } from "@clerk/nextjs/server"
import { turso } from "."
import { getActivitiesWithCommentsDTO, getActivityByIdDTO } from "../dtos"

export async function getActivities(limit?: boolean) {
  console.log("getActivities")
  const { userId } = auth()

  if (!userId) {
    throw new Error("No se encontró el usuario")
  }

  try {
    const { rows } = await turso.execute({
      sql: `
        SELECT 
          act.id,
          p.first_name || ' ' || p.last_name AS patient_name,
          act.title,
          act.description,
          act.status,
          COUNT(ca.id) AS comments_count,
          act.date_from,
          act.date_to
        FROM psicobooking_activity act
        LEFT JOIN psicobooking_user p ON act.patient_id = p.id
        LEFT JOIN psicobooking_user psy ON act.psychologist_id = psy.id
        LEFT JOIN psicobooking_comment_activity ca ON act.id = ca.activity_id
        WHERE psy.clerk_id = :userId
        ${limit ? "LIMIT 4" : ""}
      `,
      args: { userId }
    })

    if (!rows) {
      console.error("No se encontraron actividades")
      throw new Error("No se encontraron actividades")
    }

    console.log(rows)
    const activities = getActivitiesWithCommentsDTO(rows)
    console.log(activities)
    return activities
  } catch (error) {
    console.error(error)
    throw new Error("Error al obtener las actividades")
  }
}

export async function getActivityById(activity_id: number) {
  const { userId } = auth()

  if (!userId) {
    throw new Error("No se encontró el usuario")
  }

  try {
    const { rows } = await turso.execute({
      sql: `
        SELECT 
          act.id,
          p.avatar AS patient_avatar,
          p.first_name || ' ' || p.last_name AS patient_name,
          act.title,
          act.description,
          act.status,
          COUNT(ca.id) AS comments_count,
          CASE 
            WHEN COUNT(ca.id) = 0 THEN '[]'
            ELSE json_group_array(
              json_object(
                'content', ca.content,
                'published_at', ca.published_at,
                'author_name', u.first_name || ' ' || u.last_name,
                'author_avatar', u.avatar
              )
            )
          END AS comments,
          act.date_from,
          act.date_to
        FROM psicobooking_activity act
        LEFT JOIN psicobooking_user p ON act.patient_id = p.id
        LEFT JOIN psicobooking_user psy ON act.psychologist_id = psy.id
        LEFT JOIN psicobooking_comment_activity ca ON act.id = ca.activity_id
        LEFT JOIN psicobooking_user u ON ca.user_id = u.id
        WHERE act.id = :activity_id AND psy.clerk_id = :userId
      `,
      args: { activity_id, userId }
    })

    if (!rows[0]) {
      console.error("No se encontró la actividad")
      throw new Error("No se encontró la actividad")
    }

    const activity = getActivityByIdDTO(rows[0])
    return activity
  } catch (error) {
    console.error(error)
    throw new Error("Error al obtener la actividad")
  }
}