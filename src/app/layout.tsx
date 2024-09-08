import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"

import { ClerkProvider, SignInButton } from '@clerk/nextjs'
import { CSPostHogProvider } from "./_analytics/provider";

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
        <html lang="es" className={`${GeistSans.variable}`}>
          <body>
            {children}
            <Toaster />
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
