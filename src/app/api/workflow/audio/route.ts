import { serve } from "@upstash/workflow/nextjs"
import { turso } from "@/server/db"
import { revalidatePath, revalidateTag } from "next/cache";

import OpenAI from "openai"
import { openai as openaiSDK } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

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
        prompt: "Eres un modelo que transcribe audios de psicoterapia, por favor, respeta el formato de la transcripcion, no añadas ningun comentario adicional, solo la transcripcion del audio, el audio y la transcripcion deben siempre estar en español."
      });

      if (!transcription.text) {
        throw new Error("No transcription provided");
      }

      const transcriptionText = transcription.text;

      return { transcriptionText, transcriptionTitle, isTranscribed, appointmentId, audioUrl };
    })

    await context.run("guardar-transcripcion", async () => {
      try {
        if (isTranscribed === "false") {
          const { lastInsertRowid } = await turso.execute({
            sql: `INSERT INTO psicobooking_audio (appointment_id, title, content, is_transcribed, audio_url) VALUES (:appointment_id, :title, :content, :is_transcribed, :audio_url)`,
            args: { appointment_id: appointmentId, title: transcriptionTitle, content: transcriptionText, is_transcribed: isTranscribed, audio_url: audioUrl }
          })

          if (!lastInsertRowid) {
            throw new Error("No se pudo guardar la transcripcion")
          }

          revalidatePath("/dashboard/herramientas/transcripciones")
          revalidateTag("transcriptions-herramientas")
        } else {
          const { object } = await generateObject({
            model: openaiSDK("gpt-4o-mini"),
            schema: z.object({
              resumen: z.string(),
              analisis: z.array(z.object({
                title: z.string(),
                content: z.string(),
              }))
            }),
            system: `Eres un asistente especializado en análisis de sesiones terapéuticas. Tu tarea es analizar la transcripción de una sesión y extraer los puntos más relevantes para el psicólogo. Organiza la información en secciones clave y además, añade un comentario inicial con un breve resumen de la sesión. Devuelve los resultados en formato JSON con la estructura descrita.`,
            prompt: `Transcripción: ${transcriptionText}`,
          });

          const { lastInsertRowid } = await turso.execute({
            sql: `INSERT INTO psicobooking_audio (appointment_id, title, content, is_transcribed, audio_url) VALUES (:appointment_id, :title, :content, :is_transcribed, :audio_url)`,
            args: { appointment_id: appointmentId, title: transcriptionTitle, content: JSON.stringify(object, null, 2), is_transcribed: isTranscribed, audio_url: audioUrl }
          })

          if (!lastInsertRowid) {
            throw new Error("No se pudo guardar la transcripcion")
          }

          revalidatePath("/dashboard/herramientas/transcripciones")
          revalidateTag("transcriptions-herramientas")
        }
      } catch (error) {
        console.error("Error al guardar la transcripcion: ", error)
      }
    })
  }
)
