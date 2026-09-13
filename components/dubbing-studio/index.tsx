"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Clapperboard, Lock, Settings, X } from "lucide-react"
import { useI18n, type LangCode } from "@/lib/i18n"
import { SAVPD_CONSTANTS } from "@/lib/constants"
import { DashboardScreenContainer } from "./dashboard-screen"
import { SharedSettings } from "./shared-settings"
import { AdminDashboard } from "./admin-dashboard"
import { PreviewScreen } from "./preview-screen"

type Status = "idle" | "processing" | "done"

export function DubbingStudio() {
  const { t, lang, setLang } = useI18n()

  const [isUnlocked, setIsUnlocked] = useState(false)

  const [file, setFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [targetLang, setTargetLang] = useState<LangCode>("km")
  const [status, setStatus] = useState<Status>("idle")
  const [stage, setStage] = useState(0)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Admin States
  const [adminModalOpen, setAdminModalOpen] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [adminError, setAdminError] = useState(false)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

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

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminPassword === "@2000") {
      setIsAdminLoggedIn(true)
      setAdminModalOpen(false)
    } else {
      setAdminError(true)
    }
  }

  const progress = status === "done" ? 100 : Math.round((Math.min(stage, t.stages.length) / t.stages.length) * 100)

  if (!isUnlocked) {
    return (
      <PreviewScreen
        t={t}
        lang={lang}
        setLang={setLang}
        onLoginSuccess={() => setIsUnlocked(true)}
      />
    )
  }

  if (isAdminLoggedIn) {
    return <AdminDashboard onLogout={() => setIsAdminLoggedIn(false)} />
  }

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col bg-background">
      <header
        className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur-xl"
        style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Clapperboard className="h-5 w-5" />
          </span>
          <span className="text-sm font-bold leading-tight text-foreground">
            {SAVPD_CONSTANTS.BRAND.TRADEMARK}
          </span>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            aria-label={t.settings}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary/60 text-foreground transition active:scale-95"
          >
            <Settings className="h-4.5 w-4.5" />
          </button>
        </div>
      </header>

      {/* ហៅផ្ទាំង Shared Settings មកប្រើ */}
      <SharedSettings
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        onAdminClick={() => {
          setSettingsOpen(false)
          setAdminModalOpen(true)
          setAdminPassword("")
          setAdminError(false)
        }}
      />

      {/* ផ្ទាំង Login ចូល Admin លោតចេញពេលសង្កត់សញ្ញាឧទានក្នុង About */}
      {adminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" /> Master Key
              </h3>
              <button
                type="button"
                onClick={() => setAdminModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={adminPassword}
                  onChange={(e) => {
                    setAdminPassword(e.target.value)
                    setAdminError(false)
                  }}
                  className="w-full rounded-2xl border border-border bg-secondary/60 px-4 py-3.5 text-sm font-semibold text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
                  autoFocus
                />
                {adminError && <p className="mt-1.5 text-xs text-destructive font-medium">Invalid Password</p>}
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition active:scale-[0.99]"
              >
                Login Admin
              </button>
            </form>
          </div>
        </div>
      )}

      <DashboardScreenContainer
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
        status={status}
        stage={stage}
        progress={progress}
      />

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

export default DubbingStudio
