'use client'

import {
  Apple,
  Facebook,
  Google,
  Calendar03Icon,
  UserListIcon,
  DollarSquareIcon,
  Setting07Icon,
  StickyNote01Icon
} from '@/components/icons'
import { Button } from '@/components/ui/button'
import * as Clerk from '@clerk/elements/common'
import * as SignUp from '@clerk/elements/sign-up'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimatePresence, motion, useAnimation } from "framer-motion"

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const FeatureCard = ({ text, isCentered, icon }: { text: string; isCentered: boolean; icon: React.ReactNode }) => (
  <motion.div
    className={`rounded-xl text-primary p-4 w-72 h-80 flex flex-col items-center justify-between text-center shadow-lg transition-colors duration-300 ${isCentered ? 'bg-white' : 'bg-white/30 backdrop-blur-md'
      }`}
  >
    {icon}
    <p className="text-lg font-medium text-start">{text}</p>
  </motion.div>
)

const VerticalCarousel = ({ direction = "up" }: { direction?: "up" | "down" }) => {
  const features = [
    {
      text: "Mantén tus notas y recordatorios organizados en un solo lugar seguro",
      icon: <StickyNote01Icon className='self-end' color='primary' />
    },
    {
      text: "Conecta con una comunidad de profesionales de la salud mental",
      icon: <UserListIcon className='self-end' color='primary' />
    },
    {
      text: "Gestiona tus sesiones de terapia de manera organizada",
      icon: <Calendar03Icon className='self-end' color='primary' />
    },
    {
      text: "Mantén el seguimiento de tus pacientes con facilidad",
      icon: <DollarSquareIcon className='self-end' color='primary' />
    },
    {
      text: "Crea actividades personalizadas para un seguimiento más efectivo",
      icon: <Setting07Icon className='self-end' color='primary' />
    },
    {
      text: "Recibe pagos de pacientes de manera sencilla y segura",
      icon: <DollarSquareIcon className='self-end' color='primary' />
    },
    {
      text: "Conecta con una comunidad de profesionales de la salud mental",
      icon: <UserListIcon className='self-end' color='primary' />
    },
    {
      text: "Gestiona tus sesiones de terapia de manera organizada",
      icon: <Calendar03Icon className='self-end' color='primary' />
    },
    {
      text: "Mantén el seguimiento de tus pacientes con facilidad",
      icon: <DollarSquareIcon className='self-end' color='primary' />
    },
    {
      text: "Crea actividades personalizadas para un seguimiento más efectivo",
      icon: <Setting07Icon className='self-end' color='primary' />
    },
  ]

  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)
  const [centeredIndex, setCenteredIndex] = useState(0)

  const direc = direction === "up" ? -1 : 1

  useEffect(() => {
    controls.start({
      y: [0, direc * features.length * 50],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 50,
          ease: "linear"
        }
      }
    })

  }, [direc, features.length, controls])

  useEffect(() => {
    const updateCenteredCard = () => {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const containerCenter = containerRect.top + containerRect.height / 2
        const cards = containerRef.current.querySelectorAll('.feature-card')
        let closestCard = null
        let minDistance = Infinity

        cards.forEach((card, index) => {
          const cardRect = card.getBoundingClientRect()
          const cardCenter = cardRect.top + cardRect.height / 2
          const distance = Math.abs(containerCenter - cardCenter)

          if (distance < minDistance) {
            minDistance = distance
            closestCard = index
          }
        })

        if (closestCard !== null) {
          setCenteredIndex(closestCard % features.length)
        }
      }
    }

    const animationFrame = requestAnimationFrame(function animate() {
      updateCenteredCard()
      requestAnimationFrame(animate)
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [features.length])

  return (
    <div className="h-full overflow-hidden relative py-10" ref={containerRef}>
      <motion.div animate={controls}>
        {[...features, ...features].map((feature, index) => (
          <div key={index} className="mb-10 feature-card">
            <FeatureCard
              text={feature.text}
              icon={feature.icon}
              isCentered={index % features.length === centeredIndex}
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function SignUpPage() {
  return (
    <SignUp.Root>
      <main className='container mx-auto grid grid-cols-1 lg:grid-cols-2 p-4 h-screen animate-fade-up'>
        <section className='grid-cols-1 flex justify-center'>
          <SignUp.Step name="start">
            <header>
              <Image src="/logo-full.png" alt="logo psicobooking" width={200} height={300} />
              <div className='flex flex-col items-start py-20'>
                <h1 className='text-4xl text-foreground/90 font-bold py-3 max-w-[450px]'>Comienza el viaje de tu bienestar.</h1>
                <small className='text-base text-foreground/85'>Registrate para agendar tu primera sesión</small>
              </div>
            </header>
            <div className='flex flex-col gap-6 items-center md:items-start w-full sm:w-[450px] md:w-[400px] xl:w-[600px]'>
              <div className='flex items-center justify-between w-full gap-3 lg:gap-8'>
                <Clerk.Connection name="google" asChild>
                  <Button variant="outline" size="icon" className='flex-1 py-5'><Google fontSize={22} /></Button>
                </Clerk.Connection>

                <Clerk.Connection name="facebook" asChild>
                  <Button variant="outline" size="icon" className='flex-1 py-5'><Facebook fontSize={22} /></Button>
                </Clerk.Connection>

                <Clerk.Connection name="apple" asChild>
                  <Button variant="outline" size="icon" className='flex-1 py-5'><Apple stroke='black' strokeWidth={3} fontSize={22} /></Button>
                </Clerk.Connection>
              </div>

              <div aria-label='Separador' className='flex items-center w-full gap-6'>
                <span className='bg-border h-px flex-1'></span>
                <span>Ó</span>
                <span className='bg-border h-px flex-1'></span>
              </div>

              <div className='flex flex-col gap-10 w-full'>
                <div className='grid grid-cols-2 gap-4'>
                  <Clerk.Field name="firstName">
                    <div className="cols-span-1 grid w-full items-center gap-1.5">
                      <Clerk.Label asChild>
                        <Label htmlFor="firstName">Nombre</Label>
                      </Clerk.Label>
                      <Clerk.Input asChild>
                        <Input type="text" id="firstName" placeholder="Jaime" required />
                      </Clerk.Input>
                      <Clerk.FieldError />
                    </div>
                  </Clerk.Field>
                  <Clerk.Field name="lastName">
                    <div className="col-span-1 grid w-full items-center gap-1.5">
                      <Clerk.Label asChild>
                        <Label htmlFor="lastName">Apellido</Label>
                      </Clerk.Label>
                      <Clerk.Input asChild>
                        <Input type="text" id="lastName" placeholder="Chavez" required />
                      </Clerk.Input>
                      <Clerk.FieldError />
                    </div>
                  </Clerk.Field>
                </div>
                <Clerk.Field name="emailAddress">
                  <div className="col-span-2 grid w-full items-center gap-1.5">
                    <Clerk.Label asChild>
                      <Label htmlFor="email">Email</Label>
                    </Clerk.Label>
                    <Clerk.Input asChild>
                      <Input type="email" id="email" placeholder="ejemplo@ejemplo.com" required />
                    </Clerk.Input>
                    <Clerk.FieldError />
                  </div>
                </Clerk.Field>
                <Clerk.Field name="password">
                  <div className="col-span-2 grid w-full items-center gap-1.5">
                    <Clerk.Label asChild>
                      <Label htmlFor="password">Contraseña</Label>
                    </Clerk.Label>
                    <Clerk.Input asChild>
                      <Input type="password" id="password" placeholder="contraseña-super-segura" required />
                    </Clerk.Input>
                    <Clerk.FieldError />
                  </div>
                </Clerk.Field>

                <SignUp.Captcha />

                <SignUp.Action asChild submit>
                  <Button className='rounded-xl h-10'>
                    Registrarse
                  </Button>
                </SignUp.Action>
              </div>
              <small>¿Ya tienes cuenta? <strong className='text-primary underline underline-offset-2'><Link href="/sign-in">Ingresa acá</Link></strong></small>
            </div>
          </SignUp.Step>

          <SignUp.Step name="continue">
            <header>
              <Image src="/logo-full.png" alt="logo psicobooking" width={200} height={300} />
              <div className='flex flex-col items-start py-20'>
                <h1 className='text-2xl text-foreground/90 font-bold py-3 max-w-[450px]'>Completa tus datos</h1>
                <p className='text-foreground/90'>Por favor, ingresa estos datos antes de comenzar</p>
              </div>
            </header>

            <div className='flex flex-col gap-3 w-full'>
              <div className='grid grid-cols-2 gap-4'>
                <Clerk.Field name="firstName">
                  <div className="cols-span-1 grid w-full items-center gap-1.5">
                    <Clerk.Label asChild>
                      <Label htmlFor="firstName">Nombre</Label>
                    </Clerk.Label>
                    <Clerk.Input asChild>
                      <Input type="text" id="firstName" placeholder="Jaime" required />
                    </Clerk.Input>
                    <Clerk.FieldError />
                  </div>
                </Clerk.Field>
                <Clerk.Field name="lastName">
                  <div className="col-span-1 grid w-full items-center gap-1.5">
                    <Clerk.Label asChild>
                      <Label htmlFor="lastName">Apellido</Label>
                    </Clerk.Label>
                    <Clerk.Input asChild>
                      <Input type="text" id="lastName" placeholder="Chavez" required />
                    </Clerk.Input>
                    <Clerk.FieldError />
                  </div>
                </Clerk.Field>
              </div>

              <SignUp.Captcha />

              <SignUp.Action asChild submit>
                <Button className='rounded-xl h-10'>
                  Comenzar
                </Button>
              </SignUp.Action>

            </div>
          </SignUp.Step>

          <SignUp.Step name="verifications">
            <SignUp.Strategy name="email_code">
              <header>
                <Image src="/logo-full.png" alt="logo psicobooking" width={200} height={300} />
                <div className='flex flex-col items-start py-20'>
                  <h1 className='text-2xl text-foreground/90 font-bold py-3 max-w-[450px]'>Enviamos un código a tu email</h1>
                  <p className='text-foreground/90'>Por favor, verifica tu correo</p>
                </div>
              </header>

              <div className='flex flex-col gap-14 items-start max-w-md'>
                <Clerk.Field name="code">
                  <div className="grid w-full items-center gap-1.5">
                    <Clerk.Label asChild>
                      <Label htmlFor="code">Código de verificación</Label>
                    </Clerk.Label>
                    <Clerk.Input
                      type="otp"
                      required
                      className="flex justify-center gap-2 w-full"
                      render={({ value, status }) => (
                        <div
                          data-status={status}
                          className="relative h-20 w-16 rounded-md bg-white ring-1 ring-inset ring-zinc-300 data-[status=selected]:bg-primary/5 data-[status=selected]:shadow-[0_0_8px_2px_theme(colors.violet.400/30%)] data-[status=selected]:ring-primary"
                        >
                          <AnimatePresence>
                            {value && (
                              <motion.span
                                initial={{ opacity: 0, scale: 0.75 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.75 }}
                                className="absolute text-4xl inset-0 flex items-center justify-center text-zinc-950"
                              >
                                {value}
                              </motion.span>
                            )}
                            {value}
                          </AnimatePresence>
                          {status === 'cursor' && (
                            <motion.div
                              layoutId="otp-input-focus"
                              transition={{ ease: [0.2, 0.4, 0, 1], duration: 0.2 }}
                              className="absolute inset-0 z-10 rounded-[inherit] border border-primary bg-primary/10 shadow-[0_0_8px_2px_theme(colors.indigo.400/30%)]"
                            />
                          )}
                        </div>
                      )}
                    />
                    <Clerk.FieldError />
                  </div>
                </Clerk.Field>

                <SignUp.Action asChild submit>
                  <Button className='rounded-xl h-10 w-full'>
                    Verificar
                  </Button>
                </SignUp.Action>
              </div>
            </SignUp.Strategy>
          </SignUp.Step>

        </section>
        <section className='relative hidden lg:flex gap-10 items-center justify-center w-full h-full min-h-full overflow-hidden rounded-[30px] bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500'>
          <Image src="/signflow.webp" alt="signflow" fill style={{ objectFit: 'cover' }} />
          <VerticalCarousel />
        </section>
      </main>
    </SignUp.Root >
  )
}