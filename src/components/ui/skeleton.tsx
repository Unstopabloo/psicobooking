import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse duration-[2000] rounded-lg bg-gray-300 dark:bg-gray-700", className)}
      {...props}
    />
  )
}

export { Skeleton }
