import { Container } from "@/app/dashboard/_layout-components/container";
import { Suspense } from "react";
import { FichaClinicaComponent } from "./_components/ficha-clinica-paciente";
import { SkeletonFichaClinica } from "./_components/skeleton-ficha-clinica";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ficha clinica | Psicobooking",
  description: "Ficha clinica de pacientes.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: ['Psicologia', 'Atencion de pacientes', 'Psicología médica', 'Ficha clinica', 'Psicología', 'Atención médica'],
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

export default async function FichaClinica({
  params
}: {
  params: {
    patientId: string
  }
}) {
  const { patientId } = params

  return (
    <Container className="px-0 lg:px-0 xl:px-10 2xl:px-10">
      <Suspense fallback={<SkeletonFichaClinica />}>
        <FichaClinicaComponent patientId={patientId} />
      </Suspense>
    </Container>
  )
}