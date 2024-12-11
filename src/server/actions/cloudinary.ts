"use server"

import { auth } from "@clerk/nextjs/server";
import { turso } from "../db";
import { revalidatePath } from "next/cache";

export async function uploadVideo(public_id: string) {
  console.log("uploadVideo");
  const { userId } = auth();
  if (!userId) {
    console.error("Unauthorized");
    throw new Error("Unauthorized");
  }

  try {
    console.log(public_id);

    const { rows: user } = await turso.execute({
      sql: `SELECT id FROM psicobooking_user WHERE clerk_id = :userId`,
      args: { userId }
    })

    if (user.length === 0 || !user[0]?.id) {
      console.error("User not found");
      throw new Error("User not found");
    }

    const psychologistId = user[0].id;

    const { rowsAffected } = await turso.execute({
      sql: `
        UPDATE psicobooking_user 
        SET video_presentation_url = :public_id 
        WHERE id = :userId
      `,
      args: { public_id, userId: psychologistId }
    })

    if (!rowsAffected) {
      console.error("Failed to update user");
      throw new Error("Failed to insert video");
    }

    console.log("Video inserted", rowsAffected);

    revalidatePath("/dashboard/perfil");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
