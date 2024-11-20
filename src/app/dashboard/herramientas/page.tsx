import H1 from "@/components/H1";
import { Container } from "../_layout-components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DashboardNotes } from "@/components/notas/dashboard-notes";
import { Suspense } from "react";
import { NotesSkeleton } from "@/components/notas/notes";
import { Transcriptions, TranscriptionsSkeleton } from "@/components/transcripciones/transcriptions";
import { Activities } from "@/components/actividades/activities";
import { ActivitiesSkeleton } from "@/components/actividades/activities";

export default async function HerramientasPage() {
  return (
    <Container className="lg:px-0 xl:px-0 2xl:px-0">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
            <Suspense fallback={<TranscriptionsSkeleton limit />}>
              <Transcriptions limit />
            </Suspense>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 py-6">
            <Suspense fallback={<NotesSkeleton is_dashboard />}>
              <DashboardNotes />
            </Suspense>
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
            <Suspense fallback={<ActivitiesSkeleton limit={4} />}>
              <Activities limit />
            </Suspense>
          </div>
        </section>
      </div>
    </Container>
  )
}