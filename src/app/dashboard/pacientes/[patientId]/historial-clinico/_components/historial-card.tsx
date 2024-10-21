// components/historial-card.tsx
'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import parse from 'html-react-parser'
import { cleanHtml } from "@/lib/clean-html"
import { cn } from "@/lib/utils"

export function HistorialCard({
  historial,
  isSelected,
  patientId
}: {
  historial: any,
  isSelected: boolean,
  patientId: string
}) {
  return (
    <Link href={`/pacientes/${patientId}/historial-clinico?historial=${historial.id}`}>
      <Card className={cn("w-full", isSelected && 'bg-background border border-primary/60 shadow-md shadow-primary/20')}>
        <CardContent className="p-4" >
          <CardHeader className="flex-col lg:flex-row items-center gap-2">
            <CardTitle>{historial.title}</CardTitle><span>•</span>
            <p className="text-xs text-muted-foreground">{format(historial.created_at, 'dd/MM/yyyy')}</p>
          </CardHeader>
          <div className="prose pt-2 text-sm">
            {parse(cleanHtml(historial.content))}
          </div>
        </CardContent>
      </Card >
    </Link>
  )
}