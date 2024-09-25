"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Monitor, Sun, Moon } from "lucide-react"

type Theme = "system" | "light" | "dark"

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const themes: Theme[] = ["system", "light", "dark"]

  return (
    <div className="flex flex-col bg-card rounded-full p-1 gap-2">
      {themes.map((t) => (
        <button
          key={t}
          className={`p-1 rounded-full transition-colors duration-200 ${theme === t ? "bg-primary/80" : "hover:bg-gray-700/50"
            }`}
          onClick={() => setTheme(t)}
          aria-label={`Cambiar a tema ${t}`}
        >
          {t === "system" && (
            <Monitor className={`w-4 h-4 ${theme === t ? "text-white" : "text-foreground/70"}`} />
          )}
          {t === "light" && (
            <Sun className={`w-4 h-4 ${theme === t ? "text-white" : "text-foreground/70"}`} />
          )}
          {t === "dark" && (
            <Moon className={`w-4 h-4 ${theme === t ? "text-white" : "text-foreground/70"}`} />
          )}
        </button>
      ))}
    </div>
  )
}