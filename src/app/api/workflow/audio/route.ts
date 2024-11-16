import { serve } from "@upstash/workflow/nextjs"
import OpenAI from "openai"
import { turso } from "@/server/db"
import { revalidatePath, revalidateTag } from "next/cache";

const openai = new OpenAI();

export const { POST } = serve(
  async (context) => {
    const payload = context.requestPayload;

    const { transcriptionText, transcriptionTitle, isTranscribed, appointmentId, audioUrl } = await context.run("transformar-url-y-transcribir", async () => {
      const transcriptionTitle = (payload as any).transcriptionTitle;
      const isTranscribed = (payload as any).isTranscribed;
      const appointmentId = (payload as any).appointmentId;
      const audioUrl = (payload as any).audioUrl;
      if (!audioUrl) {
        throw new Error("No file provided");
      }

      // Fetch the file from the URL
      const response = await fetch(audioUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const file = new File([blob], 'audio.mp3', { type: 'audio/mp3' });

      const transcription = await openai.audio.transcriptions.create({
        file,
        model: "whisper-1",
      });

      if (!transcription.text) {
        throw new Error("No transcription provided");
      }

      const transcriptionText = transcription.text;

      return { transcriptionText, transcriptionTitle, isTranscribed, appointmentId, audioUrl };
    })

    await context.run("guardar-transcripcion", async () => {
      try {
        const { lastInsertRowid } = await turso.execute({
          sql: `INSERT INTO psicobooking_audio (appointment_id, title, content, is_transcribed, audio_url) VALUES (:appointment_id, :title, :content, :is_transcribed, :audio_url)`,
          args: { appointment_id: appointmentId, title: transcriptionTitle, content: transcriptionText, is_transcribed: isTranscribed, audio_url: audioUrl }
        })

        if (!lastInsertRowid) {
          throw new Error("No se pudo guardar la transcripcion")
        }

        console.log("Transcripcion guardada con id: ", Number(lastInsertRowid))

        revalidatePath("/dashboard/herramientas/transcripciones")
        revalidateTag("transcriptions-herramientas")
      } catch (error) {
        console.error("Error al guardar la transcripcion: ", error)
      }
    })
  }
)
