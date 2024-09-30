"use client"

import Image from "next/image"
import { Card, CardDescription, CardContent, CardHeader, CardTitle } from "../ui/card"

export function Consultorios() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <button key={index} className="w-full text-left consultorios-card min-w-48">
          <Card>
            <CardContent className="p-4">
              <div className="relative w-full aspect-video overflow-hidden rounded-xl">
                <Image
                  src="/og-image.png"
                  alt="Consultorio"
                  quality={100}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
              <CardHeader className="flex-col lg:flex-row items-start gap-y-2 gap-x-6 pt-5">
                <CardTitle>Nombre consultorio</CardTitle>
                <p className="text-xs text-muted-foreground">Ju. 3pm - 6pm</p>
              </CardHeader>
              <CardDescription className="pt-1">Av. Siempre viva 742</CardDescription>
            </CardContent>
          </Card>
        </button>
      ))}

    </>
  )
}