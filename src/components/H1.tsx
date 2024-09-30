import { cn } from "@/lib/utils";

export default function H1({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <h1 className={cn(`text-base font-semibold text-foreground/90`, className)}>{children}</h1>
  )
}