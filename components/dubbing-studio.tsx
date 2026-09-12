"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  AudioLines,
  Check,
  CheckCircle2,
  Clapperboard,
  Download,
  Eye,
  FileVideo,
  Loader2,
  Moon,
  RotateCcw,
  Settings,
  Sparkles,
  Sun,
  UploadCloud,
  X,
} from "lucide-react"
import { UI_LANGUAGES, useI18n, type LangCode } from "@/lib/i18n"
import { useTheme } from "@/lib/theme"

const DUB_LANGS: { code: LangCode; flag: string }[] = [
  { code: "km", flag: "🇰🇭" },
  { code: "en", flag: "🇬🇧" },
  { code: "zh", flag: "🇨🇳" },
  { code: "vi", flag: "🇻🇳" },
  { code: "th", flag: "🇹🇭" },
]

type Status = "idle" | "processing" | "done"

export function DubbingStudio() {
  const { t, lang, setLang } = useI18n()
  const { mode, toggleMode, eyeCare, toggleEyeCare, eyeCareLevel, setEyeCareLevel } = useTheme()
  const [file, setFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [targetLang, setTargetLang] = useState<LangCode>("km")
  const [status, setStatus] = useState<Status>("idle")
  const [stage, setStage] = useState(0)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl)
    }
  }, [videoUrl])

  const acceptFile = useCallback(
    (f: File | undefined) => {
      if (!f || !f.type.startsWith("video/")) return
      if (videoUrl) URL.revokeObjectURL(videoUrl)
      setFile(f)
      setVideoUrl(URL.createObjectURL(f))
      setStatus("idle")
    },
    [videoUrl],
  )

  useEffect(() => {
    if (status !== "processing") return
    if (stage >= t.stages.length) {
      const done = setTimeout(() => setStatus("done"), 600)
      return () => clearTimeout(done)
    }
    const next = setTimeout(() => setStage((s) => s + 1), 1100)
    return () => clearTimeout(next)
  }, [status, stage, t.stages.length])

  const start = () => {
    if (!file) {
      inputRef.current?.click()
      return
    }
    setStage(0)
    setStatus("processing")
  }

  const reset = () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl)
    setFile(null)
    setVideoUrl(null)
    setStatus("idle")
    setStage(0)
  }

  const targetFlag = DUB_LANGS.find((l) => l.code === targetLang)?.flag
  const progress = status === "done" ? 100 : Math.round((Math.min(stage, t.stages.length) / t.stages.length) * 100)

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col bg-background">
      {/* App bar */}
      <header
        className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur-xl"
        style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Clapperboard className="h-5 w-5" />
          </span>
          <span className="text-sm font-bold leading-tight text-foreground">{t.appTitle}</span>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setSettingsOpen((o) => !o)}
            aria-label={t.settings}
            aria-expanded={settingsOpen}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary/60 text-foreground transition active:scale-95"
          >
            <Settings className="h-4.5 w-4.5" />
          </button>
          {settingsOpen && (
            <>
              <div className="fixed inset-0 z-10" aria-hidden="true" onClick={() => setSettingsOpen(false)} />
              <div className="absolute right-0 z-20 mt-2 max-h-[75dvh] w-64 overflow-y-auto overflow-x-hidden rounded-2xl border border-border bg-card p-2 shadow-2xl shadow-black/50">
                {/* Appearance */}
                <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {t.appearance}
                </p>
                <button
                  type="button"
                  onClick={toggleMode}
                  className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2.5 text-sm text-foreground transition hover:bg-secondary"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-foreground">
                    {mode === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  </span>
                  <span className="flex-1 text-left">{mode === "dark" ? t.darkMode : t.lightMode}</span>
                  <span
                    className={`relative h-5 w-9 shrink-0 rounded-full transition ${mode === "dark" ? "bg-primary" : "bg-muted"}`}
                    aria-hidden="true"
                  >
                    <span
                      className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${mode === "dark" ? "left-4" : "left-0.5"}`}
                    />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={toggleEyeCare}
                  className="flex w-full items-center gap-2.5 rounded-xl px-2 py-2.5 text-sm text-foreground transition hover:bg-secondary"
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg ${eyeCare ? "bg-warning/20 text-warning" : "bg-secondary text-foreground"}`}
                  >
                    <Eye className="h-4 w-4" />
                  </span>
                  <span className="flex-1 text-left leading-tight">{t.eyeCare}</span>
                  <span
                    className={`relative h-5 w-9 shrink-0 rounded-full transition ${eyeCare ? "bg-warning" : "bg-muted"}`}
                    aria-hidden="true"
                  >
                    <span
                      className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${eyeCare ? "left-4" : "left-0.5"}`}
                    />
                  </span>
                </button>

                {eyeCare && (
                  <div className="px-2 pb-2 pt-1">
                    <label className="mb-1.5 block text-[11px] font-medium text-muted-foreground">
                      {t.eyeCareLevel}
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={70}
                      value={eyeCareLevel}
                      onChange={(e) => setEyeCareLevel(Number(e.target.value))}
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-warning"
                    />
                  </div>
                )}

                <div className="my-1.5 h-px bg-border" />

                {/* Language */}
                <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {t.appLanguage}
                </p>
                {UI_LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      setLang(l.code)
                      setSettingsOpen(false)
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-xl px-2 py-2.5 text-sm transition ${
                      lang === l.code ? "bg-primary/15 font-semibold text-primary" : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <span className="text-lg">{l.flag}</span>
                    <span className="flex-1 text-left">{l.native}</span>
                    {lang === l.code && <Check className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      {/* Screen body */}
      <div
        className="relative flex-1 overflow-y-auto px-4 pb-6 pt-5"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-80 -translate-x-1/2 rounded-full bg-primary/20 blur-[110px]"
        />

        {status === "idle" && (
          <DashboardScreen
            t={t}
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
          />
        )}

        {status === "processing" && <ProcessingScreen t={t} stage={stage} progress={progress} />}

        {status === "done" && (
          <ResultScreen
            t={t}
            videoUrl={videoUrl}
            file={file}
            targetName={t.languages[targetLang]}
            targetFlag={targetFlag}
            reset={reset}
          />
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        className="sr-only"
        onChange={(e) => acceptFile(e.target.files?.[0])}
      />
    </div>
  )
}

type T = ReturnType<typeof useI18n>["t"]

function DashboardScreen({
  t,
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
}: {
  t: T
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
}) {
  return (
    <div className="relative flex flex-col gap-6">
      <div className="pt-1 text-center">
        <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground">{t.appTitle}</h1>
        <p className="mx-auto mt-1.5 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
          {t.appSubtitle}
        </p>
      </div>

      {/* Upload */}
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
          className={`flex w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed px-6 py-14 text-center transition active:scale-[0.99] ${
            dragging ? "border-primary bg-primary/10" : "border-border bg-secondary/40 hover:border-primary/60"
          }`}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <UploadCloud className="h-8 w-8" />
          </span>
          <span className="text-base font-semibold text-foreground">{t.dropText}</span>
          <span className="flex flex-col items-center gap-2 text-xs text-muted-foreground">
            <span>{t.dropHint}</span>
            <span className="flex items-center gap-1 rounded-full bg-success/15 px-3 py-1 font-medium text-success">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {t.noLimit}
            </span>
          </span>
        </button>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-border bg-black">
          <video key={videoUrl} src={videoUrl} controls className="aspect-video w-full bg-black" />
          <div className="flex items-center justify-between gap-3 bg-secondary/50 px-4 py-3">
            <span className="flex min-w-0 items-center gap-2 text-sm text-foreground">
              <FileVideo className="h-4 w-4 shrink-0 text-primary" />
              <span className="truncate">{file?.name}</span>
            </span>
            <button
              type="button"
              onClick={reset}
              className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-muted-foreground transition hover:bg-destructive/15 hover:text-destructive"
            >
              <X className="h-3.5 w-3.5" />
              {t.delete}
            </button>
          </div>
        </div>
      )}

      {/* Target Language Selector with Flags */}
      <div className="rounded-3xl border border-border bg-card/60 p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-sm font-semibold text-foreground">ជ្រើសរើសភាសាដែលត្រូវបកប្រែ</h3>
          <span className="flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            AI កំណត់ភាសាដើមស្វ័យប្រវត្តិ
          </span>
        </div>

        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-2xl">
            {DUB_LANGS.find((l) => l.code === targetLang)?.flag}
          </span>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value as LangCode)}
            className="w-full cursor-pointer appearance-none rounded-2xl border border-border bg-secondary/60 py-4 pl-14 pr-10 text-base font-semibold text-foreground outline-none transition hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-ring/40"
          >
            {DUB_LANGS.map((l) => (
              <option key={l.code} value={l.code} className="bg-card py-2 text-base text-foreground">
                {l.flag} {t.languages[l.code]}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Sticky action */}
      <div className="sticky bottom-0 -mx-4 mt-1 border-t border-border/60 bg-background/85 px-4 pb-2 pt-3 backdrop-blur-xl">
        <button
          type="button"
          onClick={start}
          className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition active:scale-[0.99]"
        >
          <Sparkles className="h-5 w-5 transition group-hover:rotate-12" />
          {t.start}
        </button>
      </div>
    </div>
  )
}

function ProcessingScreen({ t, stage, progress }: { t: T; stage: number; progress: number }) {
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
        <p className="text-lg font-bold text-foreground">{t.processing}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t.autopilotDesc}</p>
      </div>

      <ul className="w-full space-y-2.5 text-left">
        {t.stages.map((s, i) => {
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
  t,
  videoUrl,
  file,
  targetName,
  targetFlag,
  reset,
}: {
  t: T
  videoUrl: string | null
  file: File | null
  targetName: string
  targetFlag?: string
  reset: () => void
}) {
  return (
    <div className="flex flex-col gap-5 py-2">
      <div className="text-center">
        <span className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-success/20 text-success">
          <AudioLines className="h-8 w-8" />
        </span>
        <h2 className="text-xl font-bold text-foreground">{t.doneTitle}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.doneSubtitle} {targetName} {targetFlag}
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
          {t.download}
        </a>
        <button
          type="button"
          onClick={reset}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-secondary/60 py-3.5 text-sm font-medium text-foreground transition active:scale-[0.99]"
        >
          <RotateCcw className="h-4 w-4" />
          {t.retry}
        </button>
      </div>
    </div>
  )
}
