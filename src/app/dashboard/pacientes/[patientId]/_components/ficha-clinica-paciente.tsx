import { DatosPersonalesForm } from "@/components/forms/datos-personales"
import { TreatmentSheetForm } from "@/components/forms/ficha-de-tratamiento"
import H1 from "@/components/H1"
import { Button } from "@/components/ui/button"
import { getSinglePatientTicket } from "@/server/db/users"
import Link from "next/link"
import { notFound } from "next/navigation"

export async function FichaClinicaComponent({ patientId }: { patientId: string }) {
  const { singlePatientTicket, error } = await getSinglePatientTicket(parseInt(patientId))

  if (error) {
    console.error(error)
    return <div>Error al recuperar la ficha</div>
  }

  if (!singlePatientTicket || singlePatientTicket === undefined) {
    return notFound()
  }

  return (
    <>
      <header className="w-full flex items-center justify-between gap-10 pb-10">
        <div className="flex flex-col items-start">
          <H1>Ficha Clinica de {singlePatientTicket.first_name}</H1>
          <p className="text-sm text-muted-foreground">Datos completos del paciente, podrás modificar y completar información importante</p>
        </div>
        <Button asChild variant="link">
          <Link href={`/dashboard/pacientes/${patientId}/historial-clinico`}>Ver historial clinico</Link>
        </Button>
      </header>
      <div aria-label="Contenedor formularios" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DatosPersonalesForm patient={singlePatientTicket} />
        <TreatmentSheetForm patient={singlePatientTicket} />
      </div>
    </>
  )
}