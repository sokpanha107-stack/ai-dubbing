// lib/dub-modes.ts
export type DubMode = "clean_vlog" | "summary_sfx" | "cinematic" | "ai_visual"

export const DUB_MODES: { id: DubMode; labelKm: string; icon: string }[] = [
  { id: "clean_vlog", labelKm: "Option 1: Clean Voiceover (Vlog Mode)", icon: "🎙️" },
  { id: "summary_sfx", labelKm: "Option 2: Summary & Modified SFX (Recap)", icon: "🎬" },
  { id: "cinematic", labelKm: "Option 3: Full Cinematic Character Dubbing", icon: "🎭" },
  { id: "ai_visual", labelKm: "Option 4: AI Visual Storyteller (Auto-Script)", icon: "✨" },
]
