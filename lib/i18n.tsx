"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { SAVPD_CONSTANTS } from "@/lib/constants"

export type LangCode = 
  | "en" | "zh" | "km" | "th" | "vi"
  | "ja" | "ko" | "hi" | "es" | "fr"
  | "de" | "id" | "pt" | "ru" | "ar"
  | "it" | "tr" | "ph" | "ms" | "bn"

export const UI_LANGUAGES: { code: LangCode; native: string; flag: string }[] = [
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
]

type DubbingOptionInfo = {
  title: string
  desc: string
}

type Strings = {
  appTitle: string
  appSubtitle: string
  footer: string
  settings: string
  appLanguage: string
  displayMode: string
  securityTitle: string
  securityDesc: string
  passcodePlaceholder: string
  invalidPasscode: string
  accessSystem: string
  step1: string
  dropText: string
  dropHint: string
  noLimit: string
  delete: string
  step2: string
  selectTargetLangTitle: string
  sourceLabel: string
  targetLabel: string
  swap: string
  start: string
  processing: string
  stages: [string, string, string, string, string]
  doneTitle: string
  doneSubtitle: string
  download: string
  retry: string
  autopilotTitle: string
  autopilotDesc: string
  contextTitle: string
  contextDesc: string
  emotionTitle: string
  emotionDesc: string
  paceTitle: string
  paceDesc: string
  featuresHeading: string
  languages: Record<LangCode, string>
  appearance: string
  darkMode: string
  lightMode: string
  eyeCare: string
  eyeCareDesc: string
  eyeCareLevel: string
  assistant: string
  assistantOpen: string
  assistantTitle: string
  assistantSubtitle: string
  assistantGreeting: string
  assistantPlaceholder: string
  assistantSend: string
  assistantVoice: string
  assistantListening: string
  assistantRefusal: string
  assistantSuggestions: [string, string, string]
  // 🌟 Option សម្រាប់ការបកប្រែរបៀប Dubbing
  dubbingOptions: {
    opt1: DubbingOptionInfo
    opt2: DubbingOptionInfo
    opt3: DubbingOptionInfo
    opt4: DubbingOptionInfo
  }
}

const ALL_LANGUAGES_EN = {
  en: "English", zh: "Chinese", km: "Khmer", th: "Thai", vi: "Vietnamese",
  ja: "Japanese", ko: "Korean", hi: "Hindi", es: "Spanish", fr: "French",
  de: "German", id: "Indonesian", pt: "Portuguese", ru: "Russian", ar: "Arabic",
  it: "Italian", tr: "Turkish", ph: "Filipino", ms: "Malay", bn: "Bengali"
}

const ALL_LANGUAGES_KM = {
  en: "អង់គ្លេស", zh: "ចិន", km: "ខ្មែរ", th: "ថៃ", vi: "វៀតណាម",
  ja: "ជប៉ុន", ko: "កូរ៉េ", hi: "ហិណ្ឌូ", es: "អេស្ប៉ាញ", fr: "បារាំង",
  de: "អាល្លឺម៉ង់", id: "ឥណ្ឌូណេស៊ី", pt: "ព័រទុយហ្កាល់", ru: "រុស្ស៊ី", ar: "អារ៉ាប់",
  it: "អ៊ីតាលី", tr: "ទួរគី", ph: "ហ្វីលីពីន", ms: "ម៉ាឡេ", bn: "បង់ក្លាដែស"
}

const EN_STRINGS: Strings = {
  appTitle: SAVPD_CONSTANTS.BRAND.TRADEMARK,
  appSubtitle: "Translate and dub your videos into another language with AI in a few easy steps.",
  footer: `Built for personal use · ${SAVPD_CONSTANTS.BRAND.NAME} Tool`,
  settings: "Settings",
  appLanguage: "App language",
  displayMode: "Display Mode",
  securityTitle: "System Security",
  securityDesc: "Please enter passcode to access workspace",
  passcodePlaceholder: "Enter passcode",
  invalidPasscode: "Invalid passcode!",
  accessSystem: "Access System",
  step1: "Choose or drop your video",
  dropText: "Drag and drop a file here, or click to select",
  dropHint: "MP4, MOV, WEBM and more",
  noLimit: "No duration or size limit",
  delete: "Remove",
  step2: "Choose languages",
  selectTargetLangTitle: "Select Target Language (for Dubbing)",
  sourceLabel: "Source language",
  targetLabel: "Target language",
  swap: "Swap languages",
  start: "Start translating & dubbing",
  processing: "AI dubbing in progress...",
  stages: [
    "Extracting audio from video",
    "Transcribing speech to text",
    "Translating with context guard",
    "Cloning voice with emotion & tone",
    "Merging audio into video",
  ],
  doneTitle: "All done!",
  doneSubtitle: "Your video has been dubbed into",
  download: "Download video",
  retry: "Start over",
  autopilotTitle: "Smart AI Auto-Pilot",
  autopilotDesc: "Fully automatic — no manual editing needed.",
  contextTitle: "Context Guard",
  contextDesc: "Meaning, phrasing and numbers stay accurate across all 20 languages.",
  emotionTitle: "Emotion & Tone",
  emotionDesc: "Laughter, anger, fear and joy are preserved from the original.",
  paceTitle: "Pace & Rhythm",
  paceDesc: "Speech speed stays in sync with the original video.",
  featuresHeading: "AI capabilities",
  languages: ALL_LANGUAGES_EN,
  appearance: "Appearance",
  darkMode: "Dark mode",
  lightMode: "Light mode",
  eyeCare: "Eye care (blue light filter)",
  eyeCareDesc: "Warm filter to reduce eye strain at night.",
  eyeCareLevel: "Filter strength",
  assistant: "AI Assistant",
  assistantOpen: "Open AI assistant",
  assistantTitle: "Dubbing Assistant",
  assistantSubtitle: "Ask about how to use this app",
  assistantGreeting: `Hi! I'm your AI Dubbing assistant. I can only help with questions about this ${SAVPD_CONSTANTS.BRAND.NAME} app — how to upload, choose languages, and use Auto-Pilot. How can I help?`,
  assistantPlaceholder: "Ask about the app...",
  assistantSend: "Send",
  assistantVoice: "Ask by voice",
  assistantListening: "Listening...",
  assistantRefusal: `Sorry! I can only answer questions related to the technology and use of this ${SAVPD_CONSTANTS.BRAND.NAME} app.`,
  assistantSuggestions: [
    "How do I start Auto-Pilot?",
    "Which languages are supported?",
    "Does it keep the original emotion?",
  ],
  dubbingOptions: {
    opt1: { title: "Option 1: Clean Voiceover", desc: "Best for personal Vlogs & natural speech." },
    opt2: { title: "Option 2: Summary & SFX", desc: "Best for Recap videos & storytelling." },
    opt3: { title: "Option 3: Cinematic Character Dubbing", desc: "Best for Movies & character acting." },
    opt4: { title: "Option 4: AI Visual Storyteller", desc: "Best for Auto-Script & visual storytelling." },
  },
}

export const TRANSLATIONS: Record<LangCode, Strings> = {
  en: EN_STRINGS,
  zh: {
    ...EN_STRINGS,
    dubbingOptions: {
      opt1: { title: "选项 1：纯净配音 (Vlog 模式)", desc: "最适合个人 Vlog 和自然语音讲解。" },
      opt2: { title: "选项 2：摘要与特效 (解说模式)", desc: "最适合视频总结 (Recap) 与故事讲述。" },
      opt3: { title: "选项 3：电影级角色配音", desc: "最适合电影、短剧与角色配音。" },
      opt4: { title: "选项 4：AI 视觉讲故事 (自动脚本)", desc: "最适合自动生成脚本与视觉叙事。" },
    },
  },
  km: {
    ...EN_STRINGS,
    appSubtitle: "បកប្រែ និងបញ្ចូលសំឡេងវីដេអូរបស់អ្នកទៅជាភាសាផ្សេងៗ ដោយប្រើ AI ក្នុងពេលបីជំហានងាយៗ",
    footer: `បង្កើតឡើងសម្រាប់ការប្រើប្រាស់ផ្ទាល់ខ្លួន · ${SAVPD_CONSTANTS.BRAND.NAME} Tool`,
    settings: "ការកំណត់",
    appLanguage: "ភាសាកម្មវិធី",
    displayMode: "ការបង្ហាញ",
    securityTitle: "សុវត្ថិភាពប្រព័ន្ធ",
    securityDesc: "សូមបញ្ចូលលេខកូដសម្ងាត់ដើម្បីចូលទៅកាន់ផ្ទាំងការងារ",
    passcodePlaceholder: "បញ្ចូលលេខកូដ",
    invalidPasscode: "លេខកូដមិនត្រឹមត្រូវ!",
    accessSystem: "ចូលទៅកាន់កម្មវិធី",
    step1: "ជ្រើសរើស ឬទម្លាក់វីដេអូរបស់អ្នក",
    dropText: "អូសទម្លាក់ឯកសារនៅទីនេះ ឬចុចដើម្បីជ្រើសរើស",
    dropHint: "MP4, MOV, WEBM និងច្រើនទៀត",
    noLimit: "មិនកំណត់រយៈពេល ឬទំហំ",
    delete: "លុប",
    step2: "ជ្រើសរើសភាសា",
    selectTargetLangTitle: "ជ្រើសរើសភាសាគោលដៅ (សម្រាប់បញ្ចូលសំឡេង)",
    sourceLabel: "ភាសាដើម",
    targetLabel: "ភាសាគោលដៅ",
    swap: "ប្តូរភាសា",
    start: "ចាប់ផ្តើមបកប្រែ និងបញ្ចូលសំឡេង",
    processing: "កំពុងដំណើរការ AI Dubbing...",
    stages: [
      "កំពុងបំបែកសំឡេងចេញពីវីដេអូ",
      "កំពុងបំប្លែងសំឡេងទៅជាអក្សរ",
      "កំពុងបកប្រែដោយការពារបរិបទ",
      "កំពុងក្លូនសំឡេងជាមួយអារម្មណ៍ និងទឹកដម",
      "កំពុងផ្សំសំឡេងចូលវីដេអូ",
    ],
    doneTitle: "ដំណើរការបានរួចរាល់ហើយ!",
    doneSubtitle: "វីដេអូរបស់អ្នកត្រូវបានបញ្ចូលសំឡេងជា",
    download: "ទាញយកវីដេអូ",
    retry: "ធ្វើម្តងទៀត",
    autopilotTitle: "AI ស្វ័យប្រវត្តិឆ្លាតវៃ",
    autopilotDesc: "ដំណើរការស្វ័យប្រវត្តិ ១០០% — មិនបាច់កែដោយដៃ។",
    contextTitle: "ការពារបរិបទ",
    contextDesc: "អត្ថន័យ ឃ្លា និងលេខ នៅតែត្រឹមត្រូវគ្រប់ភាសាទាំង ២០។",
    emotionTitle: "អារម្មណ៍ និងទឹកដម",
    emotionDesc: "សំណើច ការខឹង ការភ័យ និងសេចក្តីរីករាយ ត្រូវបានរក្សាទុកពីដើម។",
    paceTitle: "ល្បឿន និងចង្វាក់",
    paceDesc: "ល្បឿននិយាយ នៅតែស៊ីសង្វាក់គ្នាជាមួយវីដេអូដើម។",
    featuresHeading: "សមត្ថភាព AI",
    languages: ALL_LANGUAGES_KM,
    appearance: "រូបរាង",
    darkMode: "ផ្ទាំងពណ៌ខ្មៅ (ពេលយប់)",
    lightMode: "ផ្ទាំងពណ៌ស (ពេលថ្ងៃ)",
    eyeCare: "ការពារភ្នែក (តម្រងពន្លឺខៀវ)",
    eyeCareDesc: "តម្រងពណ៌ក្តៅ ដើម្បីកាត់បន្ថយការចាំងភ្នែកពេលយប់ជ្រៅ។",
    eyeCareLevel: "កម្រិតតម្រង",
    assistant: "ជំនួយការ AI",
    assistantOpen: "បើកជំនួយការ AI",
    assistantTitle: "ជំនួយការបញ្ចូលសំឡេង",
    assistantSubtitle: "សួរអំពីរបៀបប្រើ App នេះ",
    assistantGreeting: `សួស្តី! ខ្ញុំជាជំនួយការ AI របស់អ្នក។ ខ្ញុំអាចជួយបានតែសំណួរអំពី App ${SAVPD_CONSTANTS.BRAND.NAME} នេះប៉ុណ្ណោះ — របៀបអាប់ឡូត ជ្រើសរើសភាសា និងប្រើ Auto-Pilot។ តើខ្ញុំអាចជួយអ្វីបាន?`,
    assistantPlaceholder: "សួរអំពី App នេះ...",
    assistantSend: "ផ្ញើ",
    assistantVoice: "សួរដោយសំឡេង",
    assistantListening: "កំពុងស្តាប់...",
    assistantRefusal: `សូមអភ័យទោស! ខ្ញុំអាចជួយឆ្លើយតបបានតែព័ត៌មានដែលពាក់ព័ន្ធនឹងបច្ចេកវិទ្យា និងการប្រើប្រាស់ App ${SAVPD_CONSTANTS.BRAND.NAME} នេះប៉ុណ្ណោះ។`,
    assistantSuggestions: [
      "តើខ្ញុំចាប់ផ្តើម Auto-Pilot យ៉ាងដូចម្តេច?",
      "តើ App គាំទ្រភាសាអ្វីខ្លះ?",
      "តើវារក្សាអារម្មណ៍ដើមទេ?",
    ],
    dubbingOptions: {
      opt1: { 
        title: "Option 1: Clean Voiceover (Vlog Mode)", 
        desc: "សាកសមបំផុតសម្រាប់វីដេអូ Vlog ផ្ទាល់ខ្លួន ឬការថតនិយាយធម្មតាដោយរក្សាសម្លេងដើមច្បាស់ល្អ។" 
      },
      opt2: { 
        title: "Option 2: Summary & SFX (Recap)", 
        desc: "សាកសមសម្រាប់វីដេអូ សង្ខេបសាច់រឿង (Recap), ការเล่าเรื่อง ឬកាត់តបែបរំលេចសំឡេងពិសេស (SFX)។" 
      },
      opt3: { 
        title: "Option 3: Cinematic Character Dubbing", 
        desc: "សាកសមសម្រាប់វីដេអូ ភាពយន្ត (Movies) ឬតួអង្គសម្ដែង ដែលត្រូវការប្ដូរសម្លេងបែបស៊ីនេម៉ា (Cinematic)។" 
      },
      opt4: { 
        title: "Option 4: AI Visual Storyteller (Auto-Script)", 
        desc: "សាកសមសម្រាប់វីដេអូ បង្កើតសាច់រឿងស្វ័យប្រវត្ត (Auto-Script) តាមរយៈ AI Visual។" 
      },
    },
  },
  th: {
    ...EN_STRINGS,
    dubbingOptions: {
      opt1: { title: "Option 1: Clean Voiceover (Vlog Mode)", desc: "เหมาะสำหรับวิดีโอ Vlog ส่วนตัวและการพูดคุยที่เป็นธรรมชาติ" },
      opt2: { title: "Option 2: Summary & SFX (Recap)", desc: "เหมาะสำหรับวิดีโอสรุปเนื้อหา (Recap) และการเล่าเรื่องพร้อมเอฟเฟกต์เสียง" },
      opt3: { title: "Option 3: Cinematic Character Dubbing", desc: "เหมาะสำหรับภาพยนตร์และการพากย์เสียงตัวละครแบบภาพยนตร์" },
      opt4: { title: "Option 4: AI Visual Storyteller (Auto-Script)", desc: "เหมาะสำหรับการสร้างสคริปต์อัตโนมัติและการเล่าเรื่องด้วยภาพ" },
    },
  },
  vi: {
    ...EN_STRINGS,
    dubbingOptions: {
      opt1: { title: "Option 1: Clean Voiceover (Vlog Mode)", desc: "Tốt nhất cho Vlog cá nhân và giọng nói tự nhiên." },
      opt2: { title: "Option 2: Summary & SFX (Recap)", desc: "Tốt nhất cho video tóm tắt (Recap) và kể chuyện." },
      opt3: { title: "Option 3: Cinematic Character Dubbing", desc: "Tốt nhất cho phim ảnh và lồng tiếng nhân vật." },
      opt4: { title: "Option 4: AI Visual Storyteller (Auto-Script)", desc: "Tốt nhất cho tự động tạo kịch bản và kể chuyện trực quan." },
    },
  },
  ja: { ...EN_STRINGS },
  ko: { ...EN_STRINGS },
  hi: { ...EN_STRINGS },
  es: { ...EN_STRINGS },
  fr: { ...EN_STRINGS },
  de: { ...EN_STRINGS },
  id: { ...EN_STRINGS },
  pt: { ...EN_STRINGS },
  ru: { ...EN_STRINGS },
  ar: { ...EN_STRINGS },
  it: { ...EN_STRINGS },
  tr: { ...EN_STRINGS },
  ph: { ...EN_STRINGS },
  ms: { ...EN_STRINGS },
  bn: { ...EN_STRINGS },
}

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
    if (saved && TRANSLATIONS[saved]) {
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
    <I18nContext.Provider value={{ lang, setLang, t: TRANSLATIONS[lang] || TRANSLATIONS["en"] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
