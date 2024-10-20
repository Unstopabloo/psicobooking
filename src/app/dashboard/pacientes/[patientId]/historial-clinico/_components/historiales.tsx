"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClinicalHistory } from "@/types/entities"
import { format } from "date-fns"
import { useQueryState, parseAsInteger } from 'nuqs'
import parse from 'html-react-parser';
import { cleanHtml } from "@/lib/clean-html"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { useCallback } from "react"
import { useRouter } from 'next/navigation'

export function Historiales({ clinicalHistory, error }: { clinicalHistory: ClinicalHistory[] | undefined, error?: Error }) {
  const [historial, setHistorial] = useQueryState('historial', parseAsInteger.withDefault(0))
  const router = useRouter()

  const handleCardClick = useCallback((id: number) => {
    setHistorial(id, {
      shallow: true,
      scroll: false,
    }).then(() => {
      // Actualizar la URL sin recargar la página
      router.push(`?historial=${id}`, { scroll: false })
    })
  }, [setHistorial, router])

  if (error) {
    toast.error("Hubo un error al cargar los historiales clínicos")
    return <div>Hubo un error inesperado</div>
  }

  return (
    <div className="space-y-4">
      {clinicalHistory?.map((history) => (
        <button
          key={history.id}
          className="w-full text-left consultorios-card min-w-72"
          onClick={() => handleCardClick(history.id)}
        >
          <Card className={cn(
            "w-full transition-all duration-300 ease-in-out",
            historial === history.id
              ? 'bg-background border border-primary/60 shadow-md shadow-primary/20'
              : 'hover:bg-background/50'
          )}>
            <CardContent className="p-4">
              <CardHeader className="flex-col lg:flex-row items-center gap-2">
                <CardTitle>{history.title}</CardTitle><span>•</span>
                <p className="text-xs text-muted-foreground">{format(history.created_at, 'dd/MM/yyyy')}</p>
              </CardHeader>
              <div className="text-foreground/80 pt-2 text-sm overflow-hidden max-h-32">
                {
                  parse(cleanHtml(history.content.slice(0, 100) + '...'))
                }
              </div>
            </CardContent>
          </Card>
        </button>
      ))}
    </div>
  )
}