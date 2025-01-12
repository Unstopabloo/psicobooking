"use client"

import { suscribe } from '@/server/actions/suscriptions'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { redirect } from 'next/navigation'

export default function SuscriptionForm() {
  const [isPressed, setIsPressed] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPressed) {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timer)
            return 100
          }
          return prevProgress + 3 // Incremento del 2% cada 40ms para llegar al 100% en 2 segundos
        })
      }, 30)
    } else {
      setProgress(0)
    }

    return () => {
      if (timer) clearInterval(timer)

    }
  }, [isPressed])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (progress === 100) {
      setIsCompleted(true)
      console.log('Formulario enviado!')
      // Aquí puedes agregar la lógica para enviar el formulario
      await suscribe()
      setIsCompleted(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start justify-center">
      <motion.button
        className="relative overflow-hidden border border-primary bg-primary/60 dark:bg-primary/40 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        whileTap={{ scale: 0.95 }}
        disabled={isCompleted}
      >
        <span className="relative z-10">Mantén presionado para suscribirte</span>
        <motion.div
          className="absolute left-0 top-0 bottom-0 bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.01 }}
        />
      </motion.button>
    </form>
  )
}

