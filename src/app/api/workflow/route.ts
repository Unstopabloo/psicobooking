import { serve } from "@upstash/workflow/nextjs"
import OpenAI from "openai"


const openai = new OpenAI();

export const { POST } = serve(
  async (context) => {
    const payload = context.requestPayload;

    await context.run("initial-step", async () => {
      console.log(payload);
      const fileUrl = (payload as any).file;

      if (!fileUrl) {
        throw new Error("No file provided");
      }

      console.log("Fetching file from URL: ", fileUrl);
      // Fetch the file from the URL
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get the file as a Blob
      const blob = await response.blob();

      // Create a File object from the Blob
      const file = new File([blob], 'audio.mp3', { type: 'audio/mpeg' });

      console.log("Se procesara el archivo: ", file);
      const transcription = await openai.audio.transcriptions.create({
        file,
        model: "whisper-1",
      });

      if (!transcription.text) {
        throw new Error("No transcription provided");
      }

      console.log("Transcripcion: ", transcription.text)
    })

    await context.run("second-step", () => {
      console.log("second step ran")
    })
  }
)
