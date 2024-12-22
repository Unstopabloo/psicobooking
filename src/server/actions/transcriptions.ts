"use server"

import { toast } from "sonner";
import { cloudinaryUtils } from "@/server/cloudinary"
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NEXT_PUBLIC_API_URL } from "@/lib/env.client";

export async function createTranscription(formData: FormData) {
  const { userId } = auth();

  if (!userId) {
    console.error("No se pudo crear la transcripcion, usuario no autenticado")
    redirect("/sign-in");
  }

  try {
    const audioFile = formData.get("audio_file")
    const rawTranscriptionTitle = formData.get("transcription_title")
    const isTranscribed = formData.get("is_transcribed")
    const appointmentId = formData.get("appointment_id")

    const transcriptionTitle = rawTranscriptionTitle?.toString().replace(/\s+/g, '_').toLowerCase()

    if (!audioFile) throw new Error("No se seleccionó ningún archivo");

    const audio = new File([audioFile], `${transcriptionTitle}`)
    const arrayBuffer = await audio.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const result = await new Promise((resolve, reject) => {
      cloudinaryUtils.uploader.upload_stream(
        {
          resource_type: 'video',
          folder: 'transcriptions',
          format: 'mp3',
          public_id: transcriptionTitle,
          transformation: [{
            audio_codec: "mp3",
            bit_rate: "16k",
            audio_frequency: "22050",
            channels: 1,
            channel_layout: "mono",
            effect: "volume:100"
          }],

        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    fetch(`${NEXT_PUBLIC_API_URL}/workflow/audio`, {
      method: "POST",
      body: JSON.stringify({
        transcriptionTitle,
        isTranscribed,
        appointmentId,
        audioUrl: (result as any).url,
      }),
    })

    return { success: true, result }
  } catch (error) {
    toast.error("Error al crear la transcripción, intente nuevamente")
  }
}