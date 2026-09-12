"use client"

import { useState } from "react"
import { Clapperboard, Settings, Moon, Sun, Check, Lock, X } from "lucide-react"
import { UI_LANGUAGES, type LangCode } from "@/lib/i18n"
import { useTheme } from "@/lib/theme"

type T = ReturnType<typeof import("@/lib/i18n").useI18n>["t"]

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
  const { mode, toggleMode } = useTheme()
  const [previewSettingsOpen, setPreviewSettingsOpen] = useState(false)
  const [passcode, setPasscode] = useState("")
  const [error, setError] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // អាចកំណត់កូដចូលទីនេះ ឧទាហរណ៍ @2000 ឬកូដតាមចិត្ត
    if (passcode === "@2000") {
      onLoginSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col bg-background justify-between p-4 relative">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border/60 bg-background/80 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-sm">
            <Clapperboard className="h-5 w-5" />
          </span>
          <span className="text-base font-bold tracking-tight text-foreground">AI dubbing</span>
        </div>

        <button
          type="button"
          onClick={() => setPreviewSettingsOpen(true)}
          aria-label="Settings"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary/60 text-foreground transition active:scale-95"
        >
          <Settings className="h-4.5 w-4.5" />
        </button>
      </header>

      {/* Body: Center Login PIN Box */}
      <div className="flex flex-1 flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-3xl border border-border bg-card/80 p-6 shadow-xl backdrop-blur-md">
          <div className="text-center mb-6">
            <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-inner">
              <Lock className="h-6 w-6" />
            </span>
            <h2 className="text-lg font-bold text-foreground">សុវត្ថិភាពប្រព័ន្ធ</h2>
            <p className="mt-1 text-xs text-muted-foreground">សូមបញ្ចូលលេខកូដសម្ងាត់ដើម្បីចូលទៅកាន់ផ្ទាំងការងារ</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="បញ្ចូលលេខកូដ (ឧ. @2000)"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value)
                  setError(false)
                }}
                className="w-full rounded-2xl border border-border bg-secondary/60 px-4 py-3.5 text-center text-base font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
                autoFocus
              />
              {error && <p className="mt-2 text-center text-xs text-destructive font-medium">លេខកូដមិនត្រឹមត្រូវ!</p>}
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition active:scale-[0.99]"
            >
              ចូលទៅកាន់កម្មវិធី
            </button>
          </form>
        </div>
      </div>

      {/* Footer info */}
      <div className="py-4 text-center">
        <p className="text-[11px] text-muted-foreground">© 2026 AI Dubbing Studio. All rights reserved.</p>
      </div>

      {/* Minimal Settings Modal (มีเฉพาะ Display Mode และ Language) */}
      {previewSettingsOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background animate-in fade-in zoom-in-95 duration-200">
          <div
            className="flex items-center justify-between border-b border-border px-4 py-4"
            style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}
          >
            <h2 className="text-lg font-bold text-foreground">⚙️ ការកំណត់ (Settings)</h2>
            <button
              type="button"
              onClick={() => setPreviewSettingsOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* 1. Display Mode */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Display Mode (ការបង្ហាញ)
              </p>
              <div className="rounded-2xl border border-border bg-card p-3">
                <button
                  type="button"
                  onClick={toggleMode}
                  className="flex w-full items-center gap-3 rounded-xl p-2 text-sm text-foreground transition hover:bg-secondary"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground">
                    {mode === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  </span>
                  <span className="flex-1 text-left font-medium">{mode === "dark" ? t.darkMode : t.lightMode}</span>
                  <span className={`relative h-5 w-9 shrink-0 rounded-full transition ${mode === "dark" ? "bg-primary" : "bg-muted"}`}>
                    <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${mode === "dark" ? "left-4" : "left-0.5"}`} />
                  </span>
                </button>
              </div>
            </div>

            {/* 2. App Language */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t.appLanguage}
              </p>
              <div className="flex flex-col gap-1 rounded-2xl border border-border bg-card p-2">
                {UI_LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLang(l.code)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                      lang === l.code ? "bg-primary/15 font-semibold text-primary" : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <span className="text-xl">{l.flag}</span>
                    <span className="flex-1 text-left">{l.native}</span>
                    {lang === l.code && <Check className="h-4 w-4" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
