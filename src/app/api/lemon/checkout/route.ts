import crypto from "node:crypto";
import { webhookHasMeta } from "@/lib/typeguards";
import { LEMONSQUEEZY_WEBHOOK_SECRET } from "@/lib/env";
import { type LemonWebhookResponse } from "@/types/entities";
import { newAppointment } from "@/server/db/users";
import { cancelSuscription, savePayment, saveSubscription } from "@/server/db/payments";

export async function POST(request: Request) {
  console.log('LEMONSQUEEZY')

  if (!LEMONSQUEEZY_WEBHOOK_SECRET) {
    return new Response("Lemon Squeezy Webhook Secret not set in .env", {
      status: 500,
    });
  }

  /* -------------------------------------------------------------------------- */
  /*             First, make sure the request is from Lemon Squeezy.            */
  /* -------------------------------------------------------------------------- */

  // Get the raw body content.
  const rawBody = await request.text();

  // Get the webhook secret from the environment variables.
  const secret = LEMONSQUEEZY_WEBHOOK_SECRET;

  // Get the signature from the request headers.
  const signature = Buffer.from(
    request.headers.get("X-Signature") ?? "",
    "hex",
  );

  // Create a HMAC-SHA256 hash of the raw body content using the secret and
  // compare it to the signature.
  const hmac = Buffer.from(
    crypto.createHmac("sha256", secret).update(rawBody).digest("hex"),
    "hex",
  );

  if (!crypto.timingSafeEqual(hmac, signature)) {
    return new Response("Invalid signature", { status: 400 });
  }

  /* -------------------------------------------------------------------------- */
  /*                                Valid request                               */
  /* -------------------------------------------------------------------------- */

  const data = JSON.parse(rawBody) as LemonWebhookResponse;

  console.log('data', data)
  // Type guard to check if the object has a 'meta' property.
  if (webhookHasMeta(data)) {

    // Order created
    if (data.meta.event_name === 'order_created') {
      console.log('order_created')
      if (data.data.attributes.status !== 'paid') {
        return new Response("Checkout not paid", { status: 400 });
      }

      const { custom_data } = data.meta;

      const appointment = await newAppointment({
        psychologistId: Number(custom_data.psychologist_id),
        selectedDate: custom_data.utc_timestamp,
        user_id: custom_data.user_id,
      })

      await savePayment({
        psychologist_id: Number(custom_data.psychologist_id),
        appointment_id: Number(appointment.data),
        payment_id: data.data.id,
        session_type: custom_data.session_type,
        price: Number(custom_data.price),
        payment_date: custom_data.utc_timestamp,
        user_id: custom_data.user_id,
      })

      return new Response("OK", { status: 200 });
    }










    // Suscription created
    if (data.meta.event_name === 'subscription_created') {
      console.log('subscription_created')
      const { custom_data } = data.meta;
      const susId = await saveSubscription({
        psychologistId: custom_data.user_id,
        subscription: data.data.id,
        suscriptionDate: data.data.attributes.created_at,
        renewalDate: data.data.attributes.renews_at,
        status: data.data.attributes.status
      })

      console.log('susId', susId)
      return new Response("OK", { status: 200 });
    }




    // Suscription cancelled
    if (data.meta.event_name === 'subscription_cancelled') {
      console.log('subscription_cancelled')
      console.log('data', data)
      const { custom_data } = data.meta;
      const susId = await cancelSuscription(data.data.id, custom_data.user_id)
      console.log('susId', susId)
      return new Response("OK", { status: 200 });
    }
  }

  return new Response("Ok", { status: 200 });
}