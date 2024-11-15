"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const ROUTES = [
  {
    name: "Dashboard",
    href: "/dashboard",
    paths: [
      {
        name: "Dashboard",
        href: "/dashboard"
      }
    ]
  },
  {
    name: "Agenda",
    href: "/dashboard/agenda",
    paths: [
      {
        name: "Agenda",
        href: "/dashboard/agenda"
      },
      {
        name: "Consultorios",
        href: "/dashboard/agenda/consultorios"
      }
    ]
  },
  {
    name: "Pacientes",
    href: "/dashboard/pacientes",
    paths: [
      {
        name: "Pacientes",
        href: "/dashboard/pacientes"
      }
    ]
  },
  {
    name: "Herramientas",
    href: "/dashboard/herramientas",
    paths: [
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
  }
]

export function SubNav() {
  const pathname = usePathname()
  const [route, setRoute] = useState(ROUTES)

  const isActive = (path: string) => pathname === path

  useEffect(() => {
    if (ROUTES.some(route => isActive(route.href))) {
      setRoute(ROUTES.filter(route => isActive(route.href)))
    }
  }, [pathname])

  if (pathname.includes('/dashboard/pacientes/')) {
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
  }

  return (
    <nav className="flex items-center justify-end" aria-label="navegacion secundaria">
      {route.map(route => (
        <ul
          key={route.name}
          className="flex items-center justify-end"
        >
          {route.paths.map(path => (
            <Link
              key={path.name}
              href={path.href}
              className={cn(`rounded-none h-full py-2 px-4 text-sm flex items-center justify-center`, isActive(path.href) && 'cursor-default events-none bg-background')}
            >
              {path.name}
            </Link>
          )
          )}
        </ul>
      ))}
    </nav>
  )
}