import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MenuIcon } from "@/components/icons";

export default function HomePage() {
  return (
    <div className="flex flex-col relative min-h-screen overflow-x-hidden">
      <header className="w-full fixed top-0 left-0 z-50">
        <div aria-label="contenedor de header" className="container mx-auto flex items-center justify-between py-6 px-4 lg:px-20 xl:px-52">
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
            <DropdownMenuTrigger className="block lg:hidden ">
              <Button variant="ghost" asChild>
                <MenuIcon width={24} height={24} />
              </Button>
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
          className="relative min-h-screen w-screen pt-32 md:pt-48"
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
      </main>
    </div>
  );
}
