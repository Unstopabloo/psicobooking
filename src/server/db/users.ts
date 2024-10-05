"use server"

import { auth } from "@clerk/nextjs/server";
import { User } from "../users";
import { db } from ".";
import { appointments, users } from "./schema";
import { eq, sql } from "drizzle-orm";

export async function getUserById(id: number): Promise<{ user: User | undefined, error?: Error }> {
  console.log('get user')
  const { userId } = auth()

  if (!userId) {
    console.log('No user found')
    return { user: undefined, error: new Error('No user found') }
  }

  try {
    const result: any = await db
      .select({
        id: users.id,
        clerk_id: users.clerk_id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        role: users.role,
        avatar: sql<string>`COALESCE(${users.avatar}, '')`,
        specialty: sql<string>`COALESCE(${users.specialty}, '')`,
        phone: users.phone,
        nationality: users.nationality,
        gender: users.gender,
        birthDay: sql<number>`COALESCE(CAST((julianday('now') - julianday(${users.birthDay})) / 365.25 AS INTEGER), 0)`,
        occupation: users.occupation,
        country: users.country,
        state: users.state,
        city: users.city,
        street: users.street,
        numHouse: users.numHouse,
        createdAt: users.createdAt
      })
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