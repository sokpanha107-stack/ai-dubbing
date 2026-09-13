"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Lock, Clapperboard, Settings } from "lucide-react"
import type { LangCode } from "@/lib/i18n"
import { SAVPD_CONSTANTS } from "@/lib/constants"
import { SharedSettings } from "./shared-settings"

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
  const [previewSettingsOpen, setPreviewSettingsOpen] = useState(false)
  const [passcode, setPasscode] = useState("")
  const [error, setError] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [fadeSplash, setFadeSplash] = useState(false)

  const [adminModalOpen, setAdminModalOpen] = useState(false)
  const [adminPassword, setAdminPassword] = useState("")
  const [adminError, setAdminError] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeSplash(true)
      setTimeout(() => setShowSplash(false), 500)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode === "@2000") {
      onLoginSuccess()
    } else {
      setError(true)
    }
  }

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminPassword === "@2000") {
      onLoginSuccess()
      setAdminModalOpen(false)
    } else {
      setAdminError(true)
    }
  }

  if (showSplash) {
    return (
      <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ease-in-out ${fadeSplash ? "opacity-0" : "opacity-100"}`}>
        <div className="relative h-28 w-28 animate-pulse overflow-hidden rounded-3xl bg-transparent">
          <Image src="/icon-512.png" alt={`${SAVPD_CONSTANTS.BRAND.TRADEMARK} Logo`} fill className="logo-clean-mask" priority />
        </div>
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground animate-in slide-in-from-bottom-4 duration-700">
          {SAVPD_CONSTANTS.BRAND.TRADEMARK}
        </h1>
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col justify-between bg-background p-4 relative animate-in fade-in zoom-in-[0.98] duration-700">
      <header className="flex items-center justify-between border-b border-border/60 bg-background/80 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Clapperboard className="h-5 w-5" />
          </span>
          <span className="text-base font-bold tracking-tight text-foreground">{SAVPD_CONSTANTS.BRAND.TRADEMARK}</span>
        </div>
        <button type="button" onClick={() => setPreviewSettingsOpen(true)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary/60 text-foreground transition active:scale-95">
          <Settings className="h-4.5 w-4.5" />
        </button>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-sm rounded-3xl border border-border bg-card/80 p-6 shadow-xl backdrop-blur-md">
          <div className="mb-6 text-center">
            <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-inner">
              <Lock className="h-6 w-6" />
            </span>
            <h2 className="text-lg font-bold text-foreground">{t.securityTitle}</h2>
            <p className="mt-1 text-xs text-muted-foreground">{t.securityDesc}</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => { setPasscode(e.target.value); setError(false); }}
                className="w-full rounded-2xl border border-border bg-secondary/60 px-4 py-3.5 text-center text-base font-semibold text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
              />
              {error && <p className="mt-2 text-center text-xs font-medium text-destructive">{t.invalidPasscode}</p>}
            </div>
            <button type="submit" className="w-full rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition active:scale-[0.99]">
              {t.accessSystem}
            </button>
          </form>
        </div>
      </div>

      <div className="pb-4 pt-2 text-center">
        <p className="text-[11px] text-muted-foreground">© 2026 {SAVPD_CONSTANTS.BRAND.TRADEMARK}. All rights reserved.</p>
      </div>

      <SharedSettings 
        isOpen={previewSettingsOpen} 
        onClose={() => setPreviewSettingsOpen(false)} 
        onAdminClick={() => {
          setPreviewSettingsOpen(false)
          setAdminModalOpen(true)
          setAdminPassword("")
          setAdminError(false)
        }}
      />

      {adminModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl border border-border bg-card p-6 shadow-2xl">
            <h3 className="text-base font-bold text-foreground mb-4">Master Key</h3>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Password"
                value={adminPassword}
                onChange={(e) => { setAdminPassword(e.target.value); setAdminError(false); }}
                className="w-full rounded-2xl border border-border bg-secondary/60 px-4 py-3.5 text-sm font-semibold text-foreground outline-none focus:border-primary"
                autoFocus
              />
              {adminError && <p className="text-xs text-destructive">Invalid Password</p>}
              <button type="submit" className="w-full rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground">
                Login Admin
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
