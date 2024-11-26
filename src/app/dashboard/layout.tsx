import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";

import { DesktopNav } from "@/components/layout/Navs";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { SignOutButton } from "@/components/sign-out-button";
import { ThemeProvider } from "@/components/theme-switcher/theme-provider";
import { ThemeSwitcher } from "@/components/theme-switcher/Switcher";
import { Button } from "@/components/ui/button";
import { BreadCrumb } from "./_layout-components/breadcrumb";
import { SubNav } from "./_layout-components/sub-nav";
import { MobileNav } from "./_layout-components/mobile-nav";
import { Scheduler } from "@/components/agenda/scheduler";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Bell } from "lucide-react";
import { ChatAsistant } from "@/components/ai-asistant/ui-chat-asistant";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar } from "@/components/Avatar";
import { currentUser } from "@clerk/nextjs/server";

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const nonce = headers().get('x-nonce') || ''
  const user = await currentUser()

  return (
    <ThemeProvider
      nonce={nonce}
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex min-h-screen">
        <aside className="hidden sm:flex sm:flex-col sm:items-center sm:justify-between sm:gap-12 sm:py-8 sm:px-4 sm:border-r sm:border-border">
          <div className="flex flex-col items-center gap-12">
            <Link href="/dashboard">
              <Image src="/isotipo.webp" alt="logo psicobooking" width={60} height={60} />
            </Link>

            <DesktopNav />
          </div>

          <div className="flex flex-col items-center gap-8 p-2">
            <ThemeSwitcher />
            <SignedIn>
              <UserButton />
              <DropdownMenu>
                <DropdownMenuTrigger aria-label="Menú de usuario" className="rounded-full">
                  <Avatar name={user!.firstName} avatarUrl={user!.imageUrl} />
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={10} align="start">
                  <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/perfil">Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>Suscripción</DropdownMenuItem>
                  <SignOutButton />
                </DropdownMenuContent>
              </DropdownMenu>
            </SignedIn>
          </div>
        </aside>
        <div className="flex flex-col flex-1 overflow-hidden h-screen">

          <header className="flex items-center justify-between w-full border-b border-border py-4 px-4 sm:px-12 xl:px-[86px] 2xl:px-20">

            <Link className="block sm:hidden" href="/dashboard">
              <Image src="/isotipo.webp" alt="logo psicobooking" width={60} height={60} />
            </Link>

            <div className="flex items-center justify-end sm:justify-between w-full gap-2 lg:gap-8">
              <div className="sm:flex-1">
                <ChatAsistant />
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Scheduler mode="base" text="Agenda rápida" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mi agenda rápida</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button aria-label="Ver notificaciones" variant="outline" className="flex items-center gap-2 text-foreground/80">
                <span className="hidden sm:block">Notificaciones</span> <Bell size={16} />
              </Button>

              <div className="sm:hidden">
                <SignedIn>
                  <UserButton />
                  <DropdownMenu>
                    <DropdownMenuTrigger aria-label="Menú de usuario" className="rounded-full">
                      <Avatar name={user!.firstName} avatarUrl={user!.imageUrl} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={10} align="start">
                      <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/perfil">Perfil</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled>Suscripción</DropdownMenuItem>
                      <SignOutButton />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SignedIn>
              </div>
            </div>
          </header>

          <div className="flex items-center justify-between px-4 sm:px-12 xl:px-[86px] 2xl:px-20 bg-card">
            <BreadCrumb />
            <SubNav />
          </div>
          <main className="relative py-6 px-4 sm:px-12 overflow-auto">
            {children}
            <MobileNav />
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}