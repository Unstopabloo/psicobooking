"use server"

import { auth } from "@clerk/nextjs/server";
import { turso } from "../db";
import { revalidatePath } from "next/cache";

export async function createNote(formData: FormData) {
  console.log("createNote")
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const content = formData.get("content") as string;
    const color = formData.get("color") as string;
    const patient_id = formData.get("patient_id") as string;

    const { rows } = await turso.execute({
      sql: 'SELECT id FROM psicobooking_user WHERE clerk_id = :clerk_id',
      args: { clerk_id: userId }
    })

    if (!rows[0]?.id) {
      console.error("Psychologist not found")
      throw new Error("Psychologist not found")
    }

    const psychologist_id = rows[0].id
    console.log(psychologist_id)

    const { lastInsertRowid } = await turso.execute({
      sql: 'INSERT INTO psicobooking_note (patient_id, psychologist_id, content, color) VALUES (:patient_id, :psychologist_id, :content, :color)',
      args: {
        patient_id,
        psychologist_id,
        content,
        color
      }
    })

    if (!lastInsertRowid) {
      throw new Error("Failed to create note");
    }

    revalidatePath(`dashboard/herramientas/notas`)
    return { success: true }
  } catch (error) {
    console.error(error);
    return { success: false, error: error }
  }
}

export async function updateNote(formData: FormData) {
  console.log("updateNote")
  const { userId } = auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const content = formData.get("content") as string;
    const color = formData.get("color") as string;
    const note_id = formData.get("note_id") as string;
    const psychologist_id = formData.get("psychologist_id") as string;

    const { rowsAffected } = await turso.execute({
      sql: 'UPDATE psicobooking_note SET content = :content, color = :color WHERE id = :note_id AND psychologist_id = :psychologist_id',
      args: {
        note_id,
        content,
        color,
        psychologist_id
      }
    })

    if (rowsAffected === 0) {
      console.error("Failed to update note")
      throw new Error("Failed to update note");
    }

    revalidatePath(`/dashboard/herramientas/notas`)
    return { success: true }
  } catch (error) {
    console.error(error);
    return { success: false, error: error }
  }
}