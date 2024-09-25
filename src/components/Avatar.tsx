import { getInitials } from "@/lib/get-initials";
import {
  Avatar as AvatarComponent,
  AvatarFallback,
  AvatarImage
} from "./ui/avatar";

export function Avatar({ name, avatarUrl }: { name: string, avatarUrl: string }) {
  return (
    <AvatarComponent className="size-8">
      <AvatarImage src={avatarUrl} alt={name} />
      <AvatarFallback className='text-xs'>{getInitials(name)}</AvatarFallback>
    </AvatarComponent>
  )
} 