"use client"

import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';

export function VideoPlayer({ publicId }: { publicId: string }) {
  return (
    <CldVideoPlayer
      width="1620"
      height="920"
      src={publicId}
      fontFace='Geist'
    />
  )
}