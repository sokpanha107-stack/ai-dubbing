"use client"

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
} from "lucide-react"
import type { LangCode } from "@/lib/i18n"

export const DUB_LANGS: { code: LangCode; name: string; flag: string }[] = [
  { code: "km", name: "ខ្មែរ", flag: "🇰🇭" },
  { code: "en", name: "អង់គ្លេស", flag: "🇬🇧" },
  { code: "zh", name: "ចិន", flag: "🇨🇳" },
  { code: "vi", name: "វៀតណាម", flag: "🇻🇳" },
  { code: "th", name: "ថៃ", flag: "🇹🇭" },
]

type T = ReturnType<typeof import("@/lib/i18n").useI18n>["t"]
type Status = "idle" | "processing" | "done"

export function DashboardScreenContainer({
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
  status,
  stage,
  progress,
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
  status: Status
  stage: number
  progress: number
}) {
  const targetFlag = DUB_LANGS.find((l) => l.code === targetLang)?.flag

  return (
    <div
      className="relative flex-1 overflow-y-auto px-4 pb-6 pt-5"
      style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-80 -translate-x-1/2 rounded-full bg-primary/20 blur-[110px]"
      />

      {status === "idle" && (
        <DashboardContent
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
  )
}

function DashboardContent({
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

      {/* Target Language Selector */}
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
                {l.flag} {l.name}
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
