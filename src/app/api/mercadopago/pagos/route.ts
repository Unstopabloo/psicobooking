import { serve } from "@upstash/workflow/nextjs";
import { WebhookEvent } from "@clerk/nextjs/server";
import { validateRequest } from "@/lib/webhook-event";
import { mercadopago } from "@/lib/mercado-pago";

export const { POST } = serve<string>(async (context) => {
  const payload = context.requestPayload;
  const headersPayload = context.headers;
  console.log("payload", payload)
  console.log("headersPayload", headersPayload)
  let event: WebhookEvent
  event = await validateRequest(payload, headersPayload);
  console.log("event", event)

  await context.run('addPayment', async () => {
    console.log("addPayment")
    console.log("event", event)

    if (!event.data.id) {
      console.log('No se ha proporcionado un ID de pago')
      throw new Error("No se ha proporcionado un ID de pago");
    }
    // await api.appointment.addPayment(event.data.id)
  })
},
  {
    initialPayloadParser: (payload) => {
      return payload;
    },
  }
)