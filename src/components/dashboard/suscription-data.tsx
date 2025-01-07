import SuscriptionForm from "../forms/suscription-form"
import { getSuscription } from "@/server/db/payments"
import { differenceInDays, format } from "date-fns"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { auth } from "@clerk/nextjs/server"
import { CreditCard } from 'lucide-react'
import { es } from "date-fns/locale"
import H1 from "../H1"
import { SuscriptionPlanData } from "./suscription-plan-data"

export async function SubscriptionData() {
  const { userId } = auth()

  if (!userId) {
    return <div>No estás autorizado</div>
  }

  const suscription = await getSuscription(userId)

  const daysLeft = differenceInDays(new Date(suscription.renewal_date), new Date())
  const percentage = (daysLeft / (suscription.status === "on_trial" ? 10 : 30))
  const resto = 1 - percentage
  const progress = Math.round(resto * 100)

  if (suscription.status !== 'active' && suscription.status !== 'on_trial' || !suscription) {
    return (
      <section className="flex flex-col items-start justify-center gap-4">
        <div className="flex flex-col items-start justify-center gap-4 bg-card/60 border p-4 rounded-md">
          <header className="flex items-center justify-between pb-10">
            <div className="flex flex-col items-start justify-center gap-1">
              <H1>Gestión de Suscripción</H1>
              <p className="text-muted-foreground">Aquí podrás ver los datos financieros de tu cuenta.</p>
            </div>
          </header>
          <SuscriptionForm />
        </div>
      </section>
    )
  }


  return (
    <section className="py-10">
      <div className="flex flex-col items-start justify-center gap-4">
        <header className="flex items-center justify-between w-full pb-10">
          <div className="flex flex-col items-start justify-center gap-1">
            <H1>Gestión de Suscripción</H1>
            <p className="text-muted-foreground">Aquí podrás ver los datos financieros de tu cuenta.</p>
          </div>
          <SuscriptionPlanData suscription_id={suscription.id} status={suscription.status} />
        </header>
        <div className="grid gap-6 md:grid-cols-2 w-full">
          <article>
            <header className="pb-8">
              <h3 className="font-medium">Detalles de Suscripción</h3>
              <p className="text-muted-foreground">Información sobre tu plan actual</p>
            </header>
            <div>
              <div className="flex flex-col gap-4 [&>div>span]:text-muted-foreground [&>div>div>span]:text-muted-foreground">
                <div className="flex justify-between items-center">
                  <strong className="font-semibold">Plan Actual:</strong>
                  <span>{suscription.status === "on_trial" ? 'Prueba' : 'Pro'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <strong className="font-semibold">Fecha de Inicio:</strong>
                  <span>{format(suscription.suscription_date, 'dd MMMM, yyyy', { locale: es })}</span>
                </div>
                <div className="flex justify-between items-center">
                  <strong className="font-semibold">Fecha de Renovación:</strong>
                  <span>{format(suscription.renewal_date, 'dd MMMM, yyyy', { locale: es })}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <strong className="font-semibold">Tiempo Restante:</strong>
                    <span>{daysLeft} días</span>
                  </div>
                  <Progress value={progress} className="w-full mt-4" />
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

