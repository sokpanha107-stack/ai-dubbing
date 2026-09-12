"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Mode = "dark" | "light"

type ThemeContextValue = {
  mode: Mode
  toggleMode: () => void
  setMode: (m: Mode) => void
  eyeCare: boolean
  toggleEyeCare: () => void
  eyeCareLevel: number
  setEyeCareLevel: (n: number) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>("dark")
  const [eyeCare, setEyeCare] = useState(false)
  const [eyeCareLevel, setEyeCareLevelState] = useState(35)

  // Load persisted preferences once on mount.
  useEffect(() => {
    try {
      const savedMode = localStorage.getItem("dub-theme-mode") as Mode | null
      const savedEye = localStorage.getItem("dub-eyecare")
      const savedLevel = localStorage.getItem("dub-eyecare-level")
      if (savedMode === "light" || savedMode === "dark") setModeState(savedMode)
      if (savedEye === "1") setEyeCare(true)
      if (savedLevel) setEyeCareLevelState(Number(savedLevel))
    } catch {
      // ignore storage access errors
    }
  }, [])

  // Reflect the mode on <html> and persist it.
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", mode === "dark")
    root.classList.toggle("light", mode === "light")
    root.style.colorScheme = mode
    try {
      localStorage.setItem("dub-theme-mode", mode)
    } catch {
      // ignore
    }
  }, [mode])

  useEffect(() => {
    try {
      localStorage.setItem("dub-eyecare", eyeCare ? "1" : "0")
      localStorage.setItem("dub-eyecare-level", String(eyeCareLevel))
    } catch {
      // ignore
    }
  }, [eyeCare, eyeCareLevel])

  const value: ThemeContextValue = {
    mode,
    toggleMode: () => setModeState((m) => (m === "dark" ? "light" : "dark")),
    setMode: setModeState,
    eyeCare,
    toggleEyeCare: () => setEyeCare((e) => !e),
    eyeCareLevel,
    setEyeCareLevel: setEyeCareLevelState,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
      {/* Blue-light filter overlay — warm amber wash on top of everything */}
      {eyeCare && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[100] mix-blend-multiply transition-opacity duration-500"
          style={{
            backgroundColor: "rgb(255, 176, 60)",
            opacity: Math.min(Math.max(eyeCareLevel, 0), 80) / 100,
          }}
        />
      )}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
