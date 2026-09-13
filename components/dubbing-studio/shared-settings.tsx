"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { 
  X, Moon, Sun, Eye, Check, ChevronRight, ChevronLeft, 
  Monitor, Globe, Info, Clapperboard,
  Sparkles, ShieldCheck, HeartPulse, Gauge
} from "lucide-react"
import { useI18n, UI_LANGUAGES } from "@/lib/i18n"
import { useTheme } from "@/lib/theme"
import { SAVPD_CONSTANTS } from "@/lib/constants"
import { InstallPrompt } from "./install-prompt"

type MenuState = "main" | "display" | "language" | "about"

export function SharedSettings({ 
  isOpen, 
  onClose,
  onAdminClick 
}: { 
  isOpen: boolean
  onClose: () => void
  onAdminClick?: () => void 
}) {
  const { t, lang, setLang } = useI18n() 
  const { mode, toggleMode, eyeCare, toggleEyeCare, eyeCareLevel, setEyeCareLevel } = useTheme()
  const [activeMenu, setActiveMenu] = useState<MenuState>("main")

  // Secret 5-second long press timer ref for the exclamation mark (!)
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [isHolding, setIsHolding] = useState(false)

  if (!isOpen) return null

  const handleClose = () => {
    onClose()
    setTimeout(() => setActiveMenu("main"), 300)
  }

  // Secret Hold Handlers for 5 seconds
  const startHolding = () => {
    setIsHolding(true)
    holdTimerRef.current = setTimeout(() => {
      if (onAdminClick) {
        onAdminClick()
      }
      setIsHolding(false)
    }, 5000) // 5 វិនាទី
  }

  const cancelHolding = () => {
    setIsHolding(false)
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex animate-in flex-col bg-secondary/30 backdrop-blur-md fade-in zoom-in-95 duration-200">
      <div className="flex h-full flex-col bg-background shadow-2xl sm:mx-auto sm:mt-10 sm:h-[600px] sm:w-full sm:max-w-md sm:rounded-[2rem] sm:border sm:border-border overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-4" style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}>
          {activeMenu === "main" ? (
            <>
              <h2 className="text-lg font-bold text-foreground">{t.settings}</h2>
              <button type="button" onClick={handleClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground transition active:scale-95">
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
                {activeMenu === "display" ? t.displayMode : activeMenu === "language" ? t.appLanguage : "About App"}
              </h2>
              <div className="w-[72px]" />
            </>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6 overflow-y-auto bg-secondary/15 p-4">
          
          {/* Main Menu */}
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
              
              <button onClick={() => setActiveMenu("language")} className="flex w-full items-center justify-between border-b border-border p-4 text-left transition hover:bg-secondary/50 active:bg-secondary">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Globe className="h-4.5 w-4.5" />
                  </div>
                  <span className="font-medium text-foreground">{t.appLanguage}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{UI_LANGUAGES.find(l => l.code === lang)?.native}</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </button>

              <button onClick={() => setActiveMenu("about")} className="flex w-full items-center justify-between p-4 text-left transition hover:bg-secondary/50 active:bg-secondary">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-500">
                    <Info className="h-4.5 w-4.5" />
                  </div>
                  <span className="font-medium text-foreground">About App</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          )}

          {/* Display Mode */}
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

          {/* Language */}
          {activeMenu === "language" && (
            <div className="animate-in slide-in-from-right-4 fade-in duration-200">
              <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                {UI_LANGUAGES.map((l, index) => (
                  <button key={l.code} type="button" onClick={() => { setLang(l.code); setTimeout(() => setActiveMenu("main"), 300); }} className={`flex w-full items-center gap-3 p-4 text-sm transition hover:bg-secondary/50 active:bg-secondary ${index !== UI_LANGUAGES.length - 1 ? "border-b border-border" : ""}`}>
                    <span className="text-xl">{l.flag}</span>
                    <span className={`flex-1 text-left ${lang === l.code ? "font-semibold text-primary" : "text-foreground"}`}>{l.native}</span>
                    {lang === l.code && <Check className="h-5 w-5 text-primary" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* About (មានកប់មុខងារសង្កត់សញ្ញាឧទាន ៥ វិនាទី និង Feature Cards ពេញលេញ) */}
          {activeMenu === "about" && (
            <div className="animate-in slide-in-from-right-4 fade-in duration-200 flex flex-col gap-6">
              <div className="flex flex-col items-center text-center mt-4">
                {/* ប្រើ logo-clean-mask ដើម្បីកាត់ស៊ុមពណ៌សចេញ */}
                <div className="relative h-20 w-20 rounded-2xl bg-transparent mb-4 overflow-hidden border border-border">
                  <Image src="/icon-512.png" alt="Logo" fill className="logo-clean-mask" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{SAVPD_CONSTANTS.BRAND.TRADEMARK}</h3>
                <p className="text-sm text-muted-foreground mt-1">Version 1.0.0</p>
                
                {/* Footer text with Secret 5-second long-press on the exclamation mark (!) */}
                <p className="text-xs text-muted-foreground mt-4 max-w-xs select-none">
                  {t.footer}{" "}
                  <span 
                    onMouseDown={startHolding}
                    onMouseUp={cancelHolding}
                    onTouchStart={startHolding}
                    onTouchEnd={cancelHolding}
                    className={`inline-flex items-center justify-center font-bold cursor-pointer transition ${
                      isHolding ? "text-primary scale-125 animate-pulse" : "text-muted-foreground hover:text-foreground"
                    }`}
                    title="Secret trigger"
                  >
                    (!)
                  </span>
                </p>
              </div>

              {/* Feature Cards */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">AI capabilities</h4>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Sparkles className="h-5 w-5" />
                    </span>
                    <div>
                      <h5 className="text-sm font-bold text-foreground">{t.autopilotTitle}</h5>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{t.autopilotDesc}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-500">
                      <ShieldCheck className="h-5 w-5" />
                    </span>
                    <div>
                      <h5 className="text-sm font-bold text-foreground">{t.contextTitle}</h5>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{t.contextDesc}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500">
                      <HeartPulse className="h-5 w-5" />
                    </span>
                    <div>
                      <h5 className="text-sm font-bold text-foreground">{t.emotionTitle}</h5>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{t.emotionDesc}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-500">
                      <Gauge className="h-5 w-5" />
                    </span>
                    <div>
                      <h5 className="text-sm font-bold text-foreground">{t.paceTitle}</h5>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{t.paceDesc}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2 space-y-4">
                <InstallPrompt />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
