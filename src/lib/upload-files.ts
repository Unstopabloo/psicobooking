"server-only"

import { cloudinaryUtils } from "@/server/cloudinary";

export const uploadDocument = async (
  document: string,
  filename: string,
  folder: "certificados-de-estudios" | "carta-de-recomendaciones"
) => {
  console.log("uploading document")
  try {
    if (!document || !filename || !folder) {
      console.error("No se proporcionó los datos necesarios para subir el archivo")
      throw new Error("No se proporcionó los datos necesarios para subir el archivo")
    }

    // Extraer la data base64
    const base64Data = document.split(';base64,').pop()

    if (!base64Data) {
      throw new Error("Error en el formato del documento base64")
    }

    // Subir directamente a Cloudinary usando el string base64
    const { public_id, url } = await cloudinaryUtils.uploader.upload(
      `data:application/pdf;base64,${base64Data}`,
      {
        format: "pdf",
        use_filename: true,
        filename_override: filename,
        folder: folder,
        resource_type: "raw"
      }
    )

    if (!url || !public_id) {
      throw new Error("Error al subir el archivo a Cloudinary")
    }

    console.log("Archivo subido exitosamente:", url)

    return {
      public_id,
      url
    }

  } catch (error) {
    console.error("Error al subir el archivo:", error)
    throw new Error("Error al subir el archivo")
  }
}

export const deleteDocument = async (public_id: string) => {
  console.log("deleting document", public_id)
  await cloudinaryUtils.uploader.destroy(public_id)
}