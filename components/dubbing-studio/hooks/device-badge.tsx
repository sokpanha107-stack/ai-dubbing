"use client"

import { Smartphone, Monitor, Tablet, Sparkles } from "lucide-react"
import { useDevice } from "@/hooks/use-device"

export function DeviceBadge() {
  const { deviceType, modelName, browser } = useDevice()

  return (
    <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-border/80 bg-secondary/50 px-3.5 py-1.5 text-[11px] text-muted-foreground backdrop-blur-sm animate-in fade-in zoom-in duration-700 delay-300 fill-mode-both">
      <span className="text-primary">
        {deviceType === "mobile" && <Smartphone className="h-3.5 w-3.5" />}
        {deviceType === "tablet" && <Tablet className="h-3.5 w-3.5" />}
        {deviceType === "desktop" && <Monitor className="h-3.5 w-3.5" />}
      </span>
      <span>
        កំពុងប្រើ៖ <strong className="font-semibold text-foreground">{modelName}</strong>
      </span>
      <Sparkles className="h-3 w-3 text-primary/70" />
    </div>
  )
}
