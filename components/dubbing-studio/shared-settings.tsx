"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { useParams, usePathname, useRouter } from "next/navigation"
import { 
  X, Moon, Sun, Eye, Check, ChevronRight, ChevronLeft, 
  Monitor, Globe, Info, Clapperboard,
  Sparkles, ShieldCheck, HeartPulse, Gauge
} from "lucide-react"
import { useTranslations } from "next-intl"
import { useTheme } from "@/lib/theme"
import { SAVPD_CONSTANTS } from "@/lib/constants"
import { InstallPrompt } from "./install-prompt"

const UI_LANGUAGES = [
  { code: "en", flag: "🇬🇧", fallbackName: "English" },
  { code: "km", flag: "🇰🇭", fallbackName: "Khmer" },
  { code: "fr", flag: "🇫🇷", fallbackName: "French" },
  { code: "es", flag: "🇪🇸", fallbackName: "Spanish" },
  { code: "zh", flag: "🇨🇳", fallbackName: "Chinese" },
  { code: "ja", flag: "🇯🇵", fallbackName: "Japanese" },
  { code: "ko", flag: "🇰🇷", fallbackName: "Korean" },
  { code: "th", flag: "🇹🇭", fallbackName: "Thai" },
  { code: "vi", flag: "🇻🇳", fallbackName: "Vietnamese" },
  { code: "id", flag: "🇮🇩", fallbackName: "Indonesian" },
  { code: "ms", flag: "🇲🇾", fallbackName: "Malay" },
  { code: "my", flag: "🇲🇲", fallbackName: "Burmese" },
  { code: "lo", flag: "🇱🇦", fallbackName: "Lao" },
  { code: "tl", flag: "🇵🇭", fallbackName: "Filipino" },
  { code: "ar", flag: "🇸🇦", fallbackName: "Arabic" },
  { code: "ru", flag: "🇷🇺", fallbackName: "Russian" },
  { code: "de", flag: "🇩🇪", fallbackName: "German" },
  { code: "pt", flag: "🇵🇹", fallbackName: "Portuguese" },
  { code: "it", flag: "🇮🇹", fallbackName: "Italian" },
  { code: "hi", flag: "🇮🇳", fallbackName: "Hindi" },
] as const

type MenuState = "main" | "display" | "language" | "about"

// ខ្ញុំបានបន្ថែមពាក្យ "default" នៅទីនេះ
export default function SharedSettings({ 
  isOpen, 
  onClose,
  onAdminClick 
}: { 
  isOpen: boolean
  onClose: () => void
  onAdminClick?: () => void 
}) {
  const tPublic = useTranslations("Public")
  const tAdmin = useTranslations("Admin")
  
  const { mode, toggleMode, eyeCare, toggleEyeCare, eyeCareLevel, setEyeCareLevel } = useTheme()
  const [activeMenu, setActiveMenu] = useState<MenuState>("main")

  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const currentLang = (params?.locale as string) || "en"

  // ตัวจับเวลาสำหรับการกดសង្កត់លើរូបគ្រាប់ភ្នែក (5 Seconds Long Press for Admin)
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [isHolding, setIsHolding] = useState(false)

  if (!isOpen) return null

  const handleClose = () => {
    onClose()
    setTimeout(() => setActiveMenu("main"), 300)
  }

  // មុខងារចាប់ផ្តើមសង្កត់លើគ្រាប់ភ្នែក ៥ វិនាទី
  const startHolding = () => {
    setIsHolding(true)
    holdTimerRef.current = setTimeout(() => {
      if (onAdminClick) {
        onClose() // បិទ Settings មុននឹងបើក Admin
        onAdminClick()
      }
      setIsHolding(false)
    }, 5000)
  }

  // មុខងារលុបចោលបើលែងដៃមុន ៥ វិនាទី
  const cancelHolding = () => {
    setIsHolding(false)
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current)
      holdTimerRef.current = null
    }
  }

  const switchLanguage = (newLang: string) => {
    setTimeout(() => setActiveMenu("main"), 300)
    if (newLang === currentLang) return
    
    const currentPathWithoutLocale = pathname.replace(`/${currentLang}`, "")
    const newPath = `/${newLang}${currentPathWithoutLocale === "" ? "" : currentPathWithoutLocale}`
    
    router.replace(newPath || `/${newLang}`)
    router.refresh()
  }

  const getLanguageName = (code: string) => {
    const translated = tPublic(`languages.${code}` as any)
    const fallback = UI_LANGUAGES.find(l => l.code === code)?.fallbackName
    return translated.includes("languages.") ? fallback : translated
  }

  return (
    <div className="fixed inset-0 z-50 flex animate-in flex-col bg-secondary/30 backdrop-blur-md fade-in zoom-in-95 duration-200">
      <div className="flex h-full flex-col bg-background shadow-2xl sm:mx-auto sm:mt-10 sm:h-[600px] sm:w-full sm:max-w-md sm:rounded-[2rem] sm:border sm:border-border overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-4" style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}>
          {activeMenu === "main" ? (
            <>
              <h2 className="text-lg font-bold text-foreground">{tAdmin('settings')}</h2>
              <button type="button" onClick={handleClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-foreground transition active:scale-95">
                <X className="h-5 w-5" />
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => setActiveMenu("main")} className="flex items-center gap-1 pr-4 text-primary transition active:scale-95 text-sm font-medium">
                <ChevronLeft className="h-5 w-5" />
                {tAdmin('settings')}
              </button>
              <h2 className="text-base font-bold text-foreground">
                {activeMenu === "display" ? tPublic('displayMode') : activeMenu === "language" ? tPublic('appLanguage') : "About App"}
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
                  <span className="font-medium text-foreground">{tPublic('displayMode')}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
              
              <button onClick={() => setActiveMenu("language")} className="flex w-full items-center justify-between border-b border-border p-4 text-left transition hover:bg-secondary/50 active:bg-secondary">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Globe className="h-4.5 w-4.5" />
                  </div>
                  <span className="font-medium text-foreground">{tPublic('appLanguage')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{getLanguageName(currentLang)}</span>
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

          {/* Display Mode (កន្លែងដាក់កូដសង្កត់លើគ្រាប់ភ្នែក ៥ វិនាទី) */}
          {activeMenu === "display" && (
            <div className="animate-in slide-in-from-right-4 fade-in duration-200">
              <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-3 shadow-sm">
                <button type="button" onClick={toggleMode} className="flex w-full items-center gap-3 rounded-xl p-2 text-sm text-foreground transition hover:bg-secondary active:scale-[0.98]">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground">
                    {mode === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  </span>
                  <span className="flex-1 text-left font-medium">{mode === "dark" ? tPublic('darkMode') : tPublic('lightMode')}</span>
                  <span className={`relative h-5 w-9 shrink-0 rounded-full transition ${mode === "dark" ? "bg-primary" : "bg-muted"}`}>
                    <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${mode === "dark" ? "left-4" : "left-0.5"}`} />
                  </span>
                </button>

                {/* 👁️ គ្រាប់ភ្នែក Eye Care ភ្ជាប់ជាមួយមុខងារចុចសង្កត់ ៥ វិនាទីដើម្បីបើក Admin */}
                <button 
                  type="button" 
                  onClick={toggleEyeCare}
                  onMouseDown={startHolding}
                  onMouseUp={cancelHolding}
                  onMouseLeave={cancelHolding}
                  onTouchStart={startHolding}
                  onTouchEnd={cancelHolding}
                  className="flex w-full items-center gap-3 rounded-xl p-2 text-sm text-foreground transition hover:bg-secondary active:scale-[0.98] select-none"
                  title="Eye Care"
                >
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                    isHolding ? "bg-primary text-primary-foreground scale-110 animate-pulse" : eyeCare ? "bg-warning/20 text-warning" : "bg-secondary text-foreground"
                  }`}>
                    <Eye className="h-4 w-4" />
                  </span>
                  <span className="flex-1 text-left font-medium">{tPublic('eyeCare')}</span>
                  <span className={`relative h-5 w-9 shrink-0 rounded-full transition ${eyeCare ? "bg-warning" : "bg-muted"}`}>
                    <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${eyeCare ? "left-4" : "left-0.5"}`} />
                  </span>
                </button>

                {eyeCare && (
                  <div className="px-2 pt-3 pb-1 animate-in fade-in slide-in-from-top-1 duration-200 border-t border-border mt-2">
                    <label className="mb-2.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{tPublic('eyeCareLevel')}</label>
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
                  <button 
                    key={l.code} 
                    type="button" 
                    onClick={() => switchLanguage(l.code)} 
                    className={`flex w-full items-center gap-3 p-4 text-sm transition hover:bg-secondary/50 active:bg-secondary ${index !== UI_LANGUAGES.length - 1 ? "border-b border-border" : ""}`}
                  >
                    <span className="text-xl">{l.flag}</span>
                    <span className={`flex-1 text-left ${currentLang === l.code ? "font-semibold text-primary" : "text-foreground"}`}>
                      {getLanguageName(l.code)}
                    </span>
                    {currentLang === l.code && <Check className="h-5 w-5 text-primary" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* About (ដកចេញពីសញ្ញាឧទានធម្មតា ព្រោះយើងប្តូរទៅដាក់លើគ្រាប់ភ្នែករួចហើយ) */}
          {activeMenu === "about" && (
            <div className="animate-in slide-in-from-right-4 fade-in duration-200 flex flex-col gap-6">
              <div className="flex flex-col items-center text-center mt-4">
                <div className="relative h-20 w-20 rounded-2xl bg-transparent mb-4 overflow-hidden border border-border">
                  <Image src="/icon-512.png" alt="Logo" fill className="logo-clean-mask" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{SAVPD_CONSTANTS.BRAND.TRADEMARK}</h3>
                
                <p className="text-xs text-muted-foreground mt-4 max-w-xs select-none">
                  {tPublic('footer')}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">{tPublic('featuresHeading')}</h4>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Sparkles className="h-5 w-5" />
                    </span>
                    <div>
                      <h5 className="text-sm font-bold text-foreground">{tPublic('autopilotTitle')}</h5>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{tPublic('autopilotDesc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-500">
                      <ShieldCheck className="h-5 w-5" />
                    </span>
                    <div>
                      <h5 className="text-sm font-bold text-foreground">{tPublic('contextTitle')}</h5>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{tPublic('contextDesc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-500">
                      <HeartPulse className="h-5 w-5" />
                    </span>
                    <div>
                      <h5 className="text-sm font-bold text-foreground">{tPublic('emotionTitle')}</h5>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{tPublic('emotionDesc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-500">
                      <Gauge className="h-5 w-5" />
                    </span>
                    <div>
                      <h5 className="text-sm font-bold text-foreground">{tPublic('paceTitle')}</h5>
                      <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{tPublic('paceDesc')}</p>
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
