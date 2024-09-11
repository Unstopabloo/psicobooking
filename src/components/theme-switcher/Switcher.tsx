"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

import { SunIcon, MoonIcon } from "@/components/icons"

export function ModeToggle() {
  const { setTheme } = useTheme()
  const [isLight, setIsLight] = useState(true)

  const changeTheme = () => {
    setIsLight(!isLight)
    setTheme(isLight ? "light" : "dark")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="p-2"
      onClick={changeTheme}
    >
      {isLight ? <SunIcon /> : <MoonIcon />}
    </Button>
  )
}