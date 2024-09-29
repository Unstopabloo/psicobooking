import "server-only";

import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

type User = typeof users.$inferInsert
type Role = typeof users.$inferSelect["role"]

export async function userExists(id: string): Promise<Boolean> {
  const resultdb = await db.select({ clerk_id: users.clerk_id }).from(users).where(eq(users.clerk_id, id))
  if (resultdb.length > 0) {
    return true
  }

  return false
}

export async function createUser(data: User) {
  try {
    const user = await db.insert(users).values({
      clerk_id: data.clerk_id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      avatar: data.avatar
    }).returning({ insertedId: users.id })

    return { user }
  } catch (error) {
    console.error(error)
    return { error }
  }
}

export async function updateRole(role: Role) {
  console.log('updateRole')
  const { userId } = auth()

  if (!userId) {
    console.log('No user found')
    throw new Error('No user found')
  }

  try {
    const res_id = await db.update(users).set({ role }).where(eq(users.clerk_id, userId)).returning({ updatedId: users.id })
    console.log('res_id', res_id)
    return { res_id }
  } catch (error) {
    console.error(error)
    return { error }
  }
}
