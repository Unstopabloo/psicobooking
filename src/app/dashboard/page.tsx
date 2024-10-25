import { SeeMore } from "@/components/buttons/SeeMore";
import { Activities } from "@/components/dashboard/Activities";
import { AgendaTable, AgendaTableLoading } from "@/components/dashboard/AgendaTable";
import { Chats } from "@/components/dashboard/Chats";
import { Meetings, MeetingsLoading } from "@/components/dashboard/Meetings";
import { DashboardIncomeTable } from "@/components/charts/DashboardIncomeChart";
import { DashboardPatientsChart } from "@/components/charts/DashboardPatientsChart";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard | Psicobooking",
  description: "Gestiona tus citas, actividades y pagos con facilidad.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  keywords: ['Psicologia', 'Atencion de pacientes', 'Dashboard', 'Psicología médica', 'Organización de citas', 'Citas', 'Psicología', 'Atención médica'],
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

export default async function DashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-1 md:gap-x-14 animate-fade-up animate-ease-out animate-duration-500 px-0 lg:px-0 xl:px-10 2xl:px-18">
      <Section
        href="agenda"
        seeMoreText="Ver todas las citas"
        title="Proximas citas"
        is_h1
      >
        <Suspense fallback={<MeetingsLoading />}>
          <Meetings />
        </Suspense>
      </Section>
      <Section
        href="pacientes"
        seeMoreText="Todos mis pacientes"
        title="Mis pacientes"
      >
        <Suspense fallback={<AgendaTableLoading />}>
          <AgendaTable />
        </Suspense>
      </Section>
      <Section
        href="finanzas"
        seeMoreText="Mis finanzas"
        title="Resumen de finanzas"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          <DashboardIncomeTable />
          <DashboardPatientsChart />
        </div>
      </Section>
      <div className="grid grid-cols-1 gap-8">
        <Section href="comunidad/chats" seeMoreText="Todos los chats" title="Chats por leer">
          <Chats />
        </Section>
        <Section href="herramientas" seeMoreText="Todas las actividades" title="Actividades">
          <Activities />
        </Section>
      </div>
    </div>
  )
}

async function Section({ href, seeMoreText, title, children, is_h1 }: { href: string, seeMoreText: string, title: string, children: React.ReactNode, is_h1?: boolean }) {
  return (
    <section>
      <header className="flex items-center justify-between pb-5">
        {is_h1 ? <h1 className="section-title font-semibold">{title}</h1> : <h2 className="section-title font-semibold">{title}</h2>}
        <SeeMore href={`/dashboard/${href}`} text={seeMoreText} />
      </header>
      {children}
    </section>
  )
}