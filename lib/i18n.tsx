"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { GLOBAL_DICTIONARY, UI_LANGUAGES, type LangCode, type Strings } from "@/lib/locales-dict"

export { UI_LANGUAGES, type LangCode, type Strings }

type I18nContextValue = {
  lang: LangCode
  setLang: (lang: LangCode) => void
  t: Strings
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en")

  useEffect(() => {
    const saved = localStorage.getItem("savpd_lang") as LangCode
    if (saved && GLOBAL_DICTIONARY[saved]) {
      setLangState(saved)
    } else {
      setLangState("en")
      localStorage.setItem("savpd_lang", "en")
    }
  }, [])

  const setLang = (newLang: LangCode) => {
    setLangState(newLang)
    localStorage.setItem("savpd_lang", newLang)
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t: GLOBAL_DICTIONARY[lang] || GLOBAL_DICTIONARY["en"] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
