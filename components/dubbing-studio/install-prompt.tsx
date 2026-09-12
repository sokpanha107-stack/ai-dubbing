"use client"

import { Share, MoreVertical, Monitor, Smartphone, Download } from "lucide-react"
import { useDevice } from "@/hooks/use-device"

export function InstallPrompt() {
  const { os, isStandalone } = useDevice()

  if (isStandalone || os === "Unknown") return null

  return (
    <div className="mx-4 mb-6 mt-2 rounded-2xl border border-primary/30 bg-primary/10 p-4 shadow-sm animate-in fade-in slide-in-from-bottom-2">
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20 text-primary">
          {os === "iOS" || os === "Android" ? <Smartphone className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
        </span>
        <h3 className="text-sm font-bold text-foreground">Install App</h3>
      </div>
      
      <div className="text-[13px] leading-relaxed text-muted-foreground">
        {os === "iOS" && (
          <p className="flex items-center gap-1.5">
            Tap <Share className="h-3.5 w-3.5" /> (Share) and select <strong>Add to Home Screen</strong> for a faster experience.
          </p>
        )}
        {os === "Android" && (
          <p className="flex items-center gap-1.5">
            Tap <MoreVertical className="h-3.5 w-3.5" /> (Menu) and select <strong>Install App</strong> for a faster experience.
          </p>
        )}
        {(os === "macOS" || os === "Windows") && (
          <p className="flex items-center gap-1.5">
            Click <Download className="h-3.5 w-3.5" /> (Install) in your address bar to install on your computer.
          </p>
        )}
      </div>
    </div>
  )
}
