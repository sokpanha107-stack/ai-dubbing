"use client"

import { useState, useEffect } from "react"
import { SAVPD_CONSTANTS } from "@/lib/constants"
import { getAdminConfig, saveAdminConfig, type AdminConfig } from "@/lib/admin-config"
import { 
  ShieldAlert, Lock, KeyRound, Sparkles, 
  ChevronRight, ChevronLeft, ShieldCheck 
} from "lucide-react"
import { SecurityPanel } from "./security-panel"
import { ApiConfigPanel } from "./api-config-panel"
import { AiPromptPanel } from "./ai-prompt-panel"

type AdminMenuState = "main" | "security" | "apis" | "prompts"

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [config, setConfig] = useState<AdminConfig>({
    openaiApiKey: "",
    elevenlabsApiKey: "",
    translationApiKey: "",
    customPrompt: "",
    adminPasscode: "@2000",
  })
  const [saved, setSaved] = useState(false)
  const [activeMenu, setActiveMenu] = useState<AdminMenuState>("main")

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
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col bg-background">
      {/* Header */}
      <header
        className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-border/60 bg-background/90 px-4 py-3 backdrop-blur-md"
        style={{ paddingTop: "env(safe-area-inset-top, 0.75rem)" }}
      >
        {activeMenu === "main" ? (
          <>
            <h1 className="text-sm font-bold text-foreground flex items-center gap-1.5 truncate">
              🛡️ {SAVPD_CONSTANTS.BRAND.TRADEMARK} Admin
            </h1>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-xl bg-destructive/15 px-3 py-1.5 text-xs font-semibold text-destructive transition active:scale-95 shrink-0"
            >
              ចាកចេញ (Logout)
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setActiveMenu("main")}
              className="flex items-center gap-1 text-primary transition active:scale-95 text-xs font-semibold"
            >
              <ChevronLeft className="h-4 w-4" />
              ត្រឡប់ក្រោយ
            </button>
            <h2 className="text-xs font-bold text-foreground truncate">
              {activeMenu === "security" 
                ? "សុវត្ថិភាពប្រព័ន្ធ" 
                : activeMenu === "apis" 
                ? "ការគ្រប់គ្រង API Keys" 
                : "ការកំណត់ AI Prompt"}
            </h2>
            <div className="w-[60px]" />
          </>
        )}
      </header>
      
      {/* Content Area */}
      <div className="flex flex-1 flex-col gap-4 p-4 overflow-y-auto pb-10">
        
        {/* Status Banner */}
        {activeMenu === "main" && (
          <div className="flex items-center justify-between rounded-2xl bg-primary/10 border border-primary/20 p-3.5 text-xs font-semibold text-primary">
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4" />
              ប្រព័ន្ធសុវត្ថិភាពកម្រិតខ្ពស់សកម្ម
            </span>
            <span className="flex items-center gap-1 bg-primary/20 px-2.5 py-1 rounded-full text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              អនឡាញ
            </span>
          </div>
        )}

        {/* Main Menu Cards (ស្រដៀងនឹង Settings) */}
        {activeMenu === "main" && (
          <div className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm animate-in fade-in duration-200">
            
            {/* Security Menu */}
            <button
              onClick={() => setActiveMenu("security")}
              className="flex w-full items-center justify-between border-b border-border p-4 text-left transition hover:bg-secondary/50 active:bg-secondary"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                  <Lock className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="block font-semibold text-xs text-foreground">លេខកូដសម្ងាត់ Admin Passcode</span>
                  <span className="block text-[11px] text-muted-foreground mt-0.5">ប្តូរលេខកូដសុវត្ថិភាពចូលផ្ទាំង Admin</span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>

            {/* API Config Menu */}
            <button
              onClick={() => setActiveMenu("apis")}
              className="flex w-full items-center justify-between border-b border-border p-4 text-left transition hover:bg-secondary/50 active:bg-secondary"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  <KeyRound className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="block font-semibold text-xs text-foreground">ការកំណត់ API Keys</span>
                  <span className="block text-[11px] text-muted-foreground mt-0.5">OpenAI, ElevenLabs និង Translation API</span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>

            {/* AI Prompts Menu */}
            <button
              onClick={() => setActiveMenu("prompts")}
              className="flex w-full items-center justify-between p-4 text-left transition hover:bg-secondary/50 active:bg-secondary"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
                  <Sparkles className="h-4.5 w-4.5" />
                </div>
                <div>
                  <span className="block font-semibold text-xs text-foreground">Custom AI Prompt ដើម</span>
                  <span className="block text-[11px] text-muted-foreground mt-0.5">កំណត់ការបញ្ជាប្រព័ន្ធ AI សម្រេចចិត្ត</span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>

          </div>
        )}

        {/* Sub-panels */}
        {activeMenu === "security" && (
          <SecurityPanel config={config} setConfig={setConfig} onSave={handleSave} saved={saved} />
        )}

        {activeMenu === "apis" && (
          <ApiConfigPanel config={config} setConfig={setConfig} onSave={handleSave} saved={saved} />
        )}

        {activeMenu === "prompts" && (
          <AiPromptPanel config={config} setConfig={setConfig} onSave={handleSave} saved={saved} />
        )}

      </div>
    </div>
  )
}
