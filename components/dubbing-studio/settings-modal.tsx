"use client"

import { Check, Eye, Moon, Sun, X, Sparkles, ShieldCheck, Heart, Gauge } from "lucide-react"
import { UI_LANGUAGES } from "@/lib/i18n"

type T = ReturnType<typeof import("@/lib/i18n").useI18n>["t"]
type LangCode = import("@/lib/i18n").LangCode

export function SettingsModal({
  t,
  isOpen,
  onClose,
  mode,
  toggleMode,
  eyeCare,
  toggleEyeCare,
  eyeCareLevel,
  setEyeCareLevel,
  lang,
  setLang,
  handleTouchStart,
  handleTouchEnd,
}: {
  t: T
  isOpen: boolean
  onClose: () => void
  mode: string
  toggleMode: () => void
  eyeCare: boolean
  toggleEyeCare: () => void
  eyeCareLevel: number
  setEyeCareLevel: (v: number) => void
  lang: LangCode
  setLang: (c: LangCode) => void
  handleTouchStart: () => void
  handleTouchEnd: () => void
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background animate-in fade-in zoom-in-95 duration-200">
      <div
        className="flex items-center justify-between border-b border-border px-4 py-4"
        style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}
      >
        <h2 className="text-lg font-bold text-foreground">⚙️ ការកំណត់ និងអំពីកម្មវិធី</h2>
        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-12">
        {/* Display Mode */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Display Mode (ការបង្ហាញ)
          </p>
          <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-3">
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

            <button
              type="button"
              onClick={toggleEyeCare}
              className="flex w-full items-center gap-3 rounded-xl p-2 text-sm text-foreground transition hover:bg-secondary"
            >
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${eyeCare ? "bg-warning/20 text-warning" : "bg-secondary text-foreground"}`}>
                <Eye className="h-4 w-4" />
              </span>
              <span className="flex-1 text-left font-medium">{t.eyeCare}</span>
              <span className={`relative h-5 w-9 shrink-0 rounded-full transition ${eyeCare ? "bg-warning" : "bg-muted"}`}>
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${eyeCare ? "left-4" : "left-0.5"}`} />
              </span>
            </button>

            {eyeCare && (
              <div className="px-2 pt-2">
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
          </div>
        </div>

        {/* App Language */}
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

        {/* About / AI Capabilities */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            About (អំពីសមត្ថភាព AI)
          </p>
          <div className="grid grid-cols-1 gap-2.5">
            <FeatureCard icon={<Sparkles className="h-4 w-4" />} title={t.autopilotTitle} desc={t.autopilotDesc} />
            <FeatureCard icon={<ShieldCheck className="h-4 w-4" />} title={t.contextTitle} desc={t.contextDesc} />
            <FeatureCard icon={<Heart className="h-4 w-4" />} title={t.emotionTitle} desc={t.emotionDesc} />
            <FeatureCard icon={<Gauge className="h-4 w-4" />} title={t.paceTitle} desc={t.paceDesc} />
          </div>
        </div>

        {/* Secret Admin Trigger (រង្វង់មូលតូចនៅជ្រុងខាងស្តាំក្រោម, ស្ងៀមធម្មតា ៥ វិនាទី) */}
        <div className="flex justify-end pt-8 pb-2 select-none">
          <button
            type="button"
            onMouseDown={handleTouchStart}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-border/40 bg-secondary/30 text-[11px] font-medium text-muted-foreground/30 hover:border-border hover:text-muted-foreground/60 transition"
            style={{ WebkitTouchCallout: "none", userSelect: "none" }}
          >
            !
          </button>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary/40 p-3">
      <div className="mb-1.5 flex items-center gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
          {icon}
        </span>
        <span className="text-[13px] font-semibold leading-tight text-foreground">{title}</span>
      </div>
      <p className="text-[11px] leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  )
}
