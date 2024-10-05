"use client"

import { Button } from "../ui/button";
import { DatePicker } from "../ui/date-picker";
import { AgendaItem } from "./AgendaItem";
import { PlusSignIcon } from "../icons";
import { checkUserExists } from "@/server/actions/users";

export function AgendaList() {

  return (
    <section className="flex flex-col w-full gap-10 py-6">
      <div className="flex items-center justify-between">
        <DatePicker />
        <Button onClick={() => checkUserExists('clerk_id')} variant="outline" className="flex items-center gap-4">Agendar nueva cita <PlusSignIcon width={16} height={16} /></Button>
      </div>

      <div className="flex flex-col gap-2 w-full h-full overflow-y-auto pb-20">
        <AgendaItem />
        <AgendaItem />
        <AgendaItem />
      </div>
    </section>
  )
}