"use client"

import { KeyRound, Save, CheckCircle2 } from "lucide-react"
import { AdminConfig } from "@/lib/admin-config"

interface ApiConfigPanelProps {
  config: AdminConfig
  setConfig: React.Dispatch<React.SetStateAction<AdminConfig>>
  onSave: (e: React.FormEvent) => void
  saved: boolean
}

export function ApiConfigPanel({ config, setConfig, onSave, saved }: ApiConfigPanelProps) {
  return (
    <form onSubmit={onSave} className="space-y-4 rounded-3xl border border-border bg-card p-5 shadow-sm animate-in fade-in slide-in-from-right-4 duration-200">
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <KeyRound className="h-4 w-4 text-primary" />
          OpenAI API Key (Speech-to-Text & Translation)
        </label>
        <input
          type="password"
          value={config.openaiApiKey}
          onChange={(e) => setConfig({ ...config, openaiApiKey: e.target.value })}
          placeholder="sk-..."
          className="w-full rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-xs text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
        />
      </div>

      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <KeyRound className="h-4 w-4 text-primary" />
          ElevenLabs API Key (Voice Cloning & Dubbing)
        </label>
        <input
          type="password"
          value={config.elevenlabsApiKey}
          onChange={(e) => setConfig({ ...config, elevenlabsApiKey: e.target.value })}
          placeholder="xi-..."
          className="w-full rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-xs text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
        />
      </div>

      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <KeyRound className="h-4 w-4 text-primary" />
          Translation API Key (Global Multi-Lang Engine)
        </label>
        <input
          type="password"
          value={config.translationApiKey}
          onChange={(e) => setConfig({ ...config, translationApiKey: e.target.value })}
          placeholder="API Key..."
          className="w-full rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-xs text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
        />
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/25 transition active:scale-[0.99]"
      >
        <Save className="h-4 w-4" />
        រក្សាទុក API Keys (Save APIs)
      </button>

      {saved && (
        <div className="flex items-center justify-center gap-1.5 rounded-2xl bg-success/15 py-2.5 text-xs font-semibold text-success animate-in fade-in">
          <CheckCircle2 className="h-4 w-4" />
          បានរក្សាទុកដោយជោគជ័យ!
        </div>
      )}
    </form>
  )
}
