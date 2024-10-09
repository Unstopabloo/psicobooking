"use server"

import { authAction } from "@/lib/safe-action"
import { onBoardingSchema } from "./action-schemas";
import { clerkClient } from "@clerk/nextjs/server";
import { updateRole } from "../db/users";

export const onBoarding = authAction
  .schema(onBoardingSchema)
  .action(async ({ parsedInput, ctx: { userId } }) => {
    try {
      console.log('parsedeInput', parsedInput)
      const [clerkUpdateUser, roleUpdateResult] = await Promise.all([
        clerkClient().users.updateUser(userId, {
          publicMetadata: {
            onboardingComplete: true,
            role: parsedInput.role,
          }
        }),
        updateRole(parsedInput.role!)
      ]);

      if (roleUpdateResult.error) {
        throw new Error("Error al actualizar el rol de usuario");
      }

      return {
        message: clerkUpdateUser.publicMetadata,
        roleUpdateId: roleUpdateResult.res_id
      }
    } catch (error) {
      console.error(error)
      return { error }
    }
  }) 