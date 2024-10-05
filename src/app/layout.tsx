import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"

import { ClerkProvider } from '@clerk/nextjs'
import { CSPostHogProvider } from "./_analytics/provider";
import Providers from "@/components/providers";
import ScreenSizeIndicator from "./dashboard/_layout-components/breakpoints";

export const metadata: Metadata = {
  title: "Psicobooking",
  description: "Psicobooking",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <Providers>
          <html lang="es" className={`${GeistSans.variable}`}>
            <body>
              {children}
              <Toaster />
              <ScreenSizeIndicator />
            </body>
          </html>
        </Providers>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
