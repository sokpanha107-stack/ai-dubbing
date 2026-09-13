import { SAVPD_CONSTANTS } from "@/lib/constants"

export type LangCode = 
  | "en" | "zh" | "km" | "th" | "vi"
  | "ja" | "ko" | "hi" | "es" | "fr"
  | "de" | "id" | "pt" | "ru" | "ar"
  | "it" | "tr" | "ph" | "ms" | "bn"

export type DubbingOptionInfo = {
  title: string
  desc: string
}

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
  dubbingOptions: {
    opt1: DubbingOptionInfo
    opt2: DubbingOptionInfo
    opt3: DubbingOptionInfo
    opt4: DubbingOptionInfo
  }
}

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

const ALL_LANGUAGES: Record<LangCode, Record<LangCode, string>> = {
  en: {
    en: "English", zh: "Chinese", km: "Khmer", th: "Thai", vi: "Vietnamese",
    ja: "Japanese", ko: "Korean", hi: "Hindi", es: "Spanish", fr: "French",
    de: "German", id: "Indonesian", pt: "Portuguese", ru: "Russian", ar: "Arabic",
    it: "Italian", tr: "Turkish", ph: "Filipino", ms: "Malay", bn: "Bengali"
  },
  km: {
    en: "អង់គ្លេស", zh: "ចិន", km: "ខ្មែរ", th: "ថៃ", vi: "វៀតណាម",
    ja: "ជប៉ុន", ko: "កូរ៉េ", hi: "ហិណ្ឌូ", es: "អេស្ប៉ាញ", fr: "បារាំង",
    de: "អាល្លឺម៉ង់", id: "ឥណ្ឌូណេស៊ី", pt: "ព័រទុយហ្កាល់", ru: "រុស្ស៊ី", ar: "អារ៉ាប់",
    it: "អ៊ីតាលី", tr: "ទួរគី", ph: "ហ្វីលីពីន", ms: "ម៉ាឡេ", bn: "បង់ក្លាដែស"
  },
  zh: {
    en: "英语", zh: "中文", km: "高棉语", th: "泰语", vi: "越南语",
    ja: "日语", ko: "韩语", hi: "印地语", es: "西班牙语", fr: "法语",
    de: "德语", id: "印尼语", pt: "葡萄牙语", ru: "俄语", ar: "阿拉伯语",
    it: "意大利语", tr: "土耳其语", ph: "菲律宾语", ms: "马来语", bn: "孟加拉语"
  },
  th: {
    en: "อังกฤษ", zh: "จีน", km: "เขมร", th: "ไทย", vi: "เวียดนาม",
    ja: "ญี่ปุ่น", ko: "เกาหลี", hi: "ฮินดี", es: "สเปน", fr: "ฝรั่งเศส",
    de: "เยอรมัน", id: "อินโดนีเซีย", pt: "โปรตุเกส", ru: "รัสเซีย", ar: "อาหรับ",
    it: "อิตาลี", tr: "ตุรกี", ph: "ฟิลิปปินส์", ms: "มาเลย์", bn: "เบงกาลี"
  },
  vi: {
    en: "Tiếng Anh", zh: "Tiếng Trung", km: "Tiếng Khmer", th: "Tiếng Thái", vi: "Tiếng Việt",
    ja: "Tiếng Nhật", ko: "Tiếng Hàn", hi: "Tiếng Hindi", es: "Tiếng Tây Ban Nha", fr: "Tiếng Pháp",
    de: "Tiếng Đức", id: "Tiếng Indonesia", pt: "Tiếng Bồ Đào Nha", ru: "Tiếng Nga", ar: "Tiếng Ả Rập",
    it: "Tiếng Ý", tr: "Tiếng Thổ Nhĩ Kỳ", ph: "Tiếng Filipino", ms: "Tiếng Mã Lai", bn: "Tiếng Bengal"
  },
  ja: {
    en: "英語", zh: "中国語", km: "クメール語", th: "タイ語", vi: "ベトナム語",
    ja: "日本語", ko: "韓国語", hi: "ヒンディー語", es: "スペイン語", fr: "フランス語",
    de: "ドイツ語", id: "インドネシア語", pt: "ポルトガル語", ru: "ロシア語", ar: "アラビア語",
    it: "イタリア語", tr: "トルコ語", ph: "フィリピン語", ms: "マレー語", bn: "ベンガル語"
  },
  ko: {
    en: "영어", zh: "중국어", km: "크메르어", th: "태국어", vi: "베트남어",
    ja: "일본어", ko: "한국어", hi: "힌디어", es: "스페인어", fr: "프랑스어",
    de: "독일어", id: "인도네시아어", pt: "포르투갈어", ru: "러시아어", ar: "아랍어",
    it: "이탈리아어", tr: "터키어", ph: "필리핀어", ms: "말레이어", bn: "벵골어"
  },
  hi: {
    en: "अंग्रेजी", zh: "चीनी", km: "खमेर", th: "थाई", vi: "वियतनामी",
    ja: "जापानी", ko: "कोरियाई", hi: "हिन्दी", es: "स्पेनिश", fr: "फ्रेंच",
    de: "जर्मन", id: "इंडोनेशियाई", pt: "पुर्तगाली", ru: "रूसी", ar: "अरबी",
    it: "इटालियन", tr: "तुर्की", ph: "फिलीपीनो", ms: "मलय", bn: "बंगाली"
  },
  es: {
    en: "Inglés", zh: "Chino", km: "Jemer", th: "Tailandés", vi: "Vietnamita",
    ja: "Japonés", ko: "Coreano", hi: "Hindi", es: "Español", fr: "Francés",
    de: "Alemán", id: "Indonesio", pt: "Portugués", ru: "Ruso", ar: "Árabe",
    it: "Italiano", tr: "Turco", ph: "Filipino", ms: "Malayo", bn: "Bengalí"
  },
  fr: {
    en: "Anglais", zh: "Chinois", km: "Khmer", th: "Thaï", vi: "Vietnamien",
    ja: "Japonais", ko: "Coréen", hi: "Hindi", es: "Espagnol", fr: "Français",
    de: "Allemand", id: "Indonésien", pt: "Portugais", ru: "Russe", ar: "Arabe",
    it: "Italien", tr: "Turc", ph: "Filipino", ms: "Malais", bn: "Bengali"
  },
  de: {
    en: "Englisch", zh: "Chinesisch", km: "Khmer", th: "Thاي", vi: "Vietnamesisch",
    ja: "Japanisch", ko: "Koreanisch", hi: "Hindi", es: "Spanisch", fr: "Französisch",
    de: "Deutsch", id: "Indonesisch", pt: "Portugiesisch", ru: "Russisch", ar: "Arabisch",
    it: "Italienisch", tr: "Türkisch", ph: "Filipino", ms: "Malaiisch", bn: "Bengali"
  },
  id: {
    en: "Inggris", zh: "Tiongkok", km: "Khmer", th: "Thai", vi: "Vietnam",
    ja: "Jepang", ko: "Korea", hi: "Hindi", es: "Spanyol", fr: "Prancis",
    de: "Jerman", id: "Indonesia", pt: "Portugis", ru: "Rusia", ar: "Arab",
    it: "Italia", tr: "Turki", ph: "Filipina", ms: "Melayu", bn: "Benggala"
  },
  pt: {
    en: "Inglês", zh: "Chinês", km: "Cacmer", th: "Tailandês", vi: "Vietnamita",
    ja: "Japonês", ko: "Coreano", hi: "Hindi", es: "Espanhol", fr: "Francês",
    de: "Alemão", id: "Indonésio", pt: "Português", ru: "Russo", ar: "Árabe",
    it: "Italiano", tr: "Turco", ph: "Filipino", ms: "Malaio", bn: "Bengali"
  },
  ru: {
    en: "Английский", zh: "Китайский", km: "Кхмерский", th: "Тайский", vi: "Вьетнамский",
    ja: "Японский", ko: "Корейский", hi: "Хинди", es: "Испанский", fr: "Французский",
    de: "Немецкий", id: "Индонезийский", pt: "Португальский", ru: "Русский", ar: "Арабский",
    it: "Итальянский", tr: "Турецкий", ph: "Филиппинский", ms: "Малайский", bn: "Бенгальский"
  },
  ar: {
    en: "الإنجليزية", zh: "الصينية", km: "الخميرية", th: "التايلاندية", vi: "الفيتنامية",
    ja: "اليابانية", ko: "الكورية", hi: "الهندية", es: "الإسبانية", fr: "الفرنسية",
    de: "الألمانية", id: "الإندونيسية", pt: "البرتغالية", ru: "الروسية", ar: "العربية",
    it: "الإيطالية", tr: "التركية", ph: "الفلبينية", ms: "الملايوية", bn: "البنغالية"
  },
  it: {
    en: "Inglese", zh: "Cinese", km: "Khmer", th: "Tailandese", vi: "Vietnamita",
    ja: "Giapponese", ko: "Coreano", hi: "Hindi", es: "Spagnolo", fr: "Francese",
    de: "Tedesco", id: "Indonesiano", pt: "Portoghese", ru: "Russo", ar: "Arabo",
    it: "Italiano", tr: "Turco", ph: "Filippino", ms: "Malese", bn: "Bengalese"
  },
  tr: {
    en: "İngilizce", zh: "Çince", km: "Kmerce", th: "Tayca", vi: "Vietnamca",
    ja: "Japonca", ko: "Korece", hi: "Hintçe", es: "İspanyolca", fr: "Fransızca",
    de: "Almanca", id: "Endonezyaca", pt: "Portekizce", ru: "Rusça", ar: "Arapça",
    it: "İtalyanca", tr: "Türkçe", ph: "Filipince", ms: "Malayca", bn: "Bengalce"
  },
  ph: {
    en: "English", zh: "Chinese", km: "Khmer", th: "Thai", vi: "Vietnamese",
    ja: "Japanese", ko: "Korean", hi: "Hindi", es: "Spanish", fr: "French",
    de: "German", id: "Indonesian", pt: "Portuguese", ru: "Russian", ar: "Arabic",
    it: "Italian", tr: "Turkish", ph: "Filipino", ms: "Malay", bn: "Bengali"
  },
  ms: {
    en: "Inggeris", zh: "Cina", km: "Khmer", th: "Thai", vi: "Vietnam",
    ja: "Jepun", ko: "Korea", hi: "Hindi", es: "Sepanyol", fr: "Perancis",
    de: "Jerman", id: "Indonesia", pt: "Portuguese", ru: "Rusia", ar: "Arab",
    it: "Itali", tr: "Turki", ph: "Filipina", ms: "Melayu", bn: "Benggali"
  },
  bn: {
    en: "ইংরেজি", zh: "চাইনিজ", km: "খ্‌মের", th: "থাই", vi: "ভিয়েতনামী",
    ja: "জাপানি", ko: "কোরিয়ান", hi: "হিন্দি", es: "স্প্যানিশ", fr: "ফরাসি",
    de: "জার্মান", id: "ইন্দোনেশিয়ান", pt: "পর্তুগিজ", ru: "রাশিয়ান", ar: "আরবি",
    it: "ইতালীয়", tr: "তুর্কি", ph: "ফিলিপিনো", ms: "মালয়", bn: "বাংলা"
  }
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
  languages: ALL_LANGUAGES.en,
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

export const GLOBAL_DICTIONARY: Record<LangCode, Strings> = {
  en: EN_STRINGS,
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
    languages: ALL_LANGUAGES.km,
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
    assistantRefusal: `សូមអភ័យទោស! ខ្ញុំអាចជួយឆ្លើយតបបានតែព័ត៌មានដែលពាក់ព័ន្ធនឹងបច្ចេកវិទ្យា និងការប្រើប្រាស់ App ${SAVPD_CONSTANTS.BRAND.NAME} នេះប៉ុណ្ណោះ។`,
    assistantSuggestions: [
      "តើខ្ញុំចាប់ផ្តើម Auto-Pilot យ៉ាងដូចម្តេច?",
      "តើ App គាំទ្រភាសាអ្វីខ្លះ?",
      "តើវារក្សាអារម្មណ៍ដើមទេ?",
    ],
    dubbingOptions: {
      opt1: { title: "Option 1: Clean Voiceover (Vlog Mode)", desc: "សាកសមបំផុតសម្រាប់វីដេអូ Vlog ផ្ទាល់ខ្លួន ឬការថតនិយាយធម្មតា។" },
      opt2: { title: "Option 2: Summary & SFX (Recap)", desc: "សាកសមសម្រាប់វីដេអូ សង្ខេបសាច់រឿង (Recap) និងការเล่าเรื่อง។" },
      opt3: { title: "Option 3: Cinematic Character Dubbing", desc: "សាកសមសម្រាប់ភាពយន្ត (Movies) និងតួអង្គសម្ដែង។" },
      opt4: { title: "Option 4: AI Visual Storyteller (Auto-Script)", desc: "សាកសមសម្រាប់បង្កើតសាច់រឿងស្វ័យប្រវត្ត (Auto-Script)។" },
    },
  },
  zh: {
    ...EN_STRINGS,
    settings: "设置",
    appLanguage: "应用语言",
    displayMode: "显示模式",
    appearance: "外观",
    darkMode: "深色模式",
    lightMode: "浅色模式",
    languages: ALL_LANGUAGES.zh,
    dubbingOptions: {
      opt1: { title: "选项 1：纯净配音 (Vlog 模式)", desc: "最适合个人 Vlog 和自然语音讲解。" },
      opt2: { title: "选项 2：摘要与特效 (解说模式)", desc: "最适合视频总结 (Recap) 与故事讲述。" },
      opt3: { title: "选项 3：电影级角色配音", desc: "最适合电影、短剧与角色配音。" },
      opt4: { title: "选项 4：AI 视觉讲故事 (自动脚本)", desc: "最适合自动生成脚本与视觉叙事。" },
    },
  },
  th: {
    ...EN_STRINGS,
    settings: "การตั้งค่า",
    appLanguage: "ภาษาของแอป",
    displayMode: "โหมดการแสดงผล",
    appearance: "รูปลักษณ์",
    darkMode: "โหมดมืด",
    lightMode: "โหมดสว่าง",
    languages: ALL_LANGUAGES.th,
    dubbingOptions: {
      opt1: { title: "Option 1: Clean Voiceover (Vlog Mode)", desc: "เหมาะสำหรับวิดีโอ Vlog ส่วนตัวและการพูดคุยที่เป็นธรรมชาติ" },
      opt2: { title: "Option 2: Summary & SFX (Recap)", desc: "เหมาะสำหรับวิดีโอสรุปเนื้อหา (Recap) และการเล่าเรื่อง" },
      opt3: { title: "Option 3: Cinematic Character Dubbing", desc: "เหมาะสำหรับภาพยนตร์และการพากย์เสียงตัวละคร" },
      opt4: { title: "Option 4: AI Visual Storyteller (Auto-Script)", desc: "เหมาะสำหรับการสร้างสคริปต์อัตโนมัติและการเล่าเรื่องด้วยภาพ" },
    },
  },
  vi: {
    ...EN_STRINGS,
    settings: "Cài đặt",
    appLanguage: "Ngôn ngữ ứng dụng",
    displayMode: "Chế độ hiển thị",
    appearance: "Giao diện",
    darkMode: "Chế độ tối",
    lightMode: "Chế độ sáng",
    languages: ALL_LANGUAGES.vi,
    dubbingOptions: {
      opt1: { title: "Option 1: Clean Voiceover (Vlog Mode)", desc: "Tốt nhất cho Vlog cá nhân và giọng nói tự nhiên." },
      opt2: { title: "Option 2: Summary & SFX (Recap)", desc: "Tốt nhất cho video tóm tắt (Recap) và kể chuyện." },
      opt3: { title: "Option 3: Cinematic Character Dubbing", desc: "Tốt nhất cho phim ảnh và lồng tiếng nhân vật." },
      opt4: { title: "Option 4: AI Visual Storyteller (Auto-Script)", desc: "Tốt nhất cho tự động tạo kịch bản và kể chuyện trực quan." },
    },
  },
  ja: {
    ...EN_STRINGS,
    settings: "設定",
    appLanguage: "アプリ言語",
    displayMode: "表示モード",
    appearance: "外観",
    darkMode: "ダークモード",
    lightMode: "ライトモード",
    languages: ALL_LANGUAGES.ja,
    dubbingOptions: {
      opt1: { title: "Option 1: Clean Voiceover (Vlog Mode)", desc: "個人のVlogや自然なスピーチに最適です。" },
      opt2: { title: "Option 2: Summary & SFX (Recap)", desc: "リキャップ動画やストーリーテリングに最適です。" },
      opt3: { title: "Option 3: Cinematic Character Dubbing", desc: "映画やキャラクターの吹き替えに最適です。" },
      opt4: { title: "Option 4: AI Visual Storyteller (Auto-Script)", desc: "自動スクリプト生成とビジュアルストーリーテリングに最適です。" },
    },
  },
  ko: {
    ...EN_STRINGS,
    settings: "설정",
    appLanguage: "앱 언어",
    displayMode: "디스플레이 모드",
    appearance: "외관",
    darkMode: "다크 모드",
    lightMode: "라이트 모드",
    languages: ALL_LANGUAGES.ko,
    dubbingOptions: {
      opt1: { title: "Option 1: Clean Voiceover (Vlog Mode)", desc: "개인 브이로그 및 자연스러운 스피치에 가장 적합합니다." },
      opt2: { title: "Option 2: Summary & SFX (Recap)", desc: "요약(Recap) 비디오 및 스토리텔링에 가장 적합합니다." },
      opt3: { title: "Option 3: Cinematic Character Dubbing", desc: "영화 및 캐릭터 더빙에 가장 적합합니다." },
      opt4: { title: "Option 4: AI Visual Storyteller (Auto-Script)", desc: "자동 대본 생성 및 시각적 스토리텔링에 가장 적합합니다." },
    },
  },
  hi: {
    ...EN_STRINGS,
    settings: "सेटिंग्स",
    appLanguage: "ऐप की भाषा",
    displayMode: "प्रदर्शन मोड",
    appearance: "रूप",
    darkMode: "डार्क मोड",
    lightMode: "लाइट मोड",
    languages: ALL_LANGUAGES.hi,
    dubbingOptions: {
      opt1: { title: "Option 1: Clean Voiceover (Vlog Mode)", desc: "व्यक्तिगत व्लॉग और प्राकृतिक भाषण के लिए सबसे अच्छा है।" },
      opt2: { title: "Option 2: Summary & SFX (Recap)", desc: "रीकैप वीडियो और कहानी के लिए सबसे अच्छा है।" },
      opt3: { title: "Option 3: Cinematic Character Dubbing", desc: "फिल्मों और चरित्र डबिंग के लिए सबसे अच्छा है।" },
      opt4: { title: "Option 4: AI Visual Storyteller (Auto-Script)", desc: "ऑटो-स्क्रिप्ट और विजुअल स्टोरीटेलिंग के लिए सबसे अच्छा है।" },
    },
  },
  es: {
    ...EN_STRINGS,
    settings: "Ajustes",
    appLanguage: "Idioma de la aplicación",
    displayMode: "Modo de visualización",
    appearance: "Apariencia",
    darkMode: "Modo oscuro",
    lightMode: "Modo claro",
    languages: ALL_LANGUAGES.es,
    dubbingOptions: {
      opt1: { title: "Option 1: Clean Voiceover (Vlog Mode)", desc: "Ideal para Vlogs personales y voz natural." },
      opt2: { title: "Option 2: Summary & SFX (Recap)", desc: "Ideal para videos de resumen (Recap) y narración." },
      opt3: { title: "Option 3: Cinematic Character Dubbing", desc: "Ideal para películas y doblaje de personajes." },
      opt4: { title: "Option 4: AI Visual Storyteller (Auto-Script)", desc: "Ideal para guiones automáticos y narración visual." },
    },
  },
  fr: {
    ...EN_STRINGS,
    settings: "Paramètres",
    appLanguage: "Langue de l'application",
    displayMode: "Mode d'affichage",
    appearance: "Apparence",
    darkMode: "Mode sombre",
    lightMode: "Mode clair",
    languages: ALL_LANGUAGES.fr,
    dubbingOptions: {
      opt1: { title: "Option 1: Clean Voiceover (Vlog Mode)", desc: "Idéal pour les Vlogs personnels et la voix naturelle." },
      opt2: { title: "Option 2: Summary & SFX (Recap)", desc: "Idéal pour les vidéos récapitulatives (Recap) et le storytelling." },
      opt3: { title: "Option 3: Cinematic Character Dubbing", desc: "Idéal pour les films et le doublage de personnages." },
      opt4: { title: "Option 4: AI Visual Storyteller (Auto-Script)", desc: "Idéal pour les scripts automatiques et le storytelling visuel." },
    },
  },
  de: {
    ...EN_STRINGS,
    settings: "Einstellungen",
    appLanguage: "App-Sprache",
    displayMode: "Anzeigemodus",
    appearance: "Erscheinungsbild",
    darkMode: "Dunkler Modus",
    lightMode: "Heller Modus",
    languages: ALL_LANGUAGES.de,
    dubbingOptions: {
      opt1: { title: "Option 1: Clean Voiceover (Vlog Mode)", desc: "Am besten für persönliche Vlogs und natürliche Sprache." },
      opt2: { title: "Option 2: Summary & SFX (Recap)", desc: "Am besten für Recap-Videos und Storytelling." },
      opt3: { title: "Option 3: Cinematic Character Dubbing", desc: "Am besten für Filme und Charakter-Synchronisation." },
      opt4: { title: "Option 4: AI Visual Storyteller (Auto-Script)", desc: "Am besten für Auto-Script und visuelles Storytelling." },
    },
  },
  id: {
    ...EN_STRINGS,
    settings: "Pengaturan",
    appLanguage: "Bahasa aplikasi",
    displayMode: "Mode Tampilan",
    appearance: "Tampilan",
    darkMode: "Mode Gelap",
    lightMode: "Mode Terang",
    languages: ALL_LANGUAGES.id,
    dubbingOptions: {
      opt1: { title: "Option 1: Clean Voiceover (Vlog Mode)", desc: "Terbaik untuk Vlog pribadi & suara alami." },
      opt2: { title: "Option 2: Summary & SFX (Recap)", desc: "Terbaik untuk video ringkasan (Recap) & penceritaan." },
      opt3: { title: "Option 3: Cinematic Character Dubbing", desc: "Terbaik untuk film & pengisian suara karakter." },
      opt4: { title: "Option 4: AI Visual Storyteller (Auto-Script)", desc: "Terbaik untuk skrip otomatis & penceritaan visual." },
    },
  },
  pt: {
    ...EN_STRINGS,
    settings: "Configurações",
    appLanguage: "Idioma do aplicativo",
    displayMode: "Modo de exibição",
    appearance: "Aparência",
    darkMode: "Modo escuro",
    lightMode: "Modo claro",
    languages: ALL_LANGUAGES.pt,
    dubbingOptions: {
      opt1: { title: "Option 1: Clean Voiceover (Vlog Mode)", desc: "Ideal para Vlogs pessoais e fala natural." },
      opt2: { title: "Option 2: Summary & SFX (Recap)", desc: "Ideal para vídeos de resumo (Recap) e narrativa." },
      opt3: { title: "Option 3: Cinematic Character Dubbing", desc: "Ideal para filmes e dublagem de personagens." },
      opt4: { title: "Option 4: AI Visual Storyteller (Auto-Script)", desc: "Ideal para roteiros automáticos e narrativa visual." },
    },
  },
  ru: {
    ...EN_STRINGS,
    settings: "Настройки",
    appLanguage: "Язык приложения",
    displayMode: "Режим отображения",
    appearance: "Внешний вид",
    darkMode: "Темный режим",
    lightMode: "Светлый режим",
    languages: ALL_LANGUAGES.ru,
    dubbingOptions: {
      opt1: { title: "Option 1: Clean Voiceover (Vlog Mode)", desc: "Идеально для личных влогов и естественной речи." },
      opt2: { title: "Option 2: Summary & SFX (Recap)", desc: "Идеально для видео-рекапов и сторителлинга." },
      opt3: { title: "Option 3: Cinematic Character Dubbing", desc: "Идеально для фильмов и дубляжа персонажей." },
      opt4: { title: "Option 4: AI Visual Storyteller (Auto-Script)", desc: "Идеально для автоскриптов и визуального сторителлинга." },
    },
  },
  ar: {
    ...EN_STRINGS,
    settings: "الإعدادات",
    appLanguage: "لغة التطبيق",
    displayMode: "وضع العرض",
    appearance: "المظهر",
    darkMode: "الوضع الداكن",
    lightMode: "الوضع الفاتح",
    languages: ALL_LANGUAGES.ar,
    dubbingOptions: {
      opt1: { title: "Option 1: Clean Voiceover (Vlog Mode)", desc: "الأفضل لمدونات الفيديو الشخصية والكلام الطبيعي." },
      opt2: { title: "Option 2: Summary & SFX (Recap)", desc: "الأفضل لفيديوهات الملخص (Recap) وسرد القصص." },
      opt3: { title: "Option 3: Cinematic Character Dubbing", desc: "الأفضل للأفلام ودبلجة الشخصيات." },
      opt4: { title: "Option 4: AI Visual Storyteller (Auto-Script)", desc: "الأفضل للسيناريو التلقائي وسرد القصص المرئي." },
    },
  },
  it: {
    ...EN_STRINGS,
    settings: "Impostazioni",
    appLanguage: "Lingua dell'app",
    displayMode: "Modalità di visualizzazione",
    appearance: "Aspetto",
    darkMode: "Modalità scura",
    lightMode: "Modalità chiara",
    languages: ALL_LANGUAGES.it,
    dubbingOptions: {
      opt1: { title: "Option 1: Clean Voiceover (Vlog Mode)", desc: "Ideale per Vlog personali e parlato naturale." },
      opt2: { title: "Option 2: Summary & SFX (Recap)", desc: "Ideale per video di riepilogo (Recap) e narrazione." },
      opt3: { title: "Option 3: Cinematic Character Dubbing", desc: "Ideale per film e doppiaggio di personaggi." },
      opt4: { title: "Option 4: AI Visual Storyteller (Auto-Script)", desc: "Ideale per script automatici e narrazione visiva." },
    },
  },
  tr: {
    ...EN_STRINGS,
    settings: "Ayarlar",
    appLanguage: "Uygulama dili",
    displayMode: "Görünüm Modu",
    appearance: "Görünüm",
    darkMode: "Karanlık mod",
    lightMode: "Aydınlık mod",
    languages: ALL_LANGUAGES.tr,
    dubbingOptions: {
      opt1: { title: "Option 1: Clean Voiceover (Vlog Mode)", desc: "Kişisel Vlog'lar ve doğal konuşma için en iyisi." },
      opt2: { title: "Option 2: Summary & SFX (Recap)", desc: "Özet videoları (Recap) ve hikaye anlatımı için en iyisi." },
      opt3: { title: "Option 3: Cinematic Character Dubbing", desc: "Filmler ve karakter seslendirmesi için en iyisi." },
      opt4: { title: "Option 4: AI Visual Storyteller (Auto-Script)", desc: "Otomatik senaryo ve görsel hikaye anlatımı için en iyisi." },
    },
  },
  ph: {
    ...EN_STRINGS,
    settings: "Mga Setting",
    appLanguage: "Wika ng app",
    displayMode: "Display Mode",
    appearance: "Hitsura",
    darkMode: "Dark mode",
    lightMode: "Light mode",
    languages: ALL_LANGUAGES.ph,
    dubbingOptions: {
      opt1: { title: "Option 1: Clean Voiceover (Vlog Mode)", desc: "Pinakamusay para sa personal Vlogs at natural na pananalita." },
      opt2: { title: "Option 2: Summary & SFX (Recap)", desc: "Pinakamusay para sa recap videos at pagkukuwento." },
      opt3: { title: "Option 3: Cinematic Character Dubbing", desc: "Pinakamusay para sa mga pelikula at pag-dub ng character." },
      opt4: { title: "Option 4: AI Visual Storyteller (Auto-Script)", desc: "Pinakamusay para sa auto-script at visual storytelling." },
    },
  },
  ms: {
    ...EN_STRINGS,
    settings: "Tetapan",
    appLanguage: "Bahasa aplikasi",
    displayMode: "Mod Paparan",
    appearance: "Penampilan",
    darkMode: "Mod Gelap",
    lightMode: "Mod Cerah",
    languages: ALL_LANGUAGES.ms,
    dubbingOptions: {
      opt1: { title: "Option 1: Clean Voiceover (Vlog Mode)", desc: "Terbaik untuk Vlog peribadi & ucapan semula jadi." },
      opt2: { title: "Option 2: Summary & SFX (Recap)", desc: "Terbaik untuk video ringkasan (Recap) & penceritaan." },
      opt3: { title: "Option 3: Cinematic Character Dubbing", desc: "Terbaik untuk filem & sulih suara watak." },
      opt4: { title: "Option 4: AI Visual Storyteller (Auto-Script)", desc: "Terbaik untuk skrip automatik & penceritaan visual." },
    },
  },
  bn: {
    ...EN_STRINGS,
    settings: "সেটিংস",
    appLanguage: "অ্যাপের ভাষা",
    displayMode: "ডিসপ্লে মোড",
    appearance: "চেহারা",
    darkMode: "ডার্ক মোড",
    lightMode: "লাইট মোড",
    languages: ALL_LANGUAGES.bn,
    dubbingOptions: {
      opt1: { title: "Option 1: Clean Voiceover (Vlog Mode)", desc: "ব্যক্তিগত ভ্লগ এবং স্বাভাবিক বক্তৃতার জন্য সেরা।" },
      opt2: { title: "Option 2: Summary & SFX (Recap)", desc: "রিকা্যাপ ভিডিও এবং গল্প বলার জন্য সেরা।" },
      opt3: { title: "Option 3: Cinematic Character Dubbing", desc: "চলচ্চিত্র এবং চরিত্র ডাবিংয়ের জন্য সেরা।" },
      opt4: { title: "Option 4: AI Visual Storyteller (Auto-Script)", desc: "অটো-স্ক্রিপ্ট এবং ভিজ্যুয়াল storytelling এর জন্য সেরা।" },
    },
  },
}
