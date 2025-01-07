"use server"

import { api } from "@/lib/payments/lemonsqueezy"
import { redirect } from "next/navigation"
import { cancelSuscription as cancelSuscriptionDb } from "@/server/db/payments"
import { auth } from "@clerk/nextjs/server"

export async function suscribe() {
  console.log('suscribe')
  const { userId } = auth()
  if (!userId) {
    throw new Error('User not found')
  }

  const initPoint = await api.user.suscribe()
  console.log('suscribe done')
  redirect(initPoint)
}

export async function cancelSuscription(id: string) {
  console.log('cancelSuscription', id)
  const { userId } = auth()
  if (!userId) {
    throw new Error('User not found')
  }

  const suscription = await api.user.cancelSuscription(id)
  return suscription
}
