'use client'

import {
  Calendar03Icon,
  UserListIcon,
  DollarSquareIcon,
  Setting07Icon,
  StickyNote01Icon
} from '@/components/icons'
import Image from 'next/image'
import { motion, useAnimation } from "framer-motion"

import signinflow from "../../../../public/signflow.webp";

import { useEffect, useRef, useState } from 'react'
import { SignIn } from '@clerk/nextjs'

const FeatureCard = ({ text, isCentered }: { text: string; isCentered: boolean }) => (
  <motion.div
    className={`rounded-xl text-primary p-4 w-72 h-80 flex flex-col items-center justify-between text-center shadow-lg transition-colors duration-300 ${isCentered ? 'bg-white' : 'bg-white/30 backdrop-blur-md'
      }`}
  >
    <div className='self-end [&>svg]:stroke-primary'>
      {
        text === 'Mantén tus notas y recordatorios organizados en un solo lugar seguro' ? (
          <StickyNote01Icon className='self-end text-primary' width={32} height={32} />
        ) : text === 'Conecta con una comunidad de profesionales de la salud mental' ? (
          <UserListIcon className='self-end text-primary' width={32} height={32} />
        ) : text === 'Gestiona tus sesiones de terapia de manera organizada' ? (
          <Calendar03Icon className='self-end text-primary' width={32} height={32} />
        ) : text === 'Mantén el seguimiento de tus pacientes con facilidad' ? (
          <DollarSquareIcon className='self-end text-primary' width={32} height={32} />
        ) : text === 'Crea actividades personalizadas para un seguimiento más efectivo' ? (
          <Setting07Icon className='self-end text-primary' width={32} height={32} />
        ) : (
          <Calendar03Icon className='self-end text-primary' width={32} height={32} />
        )
      }
    </div>
    <p className="text-lg font-medium text-start">{text}</p>
  </motion.div>
)

const VerticalCarousel = ({ direction = "up" }: { direction?: "up" | "down" }) => {
  const features = [
    {
      text: "Mantén tus notas y recordatorios organizados en un solo lugar seguro",
    },
    {
      text: "Conecta con una comunidad de profesionales de la salud mental",
    },
    {
      text: "Gestiona tus sesiones de terapia de manera organizada",
    },
    {
      text: "Mantén el seguimiento de tus pacientes con facilidad",
    },
    {
      text: "Crea actividades personalizadas para un seguimiento más efectivo",
    },
    {
      text: "Recibe pagos de pacientes de manera sencilla y segura",
    },
    {
      text: "Conecta con una comunidad de profesionales de la salud mental",
    },
    {
      text: "Gestiona tus sesiones de terapia de manera organizada",
    },
    {
      text: "Mantén el seguimiento de tus pacientes con facilidad",
    },
    {
      text: "Crea actividades personalizadas para un seguimiento más efectivo",
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
              isCentered={index % features.length === centeredIndex}
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <>
      <main className='container mx-auto grid grid-cols-1 lg:grid-cols-2 p-4 h-screen animate-fade-up'>
        <section className='flex items-center h-full justify-center'>
          <SignIn />
        </section>
        <section className='relative hidden lg:flex gap-10 items-center justify-center w-full h-full min-h-full overflow-hidden rounded-[30px] bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500'>
          <Image src={signinflow} alt="signflow" fill style={{ objectFit: 'cover' }} />
          <VerticalCarousel />
        </section>
      </main>
    </ >
  )
}