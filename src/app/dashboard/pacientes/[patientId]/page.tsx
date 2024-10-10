import { Container } from "@/app/dashboard/_layout-components/container";

export default async function FichaClinica({
  params
}: {
  params: {
    patientId: string
  }
}) {
  const { patientId } = params

  return (
    <Container>
      <h1>Ficha Clinica de {patientId}</h1>
    </Container>
  )
}