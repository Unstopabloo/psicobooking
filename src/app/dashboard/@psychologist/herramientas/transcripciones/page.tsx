import { Container } from "@/app/dashboard/_layout-components/container";
import H1 from "@/components/H1";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { TranscriptionCards, TranscriptionCardSkeleton } from "@/components/transcripciones/transcription-cards";
import { Suspense } from "react";

export default async function TranscripcionesPage() {
  return (
    <Container>
      <header className="flex items-center justify-between">
        <div className="flex flex-col items-start">
          <H1>Transcripciones</H1>
          <p className="text-sm text-muted-foreground">Acá podrás ver todas tus transcripciones.</p>
        </div>
        <Button className="gap-2" asChild>
          <Link href="/dashboard/herramientas/transcripciones/nueva">
            <PlusIcon className="size-4" />
            <p>Nueva transcripción</p>
          </Link>
        </Button>
      </header>
      <Suspense fallback={<TranscriptionCardSkeleton />}>
        <TranscriptionCards />
      </Suspense>
    </Container>
  )
}