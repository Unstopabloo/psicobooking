import { cn } from "@/lib/utils"

export function NoData({
  title,
  description,
  className
}: {
  title: string
  description: string
  className?: string
}) {
  return (
    <div className={cn(
      "flex flex-col items-center min-h-60 justify-center gap-2 w-full border border-border rounded-md bg-card/20 p-4",
      className
    )}>
      <strong className="text-foreground/80 font-medium text-pretty text-sm">{title}</strong>
      <p className="text-muted-foreground text-center text-pretty text-sm">{description}</p>
    </div>
  )
}