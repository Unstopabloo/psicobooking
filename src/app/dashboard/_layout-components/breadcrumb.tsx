'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import React from "react"

export function BreadCrumb() {
  const pathname = usePathname()
  const paths = pathname.split("/").filter(Boolean)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((segment, index) => {
          const href = `/${paths.slice(0, index + 1).join("/")}`
          const isLastItem = index === paths.length - 1

          return (
            <React.Fragment key={href}>
              <BreadcrumbItem>
                {isLastItem ? (
                  <BreadcrumbPage>
                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>
                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLastItem && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}