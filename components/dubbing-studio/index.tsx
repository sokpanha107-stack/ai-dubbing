"use client"

import { useState } from "react"
import { Lock, Settings, Clapperboard } from "lucide-react"
import { SAVPD_CONSTANTS } from "@/lib/constants"
import { InstallPrompt } from "./install-prompt"

interface PreviewScreenProps {
  t: any
  lang: string
  setLang: (lang: string) => void
  onLoginSuccess: () => void
}

export function PreviewScreen({ t, lang, setLang, onLoginSuccess }: PreviewScreenProps) {
  const [passcode, setPasscode] = useState("")
  const [error, setError] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode === "@2000") {
      onLoginSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col bg-background">
      <header
        className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur-xl"
        style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Clapperboard className="h-5 w-5" />
          </span>
          <span className="text-sm font-bold leading-tight text-foreground">
            {SAVPD_CONSTANTS.BRAND.TRADEMARK}
          </span>
        </div>
        <button
          type="button"
          aria-label="Settings"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-secondary/60 text-foreground transition active:scale-95"
        >
          <Settings className="h-4.5 w-4.5" />
        </button>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        <div className="w-full rounded-3xl border border-border bg-card p-6 shadow-2xl mb-6">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Lock className="h-6 w-6" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-foreground">System Security</h2>
            <p className="text-sm text-muted-foreground">Please enter passcode to access workspace</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter passcode (e.g. @2000)"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value)
                  setError(false)
                }}
                className="w-full rounded-2xl border border-border bg-secondary/60 px-4 py-3.5 text-center text-sm font-semibold text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/40"
              />
              {error && (
                <p className="mt-2 text-center text-xs font-medium text-destructive">
                  Invalid passcode!
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition active:scale-[0.99]"
            >
              Access System
            </button>
          </form>
        </div>

        <div className="w-full max-w-sm">
          <InstallPrompt />
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          © 2026 {SAVPD_CONSTANTS.BRAND.STUDIO}. All rights reserved.
        </p>
      </main>
    </div>
  )
}
