"use client"

import { DubbingStudio } from "@/components/dubbing-studio"
import { DubbingAssistant } from "@/components/dubbing-assistant"
import { I18nProvider } from "@/lib/i18n"

export default function Page() {
  return (
    <I18nProvider>
      <DubbingStudio />
      <DubbingAssistant />
    </I18nProvider>
  )
}
