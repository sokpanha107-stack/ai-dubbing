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
  selectTargetLangTitle: string // 🌟 ពាក្យថ្មីសម្រាប់ចំណងជើងជ្រើសរើសភាសាគោលដៅបកប្រែ
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
}

export const TRANSLATIONS: Record<LangCode, Strings> = {
  en: EN_STRINGS,
  zh: {
    ...EN_STRINGS,
    appSubtitle: "只需几个简单步骤，使用 AI 将您的视频翻译并配音成另一种语言。",
    footer: `为个人使用而打造 · ${SAVPD_CONSTANTS.BRAND.NAME} 工具`,
    settings: "设置",
    appLanguage: "应用语言",
    displayMode: "显示模式",
    securityTitle: "系统安全",
    securityDesc: "请输入密码以访问工作区",
    passcodePlaceholder: "输入密码",
    invalidPasscode: "密码无效！",
    accessSystem: "进入系统",
    step1: "选择或拖入您的视频",
    dropText: "将文件拖放到此处，或点击选择",
    dropHint: "支持 MP4、MOV、WEBM 等",
    noLimit: "不限时长和大小",
    delete: "移除",
    step2: "选择语言",
    selectTargetLangTitle: "选择目标配音语言",
    sourceLabel: "原始语言",
    targetLabel: "目标语言",
    swap: "交换语言",
    start: "开始翻译和配音",
    processing: "AI 配音进行中...",
    stages: [
      "正在从视频中提取音频",
      "正在将语音转为文字",
      "正在结合语境进行翻译",
      "正在克隆带情感和音调的声音",
      "正在将音频合并到视频",
    ],
    doneTitle: "全部完成！",
    doneSubtitle: "您的视频已配音为",
    download: "下载视频",
    retry: "重新开始",
    autopilotTitle: "智能 AI 自动驾驶",
    autopilotDesc: "全自动运行 — 无需手动编辑。",
    contextTitle: "语境守护",
    contextDesc: "词义、措辞和数字在全部 20 种语言中保持准确。",
    emotionTitle: "情感与音调",
    emotionDesc: "保留原声的笑声、愤怒、恐惧与喜悦。",
    paceTitle: "语速与节奏",
    paceDesc: "说话速度与原始视频保持同步。",
    featuresHeading: "AI 能力",
    appearance: "外观",
    darkMode: "深色模式",
    lightMode: "浅色模式",
    eyeCare: "护眼（蓝光过滤）",
    eyeCareDesc: "暖色滤镜，减少夜间用眼疲劳。",
    eyeCareLevel: "过滤强度",
    assistant: "AI 助手",
    assistantOpen: "打开 AI 助手",
    assistantTitle: "配音助手",
    assistantSubtitle: "询问如何使用本应用",
    assistantGreeting: `您好！我是您的 AI 配音助手。我只能回答有关这款 ${SAVPD_CONSTANTS.BRAND.NAME} 应用的问题——如何上传、选择语言以及使用自动驾驶。请问需要什么帮助？`,
    assistantPlaceholder: "询问关于本应用的问题...",
    assistantSend: "发送",
    assistantVoice: "语音提问",
    assistantListening: "正在聆听...",
    assistantRefusal: `抱歉！我只能回答与这款 ${SAVPD_CONSTANTS.BRAND.NAME} 应用的技术和使用相关的问题。`,
    assistantSuggestions: ["如何开始自动驾驶？", "支持哪些语言？", "会保留原始情感吗？"],
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
    assistantGreeting: `សួស្តី! ខ្ញុំជាជំនួយការ AI របស់អ្នក។ ខ្ញុំអាចជួយបានតែសំណួរអំពី App ${SAVPD_CONSTANTS.BRAND.NAME} នេះប៉ុណ្ណោះ — របៀបអាប់ឡូត ជ្រើសរើសភាសា និងប្រើ Auto-Pilot។ តើខ្ញុំអាចជួយអ្វីได้?`,
    assistantPlaceholder: "សួរអំពី App នេះ...",
    assistantSend: "ផ្ញើ",
    assistantVoice: "សួរដោយសំឡេង",
    assistantListening: "កំពុងស្តាប់...",
    assistantRefusal: `សូមអភ័យទោស! ខ្ញុំអាចជួយឆ្លើយតបបានតែព័ត៌មានដែលពាក់ព័ន្ធនឹងបច្ចេកវិទ្យា និងការប្រើប្រាស់ App ${SAVPD_CONSTANTS.BRAND.NAME} នេះប៉ុណ្ណោះ។`,
    assistantSuggestions: [
      "តើខ្ញុំចាប់ផ្តើម Auto-Pilot យ៉ាងដូចម្តេច?",
      "តើ App គាំទ្រភាសាអ្វីខ្លះ?",
      "តើវារក្សាអារម្មណ៍ដើមទេ?",
    ],
  },
  th: {
    ...EN_STRINGS,
    appSubtitle: "แปลและพากย์เสียงวิดีโอของคุณเป็นอีกภาษาด้วย AI ในไม่กี่ขั้นตอนง่าย ๆ",
    footer: `สร้างขึ้นเพื่อการใช้งานส่วนตัว · ${SAVPD_CONSTANTS.BRAND.NAME} เครื่องมือ`,
    settings: "การตั้งค่า",
    appLanguage: "ภาษาของแอป",
    displayMode: "โหมดการแสดงผล",
    securityTitle: "ความปลอดภัยของระบบ",
    securityDesc: "โปรดป้อนรหัสผ่านเพื่อเข้าถึงพื้นที่ทำงาน",
    passcodePlaceholder: "ป้อนรหัสผ่าน",
    invalidPasscode: "รหัสผ่านไม่ถูกต้อง!",
    accessSystem: "เข้าสู่ระบบ",
    step1: "เลือกหรือวางวิดีโอของคุณ",
    dropText: "ลากและวางไฟล์ที่นี่ หรือคลิกเพื่อเลือก",
    dropHint: "รองรับ MP4, MOV, WEBM และอื่น ๆ",
    noLimit: "ไม่จำกัดความยาวหรือขนาด",
    delete: "ลบ",
    step2: "เลือกภาษา",
    selectTargetLangTitle: "เลือกภาษาเป้าหมาย (สำหรับพากย์เสียง)",
    sourceLabel: "ภาษาต้นทาง",
    targetLabel: "ภาษาปลายทาง",
    swap: "สลับภาษา",
    start: "เริ่มแปลและพากย์เสียง",
    processing: "กำลังพากย์เสียงด้วย AI...",
    stages: [
      "กำลังแยกเสียงออกจากวิดีโอ",
      "กำลังแปลงเสียงพูดเป็นข้อความ",
      "กำลังแปลโดยรักษาบริบท",
      "กำลังโคลนเสียงพร้อมอารมณ์และโทน",
      "กำลังรวมเสียงเข้ากับวิดีโอ",
    ],
    doneTitle: "เสร็จเรียบร้อยแล้ว!",
    doneSubtitle: "วิดีโอของคุณถูกพากย์เป็น",
    download: "ดาวน์โหลดวิดีโอ",
    retry: "เริ่มใหม่",
    autopilotTitle: "AI อัตโนมัติอัจฉริยะ",
    autopilotDesc: "ทำงานอัตโนมัติเต็มรูปแบบ — ไม่ต้องแก้ไขด้วยตนเอง",
    contextTitle: "ป้องกันบริบท",
    contextDesc: "ความหมาย ถ้อยคำ และตัวเลข ยังคงถูกต้องในทั้ง 20 ภาษา",
    emotionTitle: "อารมณ์และโทนเสียง",
    emotionDesc: "รักษาเสียงหัวเราะ ความโกรธ ความกลัว และความสุขจากต้นฉบับ",
    paceTitle: "จังหวะและความเร็ว",
    paceDesc: "ความเร็วในการพูดยังคงสอดคล้องกับวิดีโอต้นฉบับ",
    featuresHeading: "ความสามารถของ AI",
    appearance: "ลักษณะที่แสดง",
    darkMode: "โหมดมืด (กลางคืน)",
    lightMode: "โหมดสว่าง (กลางวัน)",
    eyeCare: "ถนอมสายตา (กรองแสงสีฟ้า)",
    eyeCareDesc: "ฟิลเตอร์โทนอุ่นเพื่อลดอาการตาล้าในเวลากลางคืน",
    eyeCareLevel: "ความเข้มของฟิลเตอร์",
    assistant: "ผู้ช่วย AI",
    assistantOpen: "เปิดผู้ช่วย AI",
    assistantTitle: "ผู้ช่วยพากย์เสียง",
    assistantSubtitle: "สอบถามวิธีใช้แอปนี้",
    assistantGreeting: `สวัสดี! ฉันคือผู้ช่วย AI พากย์เสียงของคุณ ฉันตอบได้เฉพาะคำถามเกี่ยวกับแอป ${SAVPD_CONSTANTS.BRAND.NAME} นี้เท่านั้น — วิธีอัปโหลด เลือกภาษา และใช้ Auto-Pilot มีอะไรให้ช่วยไหม?`,
    assistantPlaceholder: "สอบถามเกี่ยวกับแอป...",
    assistantSend: "ส่ง",
    assistantVoice: "ถามด้วยเสียง",
    assistantListening: "กำลังฟัง...",
    assistantRefusal: `ขออภัย! ฉันตอบได้เฉพาะคำถามที่เกี่ยวข้องกับเทคโนโลยีและการใช้งานแอป ${SAVPD_CONSTANTS.BRAND.NAME} นี้เท่านั้น`,
    assistantSuggestions: ["เริ่ม Auto-Pilot อย่างไร?", "รองรับภาษาใดบ้าง?", "รักษาอารมณ์ต้นฉบับไหม?"],
  },
  vi: {
    ...EN_STRINGS,
    appSubtitle: "Dịch và lồng tiếng video của bạn sang ngôn ngữ khác bằng AI chỉ trong vài bước đơn giản.",
    footer: `Được tạo cho mục đích cá nhân · Công cụ ${SAVPD_CONSTANTS.BRAND.NAME}`,
    settings: "Cài đặt",
    appLanguage: "Ngôn ngữ ứng dụng",
    displayMode: "Chế độ hiển thị",
    securityTitle: "Bảo mật hệ thống",
    securityDesc: "Vui lòng nhập mật mã để truy cập",
    passcodePlaceholder: "Nhập mật mã",
    invalidPasscode: "Mật mã không hợp lệ!",
    accessSystem: "Truy cập hệ thống",
    step1: "Chọn hoặc kéo thả video của bạn",
    dropText: "Kéo và thả tệp vào đây, hoặc nhấp để chọn",
    dropHint: "Hỗ trợ MP4, MOV, WEBM và nhiều hơn nữa",
    noLimit: "Không giới hạn thời lượng hay dung lượng",
    delete: "Xóa",
    step2: "Chọn ngôn ngữ",
    selectTargetLangTitle: "Chọn ngôn ngữ mục tiêu (để lồng tiếng)",
    sourceLabel: "Ngôn ngữ gốc",
    targetLabel: "Ngôn ngữ đích",
    swap: "Hoán đổi ngôn ngữ",
    start: "Bắt đầu dịch & lồng tiếng",
    processing: "Đang lồng tiếng bằng AI...",
    stages: [
      "Đang tách âm thanh khỏi video",
      "Đang chuyển giọng nói thành văn bản",
      "Đang dịch với bảo vệ ngữ cảnh",
      "Đang nhân bản giọng với cảm xúc & âm sắc",
      "Đang ghép âm thanh vào video",
    ],
    doneTitle: "Hoàn tất!",
    doneSubtitle: "Video của bạn đã được lồng tiếng sang",
    download: "Tải video",
    retry: "Làm lại",
    autopilotTitle: "AI Tự Động Thông Minh",
    autopilotDesc: "Hoàn toàn tự động — không cần chỉnh sửa thủ công.",
    contextTitle: "Bảo Vệ Ngữ Cảnh",
    contextDesc: "Ý nghĩa, cách diễn đạt và con số luôn chính xác trên cả 20 ngôn ngữ.",
    emotionTitle: "Cảm Xúc & Âm Sắc",
    emotionDesc: "Giữ nguyên tiếng cười, giận dữ, sợ hãi và niềm vui từ bản gốc.",
    paceTitle: "Nhịp Độ & Tiết Tấu",
    paceDesc: "Tốc độ nói luôn đồng bộ với video gốc.",
    featuresHeading: "Khả năng của AI",
    appearance: "Giao diện",
    darkMode: "Chế độ tối (ban đêm)",
    lightMode: "Chế độ sáng (ban ngày)",
    eyeCare: "Bảo vệ mắt (lọc ánh sáng xanh)",
    eyeCareDesc: "Bộ lọc tông ấm giúp giảm mỏi mắt vào ban đêm.",
    eyeCareLevel: "Cường độ lọc",
    assistant: "Trợ lý AI",
    assistantOpen: "Mở trợ lý AI",
    assistantTitle: "Trợ lý lồng tiếng",
    assistantSubtitle: "Hỏi về cách sử dụng ứng dụng này",
    assistantGreeting: `Xin chào! Tôi là trợ lý AI lồng tiếng của bạn. Tôi chỉ có thể trả lời các câu hỏi về ứng dụng ${SAVPD_CONSTANTS.BRAND.NAME} này — cách tải lên, chọn ngôn ngữ và dùng Auto-Pilot. Tôi có thể giúp gì?`,
    assistantPlaceholder: "Hỏi về ứng dụng...",
    assistantSend: "Gửi",
    assistantVoice: "Hỏi bằng giọng nói",
    assistantListening: "Đang nghe...",
    assistantRefusal: `Xin lỗi! Tôi chỉ có thể trả lời các câu hỏi liên quan đến công nghệ và cách sử dụng ứng dụng ${SAVPD_CONSTANTS.BRAND.NAME} này.`,
    assistantSuggestions: [
      "Làm sao để bắt đầu Auto-Pilot?",
      "Hỗ trợ những ngôn ngữ nào?",
      "Có giữ nguyên cảm xúc gốc không?",
    ],
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
