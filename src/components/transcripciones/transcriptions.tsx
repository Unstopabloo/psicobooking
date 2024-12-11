import { auth } from "@clerk/nextjs/server";
import { TranscripcionCard } from "./transcription-card";
import { unstable_cache as cache } from "next/cache";
import { getTranscriptions } from "@/server/db/transcriptions";
import { Skeleton } from "../ui/skeleton";
import { NoData } from "../no-data";

const getTranscriptionsCached = cache(
  async (userId: string) => getTranscriptions(userId, true),
  ["transcriptions-herramientas"],
  {
    tags: ["transcriptions-herramientas"],
  }
);

export async function Transcriptions({ limit = false }: { limit?: boolean }) {
  const { userId } = auth();

  if (!userId) {
    return <div>No se pudo obtener el usuario</div>
  }

  const transcriptions = await getTranscriptionsCached(userId);

  if (limit && transcriptions.length === 0) return <NoData className="col-span-2" title="Aún no tienes transcripciones" description="Si tienes una sesión, puedes crear una transcripción" />

  if (limit && transcriptions.length > 0) return (
    <>
      {
        transcriptions.slice(0, 6).map(transcription => (
          <TranscripcionCard key={transcription.id} transcription={transcription} />
        ))
      }
    </>
  )

  return (
    <>
      {
        transcriptions.map(transcription => (
          <TranscripcionCard key={transcription.id} transcription={transcription} />
        ))
      }
    </>
  )
}

export function TranscriptionsSkeleton({ limit = false }: { limit?: boolean }) {
  return (
    <>
      {
        Array.from({ length: limit ? 6 : 10 }).map((_, index) => (
          <Skeleton key={index} className="h-20 w-full" />
        ))
      }
    </>
  )
}
