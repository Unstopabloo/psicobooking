"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const herramientasRoutes = [
  {
    name: "Transcripciones",
    href: "/dashboard/herramientas/transcripciones"
  },
  {
    name: "Notas",
    href: "/dashboard/herramientas/notas"
  },
  {
    name: "Actividades",
    href: "/dashboard/herramientas/actividades"
  }
]

const agendaRoutes = [
  {
    name: "Agenda",
    href: "/dashboard/agenda"
  },
  {
    name: "Consultorios",
    href: "/dashboard/agenda/consultorios"
  }
]

const finanzasRoutes = [
  {
    name: "Finanzas",
    href: "/dashboard/finanzas"
  },
  {
    name: "Beneficios",
    href: "/dashboard/finanzas/beneficios"
  }
]

export function SubNav() {
  const pathname = usePathname()
  const isActive = (path: string) => pathname === path

  if (pathname === '/dashboard') {
    return (
      <nav className="flex items-center justify-end" aria-label="navegacion secundaria">
        <ul className="flex items-center justify-end">
          <Link
            key={Math.random()}
            href='/dashboard/'
            className={cn(`rounded-none h-full py-2 px-4 text-sm flex items-center justify-center`, isActive('/dashboard') && 'cursor-default events-none bg-background')}
          >
            Dashboard
          </Link>
        </ul>
      </nav>
    )
  } else if (pathname.includes('/dashboard/pacientes')) {
    return (
      <nav className="flex items-center justify-end" aria-label="navegacion secundaria">
        <ul className="flex items-center justify-end">
          <Link
            key={Math.random()}
            href='/dashboard/pacientes'
            className={cn(`rounded-none h-full py-2 px-4 text-sm flex items-center justify-center`, isActive('/dashboard/pacientes') && 'cursor-default events-none bg-background')}
          >
            Pacientes
          </Link>
        </ul>
      </nav>
    )
  } else if (pathname.includes('/dashboard/herramientas')) {
    return (
      <nav className="hidden md:flex items-center justify-end" aria-label="navegacion secundaria">
        {herramientasRoutes.map(route => (
          <ul
            key={route.name}
            className="flex items-center justify-end"
          >
            <Link
              key={Math.random()}
              href={route.href}
              className={cn(`rounded-none h-full py-2 px-4 text-sm flex items-center justify-center`, isActive(route.href) && 'cursor-default events-none bg-background')}
            >
              {route.name}
            </Link>
          </ul>
        ))}
      </nav>
    )
  } else if (pathname.includes('/dashboard/agenda')) {
    return (
      <nav className="hidden md:flex items-center justify-end" aria-label="navegacion secundaria">
        {agendaRoutes.map(route => (
          <ul
            key={route.name}
            className="flex items-center justify-end"
          >
            <Link
              key={Math.random()}
              href={route.href}
              className={cn(`rounded-none h-full py-2 px-4 text-sm flex items-center justify-center`, isActive(route.href) && 'cursor-default events-none bg-background')}
            >
              {route.name}
            </Link>
          </ul>
        ))}
      </nav>
    )
  } else if (pathname.includes('/dashboard/finanzas')) {
    return (
      <nav className="hidden md:flex items-center justify-end" aria-label="navegacion secundaria">
        {finanzasRoutes.map(route => (
          <ul
            key={route.name}
            className="flex items-center justify-end"
          >
            <Link
              key={Math.random()}
              href={route.href}
              className={cn(`rounded-none h-full py-2 px-4 text-sm flex items-center justify-center`, isActive(route.href) && 'cursor-default events-none bg-background')}
            >
              {route.name}
            </Link>
          </ul>
        ))}
      </nav>
    )
  } else {
    return null
  }
}
