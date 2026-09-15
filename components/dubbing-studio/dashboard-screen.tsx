"use client"

import { useState, useRef } from "react"
import {
  AudioLines,
  CheckCircle2,
  Download,
  FileVideo,
  Loader2,
  RotateCcw,
  Sparkles,
  UploadCloud,
  X,
  Layers,
  Wand2,
  LayoutTemplate,
  Type,
  Share2,
  Scissors,
  ShieldCheck,
  Settings
} from "lucide-react"
import { useTranslations } from "next-intl"
import { SAVPD_CONSTANTS } from "@/lib/constants"
import { useRouter, useParams } from "next/navigation"

export const DUB_LANGS = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "km", name: "ភាសាខ្មែរ", flag: "🇰🇭" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "ph", name: "Filipino", flag: "🇵🇭" },
  { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
] as const

type LangCode = typeof DUB_LANGS[number]["code"]
type Status = "idle" | "processing" | "done"

export function DashboardScreenContainer({
  file,
  videoUrl,
  dragging,
  setDragging,
  acceptFile,
  inputRef,
  reset,
  targetLang,
  setTargetLang,
  start,
  status,
  stage,
  progress,
}: {
  file: File | null
  videoUrl: string | null
  dragging: boolean
  setDragging: (v: boolean) => void
  acceptFile: (f: File | undefined) => void
  inputRef: React.RefObject<HTMLInputElement | null>
  reset: () => void
  targetLang: LangCode
  setTargetLang: (c: LangCode) => void
  start: () => void
  status: Status
  stage: number
  progress: number
}) {
  const t = useTranslations("Public") 
  const targetFlag = DUB_LANGS.find((l) => l.code === targetLang)?.flag
  const router = useRouter()
  const params = useParams()
  const locale = (params?.locale as string) || "km"
  
  // 🛡️ Logic ចុចផ្អឹប ៥ វិនាទី ដើម្បីចូល Admin
  const pressTimer = useRef<NodeJS.Timeout | null>(null)
  const [adminHolding, setAdminHolding] = useState(false)

  const handleAdminPressStart = () => {
    setAdminHolding(true)
    pressTimer.current = setTimeout(() => {
      router.push(`/${locale}/admin`)
    }, 5000) // ចុចផ្អឹបរយៈពេល ៥ វិនាទី
  }

  const handleAdminPressEnd = () => {
    setAdminHolding(false)
    if (pressTimer.current) {
      clearTimeout(pressTimer.current)
    }
  }
  
  // 🎛️ Brabus/Mansory Studio Pro States
  const [removeWatermark, setRemoveWatermark] = useState(true)
  const [autoCropUi, setAutoCropUi] = useState(true)
  const [dubMode, setDubMode] = useState("level1")
  const [videoStyle, setVideoStyle] = useState("normal")
  const [subtitleStyle, setSubtitleStyle] = useState("dynamic")
  const [platform, setPlatform] = useState("tiktok")

  return (
    <div
      className="relative flex-1 overflow-y-auto px-4 pb-6 pt-4 max-w-2xl mx-auto w-full"
      style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
    >
      {/* 🌟 Header ដើម៖ រូប Studio ខាងឆ្វេង និង រូបកងចក្រ Settings ខាងស្តាំ */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/20 text-primary">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-xs font-bold text-foreground">SAVPD Studio</span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* កន្លែងការពារភ្នែក ចុចផ្អឹប ៥ វិនាទី ដើម្បីចូល Admin */}
          <button
            type="button"
            onMouseDown={handleAdminPressStart}
            onMouseUp={handleAdminPressEnd}
            onTouchStart={handleAdminPressStart}
            onTouchEnd={handleAdminPressEnd}
            title="ចុចផ្អឹប ៥ វិនាទី ដើម្បីចូល Admin"
            className={`flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-card/60 text-muted-foreground transition hover:text-primary ${
              adminHolding ? "border-primary bg-primary/20 text-primary scale-95" : ""
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => router.push(`/${locale}/settings`)}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-card/60 text-muted-foreground transition hover:text-primary"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-80 -translate-x-1/2 rounded-full bg-primary/20 blur-[110px]"
      />

      {status === "idle" && (
        <DashboardContent
          file={file}
          videoUrl={videoUrl}
          dragging={dragging}
          setDragging={setDragging}
          acceptFile={acceptFile}
          inputRef={inputRef}
          reset={reset}
          targetLang={targetLang}
          setTargetLang={setTargetLang}
          
          removeWatermark={removeWatermark}
          setRemoveWatermark={setRemoveWatermark}
          autoCropUi={autoCropUi}
          setAutoCropUi={setAutoCropUi}
          dubMode={dubMode}
          setDubMode={setDubMode}
          videoStyle={videoStyle}
          setVideoStyle={setVideoStyle}
          subtitleStyle={subtitleStyle}
          setSubtitleStyle={setSubtitleStyle}
          platform={platform}
          setPlatform={setPlatform}
          
          start={start}
        />
      )}

      {status === "processing" && <ProcessingScreen stage={stage} progress={progress} />}

      {status === "done" && (
        <ResultScreen
          videoUrl={videoUrl}
          file={file}
          targetName={t(`languages.${targetLang}`)}
          targetFlag={targetFlag}
          reset={reset}
        />
      )}
    </div>
  )
}

function DashboardContent({
  file,
  videoUrl,
  dragging,
  setDragging,
  acceptFile,
  inputRef,
  reset,
  targetLang,
  setTargetLang,
  
  removeWatermark,
  setRemoveWatermark,
  autoCropUi,
  setAutoCropUi,
  dubMode,
  setDubMode,
  videoStyle,
  setVideoStyle,
  subtitleStyle,
  setSubtitleStyle,
  platform,
  setPlatform,
  
  start,
}: {
  file: File | null
  videoUrl: string | null
  dragging: boolean
  setDragging: (v: boolean) => void
  acceptFile: (f: File | undefined) => void
  inputRef: React.RefObject<HTMLInputElement | null>
  reset: () => void
  targetLang: LangCode
  setTargetLang: (c: LangCode) => void
  
  removeWatermark: boolean
  setRemoveWatermark: (v: boolean) => void
  autoCropUi: boolean
  setAutoCropUi: (v: boolean) => void
  dubMode: string
  setDubMode: (v: string) => void
  videoStyle: string
  setVideoStyle: (v: string) => void
  subtitleStyle: string
  setSubtitleStyle: (v: string) => void
  platform: string
  setPlatform: (v: string) => void
  
  start: () => void
}) {
  const t = useTranslations("Public")

  return (
    <div className="relative flex flex-col gap-5">
      {/* 🌟 Header */}
      <div className="pt-1 text-center mb-2">
        <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground">
          {SAVPD_CONSTANTS.BRAND.TRADEMARK}
        </h1>
        <p className="text-[11px] text-primary font-semibold mt-0.5">⚡ Professional Producer Studio (Brabus Edition)</p>
      </div>

      {/* 🌟 1. ផ្នែក Upload */}
      {!videoUrl ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            acceptFile(e.dataTransfer.files?.[0])
          }}
          className={`flex w-full flex-col items-center justify-center gap-3 rounded-3xl border px-6 py-10 text-center transition active:scale-[0.99] ${
            dragging ? "border-primary bg-primary/10" : "border-border bg-card/60 hover:border-primary/60 shadow-sm"
          }`}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <UploadCloud className="h-7 w-7" />
          </span>
          <span className="text-sm font-semibold text-foreground">{t("dropText")}</span>
          <span className="text-xs text-muted-foreground">{t("dropHint")} (รองรับ Video & Screenshots សុទ្ធ)</span>
        </button>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-border bg-black shadow-md">
          <video key={videoUrl} src={videoUrl} controls className="aspect-video w-full bg-black" />
          <div className="flex items-center justify-between gap-3 bg-secondary/80 px-4 py-3 backdrop-blur-md">
            <span className="flex min-w-0 items-center gap-2 text-sm text-foreground">
              <FileVideo className="h-4 w-4 shrink-0 text-primary" />
              <span className="truncate">{file?.name}</span>
            </span>
            <button
              type="button"
              onClick={reset}
              className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-destructive transition hover:bg-destructive/15"
            >
              <X className="h-3.5 w-3.5" />
              {t("delete")}
            </button>
          </div>
        </div>
      )}

      {/* 🌟 កញ្ចប់បញ្ជា AI & Studio Pro Control Panel */}
      <div className="rounded-3xl border border-border bg-card/40 p-4 shadow-sm space-y-5">
        
        <div className="flex items-center justify-between bg-secondary/50 p-3 rounded-2xl border border-border">
          <div>
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> 
              លុប Watermark / Logo ដើម
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">AI លុបស្នាម Logo ស្វ័យប្រវត្តិដើម្បីការពារ Shadowban</p>
          </div>
          <input 
            type="checkbox" 
            checked={removeWatermark} 
            onChange={(e) => setRemoveWatermark(e.target.checked)}
            className="w-4 h-4 accent-primary cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between bg-secondary/50 p-3 rounded-2xl border border-border">
          <div>
            <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Scissors className="h-3.5 w-3.5 text-primary" /> 
              ទាញយកតែសាច់វីដេអូសុទ្ធ (Auto-Crop UI)
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">កាត់បំបាត់គែម TikTok/Facebook Reels & Screenshots ស្វ័យប្រវត្តិ</p>
          </div>
          <input 
            type="checkbox" 
            checked={autoCropUi} 
            onChange={(e) => setAutoCropUi(e.target.checked)}
            className="w-4 h-4 accent-primary cursor-pointer"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <AudioLines className="h-3.5 w-3.5" /> កម្រិតបញ្ចូលសំឡេង (AI Dubbing Studio)
          </div>
          <select
            value={dubMode}
            onChange={(e) => setDubMode(e.target.value)}
            className="w-full cursor-pointer appearance-none rounded-2xl border border-border bg-secondary/60 py-3 pl-4 pr-10 text-xs font-medium text-foreground outline-none transition hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="level1">🎙️ កម្រិត ១៖ បកប្រែ & បញ្ចូលសំឡេងធម្មតា</option>
            <option value="level2">🎵 កម្រិត ២៖ បញ្ចូលសំឡេង + Sound Effect</option>
            <option value="level3">🎬 កម្រិត ៣៖ បែបរឿង/ភាពយន្ត (Pro SFX)</option>
            <option value="level4">🔥 កម្រិត ៤៖ បង្កើតសំឡេង & SFX ពីសូន្យ</option>
          </select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <LayoutTemplate className="h-3.5 w-3.5" /> ទម្រង់សាច់វីដេអូ (Video Structure)
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'normal', icon: '🎞️', title: 'ធម្មតា', desc: 'រៀបសាច់រឿង' },
              { id: 'top-down', icon: '🎬', title: 'បំបែកជាភាគ', desc: 'កាត់ជា EP' },
              { id: 'bottom-up', icon: '🧩', title: 'ផ្គុំរឿងរាយ', desc: 'ផ្គុំឃ្លីបចូលគ្នា' },
            ].map((style) => (
              <button
                key={style.id}
                type="button"
                onClick={() => setVideoStyle(style.id)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border transition-all ${
                  videoStyle === style.id 
                    ? 'border-primary bg-primary/10 text-primary shadow-sm' 
                    : 'border-border bg-secondary/30 text-muted-foreground hover:border-primary/40 hover:bg-secondary/60'
                }`}
              >
                <div className="text-lg mb-1">{style.icon}</div>
                <div className="text-[10px] font-bold">{style.title}</div>
                <div className="text-[8px] opacity-80 mt-0.5">{style.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <Type className="h-3.5 w-3.5" /> ស្ទីល Subtitle
          </div>
          <select
            value={subtitleStyle}
            onChange={(e) => setSubtitleStyle(e.target.value)}
            className="w-full cursor-pointer appearance-none rounded-2xl border border-border bg-secondary/60 py-3 pl-4 pr-10 text-xs font-medium text-foreground outline-none transition hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="none">❌ អត់ដាក់ Subtitle</option>
            <option value="standard">📝 ស្តង់ដារ (ធម្មតា)</option>
            <option value="dynamic">✨ រំលេចពាក្យ (ស្ទីល Alex Hormozi)</option>
            <option value="bilingual">🌍 ទ្វេភាសា (ខ្មែរ & អង់គ្លេស)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <Wand2 className="h-3.5 w-3.5" /> ភាសាគោលដៅ
            </div>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value as LangCode)}
              className="w-full cursor-pointer appearance-none rounded-2xl border border-border bg-secondary/60 py-3 pl-3 pr-8 text-xs font-medium text-foreground outline-none transition hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary"
            >
              {DUB_LANGS.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <Share2 className="h-3.5 w-3.5" /> Platform
            </div>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-2xl border border-border bg-secondary/60 py-3 pl-3 pr-8 text-xs font-medium text-foreground outline-none transition hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="tiktok">📱 TikTok / Reels</option>
              <option value="facebook">👥 Facebook Video</option>
              <option value="youtube">▶️ YouTube (16:9)</option>
            </select>
          </div>
        </div>

      </div>

      <div className="sticky bottom-0 -mx-4 mt-2 border-t border-border/60 bg-background/85 px-4 pb-2 pt-3 backdrop-blur-xl">
        <button
          type="button"
          onClick={start}
          className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition active:scale-[0.99] hover:opacity-90"
        >
          <Wand2 className="h-4 w-4 transition group-hover:rotate-12" />
          ដំណើរការ Producer Studio ស្វ័យប្រវត្តិ
        </button>
      </div>
    </div>
  )
}

function ProcessingScreen({ stage, progress }: { stage: number; progress: number }) {
  const t = useTranslations("Public")
  const rawStages = t.raw("stages") as string[]

  return (
    <div className="flex min-h-[70dvh] flex-col items-center justify-center gap-8 py-6 text-center">
      <div className="relative flex h-32 w-32 items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="54" className="fill-none stroke-secondary" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r="54"
            className="fill-none stroke-primary transition-all duration-700 ease-out"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 54}
            strokeDashoffset={2 * Math.PI * 54 * (1 - progress / 100)}
          />
        </svg>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-foreground">{progress}%</span>
          <Loader2 className="mt-1 h-4 w-4 animate-spin text-primary" />
        </div>
      </div>

      <div>
        <p className="text-lg font-bold text-foreground">{t("processing")}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t("autopilotDesc")}</p>
      </div>

      <ul className="w-full space-y-2.5 text-left">
        {rawStages.map((s, i) => {
          const state = i < stage ? "done" : i === stage ? "active" : "pending"
          return (
            <li
              key={i}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                state === "active"
                  ? "border-primary/40 bg-primary/10"
                  : state === "done"
                    ? "border-success/30 bg-success/10"
                    : "border-border bg-secondary/30"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition ${
                  state === "done"
                    ? "bg-success text-success-foreground"
                    : state === "active"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {state === "done" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : state === "active" ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                )}
              </span>
              <span className={state === "pending" ? "text-muted-foreground" : "font-medium text-foreground"}>{s}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ResultScreen({
  videoUrl,
  file,
  targetName,
  targetFlag,
  reset,
}: {
  videoUrl: string | null
  file: File | null
  targetName: string
  targetFlag?: string
  reset: () => void
}) {
  const t = useTranslations("Public")

  return (
    <div className="flex flex-col gap-5 py-2">
      <div className="text-center">
        <span className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-success/20 text-success">
          <AudioLines className="h-8 w-8" />
        </span>
        <h2 className="text-xl font-bold text-foreground">{t("doneTitle")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("doneSubtitle")} {targetName} {targetFlag}
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border bg-black">
        {videoUrl && <video key={videoUrl} src={videoUrl} controls autoPlay className="aspect-video w-full bg-black" />}
      </div>

      <div className="sticky bottom-0 -mx-4 flex flex-col gap-2.5 border-t border-border/60 bg-background/85 px-4 pb-2 pt-3 backdrop-blur-xl">
        <a
          href={videoUrl ?? "#"}
          download={file ? `dubbed-${file.name}` : "dubbed-video.mp4"}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-success py-4 text-base font-bold text-success-foreground transition active:scale-[0.99]"
        >
          <Download className="h-5 w-5" />
          {t("download")}
        </a>
        <button
          type="button"
          onClick={reset}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-secondary/60 py-3.5 text-sm font-medium text-foreground transition active:scale-[0.99]"
        >
          <RotateCcw className="h-4 w-4" />
          {t("retry")}
        </button>
      </div>
    </div>
  )
}

export default function DashboardScreen() {
  const [file, setFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [targetLang, setTargetLang] = useState<LangCode>("km")
  const [status, setStatus] = useState<Status>("idle")
  const [stage, setStage] = useState(0)
  const [progress, setProgress] = useState(0)
  
  const inputRef = useRef<HTMLInputElement>(null)

  const acceptFile = (f: File | undefined) => {
    if (f) {
      setFile(f)
      setVideoUrl(URL.createObjectURL(f))
    }
  }

  const reset = () => {
    setFile(null)
    setVideoUrl(null)
    setStatus("idle")
    setStage(0)
    setProgress(0)
  }

  const start = () => {
    if (!file) return
    setStatus("processing")
    
    let currentProgress = 0
    let currentStage = 0
    const interval = setInterval(() => {
      currentProgress += 10
      setProgress(currentProgress)
      
      if (currentProgress % 30 === 0) {
        currentStage += 1
        setStage(currentStage)
      }

      if (currentProgress >= 100) {
        clearInterval(interval)
        setStatus("done")
      }
    }, 500)
  }

  return (
    <DashboardScreenContainer
      file={file}
      videoUrl={videoUrl}
      dragging={dragging}
      setDragging={setDragging}
      acceptFile={acceptFile}
      inputRef={inputRef}
      reset={reset}
      targetLang={targetLang}
      setTargetLang={setTargetLang}
      start={start}
      status={status}
      stage={stage}
      progress={progress}
    />
  )
}
