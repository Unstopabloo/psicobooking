"use server"

import { authAction } from "@/lib/safe-action"
import { onBoardingSchema } from "./action-schemas";
import { clerkClient } from "@clerk/nextjs/server";

export const onBoarding = authAction
  .schema(onBoardingSchema)
  .action(async ({ parsedInput, ctx: { userId } }) => {
    try {
      const res = await clerkClient().users.updateUser(userId, {
        publicMetadata: {
          onboardingComplete: true,
          role: parsedInput.role,
        }
      })

      return { message: res.publicMetadata }
    } catch (error) {
      console.error(error)
      return { error: "Hubo un error al completar el proceso de registro. Por favor, inténtalo de nuevo más tarde." }
    }
  })