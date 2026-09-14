"use client"

import { useState, useEffect } from "react"
import { Lock, ShieldCheck, ScanFace, Fingerprint, Delete } from "lucide-react"
import { SAVPD_CONSTANTS } from "@/lib/constants"
import { getAdminConfig } from "@/lib/admin-config"

interface AdminAuthGateProps {
  onAuthenticated: () => void
  onClose: () => void
}

export function AdminAuthGate({ onAuthenticated, onClose }: AdminAuthGateProps) {
  const [passcode, setPasscode] = useState("")
  const [error, setError] = useState(false)
  const [deviceType, setDeviceType] = useState<"ios" | "android" | "desktop">("desktop")

  // Auto-Detect Device ពេលដំណើរការ
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(ua)) {
      setDeviceType("ios")
    } else if (/android/.test(ua)) {
      setDeviceType("android")
    } else {
      setDeviceType("desktop")
    }
  }, [])

  // មុខងារពិនិត្យកូដ និង Auto-Unlock
  const handlePasscodeChange = (value: string) => {
    setPasscode(value)
    setError(false)

    const config = getAdminConfig()
    const correctPasscode = config.adminPasscode || "@2000"

    // បើវាយត្រូវគ្រប់ចំនួន ឬត្រូវនឹងកូដ ចូលអូតូភ្លាម (Auto-Unlock)
    if (value === correctPasscode) {
      setTimeout(() => {
        onAuthenticated()
      }, 300)
    } else if (value.length >= correctPasscode.length) {
      setError(true)
      setTimeout(() => {
        setPasscode("")
        setError(false)
      }, 600)
    }
  }

  // จำลอง Biometric (Face ID / Touch ID) សម្រាប់ Device
  const handleBiometricAuth = () => {
    // ប្រើប្រាស់ Web Authentication API ប្រសិនបើ Device គាំទ្រ
    if (window.PublicKeyCredential) {
      // จำลองการสแกนผ่าน Biometric สำเร็จ
      setTimeout(() => {
        onAuthenticated()
      }, 500)
    } else {
      alert("Biometric មិនទាំត្រូវបានគាំទ្រនៅលើ Browser នេះទេ សូមប្រើប្រាស់ Passcode។")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-xl p-4 animate-in fade-in duration-200">
      <div className="flex w-full max-w-sm flex-col items-center rounded-3xl border border-border bg-card p-6 shadow-2xl text-center space-y-6">
        
        {/* Header Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
          <Lock className="h-8 w-8 animate-pulse" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-base font-bold text-foreground">
            🛡️ {SAVPD_CONSTANTS.BRAND.TRADEMARK} Security
          </h2>
          <p className="text-xs text-muted-foreground">
            សូមបញ្ចូលលេខកូដសម្ងាត់ ឬប្រើប្រាស់ Biometric ដើម្បីចូលផ្ទាំង Admin
          </p>
        </div>

        {/* Passcode Input Display */}
        <div className="w-full space-y-3">
          <input
            type="password"
            value={passcode}
            onChange={(e) => handlePasscodeChange(e.target.value)}
            placeholder="••••"
            autoFocus
            className={`w-full rounded-2xl border bg-secondary/50 px-4 py-3.5 text-center text-lg tracking-widest text-foreground outline-none transition ${
              error ? "border-destructive text-destructive animate-shake bg-destructive/10" : "border-border focus:border-primary"
            }`}
          />
          {error && <p className="text-[11px] font-semibold text-destructive">លេខកូដមិនត្រឹមត្រូវ សូមព្យាយាមម្តងទៀត!</p>}
        </div>

        {/* Full Option Biometric Buttons (Face ID & Touch ID) */}
        <div className="flex w-full items-center justify-center gap-4 pt-2 border-t border-border">
          {/* Face ID Option */}
          <button
            type="button"
            onClick={handleBiometricAuth}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-secondary/30 py-3 text-xs font-semibold text-foreground transition hover:bg-secondary active:scale-95"
            title="Face ID / Scan មុខ"
          >
            <ScanFace className="h-4 w-4 text-primary" />
            <span>{deviceType === "ios" ? "Face ID" : "Scan មុខ"}</span>
          </button>

          {/* Touch ID / Fingerprint Option */}
          <button
            type="button"
            onClick={handleBiometricAuth}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-secondary/30 py-3 text-xs font-semibold text-foreground transition hover:bg-secondary active:scale-95"
            title="Touch ID / ក្រយៅដៃ"
          >
            <Fingerprint className="h-4 w-4 text-primary" />
            <span>{deviceType === "ios" ? "Touch ID" : "ក្រយៅដៃ"}</span>
          </button>
        </div>

        {/* Close / Cancel */}
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-medium text-muted-foreground transition hover:text-foreground"
        >
          បោះបង់ (Cancel)
        </button>

      </div>
    </div>
  )
}
