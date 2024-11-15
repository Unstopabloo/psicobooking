import { getTranscriptionContent } from "@/server/db/transcriptions";
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { unstable_cache } from "next/cache";

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
    <div>
      <h1>{transcription?.title}</h1>
      <p className="prose text-muted-foreground">{transcription?.content}</p>
    </div>
  )
}