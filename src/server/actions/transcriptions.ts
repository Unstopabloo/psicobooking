"use server"

import { utapi } from "@/server/ut";
import { toast } from "sonner";

export async function createTranscription(formData: FormData) {
  try {
    const audioFile = formData.get("audio_file")
    const rawTranscriptionTitle = formData.get("transcription_title")
    const isTranscribed = formData.get("is_transcribed")
    const appointmentId = formData.get("appointment_id")

    const transcriptionTitle = rawTranscriptionTitle?.toString().replace(/\s+/g, '_').toLowerCase()

    if (!audioFile) throw new Error("No se seleccionó ningún archivo")

    const response = await utapi.uploadFiles(new File([audioFile], `${transcriptionTitle}.mp3`))

    if (!response || response.error) throw new Error("Error al subir archivo, intente nuevamente")

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workflow/audio`, {
      method: "POST",
      body: JSON.stringify({ file: response.data.url, fileKey: response.data.key, transcriptionTitle, isTranscribed, appointmentId })
    })

    return response
  } catch (error) {
    toast.error("Error al crear la transcripción, intente nuevamente")
  }
}