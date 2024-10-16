import { Container } from "@/app/dashboard/_layout-components/container";
import { Suspense } from "react";
import { FichaClinicaComponent } from "./_components/ficha-clinica-paciente";
import { SkeletonFichaClinica } from "./_components/skeleton-ficha-clinica";

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