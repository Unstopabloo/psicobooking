import H1 from "@/components/H1"
import { Metadata } from "next"
import { Container } from "../_layout-components/container"
import { DataTable } from "@/components/table/data-table"
import { columns } from "@/components/table/columns"
import { getPatientsWithAppointments } from "@/server/users"
import { toast } from "sonner"

export const metadata: Metadata = {
  title: "Pacientes | Psicobooking",
  description: "Gestiona tus pacientes y gestiona sus citas.",
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

export default async function PacientesPage() {
  const { patientsWithAppointments: data, error } = await getPatientsWithAppointments()
  if (error) {
    console.error(error)
    toast.error("Hubo un error al recuperar los pacientes.")
  }

  return (
    <Container className="px-0 lg:px-0 xl:px-10 2xl:px-24">
      <DataTable columns={columns} data={data} />
    </Container>
  )
}