import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import { MP_ACCESS_TOKEN, MP_APP_URL } from "@/lib/env";
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
    async addPayment(id: string): Promise<void> {
      console.log('addPayment')

      const payment = await new Payment(mercadopago).get({ id })

      if (payment.status === 'approved') {
        console.log('payment approved')
        console.log('payment', payment)


        const appointment = await newAppointment({
          psychologistId: payment.metadata.psychologist_id,
          selectedDate: payment.metadata.utc_timestamp,
          user_id: payment.metadata.user_id
        })

        await savePayment({
          psychologist_id: payment.metadata.psychologist_id,
          appointment_id: appointment.data,
          payment_id: payment.id!.toString(),
          session_type: payment.metadata.session_type,
          price: payment.metadata.price,
          payment_date: payment.date_approved!,
          user_id: payment.metadata.user_id
        }),

          revalidatePath('/dashboard')
      }
    }
  },
};


// {
//   accounts_info: null,
//   additional_info: {
//     ip_address: '104.28.157.207',
//     items: [
//       {
//         description: 
//           'Psicoterapia con Pablo Oyarce Ramirez el 2024-12-18T20:00:00.000Z',
//         id: 'psychologist-appointment',
//         picture_url: 
//           'https://http2.mlstatic.com/D_NQ_NP_883009-MLC81452828713_122024-F.jpg',
//         quantity: '1',
//         title: 'Psicoterapia',
//         unit_price: '1'
//       }
//     ]
//   },
//   authorization_code: null,
//   binary_mode: false,
//   brand_id: null,
//   build_version: '3.83.0-rc-3',
//   call_for_authorize_id: null,
//   captured: true,
//   card: {},
//   charges_details: [
//     {
//       accounts: { from: 'collector', to: 'mp' },
//       amounts: { original: 38, refunded: 0 },
//       client_id: 0,
//       date_created: '2024-12-17T18:29:08.000-04:00',
//       id: '96320143349-001',
//       last_updated: '2024-12-17T18:29:08.000-04:00',
//       metadata: { source: 'rule-engine' },
//       name: 'mercadopago_fee',
//       refund_charges: [],
//       reserve_id: null,
//       type: 'fee'
//     }
//   ],
//   charges_execution_info: {
//     internal_execution: {
//       date: '2024-12-17T18:29:08.752-04:00',
//       execution_id: '01JFBBTHF3NDWVZ3KHQ13GJGT9'
//     }
//   },
//   collector_id: 2154526351,
//   corporation_id: null,
//   counter_currency: null,
//   coupon_amount: 0,
//   currency_id: 'CLP',
//   date_approved: '2024-12-17T18:29:08.000-04:00',
//   date_created: '2024-12-17T18:29:08.000-04:00',
//   date_last_updated: '2024-12-17T18:29:12.000-04:00',
//   date_of_expiration: null,
//   deduction_schema: null,
//   description: 'Psicoterapia',
//   differential_pricing_id: null,
//   external_reference: null,
//   fee_details: [ { amount: 38, fee_payer: 'collector', type: 'mercadopago_fee' } ],
//   financing_group: null,
//   id: 96320143349,
//   installments: 1,
//   integrator_id: null,
//   issuer_id: '2020',
//   live_mode: true,
//   marketplace_owner: null,
//   merchant_account_id: null,
//   merchant_number: null,
//   metadata: {
//     user_id: 'user_2qBkCfZ3x73rBQIMriA0tF5HLqe',
//     price: 25,
//     psychologist_image: 
//       'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybjRQamN2dE04ZjhFajE4bjN2dU5ueGREZXoifQ',
//     psychologist_name: 'Pablo Oyarce Ramirez',
//     utc_timestamp: '2024-12-18T20:00:00.000Z',
//     session_type: 'online',
//     psychologist_id: 28
//   },
//   money_release_date: '2024-12-17T18:29:08.000-04:00',
//   money_release_schema: null,
//   money_release_status: 'released',
//   notification_url: null,
//   operation_type: 'regular_payment',
//   order: { id: '26261507376', type: 'mercadopago' },
//   payer: {
//     email: 'test_user_698006190@testuser.com',
//     entity_type: null,
//     first_name: null,
//     id: '2157734928',
//     identification: { number: '11111111-1', type: 'RUT' },
//     last_name: null,
//     operator_id: null,
//     phone: { number: null, extension: null, area_code: null },
//     type: null
//   },
//   payment_method: { id: 'account_money', issuer_id: '2020', type: 'account_money' },
//   payment_method_id: 'account_money',
//   payment_type_id: 'account_money',
//   platform_id: null,
//   point_of_interaction: {
//     business_info: {
//       branch: 'Merchant Services',
//       sub_unit: 'checkout_pro',
//       unit: 'online_payments'
//     },
//     transaction_data: { e2e_id: null },
//     type: 'CHECKOUT'
//   },
//   pos_id: null,
//   processing_mode: 'aggregator',
//   refunds: [],
//   release_info: null,
//   shipping_amount: 0,
//   sponsor_id: null,
//   statement_descriptor: null,
//   status: 'approved',
//   status_detail: 'accredited',
//   store_id: null,
//   tags: null,
//   taxes_amount: 0,
//   transaction_amount: 1002,
//   transaction_amount_refunded: 0,
//   transaction_details: {
//     acquirer_reference: null,
//     external_resource_url: null,
//     financial_institution: null,
//     installment_amount: 0,
//     net_received_amount: 964,
//     overpaid_amount: 0,
//     payable_deferral_period: null,
//     payment_method_reference_id: null,
//     total_paid_amount: 1002
//   },
//   api_response: {
//     status: 200,
//     headers: {
//       date: [ 'Tue, 17 Dec 2024 22:47:42 GMT' ],
//       'content-type': [ 'application/json;charset=UTF-8' ],
//       'transfer-encoding': [ 'chunked' ],
//       connection: [ 'keep-alive' ],
//       vary: [ 'Accept-Encoding, Accept,Accept-Encoding' ],
//       'cache-control': [ 'max-age=0' ],
//       'x-content-type-options': [ 'nosniff' ],
//       'x-request-id': [ 'ac30846e-d1d5-4aab-be51-9220ef92c3a8' ],
//       'x-xss-protection': [ '1; mode=block' ],
//       'strict-transport-security': [ 'max-age=16070400; includeSubDomains; preload' ],
//       'access-control-allow-origin': [ '*' ],
//       'access-control-allow-headers': [ 'Content-Type' ],
//       'access-control-allow-methods': [ 'PUT, GET, POST, DELETE, OPTIONS' ],
//       'access-control-max-age': [ '86400' ],
//       'timing-allow-origin': [ '*' ],
//       'content-encoding': [ 'gzip' ]
//     }
//   }
// }