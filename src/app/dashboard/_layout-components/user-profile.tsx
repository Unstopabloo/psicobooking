import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { SignedIn } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getSuscription } from "@/server/db/payments";
import { PsychologistNav } from "@/components/layout/Navs";
import { PatientNav } from "@/components/layout/Navs";
import { cn } from "@/lib/utils";
import { SignOutButton } from "./sign-out-button";

export async function UserProfile() {
  const user = await currentUser();

  if (!user) {
    return null
  }

  const suscription = await getSuscription(user.id);
  const isPsychologist = auth().sessionClaims?.metadata.role === 'psychologist'

  return (
    <div className="sm:hidden">
      <SignedIn>
        <DropdownMenu>
          <DropdownMenuTrigger aria-label="Menú de usuario" className="rounded-full">
            <Avatar name={user!.firstName} avatarUrl={user!.imageUrl} />
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10} align="start">
            <DropdownMenuLabel className="flex flex-row items-center min-w-0 gap-2">
              <Avatar name={user!.firstName} avatarUrl={user!.imageUrl} />
              <div className="flex flex-col">
                <span className="truncate text-sm font-medium text-foreground">{user!.firstName} {user!.lastName}</span>
                <span className="truncate text-xs font-normal text-muted-foreground">
                  {user!.emailAddresses[0]?.emailAddress}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/perfil">Perfil</Link>
            </DropdownMenuItem>
            {
              isPsychologist && (
                <DropdownMenuItem asChild>
                  <Link className="flex items-center gap-2" href="/dashboard/suscripcion">
                    Suscripción
                    <Badge
                      className={cn("border-secondary bg-secondary/10 text-secondary",
                        suscription?.status === "paused" || suscription?.status === "cancelled" || !suscription.status && "border-primary bg-primary/10 text-primary",
                        suscription?.status === "active" || suscription?.status === "on_trial" && "border-green-500 bg-green-500/10 text-green-500"
                      )}
                      variant="outline"
                    >
                      {suscription?.status === 'paused' || suscription?.status === 'cancelled' || !suscription.status ? 'Free' : 'Pro'}
                    </Badge>
                  </Link>
                </DropdownMenuItem>
              )
            }
            <DropdownMenuSeparator />
            <SignOutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </SignedIn>
    </div>
  )
}

export async function DynamicNav() {
  const isPsychologist = auth().sessionClaims?.metadata.role === 'psychologist'

  return isPsychologist ? <PsychologistNav /> : <PatientNav />
}

export async function UserProfileMobile() {
  const user = await currentUser();

  if (!user) {
    return null
  }

  const suscription = await getSuscription(user.id);
  const isPsychologist = auth().sessionClaims?.metadata.role === 'psychologist'

  return (
    <SignedIn>
      <DropdownMenu>
        <DropdownMenuTrigger aria-label="Menú de usuario" className="rounded-full">
          <Avatar name={user!.firstName} avatarUrl={user!.imageUrl} />
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={10} align="start">
          <DropdownMenuLabel className="flex flex-row items-center min-w-0 gap-2">
            <Avatar name={user!.firstName} avatarUrl={user!.imageUrl} />
            <div className="flex flex-col">
              <span className="truncate text-sm font-medium text-foreground">{user!.firstName} {user!.lastName}</span>
              <span className="truncate text-xs font-normal text-muted-foreground">
                {user!.emailAddresses[0]?.emailAddress}
              </span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/perfil">Perfil</Link>
          </DropdownMenuItem>
          {
            isPsychologist && (
              <DropdownMenuItem asChild>
                <Link className="flex items-center gap-2" href="/dashboard/suscripcion">
                  Suscripción
                  <Badge
                    className={cn("border-secondary bg-secondary/10 text-secondary",
                      suscription?.status === "paused" || suscription?.status === "cancelled" || !suscription.status && "border-primary bg-primary/10 text-primary",
                      suscription?.status === "active" || suscription?.status === "on_trial" && "border-green-500 bg-green-500/10 text-green-500"
                    )}
                    variant="outline"
                  >
                    {suscription?.status === 'paused' || suscription?.status === 'cancelled' || !suscription.status ? 'Free' : 'Pro'}
                  </Badge>
                </Link>
              </DropdownMenuItem>
            )
          }
          <DropdownMenuSeparator />
          <SignOutButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </SignedIn>
  )
}