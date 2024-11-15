import { Avatar } from "@/components/Avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { TranscriptionCard as TranscriptionCardType } from "@/types/entities";
import { format } from "date-fns";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TranscripcionCard({ transcription }: { transcription: TranscriptionCardType }) {
  const { id, title, is_transcribed, patient, patient_avatar, session_type, date_from } = transcription;

  return (
    <Link href={`/dashboard/herramientas/transcripciones/${id}`}>
      <Card className="flex flex-col justify-between gap-4 p-4 hover:border hover:border-primary/40 hover:bg-card/70 hover:shadow-md transition-allduration-200">
        <CardHeader className="flex items-start gap-3 justify-between">
          <div className="flex items-center gap-2">
            <Avatar name={patient} avatarUrl={patient_avatar} />
            <div>
              <CardTitle>{patient}</CardTitle>
              <CardDescription>{session_type}</CardDescription>
            </div>
          </div>
          <small className="text-muted-foreground text-xs"># {id + 1}</small>
        </CardHeader>
        <CardContent className="p-0 w-full mt-4">
          <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
          <div className="flex items-center justify-between gap-2">
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Badge className="text-muted-foreground" variant="outline">{is_transcribed ? "Transcrito" : "Texto plano"}</Badge>
                </TooltipTrigger>
                <TooltipContent className="bg-background text-card-foreground border border-input">
                  <p>
                    {
                      is_transcribed === 'true' ?
                        "Se presenta el texto transcrito, buscando los momentos clave y mas relevantes." :
                        "Se presenta el texto plano, sin buscar los momentos clave y mas relevantes."
                    }
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <p className="text-sm text-muted-foreground text-end">{format(date_from, "dd MMM. yyyy")}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}