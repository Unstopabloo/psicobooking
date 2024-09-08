import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col relative min-h-screen">
      <header className="w-full">
        <div aria-label="contenedor de header" className="container mx-auto flex items-center justify-between py-6">
          <Image src="/isotipo.webp" alt="logo" width={100} height={100} />
          <Button asChild>
            <Link href="login" className="px-8 py-5 rounded-xl tracking-wider">Comenzar</Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto">
        <section aria-label="contenedor de hero" className="grid grid-cols-2 gap-10 items-center py-10">
          <div className="flex flex-col items-start gap-1 col-span-1">
            <small className="text-foreground/65 text-sm font-light">Psicobooking</small>
            <h1 className="text-6xl leading-tight pb-5">Tu camino hacia la <span className="text-primary font-semibold">paz</span> mental comienza aquí</h1>
            <p className="text-foreground/80 text-pretty max-w-[30rem]">El booking, control y seguimiento de tu salud mental en un solo lugar. Encuentra tu terapeuta ideal, agenda citas y realiza sesiones online con total comodidad y privacidad.</p>
            <div className="flex items-center justify-center gap-12 py-14">
              <Button asChild>
                <Link href="login" className="px-14 py-[20px] rounded-xl text-lg tracking-wider">Agendar</Link>
              </Button>
              <Button variant="link" asChild>
                <Link href="login">¿Necesitas ayuda?</Link>
              </Button>
            </div>
          </div>
          <div className="col-span-1 flex justify-end items-center relative">
            <div className="size-28 rounded-full bg-secondary/65 absolute -top-10 left-20 z-10"></div>
            <Image src="/heroimg.png" alt="hero" width={600} height={440} />
            <div className="size-28 rounded-full bg-primary/65 absolute bottom-10 right-20 -z-10"></div>
          </div>
        </section>
      </main>
    </div>
  );
}
