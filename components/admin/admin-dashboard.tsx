"use client"

import { useState, useEffect } from "react"
import { SAVPD_CONSTANTS } from "@/lib/constants"
import { getAdminConfig, saveAdminConfig, type AdminConfig } from "@/lib/admin-config"
import { KeyRound, Save, CheckCircle2, ShieldAlert, Lock } from "lucide-react"

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [config, setConfig] = useState<AdminConfig>({
    openaiApiKey: "",
    elevenlabsApiKey: "",
    translationApiKey: "",
    customPrompt: "",
    adminPasscode: "@2000",
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const currentConfig = getAdminConfig()
    setConfig(currentConfig)
  }, [])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    saveAdminConfig(config)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col bg-background p-4 overflow-y-auto pb-10">
      <header className="flex items-center justify-between border-b border-border pb-4">
        <h1 className="text-lg font-bold text-foreground flex items-center gap-1.5">
          🛡️ {SAVPD_CONSTANTS.BRAND.TRADEMARK} Admin
        </h1>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-xl bg-destructive/15 px-3 py-1.5 text-xs font-semibold text-destructive transition active:scale-95"
        >
          ចាកចេញ (Logout)
        </button>
      </header>
      
      <div className="mt-4 flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between rounded-2xl bg-primary/10 p-3 text-xs font-semibold text-primary">
          <span className="flex items-center gap-1">
            <ShieldAlert className="h-4 w-4" />
            ប្រព័ន្ធសុវត្ថិភាពកម្រិតខ្ពស់សកម្ម
          </span>
          <span>អនឡាញ</span>
        </div>

        {/* API Config Form */}
        <form onSubmit={handleSave} className="space-y-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
          {/* Change Passcode */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <Lock className="h-3.5 w-3.5 text-primary" />
              Admin Passcode (លេខកូដសម្ងាត់ចូល)
            </label>
            <input
              type="text"
              value={config.adminPasscode}
              onChange={(e) => setConfig({ ...config, adminPasscode: e.target.value })}
              placeholder="@2000"
              className="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-xs text-foreground outline-none transition focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <KeyRound className="h-3.5 w-3.5 text-primary" />
              OpenAI API Key
            </label>
            <input
              type="password"
              value={config.openaiApiKey}
              onChange={(e) => setConfig({ ...config, openaiApiKey: e.target.value })}
              placeholder="sk-..."
              className="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-xs text-foreground outline-none transition focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <KeyRound className="h-3.5 w-3.5 text-primary" />
              ElevenLabs API Key
            </label>
            <input
              type="password"
              value={config.elevenlabsApiKey}
              onChange={(e) => setConfig({ ...config, elevenlabsApiKey: e.target.value })}
              placeholder="xi-..."
              className="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-xs text-foreground outline-none transition focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
              <KeyRound className="h-3.5 w-3.5 text-primary" />
              Translation API Key
            </label>
            <input
              type="password"
              value={config.translationApiKey}
              onChange={(e) => setConfig({ ...config, translationApiKey: e.target.value })}
              placeholder="API Key..."
              className="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-xs text-foreground outline-none transition focus:border-primary"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Custom AI Prompt ដើម</label>
            <textarea
              rows={2}
              value={config.customPrompt}
              onChange={(e) => setConfig({ ...config, customPrompt: e.target.value })}
              className="w-full rounded-xl border border-border bg-secondary/50 p-3 text-xs text-foreground outline-none transition focus:border-primary"
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground shadow-md transition active:scale-95"
          >
            <Save className="h-4 w-4" />
            រក្សាទុកការកំណត់ (Save Config)
          </button>

          {saved && (
            <div className="flex items-center justify-center gap-1.5 rounded-xl bg-success/15 py-2 text-xs font-semibold text-success">
              <CheckCircle2 className="h-3.5 w-3.5" />
              បានរក្សាទុកដោយជោគជ័យ!
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
