"use client"

import { useState } from "react"
import {
  AudioLines,
  CheckCircle2,
  Download,
  FileVideo,
  Loader2,
  RotateCcw,
  Sparkles,
  UploadCloud,
  X,
  Layers,
} from "lucide-react"
import { useTranslations } from "next-intl"
import { SAVPD_CONSTANTS } from "@/lib/constants"
import { DUB_MODES, type DubMode } from "@/lib/dub-modes"

export const DUB_LANGS = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "km", name: "ភាសាខ្មែរ", flag: "🇰🇭" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "th", name: "ไทย", flag: "🇹🇭" },
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "ph", name: "Filipino", flag: "🇵🇭" },
  { code: "ms", name: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
] as const

type LangCode = typeof DUB_LANGS[number]["code"]
type Status = "idle" | "processing" | "done"

// ឃ្លាំងទិន្នន័យណែនាំ ២០ ភាសា និងព័ត៌មានលម្អិតឯកទេស
const DUB_MODE_DETAILS: Record<
  DubMode,
  {
    titles: Record<string, string>
    recommendations: Record<string, string>
    specialization: string
  }
> = {
  clean_vlog: {
    titles: {
      en: "Option 1: Clean Voiceover (Vlog Mode)",
      km: "ជម្រើស ១៖ សំឡេងស្អាតធម្មជាតិ (Vlog Mode)",
      zh: "选项 1：清晰画外音 (Vlog 模式)",
      th: "ตัวเลือก 1: เสียงบรรยายชัดเจน (โหมด Vlog)",
      vi: "Tùy chọn 1: Lồng tiếng sạch (Chế độ Vlog)",
      ja: "オプション 1：クリーンボイスオーバー (Vlog モード)",
      ko: "옵션 1: 클린 보이스오버 (브이로그 모드)",
      hi: "विकल्प 1: स्पष्ट वॉयसओवर (व्लॉग मोड)",
      es: "Opción 1: Locución Limpia (Modo Vlog)",
      fr: "Option 1 : Voix Off Claire (Mode Vlog)",
      de: "Option 1: Sauberes Voiceover (Vlog-Modus)",
      id: "Opsi 1: Sulih Suara Jernih (Mode Vlog)",
      pt: "Opção 1: Narração Limpa (Modo Vlog)",
      ru: "Опция 1: Чистая озвучка (Режим Vlog)",
      ar: "الخيار 1: تعليق صوتي واضح (وضع المدونة)",
      it: "Opzione 1: Voce Fuori Campo Chiara (Modalità Vlog)",
      tr: "Seçenek 1: Net Seslendirme (Vlog Modu)",
      ph: "Opsyon 1: Malinaw na Voiceover (Vlog Mode)",
      ms: "Pilihan 1: Alih Suara Jelas (Mod Vlog)",
      bn: "বিকল্প ১: স্পষ্ট ভয়েসওভার (ভ্লগ মোড)",
    },
    recommendations: {
      en: "Recommended for: Personal Vlogs, Tutorials, Interviews & Podcasts.",
      km: "ណែនាំសម្រាប់៖ វីដេអូ Vlog ផ្ទាល់ខ្លួន, ការបង្រៀន (Tutorials), កិច្ចសម្ភាសន៍ និងការនិយាយទូទៅ។",
      zh: "推荐用于：个人 Vlog、教程、采访和播客视频。",
      th: "แนะนำสำหรับ: วล็อกส่วนตัว, วิดีโอสอน, บทสัมภาษณ์ และพอดแคสต์",
      vi: "Khuyên dùng cho: Vlog cá nhân, video hướng dẫn, phỏng vấn và podcast.",
      ja: "推奨：個人のVlog、チュートリアル、インタビュー、ポッドキャスト。",
      ko: "추천 대상: 개인 브이로그, 튜토리얼, 인터뷰 및 팟캐스트 영상.",
      hi: "इसके लिए अनुशंसित: व्यक्तिगत व्लॉग, ट्यूटोरियल, साक्षात्कार और पॉडकास्ट।",
      es: "Recomendado para: Vlogs personales, tutoriales, entrevistas y podcasts.",
      fr: "Recommandé pour : Vlogs personnels, tutoriels, interviews et podcasts.",
      de: "Empfohlen für: Persönliche Vlogs, Tutorials, Interviews und Podcasts.",
      id: "Direkomendasikan untuk: Vlog pribadi, tutorial, wawancara, dan podcast.",
      pt: "Recomendado para: Vlogs pessoais, tutoriais, entrevistas e podcasts.",
      ru: "Рекомендуется для: Личных влогов, видеоуроков, интервью и подкастов.",
      ar: "موصى به لـ: مدونات الفيديو الشخصية، الدروس التعليمية، المقابلات والبودكاست.",
      it: "Consigliato per: Vlog personali, tutorial, interviste e podcast.",
      tr: "Önerilen kullanım: Kişisel Vloglar, eğitim videoları, röportajlar ve podcastler.",
      ph: "Inirerekomenda para sa: Personal na Vlogs, tutorials, panayam, at podcasts.",
      ms: "Disyorkan untuk: Vlog peribadi, tutorial, temu bual, dan podcast.",
      bn: "প্রস্তাবিত: ব্যক্তিগত ভ্লগ, টিউটোরিয়াল, সাক্ষাৎকার এবং পডকাস্ট।",
    },
    specialization: "Specialization: Original Voice Clarity, Background Noise Cancellation & Natural Lip Cadence.",
  },
  summary_sfx: {
    titles: {
      en: "Option 2: Summary & SFX (Recap Mode)",
      km: "ជម្រើស ២៖ សង្ខេប និងសំឡេង SFX (Recap Mode)",
      zh: "选项 2：解说与音效 (Recap 模式)",
      th: "ตัวเลือก 2: สรุปเรื่องและเอฟเฟกต์เสียง (โหมด Recap)",
      vi: "Tùy chọn 2: Tóm tắt & Hiệu ứng SFX (Chế độ Recap)",
      ja: "オプション 2：要約と音響効果 (Recap モード)",
      ko: "옵션 2: 요약 및 효과음 (리캡 모드)",
      hi: "विकल्प 2: सारांश और ध्वनि प्रभाव (रीकैप मोड)",
      es: "Opción 2: Resumen y Efectos SFX (Modo Recap)",
      fr: "Option 2 : Résumé et Effets SFX (Mode Récap)",
      de: "Option 2: Zusammenfassung & SFX (Recap-Modus)",
      id: "Opsi 2: Ringkasan & Efek SFX (Mode Rekap)",
      pt: "Opção 2: Resumo e Efeitos SFX (Modo Recap)",
      ru: "Опция 2: Краткий пересказ и SFX (Режим Recap)",
      ar: "الخيار 2: ملخص ومؤثرات صوتية (وضع الملخص)",
      it: "Opzione 2: Riepilogo ed Effetti SFX (Modalità Recap)",
      tr: "Seçenek 2: Özet ve Ses Efektleri (Recap Modu)",
      ph: "Opsyon 2: Buod at SFX Effects (Recap Mode)",
      ms: "Pilihan 2: Ringkasan & Kesan SFX (Mod Rekap)",
      bn: "বিকল্প ২: সারাংশ এবং সাউন্ড এফেক্ট (রিক্যাপ মোড)",
    },
    recommendations: {
      en: "Recommended for: Movie Recaps, Anime Overviews, News Summaries & Documentaries.",
      km: "ណែនាំសម្រាប់៖ វីដេអូសង្ខេបរឿង (Movie Recap), សម្រាយរឿង Anime, ព័ត៌មាន និងការនិទានរឿងខ្លីៗ។",
      zh: "推荐用于：电影解说、动漫概览、新闻速递和解说短片。",
      th: "แนะนำสำหรับ: สรุปหนัง, สปอยล์อนิเมะ, สรุปข่าว และสารคดีสั้น",
      vi: "Khuyên dùng cho: Tóm tắt phim, review anime, tin tức ngắn và phim tài liệu.",
      ja: "推奨：映画の要約、アニメ紹介、ニュースまとめ、ドキュメンタリー。",
      ko: "추천 대상: 영화 요약, 애니메이션 리뷰, 뉴스 요약 및 다큐멘터리 영상.",
      hi: "इसके लिए अनुशंसित: मूवी रीकैप, एनीमे सारांश, समाचार और वृत्तचित्र।",
      es: "Recomendado para: Resúmenes de películas, anime, noticias y documentales.",
      fr: "Recommandé pour : Résumés de films, récapitulatifs d'anime, actualités et documentaires.",
      de: "Empfohlen für: Film-Zusammenfassungen, Anime-Recaps, News und Dokumentationen.",
      id: "Direkomendasikan untuk: Alur cerita film, ringkasan anime, berita harian, dan dokumenter.",
      pt: "Recomendado para: Resumos de filmes, animes, notícias e documentários curtos.",
      ru: "Рекомендуется для: Обзоров фильмов, аниме, новостных сводок и документалистики.",
      ar: "موصى به لـ: ملخصات الأفلام، مراجعات الأنمي، ملخصات الأخبار والوثائقيات.",
      it: "Consigliato per: Riassunti di film, recensioni di anime, notizie e documentari.",
      tr: "Önerilen kullanım: Film özetleri, anime incelemeleri, haber özetleri ve belgeseller.",
      ph: "Inirerekomenda para sa: Movie recaps, anime summaries, balita, at maikling dokumentaryo.",
      ms: "Disyorkan untuk: Ulasan filem, ringkasan anime, berita harian, dan dokumentari ringkas.",
      bn: "প্রস্তাবিত: মুভি রিক্যাপ, অ্যানিমে সারাংশ, খবরের সারাংশ এবং ডকুমেন্টারি।",
    },
    specialization: "Specialization: Adaptive Audio Ducking, Intelligent SFX Preservation & Fast-Paced Narration Sync.",
  },
  cinematic: {
    titles: {
      en: "Option 3: Cinematic Character Dubbing",
      km: "ជម្រើស ៣៖ បញ្ចូលសំឡេងតួអង្គភាពយន្ត (Cinematic)",
      zh: "选项 3：电影级角色配音 (Cinematic)",
      th: "ตัวเลือก 3: พากย์เสียงตัวละครภาพยนตร์ (Cinematic)",
      vi: "Tùy chọn 3: Lồng tiếng nhân vật điện ảnh (Cinematic)",
      ja: "オプション 3：映画キャラクター吹き替え (Cinematic)",
      ko: "옵션 3: 영화 캐릭터 더빙 (시네마틱)",
      hi: "विकल्प 3: सिनेमाई चरित्र डबिंग (सिनेमैटिक)",
      es: "Opción 3: Doblaje de Personajes Cinematográficos",
      fr: "Option 3 : Doublage de Personnages Cinématographiques",
      de: "Option 3: Filmische Charakter-Synchronisation",
      id: "Opsi 3: Sulih Suara Karakter Sinematik",
      pt: "Opção 3: Dublagem de Personagens Cinematográficos",
      ru: "Опция 3: Кинематографичный дубляж персонажей",
      ar: "الخيار 3: الدبلجة السينمائية للشخصيات",
      it: "Opzione 3: Doppiaggio Cinematografico dei Personaggi",
      tr: "Seçenek 3: Sinematik Karakter Seslendirme",
      ph: "Opsyon 3: Cinematic Dubbing ng Tauhan",
      ms: "Pilihan 3: Alih Suara Watak Sinematik",
      bn: "বিকল্প ৩: সিনেমাটিক চরিত্র ডাবিং",
    },
    recommendations: {
      en: "Recommended for: Feature Films, TV Dramas, Theatrical Shorts & Animated Cartoons.",
      km: "ណែនាំសម្រាប់៖ ខ្សែភាពយន្ត (Feature Films), រឿងភាគ (TV Dramas), រឿងខ្លី និងគំនូរជីវចល។",
      zh: "推荐用于：院线电影、电视剧、戏剧短片和动画长片。",
      th: "แนะนำสำหรับ: ภาพยนตร์, ละครซีรีส์, หนังสั้น และแอนิเมชัน",
      vi: "Khuyên dùng cho: Phim điện ảnh, phim truyền hình, phim ngắn và phim hoạt hình.",
      ja: "推奨：長編映画、ドラマ、劇映画、アニメーション作品。",
      ko: "추천 대상: 장편 영화, TV 드라마, 단편 영화 및 애니메이션 시리즈.",
      hi: "इसके लिए अनुशंसित: फीचर फिल्में, टीवी नाटक, नाटकीय लघु फिल्में और एनीमेशन।",
      es: "Recomendado para: Largometrajes, series de televisión, cortometrajes y animación.",
      fr: "Recommandé pour : Longs métrages, séries télévisées, courts métrages et dessins animés.",
      de: "Empfohlen für: Spielfilme, Fernsehserien, Kurzfilme und Zeichentrickfilme.",
      id: "Direkomendasikan untuk: Film bioskop, serial TV, drama, dan kartun animasi.",
      pt: "Recomendado para: Longas-metragens, séries de TV, curtas-metragens e animações.",
      ru: "Рекомендуется для: Художественных фильмов, сериалов, короткометражек и мультфильмов.",
      ar: "موصى به لـ: الأفلام السينمائية، المسلسلات الدرامية، الأفلام القصيرة والرسوم المتحركة.",
      it: "Consigliato per: Film cinematografici, serie TV, cortometraggi e animazioni.",
      tr: "Önerilen kullanım: Uzun metrajlı filmler, diziler, kısa filmler ve animasyonlar.",
      ph: "Inirerekomenda para sa: Mga pelikula, teleserye, short films, at animation.",
      ms: "Disyorkan untuk: Filem cereka, drama TV, filem pendek, dan animasi kartun.",
      bn: "প্রস্তাবিত: পূর্ণদৈর্ঘ্য চলচ্চিত্র, টিভি নাটক, শর্ট ফিল্ম এবং অ্যানিমেশন।",
    },
    specialization: "Specialization: Multi-Speaker Emotional Voice Cloning, Pitch Modulation & True-to-Scene Spatial Audio.",
  },
  ai_visual: {
    titles: {
      en: "Option 4: AI Visual Storyteller",
      km: "ជម្រើស ៤៖ បង្កើតសាច់រឿងតាមរូបភាព AI (Storyteller)",
      zh: "选项 4：AI 视觉叙述者 (Visual Storyteller)",
      th: "ตัวเลือก 4: นักเล่าเรื่องด้วยภาพ AI (Visual Storyteller)",
      vi: "Tùy chọn 4: Người kể chuyện bằng hình ảnh AI",
      ja: "オプション 4：AIビジュアルストーリーテラー",
      ko: "옵션 4: AI 시각적 스토리텔러 (비주얼 스토리)",
      hi: "विकल्प 4: एआई विजुअल स्टोरीटेलर",
      es: "Opción 4: Narrador Visual con IA",
      fr: "Option 4 : Conteur Visuel par IA",
      de: "Option 4: KI-Visueller Geschichtenerzähler",
      id: "Opsi 4: Pencerita Visual Berbasis AI",
      pt: "Opção 4: Contador de Histórias Visual por IA",
      ru: "Опция 4: Визуальный рассказчик на базе ИИ",
      ar: "الخيار 4: الراوي البصري بالذكاء الاصطناعي",
      it: "Opzione 4: Narratore Visivo con IA",
      tr: "Seçenek 4: Yapay Zeka Görsel Hikaye Anlatıcı",
      ph: "Opsyon 4: AI Visual Storyteller",
      ms: "Pilihan 4: Pencerita Visual AI",
      bn: "বিকল্প ৪: এআই ভিজ্যুয়াল স্টোরিটেলার",
    },
    recommendations: {
      en: "Recommended for: Silent Videos, B-Roll Showcases, Nature Footage & Product Demos.",
      km: "ណែនាំសម្រាប់៖ វីដេអូគ្មានសំឡេងនិយាយ, ការបង្ហាញប្លង់ B-Roll, ទេសភាពធម្មជាតិ និងការបង្ហាញផលិតផល។",
      zh: "推荐用于：无声视频、空镜展示、自然风光和产品演示视频。",
      th: "แนะนำสำหรับ: วิดีโอไม่มีเสียงพูด, ฟุตเทจ B-Roll, ภาพธรรมชาติ และวิดีโอพรีเซนต์สินค้า",
      vi: "Khuyên dùng cho: Video không lời thoại, cảnh quay B-Roll, phong cảnh và giới thiệu sản phẩm.",
      ja: "推奨：音声なし動画、Bロール映像、自然映像、製品デモ動画。",
      ko: "추천 대상: 무음 영상, B-Roll 영상, 자연 풍경 및 제품 시연 영상.",
      hi: "इसके लिए अनुशंसित: मूक वीडियो, बी-रोल फुटेज, प्रकृति के दृश्य और उत्पाद डेमो।",
      es: "Recomendado para: Videos sin voz, metraje B-Roll, tomas de naturaleza y demos de productos.",
      fr: "Recommandé pour : Vidéos muettes, plans de coupe (B-Roll), nature et présentations de produits.",
      de: "Empfohlen für: Stumme Videos, B-Roll-Footage, Naturaufnahmen und Produktdemos.",
      id: "Direkomendasikan untuk: Video tanpa narasi, footage B-Roll, pemandangan alam, dan demo produk.",
      pt: "Recomendado para: Vídeos sem fala, cenas B-Roll, imagens da natureza e demonstrações de produtos.",
      ru: "Рекомендуется для: Немого видео, B-Roll видеоряда, съемок природы и демонстрации товаров.",
      ar: "موصى به لـ: مقاطع الفيديو الصامتة، لقطات B-Roll، لقطات الطبيعة وعروض المنتجات.",
      it: "Consigliato per: Video muti, filmati B-Roll, riprese della natura e presentazioni di prodotti.",
      tr: "Önerilen kullanım: Sessiz videolar, B-Roll görüntüleri, doğa çekimleri ve ürün tanıtımları.",
      ph: "Inirerekomenda para sa: Silent videos, B-Roll footage, kalikasan, at product demos.",
      ms: "Disyorkan untuk: Video tanpa suara, rakaman B-Roll, pemandangan alam, dan demonstrasi produk.",
      bn: "প্রস্তাবিত: নিঃশব্দ ভিডিও, বি-রোল ফুটেজ, প্রকৃতির দৃশ্য এবং পণ্য ডেমো।",
    },
    specialization: "Specialization: Computer Vision Scene Captioning, Contextual Script Synthesis & AI Voice Acting.",
  },
}

export function DashboardScreenContainer({
  file,
  videoUrl,
  dragging,
  setDragging,
  acceptFile,
  inputRef,
  reset,
  targetLang,
  setTargetLang,
  start,
  status,
  stage,
  progress,
}: {
  file: File | null
  videoUrl: string | null
  dragging: boolean
  setDragging: (v: boolean) => void
  acceptFile: (f: File | undefined) => void
  inputRef: React.RefObject<HTMLInputElement | null>
  reset: () => void
  targetLang: LangCode
  setTargetLang: (c: LangCode) => void
  start: () => void
  status: Status
  stage: number
  progress: number
}) {
  const t = useTranslations()
  const targetFlag = DUB_LANGS.find((l) => l.code === targetLang)?.flag
  const [dubMode, setDubMode] = useState<DubMode>("clean_vlog")

  return (
    <div
      className="relative flex-1 overflow-y-auto px-4 pb-6 pt-5"
      style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-80 -translate-x-1/2 rounded-full bg-primary/20 blur-[110px]"
      />

      {status === "idle" && (
        <DashboardContent
          file={file}
          videoUrl={videoUrl}
          dragging={dragging}
          setDragging={setDragging}
          acceptFile={acceptFile}
          inputRef={inputRef}
          reset={reset}
          targetLang={targetLang}
          setTargetLang={setTargetLang}
          dubMode={dubMode}
          setDubMode={setDubMode}
          start={start}
        />
      )}

      {status === "processing" && <ProcessingScreen stage={stage} progress={progress} />}

      {status === "done" && (
        <ResultScreen
          videoUrl={videoUrl}
          file={file}
          targetName={t(`languages.${targetLang}`)}
          targetFlag={targetFlag}
          reset={reset}
        />
      )}
    </div>
  )
}

function DashboardContent({
  file,
  videoUrl,
  dragging,
  setDragging,
  acceptFile,
  inputRef,
  reset,
  targetLang,
  setTargetLang,
  dubMode,
  setDubMode,
  start,
}: {
  file: File | null
  videoUrl: string | null
  dragging: boolean
  setDragging: (v: boolean) => void
  acceptFile: (f: File | undefined) => void
  inputRef: React.RefObject<HTMLInputElement | null>
  reset: () => void
  targetLang: LangCode
  setTargetLang: (c: LangCode) => void
  dubMode: DubMode
  setDubMode: (m: DubMode) => void
  start: () => void
}) {
  const t = useTranslations()

  const currentModeInfo = DUB_MODE_DETAILS[dubMode] || DUB_MODE_DETAILS.clean_vlog
  const activeRecommendation =
    currentModeInfo.recommendations[targetLang] ||
    currentModeInfo.recommendations.km ||
    currentModeInfo.recommendations.en

  return (
    <div className="relative flex flex-col gap-6">
      <div className="pt-1 text-center">
        <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground">
          {SAVPD_CONSTANTS.BRAND.TRADEMARK}
        </h1>
        <p className="mx-auto mt-1.5 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
          {t("appSubtitle")}
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card/60 p-4 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Select AI Dubbing Mode
          </h3>
        </div>
        <div className="relative">
          <select
            value={dubMode}
            onChange={(e) => setDubMode(e.target.value as DubMode)}
            className="w-full cursor-pointer appearance-none rounded-2xl border border-border bg-secondary/60 py-3.5 pl-4 pr-10 text-sm font-semibold text-foreground outline-none transition hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-ring/40"
          >
            {DUB_MODES.map((mode) => {
              const detail = DUB_MODE_DETAILS[mode.id]
              const localizedTitle =
                detail?.titles[targetLang] || detail?.titles.km || detail?.titles.en || mode.labelKm
              return (
                <option key={mode.id} value={mode.id} className="bg-card py-2 text-sm text-foreground">
                  {mode.icon} {localizedTitle}
                </option>
              )
            })}
          </select>
          <svg
            className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* ប្រអប់បង្ហាញការណែនាំតាមភាសាគោលដៅ និងព័ត៌មានលម្អិតឯកទេសជាភាសាអង់គ្លេស */}
        <div className="rounded-2xl border border-primary/20 bg-primary/10 p-3.5 space-y-1.5 text-xs text-foreground leading-relaxed">
          <div className="font-semibold text-primary flex items-center gap-1.5">
            <span>💡</span>
            <span>{activeRecommendation}</span>
          </div>
          <div className="text-[11px] text-muted-foreground font-mono pl-5 border-t border-primary/10 pt-1.5 mt-1">
            ⚡ {currentModeInfo.specialization}
          </div>
        </div>
      </div>

      {!videoUrl ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            acceptFile(e.dataTransfer.files?.[0])
          }}
          className={`flex w-full flex-col items-center justify-center gap-3 rounded-3xl border px-6 py-12 text-center transition active:scale-[0.99] ${
            dragging ? "border-primary bg-primary/10" : "border-border bg-card/60 hover:border-primary/60 shadow-sm"
          }`}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <UploadCloud className="h-8 w-8" />
          </span>
          <span className="text-base font-semibold text-foreground">{t("dropText")}</span>
          <span className="flex flex-col items-center gap-2 text-xs text-muted-foreground">
            <span>{t("dropHint")}</span>
            <span className="flex items-center gap-1 rounded-full bg-success/15 px-3 py-1 font-medium text-success">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {t("noLimit")}
            </span>
          </span>
        </button>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-border bg-black">
          <video key={videoUrl} src={videoUrl} controls className="aspect-video w-full bg-black" />
          <div className="flex items-center justify-between gap-3 bg-secondary/50 px-4 py-3">
            <span className="flex min-w-0 items-center gap-2 text-sm text-foreground">
              <FileVideo className="h-4 w-4 shrink-0 text-primary" />
              <span className="truncate">{file?.name}</span>
            </span>
            <button
              type="button"
              onClick={reset}
              className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-muted-foreground transition hover:bg-destructive/15 hover:text-destructive"
            >
              <X className="h-3.5 w-3.5" />
              {t("delete")}
            </button>
          </div>
        </div>
      )}

      <div className="rounded-3xl border border-border bg-card/60 p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-sm font-semibold text-foreground">{t("selectTargetLangTitle")}</h3>
          <span className="flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            AI Auto-Detect Source
          </span>
        </div>

        <div className="relative">
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value as LangCode)}
            className="w-full cursor-pointer appearance-none rounded-2xl border border-border bg-secondary/60 py-4 pl-4 pr-10 text-base font-semibold text-foreground outline-none transition hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-ring/40"
          >
            {DUB_LANGS.map((l) => (
              <option key={l.code} value={l.code} className="bg-card py-2 text-base text-foreground">
                {l.flag} {t(`languages.${l.code}`)}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="sticky bottom-0 -mx-4 mt-1 border-t border-border/60 bg-background/85 px-4 pb-2 pt-3 backdrop-blur-xl">
        <button
          type="button"
          onClick={start}
          className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition active:scale-[0.99]"
        >
          <Sparkles className="h-5 w-5 transition group-hover:rotate-12" />
          {t("start")}
        </button>
      </div>
    </div>
  )
}

function ProcessingScreen({ stage, progress }: { stage: number; progress: number }) {
  const t = useTranslations()
  const rawStages = t.raw("stages") as string[]

  return (
    <div className="flex min-h-[70dvh] flex-col items-center justify-center gap-8 py-6 text-center">
      <div className="relative flex h-32 w-32 items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
          <circle cx="60" cy="60" r="54" className="fill-none stroke-secondary" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r="54"
            className="fill-none stroke-primary transition-all duration-700 ease-out"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 54}
            strokeDashoffset={2 * Math.PI * 54 * (1 - progress / 100)}
          />
        </svg>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-foreground">{progress}%</span>
          <Loader2 className="mt-1 h-4 w-4 animate-spin text-primary" />
        </div>
      </div>

      <div>
        <p className="text-lg font-bold text-foreground">{t("processing")}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t("autopilotDesc")}</p>
      </div>

      <ul className="w-full space-y-2.5 text-left">
        {rawStages.map((s, i) => {
          const state = i < stage ? "done" : i === stage ? "active" : "pending"
          return (
            <li
              key={i}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                state === "active"
                  ? "border-primary/40 bg-primary/10"
                  : state === "done"
                    ? "border-success/30 bg-success/10"
                    : "border-border bg-secondary/30"
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition ${
                  state === "done"
                    ? "bg-success text-success-foreground"
                    : state === "active"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {state === "done" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : state === "active" ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                )}
              </span>
              <span className={state === "pending" ? "text-muted-foreground" : "font-medium text-foreground"}>{s}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ResultScreen({
  videoUrl,
  file,
  targetName,
  targetFlag,
  reset,
}: {
  videoUrl: string | null
  file: File | null
  targetName: string
  targetFlag?: string
  reset: () => void
}) {
  const t = useTranslations()

  return (
    <div className="flex flex-col gap-5 py-2">
      <div className="text-center">
        <span className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-success/20 text-success">
          <AudioLines className="h-8 w-8" />
        </span>
        <h2 className="text-xl font-bold text-foreground">{t("doneTitle")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("doneSubtitle")} {targetName} {targetFlag}
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border bg-black">
        {videoUrl && <video key={videoUrl} src={videoUrl} controls autoPlay className="aspect-video w-full bg-black" />}
      </div>

      <div className="sticky bottom-0 -mx-4 flex flex-col gap-2.5 border-t border-border/60 bg-background/85 px-4 pb-2 pt-3 backdrop-blur-xl">
        <a
          href={videoUrl ?? "#"}
          download={file ? `dubbed-${file.name}` : "dubbed-video.mp4"}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-success py-4 text-base font-bold text-success-foreground transition active:scale-[0.99]"
        >
          <Download className="h-5 w-5" />
          {t("download")}
        </a>
        <button
          type="button"
          onClick={reset}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-secondary/60 py-3.5 text-sm font-medium text-foreground transition active:scale-[0.99]"
        >
          <RotateCcw className="h-4 w-4" />
          {t("retry")}
        </button>
      </div>
    </div>
  )
}
