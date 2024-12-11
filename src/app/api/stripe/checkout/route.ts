import { savePayment } from "@/server/db/payments";
import { newAppointment } from "@/server/db/users";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(request: NextRequest) {
  console.log('GET /stripe/checkout')
  const { userId } = auth()

  if (!userId) {
    console.error('User not authenticated')
    return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
  }

  const sessionId = request.nextUrl.searchParams.get('session_id')

  if (!sessionId) {
    console.log('redirecting to dashboard')
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`)
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent']
    })

    if (!session.payment_intent || typeof session.payment_intent === 'string') {
      console.error('Invalid payment intent data from Stripe.')
      throw new Error('Invalid payment intent data from Stripe.');
    }

    const paymentIntent = session.payment_intent as Stripe.PaymentIntent
    console.log(paymentIntent)
    console.log(session)

    if (!paymentIntent.metadata.psychologistId || !paymentIntent.metadata.time) {
      console.error('Missing required fields')
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // guardar appointment
    const { data: appointmentId } = await newAppointment({
      psychologistId: parseInt(paymentIntent.metadata.psychologistId),
      selectedDate: paymentIntent.metadata.time
    })

    // guardar payment
    await savePayment({
      appointment_id: appointmentId,
      payment_id: paymentIntent.id,
      psychologist_id: parseInt(paymentIntent.metadata.psychologistId),
      session_type: paymentIntent.metadata.sessionType || 'online',
      price: paymentIntent.amount,
      payment_date: paymentIntent.metadata.time
    })

    // TODO: enviar email de confirmación


    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/`)
  } catch (error) {
    console.error('Error al procesar la sesión de Stripe', error)
    return NextResponse.json({ error: "Error al procesar la sesión de Stripe" }, { status: 500 });
  }
}

/*

{
    id: 'cs_test_a1iQyKNIAHpkpGncBK6aauUYV4OhBc53AODVxVQUVrghjSmJQKKtghxiOJ',
    object: 'checkout.session',
    adaptive_pricing: { enabled: false },
    after_expiration: null,
    allow_promotion_codes: null,
    amount_subtotal: 2000,
    amount_total: 2000,
    automatic_tax: { enabled: false, liability: null, status: null },
    billing_address_collection: null,
    cancel_url: 'http://localhost:3000/api/dashboard',
    client_reference_id: null,
    client_secret: null,
    consent: null,
    consent_collection: null,
    created: 1733612738,
    currency: 'usd',
    currency_conversion: null,
    custom_fields: [],
    custom_text: {
      after_submit: null,
      shipping_address: null,
      submit: null,
      terms_of_service_acceptance: null
    },
    customer: null,
    customer_creation: 'if_required',
    customer_details: {
      address: {
        city: null,
        country: 'CL',
        line1: null,
        line2: null,
        postal_code: null,
        state: null
      },
      email: 'pablooyarceramirez@gmail.com',
      name: 'Pablo Oyarce',
      phone: null,
      tax_exempt: 'none',
      tax_ids: []
    },
    customer_email: null,
    expires_at: 1733699138,
    invoice: null,
    invoice_creation: {
      enabled: false,
      invoice_data: {
        account_tax_ids: null,
        custom_fields: null,
        description: null,
        footer: null,
        issuer: null,
        metadata: {},
        rendering_options: null
      }
    },
    livemode: false,
    locale: 'es',
    metadata: {},
    mode: 'payment',
    payment_intent: {
      id: 'pi_3QTX4OENGCSQ2wwB0RYop5SU',
      object: 'payment_intent',
      amount: 2000,
      amount_capturable: 0,
      amount_details: { tip: {} },
      amount_received: 2000,
      application: null,
      application_fee_amount: null,
      automatic_payment_methods: null,
      canceled_at: null,
      cancellation_reason: null,
      capture_method: 'automatic_async',
      client_secret: 'pi_3QTX4OENGCSQ2wwB0RYop5SU_secret_5PPH9td46y4GZztmHi8C1qOfl',
      confirmation_method: 'automatic',
      created: 1733612752,
      currency: 'usd',
      customer: null,
      description: null,
      invoice: null,
      last_payment_error: null,
      latest_charge: 'ch_3QTX4OENGCSQ2wwB0KRs4OCt',
      livemode: false,
      metadata: { psychologistId: '28', time: '2024-12-12T14:30:00.000Z' },
      next_action: null,
      on_behalf_of: null,
      payment_method: 'pm_1QTX4NENGCSQ2wwBJC35aeqS',
      payment_method_configuration_details: null,
      payment_method_options: {
        card: {
          installments: null,
          mandate_options: null,
          network: null,
          request_three_d_secure: 'automatic'
        }
      },
      payment_method_types: [ 'card' ],
      processing: null,
      receipt_email: null,
      review: null,
      setup_future_usage: null,
      shipping: null,
      source: null,
      statement_descriptor: null,
      statement_descriptor_suffix: null,
      status: 'succeeded',
      transfer_data: null,
      transfer_group: null
    },
    payment_link: null,
    payment_method_collection: 'if_required',
    payment_method_configuration_details: null,
    payment_method_options: { card: { request_three_d_secure: 'automatic' } },
    payment_method_types: [ 'card' ],
    payment_status: 'paid',
    phone_number_collection: { enabled: false },
    recovered_from: null,
    saved_payment_method_options: null,
    setup_intent: null,
    shipping_address_collection: null,
    shipping_cost: null,
    shipping_details: null,
    shipping_options: [],
    status: 'complete',
    submit_type: null,
    subscription: null,
    success_url: 
      'http://localhost:3000/api/stripe/checkout?session_id={CHECKOUT_SESSION_ID}',
    total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
    ui_mode: 'hosted',
    url: null,

*/