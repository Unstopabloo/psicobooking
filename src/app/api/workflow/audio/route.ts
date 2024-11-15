import { serve } from "@upstash/workflow/nextjs"
import OpenAI from "openai"
import { turso } from "@/server/db"
import { utapi } from "@/server/ut";
import { revalidatePath, revalidateTag } from "next/cache";

const openai = new OpenAI();

export const { POST } = serve(
  async (context) => {
    const payload = context.requestPayload;

    const { transcriptionText, fileKey, transcriptionTitle, isTranscribed, appointmentId } = await context.run("transformar-url-y-transcribir", async () => {
      console.log(payload);
      const fileUrl = (payload as any).file;
      const fileKey = (payload as any).fileKey;
      const transcriptionTitle = (payload as any).transcriptionTitle;
      const isTranscribed = (payload as any).isTranscribed;
      const appointmentId = (payload as any).appointmentId;
      console.log("payload: ", payload)
      console.log("transcriptionTitle: ", transcriptionTitle, "tipo: ", typeof transcriptionTitle)
      console.log("isTranscribed: ", isTranscribed, "tipo: ", typeof isTranscribed)
      console.log("appointmentId: ", appointmentId, "tipo: ", typeof appointmentId)

      if (!fileUrl) {
        throw new Error("No file provided");
      }

      console.log("Fetching file from URL: ", fileUrl);
      // Fetch the file from the URL
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const file = new File([blob], 'audio.mp3', { type: 'audio/mpeg' });

      console.log("Archivo transformado: ", file)

      const transcription = await openai.audio.transcriptions.create({
        file,
        model: "whisper-1",
      });

      if (!transcription.text) {
        throw new Error("No transcription provided");
      }

      const transcriptionText = transcription.text;
      console.log("Transcripcion: ", transcriptionText)

      return { transcriptionText, fileKey, transcriptionTitle, isTranscribed, appointmentId };
    })

    await context.run("eliminar-archivo", async () => {
      console.log("Eliminando archivo: ", fileKey)
      await utapi.deleteFiles(fileKey);
      console.log("Archivo eliminado")
    })

    await context.run("guardar-transcripcion", async () => {
      try {
        const { lastInsertRowid } = await turso.execute({
          sql: `INSERT INTO psicobooking_audio (appointment_id, title, content, is_transcribed) VALUES (:appointment_id, :title, :content, :is_transcribed)`,
          args: { appointment_id: appointmentId, title: transcriptionTitle, content: transcriptionText, is_transcribed: isTranscribed }
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
