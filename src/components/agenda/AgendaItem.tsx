"use client"

import { AppointmentCard } from "@/types/entities"
import { Avatar } from "../Avatar"
import { Button } from "../ui/button"
import { format } from "date-fns"
import { calculateDate } from "@/lib/calculate-date"

export function AgendaItem({ appointment }: { appointment: AppointmentCard }) {

  return (
    <Button variant="ghost" className="consultorios-card flex items-center justify-start gap-4 h-auto pe-44 w-full">
      <Avatar avatarUrl={appointment.avatar ?? ''} name={appointment.name ?? ''} key={appointment.id} />
      <div className="flex flex-col items-start">
        <h4 className="text-base font-semibold">{appointment.name}</h4>
        <p className="text-foreground/75 text-sm font-normal flex items-center gap-2">
          <span>{calculateDate(appointment.date_from ?? '')}</span> <span>•</span> <span>{format(new Date(appointment.date_from ?? ''), "HH:mm")} - {format(new Date(appointment.date_to ?? ''), "HH:mm")}</span></p>
      </div>
    </Button>
  )
}