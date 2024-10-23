export function NoData({
  title,
  description
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center min-h-60 justify-center gap-2 w-full border border-border rounded-md bg-card/20 p-4">
      <strong className="text-foreground/80 font-medium text-pretty text-sm">{title}</strong>
      <p className="text-muted-foreground text-pretty text-sm">{description}</p>
    </div>
  )
}