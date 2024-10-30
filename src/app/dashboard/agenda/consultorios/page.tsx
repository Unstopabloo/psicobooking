import { Metadata } from "next"
import { Container } from "../../_layout-components/container"
import H1 from "@/components/H1"
import { Consultorios } from "@/components/agenda/Consultorios"
import { Button } from "@/components/ui/button"
import { AgendaItem } from "@/components/agenda/AgendaItem"
import { ScrollFade } from "@/components/scroll-fade"

export const metadata: Metadata = {
  title: "Consultorios | Psicobooking",
  description: "Revisa, añade y gestiona tus consultorios de atención psicologica.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: ['Psicologia', 'Atencion de pacientes', 'Dashboard', 'Psicología médica', 'Organización de citas', 'Citas', 'Psicología', 'Atención médica', 'Consultorios'],
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

export default async function ConsultoriosPage() {

  return (
    <Container className="grid grid-cols-1 md:grid-cols-6 gap-y-8 gap-x-28 lg:px-4 xl:px-20 2xl:px-28">
      <aside className="relative col-span-2 flex flex-col items-start gap-8">
        <header>
          <H1 className="pb-2">Consultorios</H1>
          <p className="text-muted-foreground text-pretty text-sm font-normal">Revisa, separa y gestiona tus consultorios para dar atención prescencial.</p>
        </header>
        <div className="relative">
          <div className="consultorios-list flex flex-col gap-4 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pb-10 pt-3">
            <Consultorios />
            <ScrollFade />
            <ScrollFade is_reached_top />
          </div>
        </div>
        <Button className="px-10 2xl:px-20">
          Agregar consultorio
        </Button>
      </aside>
      <div className="relative col-span-4">
        <div className="citas-list flex flex-col w-full overflow-x-hidden items-start gap-10 py-6 overflow-y-auto last:pb-20">
          <ScrollFade />
          <ScrollFade is_reached_top />
        </div>
      </div>
    </Container >
  )
}