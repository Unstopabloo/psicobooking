import { getInitials } from "@/lib/get-initials";
import {
  Avatar as AvatarComponent,
  AvatarFallback,
  AvatarImage
} from "./ui/avatar";

export function Avatar({ name, avatarUrl }: { name: string | null | undefined, avatarUrl: string | null | undefined }) {
  if (!name || !avatarUrl) {
    return (
      <AvatarComponent className="size-8">
        <AvatarImage src="" alt="avatar fallback" />
        <AvatarFallback className='text-xs'>AA AA</AvatarFallback>
      </AvatarComponent>
    )
  }

  return (
    <AvatarComponent className="size-8">
      <AvatarImage src={avatarUrl} alt={name} />
      <AvatarFallback className='text-xs'>{getInitials(name)}</AvatarFallback>
    </AvatarComponent>
  )
} 