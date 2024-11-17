import { getTranscriptionContent } from "@/server/db/transcriptions";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { unstable_cache } from "next/cache";
import { Container } from "@/app/dashboard/_layout-components/container";
import H1 from "@/components/H1";
import { Avatar } from "@/components/Avatar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AudioPlayer } from "@/components/play-audio";

const getTranscriptionContentCached = unstable_cache(
  async (transcriptionId: string, userId: string) => getTranscriptionContent(transcriptionId, userId),
  ["transcription-content"],
);

export default async function TranscriptionPage({ params }: { params: { transcription_id: string } }) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const transcription = await getTranscriptionContentCached(params.transcription_id, userId);

  if (!transcription) {
    notFound();
  }

  return (
    <Container className="flex flex-col items-center">
      <header className="w-full max-w-3xl flex items-start justify-between pb-12 pt-6">
        <div className="flex flex-col items-start">
          <H1>{transcription?.title.replaceAll("_", " ").toUpperCase()}</H1>
          <p className="text-sm text-muted-foreground">{format(new Date(transcription?.date_from), "dd 'de' MMMM, yyyy - HH:mm", { locale: es })}</p>
        </div>

        <div className="flex items-center gap-2">
          <Avatar avatarUrl={transcription?.patient_avatar} name={transcription?.patient} />
          <div className="flex flex-col items-start">
            <p className="text-sm text-foreground/90">{transcription?.patient}</p>
            <p className="text-sm text-muted-foreground">{transcription?.session_type}</p>
          </div>
        </div>
        <AudioPlayer audioUrl={transcription!.audio_url} />
      </header>
      <div className="relative w-full max-w-3xl mx-auto h-[650px]">
        <ScrollArea className="h-full pr-4">
          {transcription?.is_transcribed === 'true' ? (
            <TranscriptionAnalysis transcription={transcription.content} />
          ) : (
            <p className="prose py-10 text-muted-foreground">
              {transcription?.content}
            </p>
          )}
        </ScrollArea>
        <div className="absolute left-0 right-0 bottom-0 h-5 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
        <div className="absolute left-0 right-0 top-0 h-5 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none"></div>
      </div>
    </Container>
  )
}

function TranscriptionAnalysis({ transcription }: { transcription: string }) {
  const transcriptionData = JSON.parse(transcription)

  return (
    <div className="flex flex-col gap-4 py-10">
      <p className="prose text-muted-foreground pb-4">{transcriptionData.resumen}</p>
      {transcriptionData.analisis.map((item: { title: string, content: string }) => (
        <div key={item.title}>
          <strong className="text-base text-foreground/90">{item.title}</strong>
          <p className="prose text-muted-foreground">{item.content}</p>
        </div>
      ))}
    </div>
  )
}