import H1 from "@/components/H1";
import { Container } from "../../_layout-components/container";
import { type Metadata } from "next";
import { MainChart } from "@/components/charts/main-chart";
import { getPayments } from "@/server/db/payments";
import { PieChartLoader, PieChartSkeleton } from "@/components/charts/pie-chart.loader";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Finanzas | Psicobooking",
  description: "Aquí podrás ver los datos financieros de tu cuenta.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: ['Psicologia', 'Atencion de pacientes', 'Psicología médica', 'Organización de citas', 'Citas', 'Psicología', 'Atención médica'],
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

export default async function FinanzasPage() {
  const { payments, crecimientoIngresos } = await getPayments()

  return (
    <Container className="2xl:px-0">
      <header className="pb-4">
        <H1>Datos financieros</H1>
        <p className="text-muted-foreground">Aquí podrás ver los datos financieros de tu cuenta.</p>
      </header>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <MainChart payments={payments} crecimientoIngresos={crecimientoIngresos} />
        <Suspense fallback={<PieChartSkeleton />}>
          <PieChartLoader />
        </Suspense>
      </section>
    </Container>
  )
}