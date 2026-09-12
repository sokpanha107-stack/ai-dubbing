"use client"

import { useEffect, useRef, useState } from "react"
import { Bot, Mic, Send, Sparkles, X } from "lucide-react"
import { useI18n, type LangCode } from "@/lib/i18n"

type Msg = { role: "user" | "bot"; text: string }

// Keyword sets that define the ONLY topics the assistant is allowed to discuss.
// If a question matches none of these app-related topics, it is refused.
const APP_TOPICS: Record<string, { keywords: string[]; answer: Record<LangCode, string> }> = {
  upload: {
    keywords: [
      "upload",
      "drop",
      "file",
      "video",
      "add",
      "อัปโหลด",
      "ไฟล์",
      "วิดีโอ",
      "上传",
      "文件",
      "视频",
      "tải",
      "tệp",
      "video",
      "អាប់ឡូត",
      "ឯកសារ",
      "វីដេអូ",
      "ទម្លាក់",
    ],
    answer: {
      en: "Tap the large upload box on the home screen, or drag a video file onto it. There is no duration or size limit — any MP4, MOV, or WEBM works.",
      zh: "点击主屏幕上的大上传框，或将视频文件拖入其中。没有时长或大小限制——MP4、MOV 或 WEBM 都可以。",
      km: "ចុចប្រអប់អាប់ឡូតធំនៅលើទំព័រដើម ឬអូសឯកសារវីដេអូដាក់ចូល។ គ្មានការកំណត់រយៈពេល ឬទំហំទេ — MP4, MOV, WEBM សុទ្ធតែប្រើបាន។",
      th: "แตะกล่องอัปโหลดขนาดใหญ่บนหน้าหลัก หรือลากไฟล์วิดีโอมาวาง ไม่มีข้อจำกัดความยาวหรือขนาด — รองรับ MP4, MOV, WEBM",
      vi: "Nhấn vào ô tải lên lớn trên màn hình chính, hoặc kéo tệp video vào đó. Không giới hạn thời lượng hay dung lượng — MP4, MOV, WEBM đều được.",
    },
  },
  languages: {
    keywords: [
      "language",
      "languages",
      "english",
      "chinese",
      "khmer",
      "thai",
      "vietnamese",
      "support",
      "ภาษา",
      "รองรับ",
      "语言",
      "支持",
      "ngôn ngữ",
      "hỗ trợ",
      "ភាសា",
      "គាំទ្រ",
    ],
    answer: {
      en: "The app supports 5 languages: English, Chinese, Khmer, Thai, and Vietnamese. Pick a source and target language, and use the swap button to reverse them.",
      zh: "本应用支持 5 种语言：英语、中文、高棉语、泰语和越南语。选择源语言和目标语言，并可用交换按钮互换。",
      km: "App គាំទ្រភាសាចំនួន ៥៖ អង់គ្លេស ចិន ខ្មែរ ថៃ និងវៀតណាម។ ជ្រើសរើសភាសាដើម និងភាសាគោលដៅ ហើយប្រើប៊ូតុងប្តូរដើម្បីត្រឡប់វិញ។",
      th: "แอปรองรับ 5 ภาษา: อังกฤษ จีน เขมร ไทย และเวียดนาม เลือกภาษาต้นทางและปลายทาง แล้วใช้ปุ่มสลับเพื่อสลับกัน",
      vi: "Ứng dụng hỗ trợ 5 ngôn ngữ: Anh, Trung, Khmer, Thái và Việt. Chọn ngôn ngữ gốc và đích, dùng nút hoán đổi để đảo ngược.",
    },
  },
  autopilot: {
    keywords: [
      "auto-pilot",
      "autopilot",
      "auto pilot",
      "start",
      "begin",
      "process",
      "automatic",
      "เริ่ม",
      "อัตโนมัติ",
      "开始",
      "自动",
      "bắt đầu",
      "tự động",
      "ចាប់ផ្តើម",
      "ស្វ័យប្រវត្តិ",
    ],
    answer: {
      en: "After choosing your video and languages, tap the big 'Start Auto-Pilot' button. The AI then runs 100% automatically — extracting audio, transcribing, translating, cloning the voice, and merging it back.",
      zh: "选择视频和语言后，点击大大的“开始自动驾驶”按钮。AI 将 100% 自动运行——提取音频、转写、翻译、克隆声音并合并回视频。",
      km: "បន្ទាប់ពីជ្រើសរើសវីដេអូ និងភាសា ចុចប៊ូតុងធំ 'ចាប់ផ្តើមស្វ័យប្រវត្តិ'។ AI នឹងដំណើរការស្វ័យប្រវត្តិ ១០០% — បំបែកសំឡេង បម្លែងជាអក្សរ បកប្រែ ក្លូនសំឡេង និងផ្សំវិញ។",
      th: "หลังเลือกวิดีโอและภาษาแล้ว แตะปุ่มใหญ่ 'เริ่ม Auto-Pilot' จากนั้น AI จะทำงานอัตโนมัติ 100% — แยกเสียง ถอดข้อความ แปล โคลนเสียง และรวมกลับ",
      vi: "Sau khi chọn video và ngôn ngữ, nhấn nút lớn 'Bắt đầu Auto-Pilot'. AI sẽ chạy hoàn toàn tự động — tách âm thanh, chuyển văn bản, dịch, nhân bản giọng và ghép lại.",
    },
  },
  emotion: {
    keywords: [
      "emotion",
      "tone",
      "feeling",
      "voice",
      "pace",
      "speed",
      "rhythm",
      "clone",
      "อารมณ์",
      "โทน",
      "เสียง",
      "情感",
      "音调",
      "声音",
      "cảm xúc",
      "giọng",
      "âm sắc",
      "អារម្មណ៍",
      "ទឹកដម",
      "សំឡេង",
      "ល្បឿន",
    ],
    answer: {
      en: "Yes — the AI preserves the original emotion (laughter, anger, fear, joy), keeps the pitch and dynamic range natural, and matches the speaking pace and rhythm to the original video.",
      zh: "是的——AI 会保留原始情感（笑声、愤怒、恐惧、喜悦），保持音调和动态范围自然，并使语速和节奏与原视频匹配。",
      km: "បាទ/ចាស — AI រក្សាអារម្មណ៍ដើម (សំណើច ខឹង ភ័យ រីករាយ) រក្សាទឹកដម និងកម្រិតសំឡេងឱ្យធម្មជាតិ ហើយធ្វើឱ្យល្បឿន និងចង្វាក់និយាយត្រូវគ្នាជាមួយវីដេអូដើម។",
      th: "ใช่ — AI จะรักษาอารมณ์ต้นฉบับ (หัวเราะ โกรธ กลัว สุข) คงโทนเสียงให้เป็นธรรมชาติ และจับคู่จังหวะการพูดกับวิดีโอต้นฉบับ",
      vi: "Có — AI giữ nguyên cảm xúc gốc (cười, giận, sợ, vui), giữ âm sắc tự nhiên và khớp nhịp độ nói với video gốc.",
    },
  },
  context: {
    keywords: [
      "context",
      "accurate",
      "accuracy",
      "meaning",
      "wrong",
      "number",
      "guard",
      "บริบท",
      "ความหมาย",
      "语境",
      "准确",
      "含义",
      "ngữ cảnh",
      "chính xác",
      "ý nghĩa",
      "បរិបទ",
      "អត្ថន័យ",
      "ត្រឹមត្រូវ",
    ],
    answer: {
      en: "The Context Guard checks that words, phrases, and numbers stay accurate across all 5 languages, so the original meaning is never distorted during translation.",
      zh: "语境守护会检查词语、短语和数字在全部 5 种语言中保持准确，因此翻译过程中原意绝不会被扭曲。",
      km: "ការពារបរិបទ ពិនិត្យថាពាក្យ ឃ្លា និងលេខ នៅតែត្រឹមត្រូវគ្រប់ភាសាទាំង ៥ ដូច្នេះអត្ថន័យដើមមិនត្រូវបានប្រែច្រឡំពេលបកប្រែឡើយ។",
      th: "ระบบป้องกันบริบทจะตรวจสอบให้คำ วลี และตัวเลขถูกต้องในทั้ง 5 ภาษา จึงไม่ทำให้ความหมายต้นฉบับผิดเพี้ยนระหว่างการแปล",
      vi: "Bộ Bảo Vệ Ngữ Cảnh kiểm tra để từ ngữ, cụm từ và con số luôn chính xác trên cả 5 ngôn ngữ, nên ý nghĩa gốc không bao giờ bị sai lệch khi dịch.",
    },
  },
  download: {
    keywords: [
      "download",
      "save",
      "export",
      "mp4",
      "result",
      "ดาวน์โหลด",
      "บันทึก",
      "下载",
      "保存",
      "tải xuống",
      "lưu",
      "ទាញយក",
      "រក្សាទុក",
      "លទ្ធផល",
    ],
    answer: {
      en: "When dubbing finishes, the Result screen shows a preview player. Tap 'Download MP4' to save the dubbed video, or 'Start Over' to dub another one.",
      zh: "配音完成后，结果页面会显示预览播放器。点击“下载 MP4”保存配音视频，或点击“重新开始”处理另一个。",
      km: "ពេលបញ្ចូលសំឡេងរួច ទំព័រលទ្ធផលបង្ហាញកម្មវិធីមើលជាមុន។ ចុច 'ទាញយក MP4' ដើម្បីរក្សាទុកវីដេអូ ឬ 'ធ្វើម្តងទៀត' ដើម្បីធ្វើវីដេអូថ្មី។",
      th: "เมื่อพากย์เสร็จ หน้าผลลัพธ์จะแสดงตัวเล่นพรีวิว แตะ 'ดาวน์โหลด MP4' เพื่อบันทึกวิดีโอ หรือ 'เริ่มใหม่' เพื่อทำอีกอัน",
      vi: "Khi lồng tiếng xong, màn hình Kết quả hiển thị trình xem trước. Nhấn 'Tải MP4' để lưu video, hoặc 'Làm lại' để làm video khác.",
    },
  },
  appearance: {
    keywords: [
      "dark",
      "light",
      "theme",
      "eye",
      "blue light",
      "night",
      "โหมด",
      "ธีม",
      "ตา",
      "深色",
      "浅色",
      "护眼",
      "主题",
      "tối",
      "sáng",
      "mắt",
      "giao diện",
      "ខ្មៅ",
      "ស",
      "ភ្នែក",
    ],
    answer: {
      en: "Open Settings (top-right) to switch between Dark and Light mode, and turn on Eye Care to apply a warm blue-light filter for comfortable night use. You can adjust the filter strength too.",
      zh: "打开设置（右上角）即可在深色和浅色模式之间切换，并开启护眼模式以应用暖色蓝光滤镜，方便夜间使用。还可以调节滤镜强度。",
      km: "បើកការកំណត់ (កាំខាងស្តាំ) ដើម្បីប្តូររវាងផ្ទាំងពណ៌ខ្មៅ និងស និងបើកការពារភ្នែក ដើម្បីប្រើតម្រងពន្លឺខៀវពណ៌ក្តៅសម្រាប់ការប្រើពេលយប់។ អ្នកអាចលៃតម្រូវកម្រិតតម្រងបានផងដែរ។",
      th: "เปิดการตั้งค่า (มุมขวาบน) เพื่อสลับโหมดมืด/สว่าง และเปิดถนอมสายตาเพื่อใช้ฟิลเตอร์กรองแสงสีฟ้าโทนอุ่นสำหรับใช้งานกลางคืน ปรับความเข้มได้ด้วย",
      vi: "Mở Cài đặt (góc trên bên phải) để chuyển giữa chế độ Tối và Sáng, và bật Bảo vệ mắt để dùng bộ lọc ánh sáng xanh tông ấm cho ban đêm. Bạn cũng có thể chỉnh cường độ lọc.",
    },
  },
}

function answerFor(input: string, lang: LangCode, refusal: string): string {
  const q = input.toLowerCase()
  let best: { key: string; score: number } | null = null
  for (const [key, topic] of Object.entries(APP_TOPICS)) {
    const score = topic.keywords.reduce((n, kw) => (q.includes(kw.toLowerCase()) ? n + 1 : n), 0)
    if (score > 0 && (!best || score > best.score)) best = { key, score }
  }
  if (!best) return refusal
  return APP_TOPICS[best.key].answer[lang]
}

const SPEECH_LANG: Record<LangCode, string> = {
  en: "en-US",
  zh: "zh-CN",
  km: "km-KH",
  th: "th-TH",
  vi: "vi-VN",
}

export function DubbingAssistant() {
  const { t, lang } = useI18n()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Msg[]>([])
  const [listening, setListening] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  // Reset the greeting whenever the panel opens or the language changes.
  useEffect(() => {
    if (open) setMessages([{ role: "bot", text: t.assistantGreeting }])
  }, [open, t.assistantGreeting])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const reply = answerFor(trimmed, lang, t.assistantRefusal)
    setMessages((m) => [...m, { role: "user", text: trimmed }, { role: "bot", text: reply }])
    setInput("")
  }

  const startVoice = () => {
    const SR =
      typeof window !== "undefined" ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition : null
    if (!SR) {
      setMessages((m) => [...m, { role: "bot", text: t.assistantPlaceholder }])
      return
    }
    const rec = new SR()
    rec.lang = SPEECH_LANG[lang]
    rec.interimResults = false
    rec.maxAlternatives = 1
    rec.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript
      setListening(false)
      send(transcript)
    }
    rec.onerror = () => setListening(false)
    rec.onend = () => setListening(false)
    recognitionRef.current = rec
    setListening(true)
    rec.start()
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t.assistantOpen}
          className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/40 transition active:scale-90"
          style={{ bottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" aria-hidden="true" />
          <Bot className="relative h-6 w-6" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="relative flex h-[85dvh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl border border-border bg-card shadow-2xl sm:h-[600px] sm:rounded-3xl">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 border-b border-border bg-secondary/40 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Bot className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold leading-tight text-foreground">{t.assistantTitle}</p>
                  <p className="text-[11px] text-muted-foreground">{t.assistantSubtitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-secondary hover:text-foreground"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] text-pretty rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md bg-secondary text-foreground"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {/* Suggestion chips (only before the first user turn) */}
              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {t.assistantSuggestions.map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => send(s)}
                      className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-primary hover:text-primary"
                    >
                      <Sparkles className="h-3 w-3 text-primary" />
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div
              className="flex items-center gap-2 border-t border-border bg-secondary/30 px-3 py-3"
              style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
            >
              <button
                type="button"
                onClick={startVoice}
                aria-label={t.assistantVoice}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition active:scale-95 ${
                  listening
                    ? "border-destructive bg-destructive/15 text-destructive"
                    : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                <Mic className={`h-5 w-5 ${listening ? "animate-pulse" : ""}`} />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) send(input)
                }}
                placeholder={listening ? t.assistantListening : t.assistantPlaceholder}
                className="min-w-0 flex-1 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40"
              />
              <button
                type="button"
                onClick={() => send(input)}
                aria-label={t.assistantSend}
                disabled={!input.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground transition active:scale-95 disabled:opacity-40"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
