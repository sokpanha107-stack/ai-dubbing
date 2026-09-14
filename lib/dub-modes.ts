// lib/dub-modes.ts
export type DubMode = "clean_vlog" | "summary_sfx" | "cinematic" | "ai_visual"

export interface DubModeItem {
  id: DubMode
  icon: string
  specialization: string // បច្ចេកទេសឯកទេស (ភាសាអង់គ្លេស)
}

export const DUB_MODES: DubModeItem[] = [
  {
    id: "clean_vlog",
    icon: "🎙️",
    specialization: "Specialization: Original Voice Clarity & Noise Removal",
  },
  {
    id: "summary_sfx",
    icon: "🎬",
    specialization: "Specialization: Background SFX Retention & Recap Cadence",
  },
  {
    id: "cinematic",
    icon: "🎭",
    specialization: "Specialization: Multi-Character Emotional Voice Cloning",
  },
  {
    id: "ai_visual",
    icon: "✨",
    specialization: "Specialization: Computer Vision Scene Script & Narration",
  },
]
