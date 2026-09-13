import { SAVPD_CONSTANTS } from "@/lib/constants"

// ១. បញ្ជីភាសាដុះពន្លក (ចង់ថែមភាសាអី គ្រាន់តែថែមត្រង់នេះ១បន្ទាត់)
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

export type DubbingOptionItem = {
  id: string
  title: string
  desc: string
}

// ២. រចនាសម្ព័ន្ធទិន្នន័យអក្សរ
export type Strings = {
  appTitle: string
  appSubtitle: string
  settings: string
  appLanguage: string
  dubbingOptions: DubbingOptionItem[]
  [key: string]: any
}

// ៣. Global Dictionary (ឃ្លាំងកណ្ដាលបែប Minimalist)
const DICTIONARY: Record<string, Partial<Strings>> = {
  en: {
    appTitle: SAVPD_CONSTANTS.BRAND.TRADEMARK,
    appSubtitle: "Translate and dub your videos into another language with AI in a few easy steps.",
    settings: "Settings",
    appLanguage: "App language",
    dubbingOptions: [
      { id: "opt1", title: "Option 1: Clean Voiceover", desc: "Best for personal Vlogs & natural speech." },
      { id: "opt2", title: "Option 2: Summary & SFX", desc: "Best for Recap videos & storytelling." },
      { id: "opt3", title: "Option 3: Cinematic Dubbing", desc: "Best for Movies & character acting." },
      { id: "opt4", title: "Option 4: AI Visual Storyteller", desc: "Best for Auto-Script & visual storytelling." },
    ],
  },
  km: {
    appTitle: SAVPD_CONSTANTS.BRAND.TRADEMARK,
    appSubtitle: "បកប្រែ និងបញ្ចូលសំឡេងវីដេអូរបស់អ្នកទៅជាភាសាផ្សេងៗ ដោយប្រើ AI ក្នុងពេលបីជំហានងាយៗ",
    settings: "ការកំណត់",
    appLanguage: "ភាសាកម្មវិធី",
    dubbingOptions: [
      { id: "opt1", title: "Option 1: Clean Voiceover (Vlog Mode)", desc: "សាកសមបំផុតសម្រាប់វីដេអូ Vlog ផ្ទាល់ខ្លួន ឬការថតនិយាយធម្មតា។" },
      { id: "opt2", title: "Option 2: Summary & SFX (Recap)", desc: "សាកសមសម្រាប់វីដេអូសង្ខេបសាច់រឿង (Recap) និងការរៀបរាប់។" },
      { id: "opt3", title: "Option 3: Cinematic Character Dubbing", desc: "សាកសមសម្រាប់ភាពយន្ត (Movies) និងការបញ្ចូលសំឡេងតួអង្គ។" },
      { id: "opt4", title: "Option 4: AI Visual Storyteller (Auto-Script)", desc: "សាកសមសម្រាប់ការបង្កើតសាច់រឿងស្វ័យប្រវត្ត (Auto-Script)។" },
    ],
  },
}

// ៤. មុខងារទាញយកអក្សរអូតូឆ្លាតវៃ (Smart Auto-Fallback Lookup)
export function getDictionary(lang: LangCode): Strings {
  const selectedLang = DICTIONARY[lang] || {}
  const fallbackLang = DICTIONARY["en"]

  return {
    ...fallbackLang,
    ...selectedLang,
    dubbingOptions: selectedLang.dubbingOptions || fallbackLang.dubbingOptions,
  } as Strings
}
