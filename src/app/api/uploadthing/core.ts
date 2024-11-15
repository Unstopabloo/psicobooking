import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();
// FileRouter for your app, can contain multiple FileRoutes
export const psicobookingFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  audioUploader: f({
    audio: {
      maxFileSize: "32MB",
      maxFileCount: 1,
      minFileCount: 1
    }
  })
    .middleware(async ({ req }) => {
      const { userId } = auth();
      if (!userId) throw new UploadThingError("Unauthorized");
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file", file.key);

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workflow/audio`, {
        method: "POST",
        body: JSON.stringify({ file: file.url, fileKey: file.key })
      })

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { message: "Archivo subido correctamente" }
    }),
} satisfies FileRouter;

export type PsicobookingFileRouter = typeof psicobookingFileRouter;
