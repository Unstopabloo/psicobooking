import { Container } from "@/app/dashboard/_layout-components/container"
import H1 from "@/components/H1"
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import { HistorialesMain } from "./_components/historiales-main";
import { HistorialesLoader, HistoricComponent } from "./_components/historic-component";
import { Suspense } from "react";
import Link from "next/link";
import { getPatientUserName } from "@/server/db/users";

export const metadata: Metadata = {
  title: "Historial clinico | Psicobooking",
  description: "Historial clinico de pacientes.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: ['Psicologia', 'Atencion de pacientes', 'Psicología médica', 'Historial clinico', 'Psicología', 'Atención médica'],
  authors: [
    {
      name: 'Lusiana Varela',
      url: 'https://www.linkedin.com/in/lusiana-varela-b286a820b/'
    },
    {
      name: 'Jaime Chavez',
      url: 'https://www.linkedin.com/in/jaime-alfonso-chavez-elejalde-5b5551202/'
    }
  ]
}

export default async function HistorialClinico({ params }: { params: { patientId: string } }) {
  const { patientId } = params

  const patientUserName = await getPatientUserName(parseInt(patientId))

  return (
    <Container className="grid grid-cols-1 md:grid-cols-6 gap-y-8 gap-x-28 lg:px-4 xl:px-20 2xl:px-28">
      <aside className="relative col-span-2 flex flex-col items-start gap-8">
        <header>
          <H1 className="pb-2">Historial Clinico de {patientUserName?.toString() || patientId}</H1>
          <p className="text-muted-foreground text-pretty text-sm font-normal">Acá podrás ver los historiales clinicos de tus pacientes, añadir nuevos y modificar los existentes.</p>
        </header>
        <Suspense fallback={<HistorialesLoader />}>
          <HistoricComponent patientId={patientId} />
        </Suspense>
        <Button asChild className="px-10 2xl:px-20">
          <Link href={`/dashboard/pacientes/${patientId}/historial-clinico`}>
            Agregar historia clinica
          </Link>
        </Button>
      </aside>
      <div className="relative col-span-4">
        <HistorialesMain patientId={patientId} />
      </div>
    </Container>
  )
}