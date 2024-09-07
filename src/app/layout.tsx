import { env } from "@/env";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Psicobooking",
  description: "Psicobooking",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  console.log(env.TURSO_DATABASE_URL);
  console.log(env.TURSO_AUTH_TOKEN);

  return (
    <html lang="es" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
