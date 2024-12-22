"server-only"

import { turso } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { paymentsDTO, paymentsStateDTO } from "../dtos";
import { PaymentState, Row } from "@/types/entities";

interface SavePaymentProps {
  psychologist_id: number
  appointment_id: number
  payment_id: string
  session_type: string
  price: number
  payment_date: string
  user_id: string
}

export async function savePayment({ psychologist_id, appointment_id, payment_id, session_type, price, payment_date, user_id }: SavePaymentProps) {
  console.log('savePayment')

  if (!user_id) {
    console.error('No estas autorizado')
    throw new Error('No estas autorizado')
  }

  try {
    const { rows: verifyPayment } = await turso.execute({
      sql: `SELECT id FROM psicobooking_payment WHERE payment_id = :payment_id`,
      args: { payment_id: payment_id }
    })

    if (verifyPayment[0]?.length! > 0 && verifyPayment[0]) {
      console.error('El pago ya existe')
      throw new Error('El pago ya existe')
    }

    const { rows } = await turso.execute({
      sql: `SELECT id FROM psicobooking_user WHERE clerk_id = :user_id`,
      args: { user_id: user_id }
    })

    if (rows[0]?.length === 0 || !rows[0]) {
      console.error('No se encontró el paciente')
      throw new Error('No se encontró el paciente')
    }

    const patientId = rows[0].id as number

    const { lastInsertRowid } = await turso.execute({
      sql: `
        INSERT INTO psicobooking_payment 
          (patient_id, psychologist_id, appointment_id, payment_id, session_type, price, payment_date, creation_date) 
        VALUES 
          (:patient_id, :psychologist_id, :appointment_id, :payment_id, :session_type, :price, :payment_date, :creation_date)
      `,
      args: {
        patient_id: patientId,
        psychologist_id,
        appointment_id,
        payment_id,
        session_type,
        price,
        payment_date: new Date(payment_date).toISOString(),
        creation_date: new Date().toISOString()
      }
    })

    const paymentId = Number(lastInsertRowid)
    console.log('paymentId', paymentId)
  } catch (error) {
    console.error('Error al guardar el pago', error)
    throw new Error('Error al guardar el pago')
  }
}

export async function getPayments() {
  const { userId } = auth()
  if (!userId) {
    console.error('No estas autorizado')
    throw new Error('No estas autorizado')
  }

  try {
    const { rows: userRows } = await turso.execute({
      sql: `SELECT id FROM psicobooking_user WHERE clerk_id = :user_id`,
      args: { user_id: userId }
    })

    if (userRows[0]?.length === 0 || !userRows[0]) {
      console.error('No se encontró el paciente')
      throw new Error('No se encontró el paciente')
    }

    const psychologistId = userRows[0].id as number

    const { rows } = await turso.execute({
      sql: `
        WITH monthly_stats AS (
          SELECT 
            id,
            CAST(strftime('%m', substr(payment_date, 1, 10)) AS INTEGER) as month_num,
            CAST(strftime('%Y', substr(payment_date, 1, 10)) AS INTEGER) as year,
            COUNT(*) as citas,
            SUM(CAST(price AS DECIMAL) / 100.0) as ingresos
          FROM psicobooking_payment
          WHERE psychologist_id = :psychologist_id
            AND payment_date IS NOT NULL
            AND date(substr(payment_date, 1, 10)) >= date('now', '-11 months', 'start of month')
          GROUP BY year, month_num
          ORDER BY year DESC, month_num DESC
          LIMIT 12
        )
        SELECT 
          id,
          CASE month_num
            WHEN 1 THEN 'Enero'
            WHEN 2 THEN 'Febrero'
            WHEN 3 THEN 'Marzo'
            WHEN 4 THEN 'Abril'
            WHEN 5 THEN 'Mayo'
            WHEN 6 THEN 'Junio'
            WHEN 7 THEN 'Julio'
            WHEN 8 THEN 'Agosto'
            WHEN 9 THEN 'Septiembre'
            WHEN 10 THEN 'Octubre'
            WHEN 11 THEN 'Noviembre'
            WHEN 12 THEN 'Diciembre'
          END as month,
          ingresos,
          citas
        FROM monthly_stats
        ORDER BY year DESC, month_num DESC;
      `,
      args: { psychologist_id: psychologistId }
    })


    console.log('rows', rows)
    const payments = paymentsDTO(rows)
    console.log('payments', payments)

    // Fill in missing months with zero values if less than 12 months of data
    const allMonths = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    // llenar los meses faltantes con ceros
    while (payments.length < 12) {
      const lastMonth = payments[payments.length - 1]?.month;
      const lastMonthIndex = allMonths.indexOf(lastMonth as string);
      const newMonthIndex = (lastMonthIndex - 1 + 12) % 12;
      payments.push({
        id: 0,
        month: allMonths[newMonthIndex] as string,
        ingresos: 0,
        citas: 0
      });
    }

    // dar vuelta el array para que el mes mas antiguo este al principio
    payments.reverse();
    console.log('payments', payments)

    // Calcular el porcentaje de crecimiento del ��ltimo mes
    let crecimientoIngresos = 0;
    if (payments.length >= 2) {
      const ultimoMes = payments[payments.length - 1]!.ingresos;
      const penultimoMes = payments[payments.length - 2]!.ingresos;

      if (penultimoMes === 0 && ultimoMes > 0) {
        crecimientoIngresos = 100; // Incremento del 100% si el mes anterior no tenía ingresos
      } else if (penultimoMes > 0) {
        crecimientoIngresos = ((ultimoMes - penultimoMes) / penultimoMes) * 100;
      }
    }

    console.log('crecimientoIngresos', crecimientoIngresos);

    return { payments, crecimientoIngresos }
  } catch (error) {
    console.error('Error al obtener los pagos', error)
    throw new Error('Error al obtener los pagos')
  }
}

export async function getPaymentsState(): Promise<{ state: string, count: number, label: string, fill: string }[]> {
  const { userId } = auth()
  if (!userId) {
    console.error('No estás autorizado')
    throw new Error('No estás autorizado')
  }

  try {
    const { rows } = await turso.execute({
      sql: `
        SELECT 
          pa.state,
          COUNT(*) as count
        FROM psicobooking_payment pp
        LEFT JOIN psicobooking_user pu ON pp.psychologist_id = pu.id
        LEFT JOIN psicobooking_appointment pa ON pp.appointment_id = pa.id
        WHERE pu.clerk_id = :user_id
        GROUP BY pa.state
      `,
      args: { user_id: userId }
    });
    const allStates = ['scheduled', 'cancelled', 'completed']
    const stateCountMap: { [key: string]: number } = {}
    rows.forEach((row: Row) => {
      stateCountMap[row.state as string] = row.count as number
    })

    const chartData = allStates.map(state => ({
      state,
      count: stateCountMap[state] || 0,
      label: state.charAt(0).toUpperCase() + state.slice(1),
      fill: state === 'scheduled' ? 'hsl(var(--primary))' : state === 'cancelled' ? 'hsl(var(--secondary))' : 'hsl(var(--success))'
    }))

    console.log('chartData', chartData)
    return chartData
  } catch (error) {
    console.error('Error al obtener el estado de los pagos', error)
    throw new Error('Error al obtener el estado de los pagos')
  }
}

export async function saveSubscriptionPending(subscription: string, suscriptionDate: string) {
  console.log('saveSubscription', subscription)

  if (!subscription || !suscriptionDate) {
    console.error('No se proporcionaron los datos necesarios')
    throw new Error('No se proporcionaron los datos necesarios')
  }

  const { userId } = auth()
  if (!userId) {
    console.error('No estás autorizado')
    throw new Error('No estás autorizado')
  }

  try {
    const { rows } = await turso.execute({
      sql: `SELECT id FROM psicobooking_suscription WHERE suscription_id = :subscription`,
      args: { subscription: subscription }
    })
    if (rows[0]?.length! > 0) {
      console.error('La suscripción ya existe')
      throw new Error('La suscripción ya existe')
    }

    const { rows: psychologistRows } = await turso.execute({
      sql: `SELECT id FROM psicobooking_user WHERE clerk_id = :user_id`,
      args: { user_id: userId }
    })
    const psychologistId = psychologistRows[0]?.id as number

    const { lastInsertRowid } = await turso.execute({
      sql: `
        INSERT INTO psicobooking_suscription (psychologist_id, suscription_id, status) VALUES (:psychologist_id, :suscription_id, :status)
      `,
      args: {
        psychologist_id: psychologistId,
        suscription_id: subscription,
        status: 'pending'
      }
    })

    const subscriptionId = Number(lastInsertRowid)
    console.log('subscriptionId', subscriptionId)

    return subscriptionId
  } catch (error) {
    console.error('Error al guardar la suscripción', error)
    throw new Error('Error al guardar la suscripción')
  }

}

export async function saveSubscriptionAuthorized(subscription: string, suscriptionDate: string) {
  console.log('saveSubscriptionAuthorized', subscription)

  if (!subscription || !suscriptionDate) {
    console.error('No se proporcionaron los datos necesarios')
    throw new Error('No se proporcionaron los datos necesarios')
  }

  try {
    const { rows } = await turso.execute({
      sql: `SELECT id FROM psicobooking_suscription WHERE suscription_id = :subscription`,
      args: { subscription: subscription }
    })
    if (rows[0]?.length! === 0 || !rows[0]) {
      console.error('La suscripción no existe')
      throw new Error('La suscripción no existe')
    }

    const { rowsAffected } = await turso.execute({
      sql: `
        UPDATE psicobooking_suscription SET status = :status, suscription_date = :suscription_date WHERE suscription_id = :suscription_id
      `,
      args: {
        suscription_id: subscription,
        status: 'authorized',
        suscription_date: suscriptionDate
      }
    })

    const subscriptionId = Number(rowsAffected)
    console.log('suscripcion modificada', subscriptionId)

    return subscriptionId
  } catch (error) {
    console.error('Error al guardar la suscripción', error)
    throw new Error('Error al guardar la suscripción')
  }

}

export async function getSuscription(userId: string) {
  if (!userId) {
    console.error('No estás autorizado')
    throw new Error('No estás autorizado')
  }

  try {
    const { rows } = await turso.execute({
      sql: `
        SELECT 
          suscription_id, 
          status,
          psychologist_id
        FROM psicobooking_suscription
        LEFT JOIN psicobooking_user ON psicobooking_suscription.psychologist_id = psicobooking_user.id
        WHERE psicobooking_user.clerk_id = :user_id
      `,
      args: { user_id: userId }
    })

    console.log('rows suscripcion', rows)

    const suscription = {
      id: rows[0]?.suscription_id as string,
      status: rows[0]?.status as string
    }

    console.log('suscription getSuscription', suscription)

    return suscription
  } catch (error) {
    console.error('Error al obtener la suscripción', error)
    throw new Error('Error al obtener la suscripción')
  }
}
