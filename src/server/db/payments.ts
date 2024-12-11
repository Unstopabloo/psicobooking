"server-only"

import { turso } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

interface SavePaymentProps {
  psychologist_id: number
  appointment_id: number
  payment_id: string
  session_type: string
  price: number
  payment_date: string
}

export async function savePayment({ psychologist_id, appointment_id, payment_id, session_type, price, payment_date }: SavePaymentProps) {
  console.log('savePayment')
  const { userId } = auth()
  if (!userId) {
    console.error('No estas autorizado')
    throw new Error('No estas autorizado')
  }

  try {
    const { rows } = await turso.execute({
      sql: `SELECT id FROM psicobooking_user WHERE clerk_id = :user_id`,
      args: { user_id: userId }
    })

    if (rows[0]?.length === 0 || !rows[0]) {
      console.error('No se encontró el paciente')
      throw new Error('No se encontró el paciente')
    }

    const patientId = rows[0].id as number

    const { lastInsertRowid } = await turso.execute({
      sql: `
        INSERT INTO psicobooking_payment 
          (patient_id, psychologist_id, appointment_id, payment_id, session_type, price, payment_date) 
        VALUES 
          (:patient_id, :psychologist_id, :appointment_id, :payment_id, :session_type, :price, :payment_date)
      `,
      args: {
        patient_id: patientId,
        psychologist_id,
        appointment_id,
        payment_id,
        session_type,
        price,
        payment_date
      }
    })

    const paymentId = Number(lastInsertRowid)
    console.log('paymentId', paymentId)
  } catch (error) {
    console.error('Error al guardar el pago', error)
    throw new Error('Error al guardar el pago')
  }
}