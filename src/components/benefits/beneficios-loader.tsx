import { CardContent } from "../ui/card"

import Image from "next/image"
import { Card } from "../ui/card"
import { getBenefits } from "@/server/db/benefits"
import { Button } from "../ui/button"
import { ArrowRightIcon } from "lucide-react"

export async function BenefitsLoader() {
  const benefits = await getBenefits()

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {benefits.map((benefit) => (
        <article key={benefit.id} className="group relative benefit-card h-80 rounded-xl shadow-md border overflow-hidden hover:shadow-lg transition-all duration-300">
          <div className="absolute bottom-0 left-0 w-full h-full z-10 translate-y-full group-hover:translate-y-0 group-hover:bg-gradient-to-t dark:from-slate-900/70 dark:via-slate-900/30 dark:to-slate-900/0 from-foreground/70 via-foreground/30 to-foreground/0 transition-all duration-700"></div>
          <div className="w-full h-full min-h-80 relative">
            <Image
              className="group-hover:scale-110 transition-all duration-700"
              src={benefit.image_url || "/logo-full.png"}
              alt={benefit.title}
              fill
              style={{ objectFit: "cover", objectPosition: "center", zIndex: 0 }}
            />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-20 text-white bg-transparent translate-y-full group-hover:translate-y-0 transition-all duration-700 z-50 p-4 flex items-start justify-between">
            <div>
              <h3 className="font-semibold mb-1">{benefit.title}</h3>
              <p className="text-sm">{benefit.benefit_description}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export function BenefitsLoaderSkeleton() {
  return <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="h-80 rounded-xl shadow-md border overflow-hidden animate-pulse"></div>
    ))}
  </div>
}