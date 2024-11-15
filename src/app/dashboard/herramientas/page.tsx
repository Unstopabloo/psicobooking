import H1 from "@/components/H1";
import { Container } from "../_layout-components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TranscripcionCard } from "@/components/transcripciones/transcription-card";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { MessageIcon } from "@/components/icons";
import { unstable_cache as cache } from "next/cache";
import { getTranscriptions } from "@/server/db/transcriptions";
import { auth } from "@clerk/nextjs/server";

const getTranscriptionsCached = cache(
  async (userId: string) => getTranscriptions(userId, true),
  ["transcriptions-herramientas"],
  {
    tags: ["transcriptions-herramientas"],
  }
);

export default async function HerramientasPage() {
  const { userId } = auth();

  if (!userId) {
    return <div>No se pudo obtener el usuario</div>
  }

  const transcriptions = await getTranscriptionsCached(userId);

  return (
    <Container className="xl:px-10 2xl:px-24">
      <header className="pb-10">
        <H1>Herramientas</H1>
        <p className="text-sm text-muted-foreground">Acá podrás ver todas las herramientas disponibles para trabajar con tus pacientes.</p>
      </header>
      <div className="grid grid-cols-1 xl:grid-cols-2 grid-rows-2 gap-10">
        <section aria-label="Mis transcripciones" className="col-span-1 row-span-2">
          <header className="flex items-start justify-between gap-2">
            <div className="flex flex-col items-start">
              <h2 className="font-medium text-base">Mis transcripciones</h2>
              <p className="text-sm text-muted-foreground">Revisa tus transcripciones de sesiones.</p>
            </div>
            <Button asChild variant="link">
              <Link href="/dashboard/herramientas/transcripciones">Todas mis transcripciones</Link>
            </Button>
          </header>
          <div className="grid grid-cols-2 gap-4 py-6">
            {
              transcriptions.map(transcription => (
                <TranscripcionCard key={transcription.id} transcription={transcription} />
              ))
            }
          </div>
        </section>

        <section aria-label="Mis notas" className="col-span-1">
          <header className="flex items-start justify-between gap-2">
            <div className="flex flex-col items-start">
              <h2 className="font-medium text-base">Mis notas</h2>
              <p className="text-sm text-muted-foreground">Revisa tus notas de sesiones.</p>
            </div>
            <Button asChild variant="link">
              <Link href="/dashboard/herramientas/notas">Todas mis notas</Link>
            </Button>
          </header>
          <div className="grid grid-cols-3 gap-3 py-6">
            <NoteCard />
            <NoteCard />
            <NoteCard />
          </div>
        </section>

        <section aria-label="Mis actividades" className="col-span-1">
          <header className="flex items-start justify-between gap-2">
            <div className="flex flex-col items-start">
              <h2 className="font-medium text-base">Mis actividades</h2>
              <p className="text-sm text-muted-foreground">Aquí podrás ver todas tus actividades.</p>
            </div>
            <Button asChild variant="link">
              <Link href="/dashboard/herramientas/actividades">Todas mis actividades</Link>
            </Button>
          </header>
          <div className="grid grid-cols-2 gap-3 py-6">
            <ActivityCard />
            <ActivityCard />
            <ActivityCard />
          </div>
        </section>
      </div>
    </Container>
  )
}

function NoteCard() {
  return (
    <article className="flex flex-col justify-between gap-4 p-4 border border-[#f4a749] bg-[#f4a749]/10 rounded-lg">
      <p className="text-sm text-foreground/80">Este es un ejemplo de una nota muy larga para que veas como se ve en la pantalla, asi se podra medir el largo de la nota y como este interactua con el resto de la pantalla.</p>
      <footer className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">28 Ago</p>
        <p className="text-sm text-muted-foreground text-end">Lusiana V.</p>
      </footer>
    </article>
  )
}

function ActivityCard() {
  return (
    <Card className="flex flex-col justify-between gap-4 p-4">
      <CardHeader className="flex items-start gap-3 justify-between">
        <div>
          <CardTitle>Jaime Chavez</CardTitle>
        </div>
        <div className="size-5 bg-primary/10 flex items-center justify-center rounded-full border border-primary">
          <CheckIcon className="size-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="p-0 w-full flex items-end justify-between gap-3">
        <p className="text-sm text-muted-foreground text-pretty">Esta es la descripción de la actividad, como se ve, es bastante larga... </p>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger className="flex items-center gap-1">
              <MessageIcon className="size-4" />
              <p className="text-sm text-muted-foreground">2</p>
            </TooltipTrigger>
            <TooltipContent className="bg-background border border-border shadow-sm">
              <p className="text-sm text-muted-foreground">Tienes 2 comentarios</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardContent>
    </Card>
  )
}