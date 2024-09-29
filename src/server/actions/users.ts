"use server"

import { eq } from "drizzle-orm"
import { db } from "../db"
import { users } from "../db/schema"

export async function checkUserExists(id: string): Promise<Boolean> {
  const resultdb = await db.select({ clerk_id: users.clerk_id }).from(users).where(eq(users.clerk_id, id))

  console.log(resultdb)
  return true
}