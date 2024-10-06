"use server"

import { auth } from "@clerk/nextjs/server";
import { turso } from ".";
import { User } from "@/types/entities";

export async function getUserById(id: number): Promise<{ user: any | undefined, error?: Error }> {
  console.log('get user')
  const { userId } = auth()

  if (!userId) {
    console.log('No user found')
    return { user: undefined, error: new Error('No user found') }
  }

  try {
    const { rows } = await turso.execute({
      sql: `SELECT 
              id,
              clerk_id,
              first_name,
              last_name,
              email,
              role,
              avatar,
              specialty,
              phone,
              nationality,
              gender,
              birth_day,
              occupation,
              country,
              state,
              city,
              street,
              num_house,
              created_at
            FROM psicobooking_user
            WHERE id = ?
            LIMIT 1`,
      args: [id]
    })

    if (rows[0]?.length === 0) {
      return { user: undefined, error: new Error('User not found') };
    }

    const user = rows[0]
    return { user };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { user: undefined, error: new Error('An error occurred while fetching the user') };
  }
}