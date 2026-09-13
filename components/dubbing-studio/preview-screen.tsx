"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { 
  Settings, Moon, Sun, Check, Lock, X, Eye, 
  ChevronRight, ChevronLeft, Monitor, Globe 
} from "lucide-react"
import { UI_LANGUAGES, type LangCode } from "@/lib/i18n"
import { useTheme } from "@/lib/theme"
import { SAVPD_CONSTANTS } from "@/lib/constants"
import { InstallPrompt } from "./install-prompt"

type T = ReturnType<typeof import("@/lib/i18n").useI18n>["t"]
type MenuState = "main" | "display" | "language"

export function PreviewScreen({
  t,
  lang,
  setLang,
  onLoginSuccess,
}: {
  t: T
  lang: LangCode
  setLang: (c: LangCode) => void
  onLoginSuccess: () => void
}) {
  const { mode, toggleMode, eyeCare, toggleEyeCare, eyeCareLevel, setEyeCareLevel } = useTheme()
  const [previewSettingsOpen, setPreviewSettingsOpen] = useState(false)
  
  // State សម្រាប់គ្រប់គ្រងការចូល Menu មួយតង់ៗ
  const [activeMenu, setActiveMenu] = useState<MenuState>("main")
  
  const [passcode, setPasscode] = useState("")
  const [error, setError] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [fadeSplash, setFadeSplash] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeSplash(true)
      setTimeout(() => setShowSplash(false), 500)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode === "@2000") {
      onLoginSuccess()
    } else {
      setError(true)
    }
  }

  const closeSettings = () => {
    setPreviewSettingsOpen(false)
    setTimeout(() => setActiveMenu("main"), 300) // Reset ទៅ Menu ដើមវិញពេលបិទ
  }

  if (showSplash) {
    return (
      <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-in-out ${fadeSplash ? "opacity-0" : "opacity-100"}`}>
        <div className="relative h-32 w-32 animate-pulse overflow-hidden rounded-[2rem] shadow-2xl">
          <Image src="/icon-512.png" alt={`${SAVPD_CONSTANTS.BRAND.TRADEMARK} Logo`} fill className="object-cover" priority />
        </div>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground animate-in slide-in-from-bottom-4 duration-700">
          {SAVPD_CONSTANTS.BRAND.TRADEMARK}
        </h1>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col justify-between bg-background p-4 relative animate-in fade-in zoom-in-[0.98] duration-700">
      <header className="flex items-center justify-between border-b border-border/60 bg-background/80 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-sm">
             <Image src="/icon-512.png" alt={`${SAVPD_CONSTANTS.BRAND.TRADEMARK} Logo Small`} fill className="object-cover" />
          </div>
          <span className="text-base font-bold tracking-tight text-foreground">{SAVPD_CONSTANTS.BRAND.TRADEMARK}</span>
        </div>
        <button type="button" onClick={() => setPreviewSettingsOpen(true)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary/60 text-foreground transition active:scale-95">
          <Settings className="h-4.5 w-4.5" />
        </button>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-sm rounded-3xl border border-border bg-card/80 p-6 shadow-xl backdrop-blur-md">
          <div className="mb-6 text-center">
            <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-inner">
              <Lock className="h-6 w-6" />
            </span>
            <h2 className="text-lg font-bold text-foreground">{t.securityTitle}</h2>
            <p className="mt-1 text-xs text-muted-foreground">{t.securityDesc}</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder={t.passcodePlaceholder}
                value={passcode}
                onChange={(e) => { setPasscode(e.target.value); setError(false); }}
                className="w-full rounded-2xl border border-border bg-secondary/60 px-4 py-3.5 text-center text-base font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
              />
              {error && <p className="mt-2 text-center text-xs font-medium text-destructive">{t.invalidPasscode}</p>}
            </div>
            <button type="submit" className="w-full rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition active:scale-[0.99]">
              {t.accessSystem}
            </button>
          </form>
        </div>
      </div>

      <div>
        <InstallPrompt />
        <div className="pb-4 pt-2 text-center">
          <p className="text-[11px] text-muted-foreground">© 2026 {SAVPD_CONSTANTS.BRAND.TRADEMARK}. All rights reserved.</p>
        </div>
      </div>

      {/* iOS Style Nested Settings Modal */}
      {previewSettingsOpen && (
        <div className="fixed inset-0 z-50 flex animate-in flex-col bg-secondary/30 backdrop-blur-md fade-in zoom-in-95 duration-200">
          <div className="flex h-full flex-col bg-background shadow-2xl">
            {/* Dynamic Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-4" style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}>
              {activeMenu === "main" ? (
                <>
                  <h2 className="text-lg font-bold text-foreground">{t.settings}</h2>
                  <button type="button" onClick={closeSettings} className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground transition active:scale-95">
                    <X className="h-5 w-5" />
                  </button>
                </>
              ) : (
                <>
                  <button type="button" onClick={() => setActiveMenu("main")} className="flex items-center gap-1 pr-4 text-primary transition active:scale-95 text-sm font-medium">
                    <ChevronLeft className="h-5 w-5" />
                    {t.settings}
                  </button>
                  <h2 className="text-base font-bold text-foreground">
                    {activeMenu === "display" ? t.displayMode : t.appLanguage}
                  </h2>
                  <div className="w-[72px]" /> {/* Spacer ដើម្បីឱ្យចំណងជើងនៅកណ្តាល */}
                </>
              )}
            </div>

            {/* Menu Content */}
            <div className="flex-1 space-y-6 overflow-y-auto bg-secondary/15 p-4">
              
              {/* Main Menu (Level 1) */}
              {activeMenu === "main" && (
                <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
                  <button onClick={() => setActiveMenu("display")} className="flex w-full items-center justify-between border-b border-border p-4 text-left transition hover:bg-secondary/50 active:bg-secondary">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
                        <Monitor className="h-4.5 w-4.5" />
                      </div>
                      <span className="font-medium text-foreground">{t.displayMode}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </button>
                  
                  <button onClick={() => setActiveMenu("language")} className="flex w-full items-center justify-between p-4 text-left transition hover:bg-secondary/50 active:bg-secondary">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                        <Globe className="h-4.5 w-4.5" />
                      </div>
                      <span className="font-medium text-foreground">{t.appLanguage}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {UI_LANGUAGES.find(l => l.code === lang)?.native}
                      </span>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </button>
                </div>
              )}

              {/* Display Mode Settings (Level 2) */}
              {activeMenu === "display" && (
                <div className="animate-in slide-in-from-right-4 fade-in duration-200">
                  <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-3 shadow-sm">
                    <button type="button" onClick={toggleMode} className="flex w-full items-center gap-3 rounded-xl p-2 text-sm text-foreground transition hover:bg-secondary active:scale-[0.98]">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground">
                        {mode === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                      </span>
                      <span className="flex-1 text-left font-medium">{mode === "dark" ? t.darkMode : t.lightMode}</span>
                      <span className={`relative h-5 w-9 shrink-0 rounded-full transition ${mode === "dark" ? "bg-primary" : "bg-muted"}`}>
                        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${mode === "dark" ? "left-4" : "left-0.5"}`} />
                      </span>
                    </button>
                    <button type="button" onClick={toggleEyeCare} className="flex w-full items-center gap-3 rounded-xl p-2 text-sm text-foreground transition hover:bg-secondary active:scale-[0.98]">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${eyeCare ? "bg-warning/20 text-warning" : "bg-secondary text-foreground"}`}>
                        <Eye className="h-4 w-4" />
                      </span>
                      <span className="flex-1 text-left font-medium">{t.eyeCare}</span>
                      <span className={`relative h-5 w-9 shrink-0 rounded-full transition ${eyeCare ? "bg-warning" : "bg-muted"}`}>
                        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${eyeCare ? "left-4" : "left-0.5"}`} />
                      </span>
                    </button>
                    {eyeCare && (
                      <div className="px-2 pt-3 pb-1 animate-in fade-in slide-in-from-top-1 duration-200 border-t border-border mt-2">
                        <label className="mb-2.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t.eyeCareLevel}</label>
                        <input type="range" min={10} max={70} value={eyeCareLevel} onChange={(e) => setEyeCareLevel(Number(e.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-warning" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Language Settings (Level 2) */}
              {activeMenu === "language" && (
                <div className="animate-in slide-in-from-right-4 fade-in duration-200">
                  <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                    {UI_LANGUAGES.map((l, index) => (
                      <button 
                        key={l.code} 
                        type="button" 
                        onClick={() => { setLang(l.code); setTimeout(() => setActiveMenu("main"), 300); }} 
                        className={`flex w-full items-center gap-3 p-4 text-sm transition hover:bg-secondary/50 active:bg-secondary ${index !== UI_LANGUAGES.length - 1 ? "border-b border-border" : ""}`}
                      >
                        <span className="text-xl">{l.flag}</span>
                        <span className={`flex-1 text-left ${lang === l.code ? "font-semibold text-primary" : "text-foreground"}`}>
                          {l.native}
                        </span>
                        {lang === l.code && <Check className="h-5 w-5 text-primary" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  )
}
