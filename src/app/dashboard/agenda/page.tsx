import { Button } from "@/components/ui/button"
import { DashboardIcon } from "@/components/icons";
import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from "@/components/ui/tooltip";
import { AgendaList } from "@/components/agenda/AgendaList";
import { Metadata } from "next";
import { Container } from "../_layout-components/container";
import H1 from "@/components/H1";
import { Scheduler } from "@/components/agenda/scheduler";
import { CalendarRange, CalendarSearch } from 'lucide-react';
import { Availability } from "@/components/agenda/availability";
import { CalendarApp } from "@/components/agenda/scheduler-calendar";
import { turso } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { schedulerAppointmentsDTO } from "@/server/dtos";

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

export const dynamic = 'force-dynamic'

export default async function AgendaPage() {
  const { userId } = auth()

  const { rows } = await turso.execute({
    sql: `
      SELECT 
        app.id,
        app.date_from as start,
        app.date_to as end,
        pa.first_name || ' ' || pa.last_name AS name,
        app.session_type
      FROM psicobooking_appointment app
      LEFT JOIN psicobooking_user pa ON pa.id = app.patient_id
      LEFT JOIN psicobooking_user ps ON ps.id = app.psychologist_id
      WHERE ps.clerk_id = :user_id
    `,
    args: { user_id: userId }
  })

  const appointments = rows.length > 0 ? schedulerAppointmentsDTO(rows) : []

  return (
    <Container className="px-2 lg:px-4 xl:px-32 2xl:px-40">
      <header className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start">
          <H1>Mi agenda</H1>
          <p className="text-sm text-muted-foreground">Explora tu agenda de citas y gestiona tus citas con facilidad.</p>
        </div>
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Availability />
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Modificar disponibilidad online</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </header>

      <CalendarApp events={appointments} />
    </Container>
  )
}