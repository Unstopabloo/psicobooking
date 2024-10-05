"use client"

import { cn } from "@/lib/utils"

export function ScrollFade({
  is_reached_top,
}: {
  is_reached_top?: boolean
}) {
  return (
    <div
      className={cn(`absolute ${is_reached_top ? 'top' : 'bottom'}-0 left-0 right-4 h-${is_reached_top ? '3' : '16'} bg-gradient-to-${is_reached_top ? 'b' : 't'} from-background via-background/80 to-transparent pointer-events-none`)}
    ></div>
  )
}