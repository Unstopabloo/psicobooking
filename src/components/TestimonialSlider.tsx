"use client"

import { cn } from "@/lib/utils"
import React from "react"

const testimonials = [
  {
    index: 0,
    name: 'Andrea Coronel',
    avatarUrl: '/psychologist-example.webp',
    body: 'Psicobooking me ha ayudado a poder conectar con más personas que necesitan apoyo profesional gracias a su web y a las redes sociales, a conocer consultantes de diferentes partes del mundo y a tener la oportunidad de mostrar mi esencia en el video, generando confianza y motivación en mis consultantes. Además nos brindamos apoyo y soporte junto a todo el equipo, lo cual es indispensable para nuestra labor❤️'
  },
  {
    index: 1,
    name: 'Mateo Hernandez',
    avatarUrl: '/psychologist-example.webp',
    body: 'Esta plataforma me ha ayudado a conectar con más personas que necesitan apoyo profesional, gracias a su web y a las redes sociales, a conocer consultantes de diferentes partes del mundo y a tener la oportunidad de mostrar mi esencia en el video, generando confianza y motivación en mis consultantes. Además nos brindamos apoyo y soporte '
  },
  {
    index: 2,
    name: 'Juan Martínez',
    avatarUrl: '/psychologist-example.webp',
    body: 'Esta plataforma me ha ayudado a conectar con más personas que necesitan apoyo profesional, gracias a su web y a las redes sociales, a conocer consultantes de diferentes partes del mundo y a tener la oportunidad de mostrar mi esencia en el video, generando confianza y motivación en mis consultantes. Además nos brindamos '
  }
]

export function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(currentIndex + 1)
      if (currentIndex === testimonials.length - 1) {
        setCurrentIndex(0)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [currentIndex])

  return (
    <article className='col-span-1 md:col-span-2 bg-card rounded-3xl p-8 flex flex-col items-center justify-between min-h-80 md:min-h-72 h-72 max-h-72'>
      <header className="flex items-center justify-between w-full">
        <h3 className="text-base text-[#1B1A4C]">Reseñas</h3>
        <div className="flex items-center gap-1 w-32">
          <button
            className={cn(`h-1 min-w-4 bg-gray-300 rounded-full duration-500`, currentIndex === 0 && 'bg-primary flex-1')}
            onClick={() => setCurrentIndex(0)}
          ></button>
          <button
            className={cn(`h-1 min-w-4 bg-gray-300 rounded-full duration-500`, currentIndex === 1 && 'bg-primary flex-1')}
            onClick={() => setCurrentIndex(1)}
          ></button>
          <button
            className={cn(`h-1 min-w-4 bg-gray-300 rounded-full duration-500`, currentIndex === 2 && 'bg-primary flex-1')}
            onClick={() => setCurrentIndex(2)}
          ></button>
        </div>
      </header>
      <div className="flex flex-col items-start justify-end gap-2 pt-4 min-h-40">
        <p className="text-foreground/80 text-sm max-h-44 overflow-hidden">{testimonials[currentIndex]?.body}</p>
        <div className="flex items-center jsutify-start gap-3 pt-1">
          <img src={testimonials[currentIndex]?.avatarUrl} alt="Avatar de ejemplo" className="h-10 w-10 rounded-xl" />
          <strong className="text-sm">{testimonials[currentIndex]?.name}</strong>
        </div>
      </div>
    </article>
  )
}