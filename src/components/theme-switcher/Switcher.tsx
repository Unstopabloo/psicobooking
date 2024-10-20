"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { SunIcon as Sun, MoonIcon as Moon } from "../icons";

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

  const themes: Theme[] = ["light", "dark"]

  return (
    <div className="flex flex-col bg-card rounded-full p-1">
      {themes.map((t) => (
        <button
          key={t}
          className={`p-2 rounded-full transition-colors duration-200 ${theme === t ? "bg-slate-300 dark:bg-slate-700" : "hover:bg-slate-200/70 dark:hover:bg-slate-700/50"
            }`}
          onClick={() => setTheme(t)}
          aria-label={`Cambiar a tema ${t}`}
        >
          {t === "light" && (
            <Sun width={16} height={16} className={`${theme === t ? "text-foreground/70" : "text-slate-50/80"}`} />
          )}
          {t === "dark" && (
            <Moon width={16} height={16} className={`${theme === t ? "text-white" : "text-foreground/70"}`} />
          )}
        </button>
      ))}
    </div>
  )
}