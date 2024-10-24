"use client"

import { useState, useMemo } from "react"
import { Button } from "../ui/button"
import { DatePicker } from "./date-picker-agenda"
import { AgendaItem } from "./AgendaItem"
import { PlusSignIcon } from "../icons"
import { AppointmentCard } from "@/types/entities"
import { addDays, format } from "date-fns"
import { es } from "date-fns/locale"

export function AgendaList() {
  const [appointments, setAppointments] = useState<AppointmentCard[] | undefined>(undefined)

  const groupedAppointments = useMemo(() => {
    const grouped = appointments?.reduce((acc, appointment) => {
      const date = format(new Date(appointment.date_from ?? ''), "yyyy-MM-dd")
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(appointment)
      return acc
    }, {} as Record<string, AppointmentCard[]>)

    return Object.entries(grouped ?? {}).sort(([a], [b]) => a.localeCompare(b))
  }, [appointments])

  return (
    <section className="flex flex-col w-full gap-10 py-6">
      <div className="flex md:flex-row flex-col-reverse gap-y-6 items-start md:items-center justify-between">
        <DatePicker setAppointments={setAppointments} />
      </div>

      <div className="flex flex-col gap-2 w-full h-full overflow-y-auto pb-20">
        {groupedAppointments.map(([date, dayAppointments]) => (
          <article key={date} className="flex flex-col lg:flex-row items-start px-1 py-4 border-b border-border/50">
            <aside className="text-start align-top w-32">
              <h3 aria-label="Fecha de la cita" className="font-normal text-sm text-foreground/80">{format(addDays(new Date(date), 1), "EEEE dd", { locale: es })}</h3>
            </aside>
            <div className="flex flex-col gap-2 w-full">
              {dayAppointments.map((appointment) => (
                <AgendaItem key={appointment.id} appointment={appointment} />
              ))}
            </div>
          </article>
        ))
        }
        {
          appointments && appointments.length === 0 && <p className="w-full text-sm text-foreground/85">No hay citas para esta fecha</p>
        }
      </div>
    </section>
  )
}