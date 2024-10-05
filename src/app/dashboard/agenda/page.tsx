import { Button } from "@/components/ui/button"
import { DashboardIcon } from "@/components/icons";
import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from "@/components/ui/tooltip";
import { AgendaList } from "@/components/agenda/AgendaList";
import { Metadata } from "next";
import { Container } from "../_layout-components/container";
import H1 from "@/components/H1";

export const metadata: Metadata = {
  title: "Agenda | Psicobooking",
  description: "Explora tu agenda de citas y gestiona tus citas con facilidad.",
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

export default async function AgendaPage() {
  return (
    <Container>
      <header className="flex items-center justify-between">
        <H1>Mi agenda</H1>
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="p-1 opacity-75 cursor-not-allowed">
                <DashboardIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Cambiar visualización</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </header>

      <AgendaList />
    </Container>
  )
}