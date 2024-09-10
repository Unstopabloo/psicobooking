import { auth } from "@clerk/nextjs/server";
import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";

class ActionError extends Error { }

export const actionClient = createSafeActionClient({
  handleServerError(error) {
    console.error(error)

    if (error instanceof ActionError) {
      return error.message
    }

    return DEFAULT_SERVER_ERROR_MESSAGE
  }
})

export const authAction = actionClient.use(async ({ next }) => {
  const { userId } = auth()

  if (!userId) {
    throw new ActionError("No user found")
  }

  return next({ ctx: { userId } })
})