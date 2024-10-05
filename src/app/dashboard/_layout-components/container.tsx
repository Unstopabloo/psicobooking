import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn(`container mx-auto lg:px-32 2xl:px-40 animate-fade-up animate-ease-out animate-duration-500`, className)}>
      {children}
    </div>
  )
}