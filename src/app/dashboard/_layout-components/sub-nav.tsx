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
  }
]

export function SubNav() {
  const pathname = usePathname()
  const [route, setRoute] = useState(ROUTES)

  const isActive = (path: string) => pathname === path

  useEffect(() => {
    console.log('pathname', pathname)

    if (ROUTES.some(route => isActive(route.href))) {
      setRoute(ROUTES.filter(route => isActive(route.href)))
    }
  }, [pathname])

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
          ))}
        </ul>
      ))}
    </nav>
  )
}