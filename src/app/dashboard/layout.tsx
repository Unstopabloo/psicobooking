import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";

import { DesktopNav } from "@/components/layout/Navs";
import { SignedIn, UserButton } from "@clerk/nextjs";

import { ThemeProvider } from "@/components/theme-switcher/theme-provider";
import { ThemeSwitcher } from "@/components/theme-switcher/Switcher";
import { Button } from "@/components/ui/button";
import { BreadCrumb } from "./_layout-components/breadcrumb";
import { SubNav } from "./_layout-components/sub-nav";

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const nonce = headers().get('x-nonce') || ''

  return (
    <ThemeProvider
      nonce={nonce}
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex min-h-screen">
        <aside className="flex flex-col items-center justify-between gap-12 py-8 px-4 border-r border-border">
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
            </SignedIn>
          </div>
        </aside>
        <div className="flex flex-col flex-1 overflow-hidden h-screen">
          <header className="flex items-center justify-between w-full border-b border-border py-4 px-12">
            <Button className="flex items-center gap-3">Asistente <small>⌘ K</small></Button>
            a
          </header>
          <div className="flex items-center justify-between px-12 bg-card">
            <BreadCrumb />
            <SubNav />
          </div>
          <main className="relative py-6 px-12 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}