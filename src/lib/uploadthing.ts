import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import type { PsicobookingFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<PsicobookingFileRouter>();
export const UploadDropzone = generateUploadDropzone<PsicobookingFileRouter>();
