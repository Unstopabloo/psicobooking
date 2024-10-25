"use client"

import { Calendar03Icon, DollarSquareIcon, Home01Icon, MenuIcon, MessageMultipleIcon, StickyNote01Icon, UserListIcon } from "@/components/icons";
import { NavLink } from "@/components/layout/Navs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { useState } from "react";

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="w-full block sm:hidden fixed bottom-10 right-0">
      <div className="flex flex-col items-center gap-4 justify-end w-full ps-4 pe-8">
        <Button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className={cn(
            "group self-end rounded-full p-2 shadow-md shadow-black/30 transition-transform duration-300 ease-in-out translate-y-16",
            open && "translate-y-0"
          )}
          size="icon"
        >
          <span className="transition-transform duration-500 [transition-timing-function:cubic-bezier(0.68,-0.6,0.32,1.6)] group-aria-expanded:rotate-[90deg]">
            {open ? <XIcon color="#ffffff" /> : <MenuIcon color="#ffffff" />}
          </span>
        </Button>
        <nav
          className={cn(
            "w-full bg-white/50 backdrop-blur-lg rounded-lg p-2 border border-secondary shadow-md shadow-black/20",
            "transition-all duration-300 ease-in-out",
            "opacity-0 translate-y-5 pointer-events-none",
            open && "opacity-100 translate-y-0 pointer-events-auto"
          )}
          aria-hidden={!open}
        >
          <ul className="flex items-center justify-center gap-2">
            <NavLink href="/dashboard" description="Dashboard">
              <Home01Icon height={22} width={22} />
            </NavLink>
            <NavLink href="/dashboard/agenda" description="Agenda">
              <Calendar03Icon height={22} width={22} />
            </NavLink>
            <NavLink href="/dashboard/pacientes" description="Pacientes">
              <UserListIcon height={22} width={22} />
            </NavLink>
            <NavLink href="/dashboard/finanzas" description="Finanzas">
              <DollarSquareIcon height={22} width={22} />
            </NavLink>
            <NavLink href="/dashboard/herramientas" description="Herramientas">
              <StickyNote01Icon height={22} width={22} />
            </NavLink>
            <NavLink href="/dashboard/comunidad" description="Comunidad">
              <MessageMultipleIcon height={22} width={22} />
            </NavLink>
          </ul>
        </nav>
      </div>
    </div>
  )
}