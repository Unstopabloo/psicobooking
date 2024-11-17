import { getTranscriptions } from "@/server/db/transcriptions";
import { TranscripcionCard as ComponentCard } from "@/components/transcripciones/transcription-card";
import { unstable_cache as cache } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { Skeleton } from "../ui/skeleton";

const getTranscriptionsCached = cache(
  async (userId: string) => getTranscriptions(userId),
  ["transcriptions"],
  {
    tags: ["transcriptions"],
  }
);

export async function TranscriptionCards() {
  const { userId } = auth();

  if (!userId) {
    return <div>No se pudo obtener el usuario</div>
  }
  const transcriptions = await getTranscriptionsCached(userId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-10 gap-x-4 py-10">
      {
        transcriptions.map(transcription => (
          <ComponentCard key={transcription.id} transcription={transcription} />
        ))
      }
    </div>
  )
}

export function TranscriptionCardSkeleton() {
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    <Skeleton className="w-full h-28" />
    <Skeleton className="w-full h-28" />
    <Skeleton className="w-full h-28" />
    <Skeleton className="w-full h-28" />
    <Skeleton className="w-full h-28" />
    <Skeleton className="w-full h-28" />
  </div>
}