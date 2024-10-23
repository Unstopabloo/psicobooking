import { getInitials } from "@/lib/get-initials";
import {
  Avatar as AvatarComponent,
  AvatarFallback,
  AvatarImage
} from "./ui/avatar";

export function Avatar({ name, avatarUrl }: { name: string | null, avatarUrl: string | null }) {
  return (
    <AvatarComponent className="size-8">
      <AvatarImage src={avatarUrl ?? undefined} alt={name ?? undefined} />
      <AvatarFallback className='text-xs'>{getInitials(name ?? undefined)}</AvatarFallback>
    </AvatarComponent>
  )
} 