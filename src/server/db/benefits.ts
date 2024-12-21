import { auth } from "@clerk/nextjs/server";
import { turso } from ".";
import { benefitsDTO } from "../dtos";

export async function getBenefits() {
  const { userId } = auth();
  if (!userId) {
    console.error("Unauthorized");
    throw new Error("Unauthorized");
  }

  try {
    const { rows } = await turso.execute({
      sql: "SELECT * FROM psicobooking_benefit",
      args: [],
    });

    if (rows.length === 0) {
      return [];
    }

    return benefitsDTO(rows);
  } catch (error) {
    console.error("Error getting benefits", error);
    throw new Error("Error getting benefits");
  }
}
