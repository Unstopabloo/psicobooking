import { newAppointment } from "@/server/db/users";
import { redirect } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NEXT_PUBLIC_BASE_URL } from "@/lib/env.client";
import { LEMONSQUEEZY_STORE_ID, LEMONSQUEEZY_VARIANT_ID, LEMONSQUEEZY_API_KEY } from "@/lib/env";
import { type NewCheckout, type Checkout, createCheckout } from '@lemonsqueezy/lemonsqueezy.js';
import { lemonSqueezySetup } from "@lemonsqueezy/lemonsqueezy.js";
import { format } from "date-fns";

const apiKey = LEMONSQUEEZY_API_KEY;

lemonSqueezySetup({
  apiKey,
  onError: (error) => console.error("Error!", error),
});


export const api = {
  appointment: {
    async submit(psychologistId: number, psychologistName: string, psychologistImage: string, utcTimestamp: string, price: number, isPayedInmediately: boolean, sessionType: string) {
      console.log('submit')
      console.log('env', apiKey)

      const { userId } = auth();
      if (!userId) {
        console.error('User not authenticated')
        throw new Error('User not authenticated')
      }
      const user = await currentUser();

      // si no se paga inmediatamente, se crea la cita
      if (!isPayedInmediately) {
        console.log('newAppointment after')

        await newAppointment({
          psychologistId,
          selectedDate: utcTimestamp,
          user_id: userId
        })

        return redirect(`${NEXT_PUBLIC_BASE_URL}/dashboard`)
      }

      // si se paga inmediatamente, se crea el checkout
      const storeId = LEMONSQUEEZY_STORE_ID!;
      const variantId = LEMONSQUEEZY_VARIANT_ID!;
      const newCheckout: NewCheckout = {
        productOptions: {
          name: `Cita psicologica con ${psychologistName}`,
          description: `Cita psicologica con ${psychologistName} el ${format(new Date(utcTimestamp), 'dd/MM/yyyy HH:mm')}`,
          media: [psychologistImage],
          redirectUrl: `${NEXT_PUBLIC_BASE_URL}/dashboard`,
          receiptThankYouNote: 'Gracias por agendar tu sesión en breve recibirás un correo con los detalles'
        },
        customPrice: Math.round(price * 100),
        checkoutData: {
          email: user?.emailAddresses[0]?.emailAddress!,
          name: `${user?.firstName} ${user?.lastName}`,
          custom: {
            user_id: userId,
            psychologist_id: `${psychologistId}`,
            psychologist_name: `${psychologistName}`,
            psychologist_image: `${psychologistImage}`,
            utc_timestamp: `${utcTimestamp}`,
            session_type: `${sessionType}`,
            price: `${price}`
          }
        },
      };
      const { statusCode, error, data } = await createCheckout(storeId, variantId, newCheckout);
      if (error) {
        console.error('Error creating checkout', error)
        throw new Error('Error creating checkout')
      }

      console.log('statusCode', statusCode)
      console.log('data', data)
      return data?.data.attributes.url;
    },
  }
}
//     async addPayment(id: string): Promise<void> {
//       console.log('addPayment')

//       const payment = await new Payment(mercadopago).get({ id })

//       if (payment.status === 'approved') {
//         console.log('payment approved')
//         console.log('payment', payment)


//         const appointment = await newAppointment({
//           psychologistId: payment.metadata.psychologist_id,
//           selectedDate: payment.metadata.utc_timestamp,
//           user_id: payment.metadata.user_id
//         })

//         await savePayment({
//           psychologist_id: payment.metadata.psychologist_id,
//           appointment_id: appointment.data,
//           payment_id: payment.id!.toString(),
//           session_type: payment.metadata.session_type,
//           price: payment.metadata.price,
//           payment_date: payment.date_approved!,
//           user_id: payment.metadata.user_id
//         }),

//           revalidatePath('/dashboard')
//       }
//     }
//   },
//   user: {
//     async suscribe(email: string) {
//       console.log('suscribe')

//       try {
//         const { userId } = auth();
//         if (!userId) {
//           console.error('User not authenticated')
//           throw new Error('User not authenticated')
//         }

//         console.log("url", `${MP_APP_URL!}/dashboard`)
//         console.log("email", email)
//         const existingSubscriptions = await this.getSuscriptionByEmail(email);

//         if (existingSubscriptions && existingSubscriptions.length > 0) {
//           console.log('El usuario ya tiene una suscripción activa')
//           throw new Error('El usuario ya tiene una suscripción activa')
//         }

//         const suscription = await new PreApproval(mercadopago).create({
//           body: {
//             back_url: `${MP_APP_URL!}/dashboard`,
//             reason: "Suscripción a Psicobooking",
//             auto_recurring: {
//               frequency: 1,
//               frequency_type: "months",
//               transaction_amount: 2000,
//               currency_id: "CLP",
//             },
//             payer_email: email,
//             status: "pending"
//           }
//         });
//         console.log('suscription', suscription)

//         await saveSubscriptionPending(suscription.id!, userId)

//         return suscription.init_point!;
//       } catch (error) {
//         console.error('Error al suscribir:', error)
//         throw new Error('Error al suscribir')
//       }
//     },
//     async getSuscriptionByEmail(email: string) {
//       try {
//         const suscriptions = await new PreApproval(mercadopago).search({
//           options: {
//             status: 'authorized',
//             payer_email: email
//           }
//         });
//         return suscriptions.results;
//       } catch (error) {
//         console.error('Error al buscar suscripciones:', error)
//         return [];
//       }
//     },
//     async getSuscription(id: string) {
//       console.log('getSuscription')

//       const { userId } = auth();
//       if (!userId) {
//         console.error('User not authenticated')
//         throw new Error('User not authenticated')
//       }

//       const suscription = await new PreApproval(mercadopago).get({ id })
//       console.log("suscription", suscription)

//       return suscription
//     },
//     async cancelSuscription(id: string) {
//       console.log('cancelSuscription')

//       const cancelledSuscription = await new PreApproval(mercadopago).update({
//         id: id,
//         body: {
//           status: "cancelled"
//         }
//       })

//       return cancelledSuscription.init_point!
//     }
//   }
// };

// 178c94e58f6c405698025d0686302939
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



// {
//   "id": "2c938084726fca480172750000000000",
//   "version": 0,
//   "application_id": 1234567812345678,
//   "collector_id": 100200300,
//   "preapproval_plan_id": "2c938084726fca480172750000000000",
//   "reason": "Yoga classes.",
//   "external_reference": 23546246234,
//   "back_url": "https://www.mercadopago.com.ar",
//   "init_point": "https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_id=2c938084726fca480172750000000000",
//   "auto_recurring": {
//     "frequency": 1,
//     "frequency_type": "months",
//     "start_date": "2020-06-02T13:07:14.260Z",
//     "end_date": "2022-07-20T15:59:52.581Z",
//     "currency_id": "ARS",
//     "transaction_amount": 10,
//     "free_trial": {
//       "frequency": 1,
//       "frequency_type": "months"
//     }
//   },
//   "first_invoice_offset": 7,
//   "payer_id": 123123123,
//   "card_id": 123123123,
//   "payment_method_id": "account_money",
//   "next_payment_date": "2022-01-01T11:12:25.892-04:00",
//   "date_created": "2022-01-01T11:12:25.892-04:00",
//   "last_modified": "2022-01-01T11:12:25.892-04:00",
//   "summarized": {
//     "quotas": 6,
//     "charged_quantity": 3,
//     "charged_amount": 1000,
//     "pending_charge_quantity": 1,
//     "pending_charge_amount": 200,
//     "last_charged_date": "2022-01-01T11:12:25.892-04:00",
//     "last_charged_amount": 100,
//     "semaphore": "green"
//   },
//   "status": "pending"
// }