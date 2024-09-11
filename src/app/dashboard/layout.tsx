import Image from "next/image";
import Link from "next/link";

import { DesktopNav } from "@/components/layout/Navs";
import { SignedIn, UserButton } from "@clerk/nextjs";

import { ThemeProvider } from "@/components/theme-switcher/theme-provider";
import { ModeToggle } from "@/components/theme-switcher/Switcher";
import { Button } from "@/components/ui/button";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex min-h-screen overflow-hidden">
        <aside className="flex flex-col items-center justify-between gap-12 py-8 px-4 border-r border-border">
          <div className="flex flex-col items-center gap-12">
            <Link href="/dashboard">
              <Image src="/isotipo.webp" alt="logo psicobooking" width={70} height={70} />
            </Link>

            <DesktopNav />
          </div>

          <div className="flex flex-col items-center gap-8 p-2">
            <ModeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </aside>
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between w-full border-b border-border py-4 px-12">
            <Button className="flex items-center gap-3">Asistente <small>⌘ K</small></Button>
            a
          </header>
          {children}
        </div>
      </div>
    </ThemeProvider>
  )
}