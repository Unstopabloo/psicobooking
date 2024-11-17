'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface EnhancedAudioPlayerProps {
  audioUrl: string
}

export function AudioPlayer({ audioUrl }: EnhancedAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleProgressChange = (newValue: number[]) => {
    if (audioRef.current) {
      const [value] = newValue
      // @ts-ignore
      const newTime = (value / 100) * duration
      audioRef.current.currentTime = newTime
      // @ts-ignore
      setProgress(value)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const updateProgress = () => {
        const value = (audio.currentTime / audio.duration) * 100
        setProgress(isNaN(value) ? 0 : value)
      }

      const updateDuration = () => {
        setDuration(audio.duration)
      }

      audio.addEventListener('timeupdate', updateProgress)
      audio.addEventListener('loadedmetadata', updateDuration)
      return () => {
        audio.removeEventListener('timeupdate', updateProgress)
        audio.removeEventListener('loadedmetadata', updateDuration)
      }
    }
  }, [])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex items-center justify-center gap-3 w-full md:w-[12rem] bg-card p-3 rounded-xl">
      <audio ref={audioRef}>
        <source src={audioUrl} type="audio/mpeg" />
        Tu navegador no soporta la etiqueta de audio.
      </audio>
      <div className="flex items-center justify-center">
        <Button
          size="icon"
          onClick={togglePlayPause}
          className="w-10 h-10 rounded-full bg-primary hover:bg-primary/80 text-white"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>
      </div>
      <div className='flex flex-col items-center w-full gap-1'>
        <Slider
          value={[progress]}
          onValueChange={handleProgressChange}
          max={100}
          step={0.1}
          className="w-full"
        />
        <div className="flex justify-between w-full text-sm text-muted-foreground">
          <small>{formatTime(duration * (progress / 100))}</small>
          <small>{formatTime(duration)}</small>
        </div>
      </div>
    </div>
  )
}