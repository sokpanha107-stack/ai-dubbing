"use client"

import { Sparkles, Save, CheckCircle2 } from "lucide-react"
import { AdminConfig } from "@/lib/admin-config"

interface AiPromptPanelProps {
  config: AdminConfig
  setConfig: React.Dispatch<React.SetStateAction<AdminConfig>>
  onSave: (e: React.FormEvent) => void
  saved: boolean
}

export function AiPromptPanel({ config, setConfig, onSave, saved }: AiPromptPanelProps) {
  return (
    <form onSubmit={onSave} className="space-y-4 rounded-3xl border border-border bg-card p-5 shadow-sm animate-in fade-in slide-in-from-right-4 duration-200">
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <Sparkles className="h-4 w-4 text-primary" />
          Custom AI Prompt ដើម (Global System Prompt)
        </label>
        <p className="text-[11px] text-muted-foreground">
          กำหนดការបញ្ជា (Prompt) សម្រាប់ឱ្យ AI សម្រេចចិត្តលើការបកប្រែ រក្សាបរិបទ និងទឹកដមសំឡេងទូទាំងកម្មវិធី។
        </p>
        <textarea
          rows={4}
          value={config.customPrompt}
          onChange={(e) => setConfig({ ...config, customPrompt: e.target.value })}
          placeholder="Translate and dub accurately, maintaining cinematic emotion and pace sync."
          className="w-full rounded-2xl border border-border bg-secondary/50 p-4 text-xs font-mono text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
        />
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/25 transition active:scale-[0.99]"
      >
        <Save className="h-4 w-4" />
        រក្សាទុក Prompt (Save Prompt)
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
