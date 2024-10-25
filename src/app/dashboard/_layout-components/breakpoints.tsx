'use client'

import { useEffect, useState } from 'react'

const getBreakpoint = (width: number) => {
  if (width >= 1536) return '2xl'
  if (width >= 1280) return 'xl'
  if (width >= 1024) return 'lg'
  if (width >= 768) return 'md'
  if (width >= 640) return 'sm'
  return 'xs'
}

export default function ScreenSizeIndicator() {
  const [breakpoint, setBreakpoint] = useState<string>('xs')

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth))
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-10 left-10 rounded-full p-3 size-12 flex items-center justify-center bg-card text-foreground border border-border shadow-lg">
      <span className="text-xs font-semibold">{breakpoint}</span>
    </div>
  )
}