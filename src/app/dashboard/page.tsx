import { SeeMore } from "@/components/buttons/SeeMore";
import { Activities } from "@/components/dashboard/Activities";
import { AgendaTable } from "@/components/dashboard/AgendaTable";
import { Chats } from "@/components/dashboard/Chats";
import { Meetings } from "@/components/dashboard/Meetings";
import { DashboardIncomeTable } from "@/components/tables/DashboardIncomeChart";
import { DashboardPatientsChart } from "@/components/tables/DashboardPatientsChart";

export default async function DashboardPage() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-14 animate-fade-up animate-ease-out animate-duration-500">
        <Section
          href="pacientes"
          seeMoreText="Ver todas"
          title="Proximas citas"
        >
          <Meetings />
        </Section>
        <Section
          href="agenda"
          seeMoreText="Mi agenda"
          title="Agenda rapida"
        >
          <AgendaTable />
        </Section>
        <Section
          href="finanzas"
          seeMoreText="Mis finanzas"
          title="Resumen de finanzas"
        >
          <div className="flex gap-4">
            <DashboardIncomeTable />
            <DashboardPatientsChart />
          </div>
        </Section>
        <div className="grid grid-cols-1">
          <Section href="comunidad/chats" seeMoreText="Todos los chats" title="Chats por leer">
            <Chats />
          </Section>
          <Section href="herramientas" seeMoreText="Todas las actividades" title="Actividades">
            <Activities />
          </Section>
        </div>
      </div>
    </>
  )
}

async function Section({ href, seeMoreText, title, children }: { href: string, seeMoreText: string, title: string, children: React.ReactNode }) {
  return (
    <section>
      <header className="flex items-center justify-between pb-5">
        <h2 className="font-semibold">{title}</h2>
        <SeeMore href={`/dashboard/${href}`} text={seeMoreText} />
      </header>
      {children}
    </section>
  )
}