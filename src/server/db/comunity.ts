"use server"

import { turso } from "@/server/db"
import { auth } from "@clerk/nextjs/server"

export async function getPosts(post_id: string) {
  const { userId } = auth()
  if (!userId) {
    return { error: "Unauthorized" }
  }

  try {
    const { rows } = await turso.execute({
      sql: `
        SELECT 
          post.id,
          post.title,
          post.content,
          post.created_at,
          author.id,
          author.first_name,
          author.last_name,
          author.avatar
        FROM psicobooking_post post
        LEFT JOIN psicobooking_user author ON psicobooking_post.psychologist_id = author.id
        ORDER BY created_at DESC`,
      args: [],
    })

    return rows
  } catch (error) {
    console.error(error)
    return { error: "Internal server error" }
  }
}