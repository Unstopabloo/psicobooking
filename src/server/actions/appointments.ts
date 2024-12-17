"use server"

import { api } from "@/lib/mercado-pago";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function appointmentMercadoPago(
  psychologistId: number,
  psychologistName: string,
  psychologistImage: string,
  utcTimestamp: string,
  price: number,
  isPayedInmediately: boolean,
  sessionType: string
) {
  console.log('appointmentMercadoPago')
  const { userId } = auth();

  if (!userId) {
    console.error('User not authenticated')
    throw new Error('User not authenticated')
  }

  const url = await api.appointment.submit(psychologistId, psychologistName, psychologistImage, utcTimestamp, price, isPayedInmediately, sessionType)
  console.log('url', url)
  redirect(url)
}