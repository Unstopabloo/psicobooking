import type { Metadata } from 'next'

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

import * as Icon from "@/components/landingIcons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MenuIcon } from "@/components/icons";

import psicofriends from "../../public/psicofriends.webp";
import React from "react";

export const metadata: Metadata = {
  title: "Psicobooking",
  description: "La plataforma de psicología médica para personas que buscan ayuda y psicologos que busscan organizar citas",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  referrer: "origin-when-cross-origin",
  keywords: ['Psicologia', 'Atencion de pacientes', 'Psicología médica', 'Organización de citas', 'Citas', 'Psicología', 'Atención médica'],
  authors: [
    {
      name: 'Lusiana Varela',
      url: 'https://www.linkedin.com/in/lusiana-varela-b286a820b/'
    },
    {
      name: 'Jaime Chavez',
      url: 'https://www.linkedin.com/in/jaime-alfonso-chavez-elejalde-5b5551202/'
    }
  ],
  openGraph: {
    title: "Psicobooking",
    description: "La plataforma de psicología médica para personas que buscan ayuda y psicologos que busscan organizar citas",
    images: [
      {
        url: "https://psicobooking.vercel.app/og-image.png",
        width: 1050,
        height: 630,
        alt: "Hero de Landing de Psicobooking"
      },
    ],
    url: "https://psicobooking.vercel.app/",
    locale: "es",
    siteName: "Psicobooking",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Psicobooking",
    description: "La plataforma de psicología médica para personas que buscan ayuda y psicologos que busscan organizar citas",
    creator: "@PsicoBooking",
    images: [
      {
        url: "https://psicobooking.vercel.app/og-image.png",
        width: 1050,
        height: 630,
        alt: "Hero de Landing de Psicobooking"
      },
    ],
  }
};

type Spaciality = {
  id: number,
  name: string,
  icon: React.ReactNode
}

const SPECIALITIES: Spaciality[] = [
  {
    id: 1,
    name: "Adicciones",
    icon: <Icon.AdiccionesIcon />
  },
  {
    id: 2,
    name: "Ansiedad y/o estrés",
    icon: <Icon.AnsiedadIcon />
  },
  {
    id: 3,
    name: "Atención",
    icon: <Icon.AtencionIcon />
  },
  {
    id: 4,
    name: "Autoestima",
    icon: <Icon.AutoestimaIcon />
  },
  {
    id: 5,
    name: "Crianza",
    icon: <Icon.CrianzaIcon />
  },
  {
    id: 6,
    name: "Depresión",
    icon: <Icon.DepresionIcon />
  },
  {
    id: 7,
    name: "Cronicas",
    icon: <Icon.CronicasIcon />
  },
  {
    id: 8,
    name: "Impuslividad y/o Ira",
    icon: <Icon.AngryIcon />
  },
  {
    id: 9,
    name: "Orientación vocacional",
    icon: <Icon.VocacionalIcon />
  },
  {
    id: 10,
    name: "Problemas alimenticios",
    icon: <Icon.AlimenticiosIcon />
  },
  {
    id: 11,
    name: "Problemas de sueño",
    icon: <Icon.SueñoIcon />
  },
  {
    id: 12,
    name: "Relaciones",
    icon: <Icon.RelacionesIcon />
  },
  {
    id: 13,
    name: "Riesgo suicida",
    icon: <Icon.SuicidaIcon />
  },
  {
    id: 14,
    name: "Sexualidad",
    icon: <Icon.SexualidadIcon />
  },
  {
    id: 15,
    name: "Terapia de parejas",
    icon: <Icon.ParejasIcon />
  },
  {
    id: 16,
    name: "TOC",
    icon: <Icon.TOCIcon />
  },
  {
    id: 17,
    name: "Traumas",
    icon: <Icon.TraumasIcon />
  },
  {
    id: 18,
    name: "Trabajo con niños",
    icon: <Icon.NiñosIcon />
  }
]

export default function HomePage() {
  return (
    <div className="flex flex-col relative min-h-screen overflow-x-hidden">
      <header className="w-full fixed top-0 left-0 z-50 bg-gradient-to-b from-card to-card/0 filter backdrop-blur-md">
        <div aria-label="contenedor de header" className="container mx-auto flex items-center justify-between py-2 md:py-6 px-4 lg:px-20 xl:px-52">
          <div className="flex items-center">
            <Image src="/isotipo.webp" priority alt="logo" width={70} height={70} />
            <strong className="hidden lg:block font-medium text-lg">PsicoBooking</strong>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            <Button variant="link" asChild className="text-foreground text-sm">
              <Link href="/sign-in">¿Necesitas ayuda?</Link>
            </Button>
            <SignedOut>
              <SignUpButton>
                <Button className="px-4 py-1 rounded-xl tracking-wider text-sm opacity-90">
                  Comenzar
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="block lg:hidden">
              <MenuIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Button variant="link" asChild className="text-foreground text-sm">
                  <Link href="/sign-in">¿Necesitas ayuda?</Link>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SignedOut>
                  <SignUpButton>
                    <Button className="px-4 py-1 rounded-xl tracking-wider text-sm opacity-90">
                      Comenzar
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


        </div>
      </header>
      <main>
        <section
          className="relative min-h-[90dvh] w-screen pt-32 md:pt-48"
        >
          <div className="absolute inset-0 -z-30 opacity-55">
            <svg width="100%" height="100%" viewBox="0 0 1440 643" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
              <g opacity="0.13" clipPath="url(#clip0_22_999)">
                <path d="M1440 643L1080 482.25H1440V643Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M1080 643V562.625H900L1080 643Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M900 643L720 562.625H900V643Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M900 482.25V562.625L720 482.25H900Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M1080 482.25L900 562.625V482.25H1080Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M900 482.25H984L900 442.063V482.25Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M990 442.062V401.875H900L990 442.062Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M990 442.062V401.875H1080L990 442.062Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M900 401.875V482.25H720L900 401.875Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M900 401.875L720 321.5V401.875H900Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M900 321.5V401.875H1080L900 321.5Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M1440 482.25V321.5L1080 482.25H1440Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M540 562.625V643L720 562.625H540Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M540 643H360V562.625L540 643Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M540 562.625H360V482.25L540 562.625Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M439 482.25H259V401.875L439 482.25Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M720 562.625H540V482.25L720 562.625Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M360 643V482.25H0L360 643Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M360 482.25V401.875L180 482.25H360Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M180 482.25V401.875L0 482.25H180Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M0 401.875V321.5H180L0 401.875Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M360 321.5L180 401.875V321.5H360Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M720 482.25V401.875L540 482.25H720Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M540 401.875L360 482.25V401.875H540Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M540 321.5V401.875H360L540 321.5Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M540 321.5L720 401.875V321.5H540Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M720 241.125L540 321.5H720V241.125Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M540 321.5V241.125H360L540 321.5Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M360 160.75V241.125H540L360 160.75Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M720 160.75V241.125L540 160.75H720Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M0 160.75V321.5L360 160.75H0Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M0 4.29153e-06H360V160.75L0 4.29153e-06Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M540 80.375H720L540 160.75V80.375Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M360 80.375H540L360 160.75V80.375Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M540 80.375V2.14577e-06L360 80.375H540Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M720 80.375V2.14577e-06H540L720 80.375Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M1260 241.125L1440 321.5H1260V241.125Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M1080 241.125H1260L1080 321.5V241.125Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M1080 241.125V160.75L1260 241.125H1080Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M1440 241.125V160.75L1260 241.125H1440Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M1080 241.125V321.5L900 241.125H1080Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M720 321.5L900 241.125H720V321.5Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M900 241.125H720V160.75L900 241.125Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M1080 160.75H900L1080 241.125V160.75Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M1080 160.75H900L1080 80.375V160.75Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M900 80.375V160.75L720 80.375H900Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M900 80.375L720 2.14577e-06V80.375H900Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M1080 2.14577e-06L900 80.375V2.14577e-06H1080Z" stroke="#BCA8EA" strokeLinejoin="round" />
                <path d="M1440 160.75V4.29153e-06H1080L1440 160.75Z" stroke="#BCA8EA" strokeLinejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_22_999">
                  <rect width="1440" height="643" fill="white" transform="matrix(1 0 0 -1 0 643)" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <div
            aria-label="Contenedor de hero"
            className="container mx-auto px-2 lg:px-20 xl:px-52 flex flex-col items-center justify-center gap-4 text-center"
          >
            <strong className="uppercase text-primary/40 font-bold tracking-[4px]">Psicobooking</strong>
            <h1 className="text-foreground/85 text-5xl font-medium tracking-normal leading-tight">
              Tu bienestar emocional <br /> <span className="text-primary">nos importa.</span>
            </h1>
            <p className="text-foreground/75 font-normal text-base text-pretty w-full max-w-[850px] pt-6 pb-20">
              Tu bienestar mental es tan importante como tu bienestar físico. No estás solo, y hablar con un profesional puede marcar la diferencia. Encuentra el apoyo que necesitas y comienza a tomar medidas para sentirte mejor, paso a paso. No lo dejes para mañana, reserva tu consulta hoy mismo.
            </p>

            <div className="hidden lg:flex items-center w-full max-w-[800px] py-3">
              <span className="rounded-full size-2 bg-primary/70"></span>
              <span className="h-px flex-1 rounded-full bg-primary/50"></span>
              <span className="rounded-full size-3 bg-primary"></span>
              <span className="h-px flex-1 rounded-full bg-primary/50"></span>
              <span className="rounded-full size-2 bg-primary/70"></span>
            </div>

            <div className="flex items-center w-[920px] justify-center lg:justify-between gap-4 [&>p]:flex-1 [&>p]:text-foreground/75">
              <p className="hidden lg:block text-start">Escoge tu profesional</p>
              <SignedOut>
                <SignInButton>
                  <Button className="px-28 md:px-16 py-[21px] rounded-xl text-lg tracking-wider">
                    Agendar
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <Button asChild className="px-28 md:px-16 py-[21px] rounded-xl text-lg tracking-wider">
                  <Link href="/dashboard">Entrar</Link>
                </Button>
              </SignedIn>
              <p className="text-end hidden lg:block">Confirma tu cita</p>
            </div>

          </div>
        </section>

        <section className="container mx-auto px-4 lg:px-20 xl:px-52">
          <div className="flex flex-col items-center gap-10 bg-card rounded-3xl pt-14">
            <header className="flex flex-col items-center gap-3 text-center px-4 sm:px-10 lg:px-24">
              <h2 className="font-normal text-balance text-2xl">Encuentra tu profesional ideal</h2>
              <p className="text-foreground/85 text-pretty lg:px-28 xl:px-32">No postergues tu bienestar, programa una cita y permite que te ayudemos a encontrar el equilibrio emocional que necesitas</p>
            </header>
            <div className="w-full sm:px-10 lg:px-24">
              <div className="relative overflow-hidden w-full h-[32rem] rounded-3xl">
                <div className="absolute inset-0 z-10 bg-[url(../../public/noisebooking.webp)] opacity-15 bg-cover bg-center"></div>
                <Image
                  src={psicofriends}
                  alt="Imagen de amigos sonriendo en el parque"
                  quality={100}
                  placeholder="blur"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 lg:px-20 xl:px-52 my-36">
          <header className="flex flex-col items-center gap-4 text-center">
            <h2 className="font-normal text-balance text-2xl">Nuestras especialidades</h2>
            <p className="text-foreground/85 text-pretty lg:px-28 xl:px-32">¿Sientes que has estado cargando con demasiado? Hay ayuda disponible. Con el apoyo adecuado, puedes encontrar nuevas formas de enfrentar los desafíos y redescubrir tu fuerza interior.</p>
          </header>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 py-20 gap-14 text-center">
            {
              SPECIALITIES.map(item => (
                <div key={item.id} className="flex flex-col items-center justify-start gap-2 text-center">
                  <figure className="flex items-center justify-center size-14 sm:size-20 p-2 shadow-sm border bg-card border-primary/70 rounded-full">
                    {item.icon}
                  </figure>
                  <div className="h-px w-[70%] md:w-[50%] opacity-70 mb-2 bg-border"></div>
                  <p className="text-balance text-sm text-foreground/85 text-center">{item.name}</p>
                </div>
              ))
            }
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 lg:px-20 xl:px-52 py-20">

      </footer>
    </div>
  );
}
