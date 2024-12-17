import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import { MP_ACCESS_TOKEN, MP_APP_URL, NEXT_PUBLIC_BASE_URL } from "@/lib/env";
import { newAppointment } from "@/server/db/users";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { savePayment } from "@/server/db/payments";

export const mercadopago = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN! });

export const api = {
  appointment: {
    async submit(psychologistId: number, psychologistName: string, psychologistImage: string, utcTimestamp: string, price: number, isPayedInmediately: boolean, sessionType: string) {
      console.log('submit')
      // Creamos la preferencia incluyendo el precio, titulo y metadata. La información de `items` es standard de Mercado Pago. La información que nosotros necesitamos para nuestra DB debería vivir en `metadata`.

      const { userId } = auth();

      if (!userId) {
        console.error('User not authenticated')
        throw new Error('User not authenticated')
      }

      if (!isPayedInmediately) {
        console.log('newAppointment after')

        await newAppointment({
          psychologistId,
          selectedDate: utcTimestamp,
          user_id: userId
        })

        return redirect(`${MP_APP_URL}/dashboard`)
      }

      const preference = await new Preference(mercadopago).create({
        body: {
          items: [
            {
              id: "psychologist-appointment",
              unit_price: 1,
              quantity: 1,
              title: "Psicoterapia",
              description: `Psicoterapia con ${psychologistName} el ${utcTimestamp}`,
              picture_url: psychologistImage,
              currency_id: "USD"
            },
          ],
          back_urls: {
            success: `${MP_APP_URL}/dashboard`,
          },
          auto_return: "approved",
          metadata: {
            psychologistId,
            psychologistName,
            psychologistImage,
            utcTimestamp,
            price,
            sessionType,
            userId
          },
        },
      });

      console.log('preference', preference.init_point!)

      // Devolvemos el init point (url de pago) para que el usuario pueda pagar
      return preference.init_point!;
    },
    async addPayment(id: string, userId: string): Promise<void> {
      console.log('addPayment')

      const payment = await new Payment(mercadopago).get({ id })
      console.log('payment', payment)

      if (payment.status === 'approved') {
        console.log('payment approved')

        await Promise.all([
          savePayment({
            psychologist_id: payment.metadata.psychologistId,
            appointment_id: payment.metadata.appointmentId,
            payment_id: payment.id!.toString(),
            session_type: payment.metadata.sessionType,
            price: payment.metadata.price,
            payment_date: payment.date_approved!,
            user_id: userId
          }),
          newAppointment({
            psychologistId: payment.metadata.psychologistId,
            selectedDate: payment.metadata.utcTimestamp,
            user_id: userId
          })
        ])

        revalidatePath('/dashboard')
      }
    }
  },
};