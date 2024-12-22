import { Knock } from "@knocklabs/node";
import { KNOCK_SECRET_KEY } from "./env";
import { auth, currentUser } from "@clerk/nextjs/server";

const knock = new Knock(KNOCK_SECRET_KEY!);

export const sendOnTranscriptReadyInappNotification = async (transcriptName: string) => {
  const user = await currentUser()
  if (!user) {
    console.error("User not found")
    throw new Error("User not found")
  }

  await knock.workflows.trigger("on-transcript-ready-inapp-notification", {
    data: {
      transcription_name: transcriptName,
      name: user.firstName,
    },
    recipients: [
      {
        id: user.id,
        name: user.firstName ?? "",
        email: user.emailAddresses[0]?.emailAddress ?? "",
      }
    ],
  });
};