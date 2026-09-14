"use client"

import { Lock, Save, CheckCircle2, ShieldCheck, ScanFace, Fingerprint } from "lucide-react"
import { AdminConfig } from "@/lib/admin-config"

interface SecurityPanelProps {
  config: AdminConfig & { enableBiometric?: boolean }
  setConfig: React.Dispatch<React.SetStateAction<any>>
  onSave: (e: React.FormEvent) => void
  saved: boolean
}

export function SecurityPanel({ config, setConfig, onSave, saved }: SecurityPanelProps) {
  const isBiometricEnabled = config.enableBiometric ?? true

  return (
    <form onSubmit={onSave} className="space-y-4 rounded-3xl border border-border bg-card p-5 shadow-sm animate-in fade-in slide-in-from-right-4 duration-200">
      
      {/* Passcode Setting */}
      <div className="space-y-1.5">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <Lock className="h-4 w-4 text-primary" />
          Admin Passcode (លេខកូដសម្ងាត់ចូល)
        </label>
        <p className="text-[11px] text-muted-foreground">
          កូដនេះប្រើសម្រាប់ផ្ទៀងផ្ទាត់សិទ្ធិពេលចូលមកកាន់ផ្ទាំង Admin Dashboard របស់អ្នក (Auto-Unlock)។
        </p>
        <input
          type="text"
          value={config.adminPasscode}
          onChange={(e) => setConfig({ ...config, adminPasscode: e.target.value })}
          placeholder="@2000"
          className="w-full rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-xs font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
        />
      </div>

      {/* Biometric Toggle Switch (Face ID / Touch ID Enable/Disable) */}
      <div className="flex items-center justify-between rounded-2xl border border-border bg-secondary/30 p-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            មុខងារ Biometric (Face ID / ក្រយៅដៃ)
          </div>
          <p className="text-[10px] text-muted-foreground">
            បើក/បិទការប្រើប្រាស់ស្កេនមុខ ឬក្រយៅដៃនៅពេលចូល Admin Gate។
          </p>
        </div>
        
        <button
          type="button"
          onClick={() => setConfig({ ...config, enableBiometric: !isBiometricEnabled })}
          className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ease-in-out ${
            isBiometricEnabled ? "bg-primary" : "bg-muted"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-in-out ${
              isBiometricEnabled ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/25 transition active:scale-[0.99]"
      >
        <Save className="h-4 w-4" />
        រក្សាទុកការកំណត់សុវត្ថិភាព (Save Security)
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
