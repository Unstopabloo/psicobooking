"use client"

import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { uploadVideo } from '@/server/actions/cloudinary';
import { NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET } from '@/lib/env.client';

export function CloudinaryUploadButton() {
  const handleSuccess = async (result: any) => {
    console.log(result);

    toast.promise(uploadVideo(result.info.public_id), {
      loading: "Subiendo video",
      success: "Video subido",
      error: "Error al subir video"
    })
  }

  return (
    <CldUploadWidget
      uploadPreset={NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
      options={{
        resourceType: 'video',
        sources: ['local'],
        multiple: false,
        maxFiles: 1,
      }}
      onSuccess={(result, { widget }) => {
        handleSuccess(result);
      }}
    >
      {({ open }) => {
        return (
          <Button onClick={() => open()}>
            Subir Video de presentación
          </Button>
        );
      }}
    </CldUploadWidget>
  )
}
