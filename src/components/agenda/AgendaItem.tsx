"use client"

import { Avatar } from "../Avatar"
import { Button } from "../ui/button"

export function AgendaItem() {
  return (
    <article className="flex flex-col lg:flex-row items-start px-1 py-4 border-b border-border/50">
      <aside className="text-start align-top w-32">
        <h3 aria-label="Fecha de la cita" className="font-normal text-sm text-foreground/80">Lunes 30</h3>
      </aside>
      <div className="flex flex-col items-start gap-3">
        <Button variant="ghost" className="consultorios-card flex items-center gap-4 py-8 pe-44">
          <Avatar avatarUrl="/isotipo.webp" name="Jaime Chavez" key={1} />
          <div className="flex flex-col items-start">
            <h4 className="text-base font-semibold">Jaime Chavez</h4>
            <p className="text-foreground/75 text-sm font-normal flex items-center gap-2"><span>En 2 horas</span> <span>•</span> <span>15:45 PM - 16:50 PM</span></p>
          </div>
        </Button>
        <Button variant="ghost" className="consultorios-card flex items-center gap-4 py-8 pe-44">
          <Avatar avatarUrl="/isotipo.webp" name="Jaime Chavez" key={1} />
          <div className="flex flex-col items-start">
            <h4 className="text-base font-semibold">Jaime Chavez</h4>
            <p className="text-foreground/75 text-sm font-normal flex items-center gap-2"><span>En 2 horas</span> <span>•</span> <span>15:45 PM - 16:50 PM</span></p>
          </div>
        </Button>
        <Button variant="ghost" className="consultorios-card flex items-center gap-4 py-8 pe-44">
          <Avatar avatarUrl="/isotipo.webp" name="Jaime Chavez" key={1} />
          <div className="flex flex-col items-start">
            <h4 className="text-base font-semibold">Jaime Chavez</h4>
            <p className="text-foreground/75 text-sm font-normal flex items-center gap-2"><span>En 2 horas</span> <span>•</span> <span>15:45 PM - 16:50 PM</span></p>
          </div>
        </Button>
      </div>
    </article>
  )
}