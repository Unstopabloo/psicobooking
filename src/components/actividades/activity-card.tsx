import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MessageIcon } from "@/components/icons";
import { ActivityWithComments } from "@/types/entities";
import { cn } from "@/lib/utils";
import { ClockIcon, XIcon, CheckIcon, TriangleAlert } from "lucide-react";
import Link from "next/link";

export function ActivityCard({ activity }: { activity: ActivityWithComments }) {
  const { title, description, patient_name, status, comments_count, date_from, date_to } = activity

  return (
    <Link href={`/dashboard/herramientas/actividades/${activity.id}`}>
      <Card className="flex flex-col justify-between gap-4 p-4">
        <CardHeader className="flex items-start gap-3 justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <strong className="text-sm font-medium text-muted-foreground">{patient_name}</strong>
          </div>
          <div className={cn(
            `size-5 flex items-center justify-center rounded-full border`,
            status === "en_curso" && "bg-primary/10 border-primary",
            status === "completada" && "bg-green-500/10 border-green-500",
            status === "cancelada" && "bg-destructive/10 border-destructive",
            status === "retrasada" && "bg-orange-500/10 border-orange-500"
          )}>
            {
              status === "en_curso" && <ClockIcon className="size-3 text-primary" />
            }
            {
              status === "completada" && <CheckIcon className="size-3 text-green-500" />
            }
            {
              status === "cancelada" && <XIcon className="size-3 text-destructive" />
            }
            {
              status === "retrasada" && <TriangleAlert className="size-3 text-orange-500" />
            }
          </div>
        </CardHeader>
        <CardContent className="p-0 w-full flex items-end justify-between gap-3">
          <p className="text-sm text-muted-foreground text-pretty">{description.length > 50 ? `${description.substring(0, 50)}...` : description}</p>
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger className="flex items-center gap-1">
                <MessageIcon className="size-4" />
                <p className="text-sm text-muted-foreground">{comments_count}</p>
              </TooltipTrigger>
              <TooltipContent className="bg-background border border-border shadow-sm">
                <p className="text-sm text-muted-foreground">{comments_count ? `${comments_count} comentarios` : "No hay comentarios"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardContent>
      </Card>
    </Link>
  )
}