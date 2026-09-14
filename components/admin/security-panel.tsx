"use client"

import { Lock, Save, CheckCircle2 } from "lucide-react"
import { AdminConfig } from "@/lib/admin-config"

interface SecurityPanelProps {
  config: AdminConfig
  setConfig: React.Dispatch<React.SetStateAction<AdminConfig>>
  onSave: (e: React.FormEvent) => void
  saved: boolean
}

export function SecurityPanel({ config, setConfig, onSave, saved }: SecurityPanelProps) {
  return (
    <form onSubmit={onSave} className="space-y-4 rounded-3xl border border-border bg-card p-5 shadow-sm animate-in fade-in slide-in-from-right-4 duration-200">
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <Lock className="h-4 w-4 text-primary" />
          Admin Passcode (លេខកូដសម្ងាត់ចូល)
        </label>
        <p className="text-[11px] text-muted-foreground">
          កូដនេះប្រើសម្រាប់ផ្ទៀងផ្ទាត់សិទ្ធិពេលចូលមកកាន់ផ្ទាំង Admin Dashboard របស់អ្នក។
        </p>
        <input
          type="text"
          value={config.adminPasscode}
          onChange={(e) => setConfig({ ...config, adminPasscode: e.target.value })}
          placeholder="@2000"
          className="w-full rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-xs font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
        />
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/25 transition active:scale-[0.99]"
      >
        <Save className="h-4 w-4" />
        រក្សាទុកលេខកូដ (Save Passcode)
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
