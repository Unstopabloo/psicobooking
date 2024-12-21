import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { MP_WH_SECRET } from "@/lib/env";

const webhookSecret = MP_WH_SECRET!;

export async function validateRequest(payloadString: string, headerPayload: Headers) {
  console.log("validateRequest")
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id") as string,
    "svix-timestamp": headerPayload.get("svix-timestamp") as string,
    "svix-signature": headerPayload.get("svix-signature") as string,
  };
  console.log("svixHeaders", svixHeaders)
  const wh = new Webhook(webhookSecret);
  return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}