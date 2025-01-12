import { getInitials } from "@/lib/get-initials";
import {
  Avatar as AvatarComponent,
  AvatarFallback,
  AvatarImage
} from "./ui/avatar";
import { cn } from "@/lib/utils";

export function Avatar({ name, avatarUrl, className }: { name: string | null, avatarUrl: string | null, className?: string }) {
  return (
    <AvatarComponent className={cn("size-8 rounded-lg overflow-hidden", className)}>
      <AvatarImage className="rounded-lg" src={avatarUrl ?? undefined} alt={name ?? undefined} />
      <AvatarFallback className='text-xs'>{getInitials(name ?? undefined)}</AvatarFallback>
    </AvatarComponent>
  )
} 