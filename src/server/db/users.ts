"use server"

import { auth } from "@clerk/nextjs/server";
import { User } from "../users";
import { db } from ".";
import { users } from "./schema";
import { eq } from "drizzle-orm";

export async function getUserById(id: number): Promise<{ user: User | undefined, error?: Error }> {
  console.log('get user')
  const { userId } = auth()

  if (!userId) {
    console.log('No user found')
    return { user: undefined, error: new Error('No user found') }
  }

  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (result.length === 0) {
      return { user: undefined, error: new Error('User not found') };
    }

    return { user: result[0] };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { user: undefined, error: new Error('An error occurred while fetching the user') };
  }
}