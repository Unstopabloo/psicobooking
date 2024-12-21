import { api, mercadopago } from "@/lib/mercado-pago";
import { saveSubscriptionAuthorized } from "@/server/db/payments";
import { PreApproval } from "mercadopago";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  console.log("POST")
  const body: {
    data: { id: string }
    type: string
  } = await request.json();
  const id = body.data.id;

  console.log("body", body)
  console.log("id", id)

  // suscripción
  if (body.type === "subscription_preapproval") {
    console.log("subscription_preapproval")
    const preapproval = await new PreApproval(mercadopago).get({ id });
    console.log("preapproval", preapproval)

    if (preapproval.status === "authorized") {
      console.log("preapproval authorized")
      if (!preapproval.id) {
        console.error("No se pudo obtener el id de la suscripción")
        return new Response('Subscription Error', { status: 400 })
      }

      await saveSubscriptionAuthorized(preapproval.id, preapproval.date_created!)
      return new Response('Subscription authorized', { status: 200 })
    }

    return new Response('Subscription Error', { status: 400 })
  }

  // pago
  if (body.type === "payment") {
    console.log("payment")
    await api.appointment.addPayment(id)
    return new Response('Payment added', { status: 200 })
  }

  return new Response('Not implemented', { status: 400 })
}

/*
preapproval {
  id: '178c94e58f6c405698025d0686302939',
  payer_id: 2157734928,
  payer_email: '',
  back_url: 'https://b118-2a09-bac1-1880-10-00-26-8e.ngrok-free.app/dashboard',
  collector_id: 2154526351,
  application_id: 507085579428350,
  status: 'authorized',
  reason: 'Suscripción de psicologos a Psicobooking',
  date_created: '2024-12-19T21:19:34.979-04:00',
  last_modified: '2024-12-19T21:19:59.587-04:00',
  init_point: 'https://www.mercadopago.cl/subscriptions/checkout?preapproval_id=178c94e58f6c405698025d0686302939',
  auto_recurring: {
    frequency: 1,
    frequency_type: 'months',
    transaction_amount: 1000,
    currency_id: 'CLP',
    free_trial: null
  },
  summarized: {
    quotas: null,
    charged_quantity: null,
    pending_charge_quantity: null,
    charged_amount: null,
    pending_charge_amount: null,
    semaphore: null,
    last_charged_date: null,
    last_charged_amount: null
  },
  next_payment_date: '2025-01-19T21:19:58.000-04:00',
  payment_method_id: 'account_money',
  payment_method_id_secondary: null,
  first_invoice_offset: null,
  subscription_id: '178c94e58f6c405698025d0686302939',
  api_response: {
    status: 200,
    headers: [Object: null prototype] {
      date: [Array],
      'content-type': [Array],
      'transfer-encoding': [Array],
      connection: [Array],
      vary: [Array],
      'x-request-id': [Array],
      'x-content-type-options': [Array],
      'x-xss-protection': [Array],
      'strict-transport-security': [Array],
      'access-control-allow-origin': [Array],
      'access-control-allow-headers': [Array],
      'access-control-allow-methods': [Array],
      'access-control-max-age': [Array],
      'timing-allow-origin': [Array],
      'content-encoding': [Array]
    }
  }
}
*/