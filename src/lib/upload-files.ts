"server-only"

import fs from "fs";
import { cloudinaryUtils } from "@/server/cloudinary";

export const uploadDocument = async (document: string, filename: string, folder: "certificados-de-estudios" | "carta-de-recomendaciones") => {
  console.log("uploading document")
  try {
    if (!document || !filename || !folder) {
      console.error("No se proporcionó los datos necesarios para subir el archivo")
      throw new Error("No se proporcionó los datos necesarios para subir el archivo")
    }

    // Convertir el archivo base64 a pdf
    const base64Data = document.split(';base64,').pop()

    // Guardar el archivo en el sistema de archivos
    if (base64Data) {
      const buffer = Buffer.from(base64Data, 'base64')
      fs.writeFileSync(
        `./${filename}.pdf`,
        buffer
      )

      // Subir el archivo a cloudinary
      const { public_id, url } = await cloudinaryUtils.uploader.upload(`./${filename}.pdf`, {
        format: "pdf",
        use_filename: true,
        folder: folder
      })

      console.log("file", url)

      if (!url || !public_id) {
        throw new Error("Error al subir el archivo")
      }

      // Eliminar el archivo temporal
      fs.unlinkSync(`./${filename}.pdf`)

      return {
        public_id,
        url
      }
    }
  } catch (error) {
    console.error("Error al subir el archivo", error)
    throw new Error("Error al subir el archivo")
  }
}

export const deleteDocument = async (public_id: string) => {
  console.log("deleting document", public_id)
  await cloudinaryUtils.uploader.destroy(public_id)
}