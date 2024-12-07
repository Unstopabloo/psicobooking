"use server"

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";
import { newAppointment } from "./users";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export async function createCheckoutSession(psychologistId: number, psychologistName: string, psychologistImage: string, time: string, price: number) {
  console.log('createCheckoutSession', psychologistId, psychologistName, psychologistImage, time, price)

  const { userId } = auth();

  if (!userId) {
    console.error('User not authenticated')
    return { error: "User not authenticated" };
  }

  if (!psychologistName || !psychologistImage || !time || !price) {
    console.error('Missing required fields')
    return { error: "Missing required fields" };
  }

  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_API_URL}/stripe/checkout?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
    line_items: [{
      price_data: {
        currency: "usd",
        product_data: {
          name: `Sesión de psicoterapia con ${psychologistName}`,
          description: `Sesión de 1 hora para fecha de: ${format(new Date(time), 'EEEE dd MMMM, yyyy, HH:mm', { locale: es })}`,
          images: [psychologistImage]
        },
        unit_amount: price * 100,
      },
      quantity: 1
    },
    ],
    payment_method_types: ['card'],
    payment_intent_data: {
      metadata: {
        psychologistId,
        time
      }
    },
    locale: 'es',
    mode: "payment",
  });

  console.log(session);

  if (!session.url) {
    console.error('No se pudo crear la sesión de Stripe')
    return { error: "No se pudo crear la sesión de Stripe" };
  }

  redirect(session.url!);
}
