// lib/dub-modes.ts
export type DubMode = "clean_vlog" | "summary_sfx" | "cinematic_dub" | "visual_story"

export const DUB_MODES: { id: DubMode; labelKm: string; icon: string }[] = [
  { id: "clean_vlog", labelKm: "Option 1: Clean Voiceover (Vlog Mode)", icon: "🎙️" },
  { id: "summary_sfx", labelKm: "Option 2: Summary & Modified SFX (Recap)", icon: "🎬" },
  { id: "cinematic_dub", labelKm: "Option 3: Full Cinematic Character Dubbing", icon: "🎭" },
  { id: "visual_story", labelKm: "Option 4: AI Visual Storyteller (Auto-Script)", icon: "✨" },
]
