import en from "@/locales/en.json"
import km from "@/locales/km.json"

// បញ្ជីភាសាគាំទ្រទាំងអស់ក្នុងប្រព័ន្ធ
export const UI_LANGUAGES = [
  { code: "en", native: "English", flag: "🇬🇧" },
  { code: "km", native: "ភាសាខ្មែរ", flag: "🇰🇭" },
  { code: "zh", native: "中文", flag: "🇨🇳" },
  { code: "th", native: "ไทย", flag: "🇹🇭" },
  { code: "vi", native: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ja", native: "日本語", flag: "🇯🇵" },
  { code: "ko", native: "한국어", flag: "🇰🇷" },
  { code: "hi", native: "हिन्दी", flag: "🇮🇳" },
  { code: "es", native: "Español", flag: "🇪🇸" },
  { code: "fr", native: "Français", flag: "🇫🇷" },
  { code: "de", native: "Deutsch", flag: "🇩🇪" },
  { code: "id", native: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "pt", native: "Português", flag: "🇧🇷" },
  { code: "ru", native: "Русский", flag: "🇷🇺" },
  { code: "ar", native: "العربية", flag: "🇸🇦" },
  { code: "it", native: "Italiano", flag: "🇮🇹" },
  { code: "tr", native: "Türkçe", flag: "🇹🇷" },
  { code: "ph", native: "Filipino", flag: "🇵🇭" },
  { code: "ms", native: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "bn", native: "বাংলা", flag: "🇧🇩" },
] as const

export type LangCode = typeof UI_LANGUAGES[number]["code"]

// ឃ្លាំងផ្ទុកទិន្នន័យ JSON តាមភាសា
const dictionaries: Record<string, any> = {
  en,
  km,
  // ថ្ងៃក្រោយបើមាន zh.json ឬ th.json គ្រាន់តែ Import មកដាក់ទីនេះដុះពន្លកអូតូ!
}

// មុខងារទាញយកអក្សរតាមភាសា (មានប្រព័ន្ធ Auto-Fallback ទៅ English ស្វ័យប្រវត្ត ការពារ App គាំង)
export function getDictionary(locale: string) {
  const selected = dictionaries[locale] || dictionaries.en
  const fallback = dictionaries.en

  return {
    ...fallback,
    ...selected,
    dubbingOptions: selected?.dubbingOptions || fallback.dubbingOptions,
  }
}
