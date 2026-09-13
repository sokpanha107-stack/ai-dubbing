// lib/translations.ts
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

export type Strings = {
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

export const TRANSLATIONS: Record<LangCode, Strings> = {
  en: {
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
    sourceLabel: "Source language",
    targetLabel: "Target language",
    swap: "Swap languages",
    start: "Start translating & dubbing",
    processing: "AI dubbing in progress...",
    stages: ["Extracting audio", "Transcribing speech", "Translating", "Cloning voice", "Merging audio"],
    doneTitle: "All done!",
    doneSubtitle: "Your video has been dubbed into",
    download: "Download video",
    retry: "Start over",
    autopilotTitle: "Smart AI Auto-Pilot",
    autopilotDesc: "Fully automatic — no manual editing needed.",
    contextTitle: "Context Guard",
    contextDesc: "Meaning, phrasing and numbers stay accurate.",
    emotionTitle: "Emotion & Tone",
    emotionDesc: "Laughter, anger, fear and joy are preserved.",
    paceTitle: "Pace & Rhythm",
    paceDesc: "Speech speed stays in sync.",
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
    assistantGreeting: "How can I help?",
    assistantPlaceholder: "Ask about the app...",
    assistantSend: "Send",
    assistantVoice: "Ask by voice",
    assistantListening: "Listening...",
    assistantRefusal: "Sorry! I can only answer questions related to this app.",
    assistantSuggestions: ["How do I start?", "Supported languages?", "Original emotion?"],
  },
  km: {
    appTitle: SAVPD_CONSTANTS.BRAND.TRADEMARK,
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
    dropText: "អូសទម្លាក់ឯកសារនៅទីនេះ",
    dropHint: "MP4, MOV, WEBM",
    noLimit: "មិនកំណត់រយៈពេល",
    delete: "លុប",
    step2: "ជ្រើសរើសភាសា",
    sourceLabel: "ភាសាដើម",
    targetLabel: "ភាសាគោលដៅ",
    swap: "ប្តូរភាសា",
    start: "ចាប់ផ្តើមបកប្រែ",
    processing: "កំពុងដំណើរការ...",
    stages: ["បំបែកសំឡេង", "បំប្លែងអក្សរ", "បកប្រែ", "ក្លូនសំឡេង", "ផ្សំចូលវីដេអូ"],
    doneTitle: "រួចរាល់ហើយ!",
    doneSubtitle: "បញ្ចូលសំឡេងជា",
    download: "ទាញយក",
    retry: "ធ្វើម្តងទៀត",
    autopilotTitle: "AI ស្វ័យប្រវត្តិ",
    autopilotDesc: "ដំណើរការស្វ័យប្រវត្តិ ១០០%",
    contextTitle: "ការពារបរិបទ",
    contextDesc: "អត្ថន័យត្រឹមត្រូវ",
    emotionTitle: "អារម្មណ៍ និងទឹកដម",
    emotionDesc: "រក្សាទុកពីដើម",
    paceTitle: "ល្បឿន និងចង្វាក់",
    paceDesc: "ស៊ីសង្វាក់គ្នា",
    featuresHeading: "សមត្ថភាព AI",
    languages: ALL_LANGUAGES_KM,
    appearance: "រូបរាង",
    darkMode: "ផ្ទាំងពណ៌ខ្មៅ",
    lightMode: "ផ្ទាំងពណ៌ស",
    eyeCare: "ការពារភ្នែក",
    eyeCareDesc: "កាត់បន្ថយការចាំង",
    eyeCareLevel: "កម្រិតតម្រង",
    assistant: "ជំនួយការ AI",
    assistantOpen: "បើកជំនួយការ",
    assistantTitle: "ជំនួយការ",
    assistantSubtitle: "សួរអំពី App",
    assistantGreeting: "តើខ្ញុំអាចជួយអ្វីបាន?",
    assistantPlaceholder: "សួរ...",
    assistantSend: "ផ្ញើ",
    assistantVoice: "សំឡេង",
    assistantListening: "កំពុងស្តាប់...",
    assistantRefusal: "សូមអភ័យទោស",
    assistantSuggestions: ["ចាប់ផ្តើម?", "ភាសាគាំទ្រ?", "រក្សាអារម្មណ៍?"],
  },
  zh: {
    appTitle: SAVPD_CONSTANTS.BRAND.TRADEMARK,
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
    dropText: "将文件拖放到此处",
    dropHint: "支持 MP4、MOV 等",
    noLimit: "不限时长和大小",
    delete: "移除",
    step2: "选择语言",
    sourceLabel: "原始语言",
    targetLabel: "目标语言",
    swap: "交换语言",
    start: "开始翻译和配音",
    processing: "AI 配音进行中...",
    stages: ["提取音频", "语音转文字", "结合语境翻译", "克隆声音", "合并视频"],
    doneTitle: "全部完成！",
    doneSubtitle: "您的视频已配音为",
    download: "下载视频",
    retry: "重新开始",
    autopilotTitle: "智能 AI 自动驾驶",
    autopilotDesc: "全自动运行",
    contextTitle: "语境守护",
    contextDesc: "词义准确",
    emotionTitle: "情感与音调",
    emotionDesc: "保留原声",
    paceTitle: "语速与节奏",
    paceDesc: "语速同步",
    featuresHeading: "AI 能力",
    languages: ALL_LANGUAGES_EN,
    appearance: "外观",
    darkMode: "深色模式",
    lightMode: "浅色模式",
    eyeCare: "护眼模式",
    eyeCareDesc: "减少眼疲劳",
    eyeCareLevel: "过滤强度",
    assistant: "AI 助手",
    assistantOpen: "打开助手",
    assistantTitle: "助手",
    assistantSubtitle: "询问帮助",
    assistantGreeting: "需要什么帮助？",
    assistantPlaceholder: "提问...",
    assistantSend: "发送",
    assistantVoice: "语音",
    assistantListening: "聆听中...",
    assistantRefusal: "抱歉",
    assistantSuggestions: ["如何开始？", "支持语言？", "保留情感？"],
  },
  th: {
    appTitle: SAVPD_CONSTANTS.BRAND.TRADEMARK,
    appSubtitle: "แปลและพากย์เสียงวิดีโอของคุณด้วย AI",
    footer: `สำหรับส่วนตัว · ${SAVPD_CONSTANTS.BRAND.NAME}`,
    settings: "การตั้งค่า",
    appLanguage: "ภาษาของแอป",
    displayMode: "โหมดการแสดงผล",
    securityTitle: "ความปลอดภัยของระบบ",
    securityDesc: "โปรดป้อนรหัสผ่านเพื่อเข้าถึงพื้นที่ทำงาน",
    passcodePlaceholder: "ป้อนรหัสผ่าน",
    invalidPasscode: "รหัสผ่านไม่ถูกต้อง!",
    accessSystem: "เข้าสู่ระบบ",
    step1: "เลือกวิดีโอของคุณ",
    dropText: "ลากและวางไฟล์ที่นี่",
    dropHint: "รองรับ MP4, MOV",
    noLimit: "ไม่จำกัดความยาว",
    delete: "ลบ",
    step2: "เลือกภาษา",
    sourceLabel: "ภาษาต้นทาง",
    targetLabel: "ปลายทาง",
    swap: "สลับภาษา",
    start: "เริ่มแปล",
    processing: "กำลังดำเนินการ...",
    stages: ["แยกเสียง", "แปลงข้อความ", "แปล", "โคลนเสียง", "รวมวิดีโอ"],
    doneTitle: "เสร็จเรียบร้อย!",
    doneSubtitle: "พากย์เป็น",
    download: "ดาวน์โหลด",
    retry: "เริ่มใหม่",
    autopilotTitle: "AI อัตโนมัติ",
    autopilotDesc: "ทำงานอัตโนมัติ",
    contextTitle: "ป้องกันบริบท",
    contextDesc: "ความหมายถูกต้อง",
    emotionTitle: "อารมณ์และโทน",
    emotionDesc: "รักษาเสียงเดิม",
    paceTitle: "จังหวะและความเร็ว",
    paceDesc: "สอดคล้องกับต้นฉบับ",
    featuresHeading: "ความสามารถ AI",
    languages: ALL_LANGUAGES_EN,
    appearance: "ลักษณะที่แสดง",
    darkMode: "โหมดมืด",
    lightMode: "โหมดสว่าง",
    eyeCare: "ถนอมสายตา",
    eyeCareDesc: "ลดตาล้า",
    eyeCareLevel: "ความเข้ม",
    assistant: "ผู้ช่วย AI",
    assistantOpen: "เปิดผู้ช่วย",
    assistantTitle: "ผู้ช่วย",
    assistantSubtitle: "สอบถาม",
    assistantGreeting: "มีอะไรให้ช่วยไหม?",
    assistantPlaceholder: "สอบถาม...",
    assistantSend: "ส่ง",
    assistantVoice: "เสียง",
    assistantListening: "กำลังฟัง...",
    assistantRefusal: "ขออภัย",
    assistantSuggestions: ["เริ่มอย่างไร?", "รองรับภาษาใด?", "รักษาอารมณ์ไหม?"],
  },
  vi: {
    appTitle: SAVPD_CONSTANTS.BRAND.TRADEMARK,
    appSubtitle: "Dịch và lồng tiếng video của bạn bằng AI.",
    footer: `Cá nhân · ${SAVPD_CONSTANTS.BRAND.NAME}`,
    settings: "Cài đặt",
    appLanguage: "Ngôn ngữ",
    displayMode: "Chế độ hiển thị",
    securityTitle: "Bảo mật hệ thống",
    securityDesc: "Vui lòng nhập mật mã để truy cập",
    passcodePlaceholder: "Nhập mật mã",
    invalidPasscode: "Mật mã không hợp lệ!",
    accessSystem: "Truy cập hệ thống",
    step1: "Chọn video của bạn",
    dropText: "Kéo và thả tệp",
    dropHint: "MP4, MOV",
    noLimit: "Không giới hạn",
    delete: "Xóa",
    step2: "Chọn ngôn ngữ",
    sourceLabel: "Ngôn ngữ gốc",
    targetLabel: "Ngôn ngữ đích",
    swap: "Hoán đổi",
    start: "Bắt đầu dịch",
    processing: "Đang xử lý...",
    stages: ["Tách âm thanh", "Chuyển văn bản", "Dịch", "Nhân bản giọng", "Ghép video"],
    doneTitle: "Hoàn tất!",
    doneSubtitle: "Đã lồng tiếng sang",
    download: "Tải về",
    retry: "Làm lại",
    autopilotTitle: "AI Tự Động",
    autopilotDesc: "Hoàn toàn tự động",
    contextTitle: "Bảo Vệ Ngữ Cảnh",
    contextDesc: "Chính xác",
    emotionTitle: "Cảm Xúc",
    emotionDesc: "Giữ nguyên",
    paceTitle: "Nhịp Độ",
    paceDesc: "Đồng bộ",
    featuresHeading: "Khả năng AI",
    languages: ALL_LANGUAGES_EN,
    appearance: "Giao diện",
    darkMode: "Chế độ tối",
    lightMode: "Chế độ sáng",
    eyeCare: "Bảo vệ mắt",
    eyeCareDesc: "Giảm mỏi mắt",
    eyeCareLevel: "Cường độ lọc",
    assistant: "Trợ lý AI",
    assistantOpen: "Mở trợ lý",
    assistantTitle: "Trợ lý",
    assistantSubtitle: "Hỏi về ứng dụng",
    assistantGreeting: "Tôi có thể giúp gì?",
    assistantPlaceholder: "Hỏi...",
    assistantSend: "Gửi",
    assistantVoice: "Giọng nói",
    assistantListening: "Đang nghe...",
    assistantRefusal: "Xin lỗi",
    assistantSuggestions: ["Bắt đầu?", "Ngôn ngữ?", "Cảm xúc?"],
  },
  ja: {
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
    sourceLabel: "Source language",
    targetLabel: "Target language",
    swap: "Swap languages",
    start: "Start translating & dubbing",
    processing: "AI dubbing in progress...",
    stages: ["Extracting audio", "Transcribing speech", "Translating", "Cloning voice", "Merging audio"],
    doneTitle: "All done!",
    doneSubtitle: "Your video has been dubbed into",
    download: "Download video",
    retry: "Start over",
    autopilotTitle: "Smart AI Auto-Pilot",
    autopilotDesc: "Fully automatic — no manual editing needed.",
    contextTitle: "Context Guard",
    contextDesc: "Meaning, phrasing and numbers stay accurate.",
    emotionTitle: "Emotion & Tone",
    emotionDesc: "Laughter, anger, fear and joy are preserved.",
    paceTitle: "Pace & Rhythm",
    paceDesc: "Speech speed stays in sync.",
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
    assistantGreeting: "How can I help?",
    assistantPlaceholder: "Ask about the app...",
    assistantSend: "Send",
    assistantVoice: "Ask by voice",
    assistantListening: "Listening...",
    assistantRefusal: "Sorry! I can only answer questions related to this app.",
    assistantSuggestions: ["How do I start?", "Supported languages?", "Original emotion?"],
  },
  ko: { ...TRANSLATIONS?.en, languages: ALL_LANGUAGES_EN },
  hi: { ...TRANSLATIONS?.en, languages: ALL_LANGUAGES_EN },
  es: { ...TRANSLATIONS?.en, languages: ALL_LANGUAGES_EN },
  fr: { ...TRANSLATIONS?.en, languages: ALL_LANGUAGES_EN },
  de: { ...TRANSLATIONS?.en, languages: ALL_LANGUAGES_EN },
  id: { ...TRANSLATIONS?.en, languages: ALL_LANGUAGES_EN },
  pt: { ...TRANSLATIONS?.en, languages: ALL_LANGUAGES_EN },
  ru: { ...TRANSLATIONS?.en, languages: ALL_LANGUAGES_EN },
  ar: { ...TRANSLATIONS?.en, languages: ALL_LANGUAGES_EN },
  it: { ...TRANSLATIONS?.en, languages: ALL_LANGUAGES_EN },
  tr: { ...TRANSLATIONS?.en, languages: ALL_LANGUAGES_EN },
  ph: { ...TRANSLATIONS?.en, languages: ALL_LANGUAGES_EN },
  ms: { ...TRANSLATIONS?.en, languages: ALL_LANGUAGES_EN },
  bn: { ...TRANSLATIONS?.en, languages: ALL_LANGUAGES_EN }
}

// Ensure the spread syntax correctly populates the rest of the languages
Object.assign(TRANSLATIONS.ko, TRANSLATIONS.ja)
Object.assign(TRANSLATIONS.hi, TRANSLATIONS.ja)
Object.assign(TRANSLATIONS.es, TRANSLATIONS.ja)
Object.assign(TRANSLATIONS.fr, TRANSLATIONS.ja)
Object.assign(TRANSLATIONS.de, TRANSLATIONS.ja)
Object.assign(TRANSLATIONS.id, TRANSLATIONS.ja)
Object.assign(TRANSLATIONS.pt, TRANSLATIONS.ja)
Object.assign(TRANSLATIONS.ru, TRANSLATIONS.ja)
Object.assign(TRANSLATIONS.ar, TRANSLATIONS.ja)
Object.assign(TRANSLATIONS.it, TRANSLATIONS.ja)
Object.assign(TRANSLATIONS.tr, TRANSLATIONS.ja)
Object.assign(TRANSLATIONS.ph, TRANSLATIONS.ja)
Object.assign(TRANSLATIONS.ms, TRANSLATIONS.ja)
Object.assign(TRANSLATIONS.bn, TRANSLATIONS.ja)
