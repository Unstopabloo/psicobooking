"use server"

import { auth } from "@clerk/nextjs/server"
import { turso } from "@/server/db"
import { authAction } from "@/lib/safe-action";
import { CommentActivitySchema } from "@/types/schemas";
import { revalidatePath } from "next/cache";

export async function createActivity(formData: FormData) {
  const { userId } = auth()

  if (!userId) {
    return { error: "No autorizado" }
  }

  try {
    const patient_id = formData.get("patient_id") as string
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const date_from = formData.get("date_from") as string
    const date_to = formData.get("date_to") as string

    if (!patient_id || !title || !description || !date_from || !date_to) {
      console.error("Todos los campos son requeridos")
      throw new Error("Todos los campos son requeridos")
    }

    const { rows: psy } = await turso.execute({
      sql: `SELECT id FROM psicobooking_user WHERE clerk_id = :userId`,
      args: { userId }
    })

    if (!psy[0]?.id) {
      console.error("No se encontró el psicólogo")
      throw new Error("No se encontró el psicólogo")
    }

    const psychologist_id = psy[0].id

    const { lastInsertRowid } = await turso.execute({
      sql: `
        INSERT INTO psicobooking_activity (patient_id, psychologist_id, title, description, status, date_from, date_to)
        VALUES (:patient_id, :psychologist_id, :title, :description, :status, :date_from, :date_to)
      `,
      args: { patient_id, psychologist_id, title, description, status: "en_curso", date_from, date_to }
    })

    if (!lastInsertRowid) {
      console.error("Error al crear la actividad")
      throw new Error("Error al crear la actividad")
    }

    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export async function addActivityComment(formData: FormData) {
  const { userId } = auth()

  if (!userId) {
    return { error: "No autorizado" }
  }

  try {
    const activity_id = formData.get("activity_id") as string
    const content = formData.get("content") as string

    const { rows: user } = await turso.execute({
      sql: `SELECT id FROM psicobooking_user WHERE clerk_id = :userId`,
      args: { userId }
    })

    if (!user[0]?.id) {
      console.error("No se encontró el usuario")
      throw new Error("No se encontró el usuario")
    }

    const user_id = user[0].id

    const { lastInsertRowid } = await turso.execute({
      sql: `INSERT INTO psicobooking_comment_activity (activity_id, user_id, content, published_at) VALUES (:activity_id, :user_id, :content, :published_at)`,
      args: { activity_id, user_id, content, published_at: new Date().toISOString() }
    })

    if (!lastInsertRowid) {
      console.error("Error al crear el comentario")
      throw new Error("Error al crear el comentario")
    }

    revalidatePath(`/dashboard/herramientas/actividades/${activity_id}`)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}