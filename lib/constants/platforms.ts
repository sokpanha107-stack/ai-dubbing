// lib/constants/platforms.ts

export interface PlatformRule {
  id: string;
  name: string;
  targetDurationMinutes: number;
  hookDurationSeconds: number;
  description: string;
}

export const SUPPORTED_PLATFORMS: Record<string, PlatformRule> = {
  tiktok: {
    id: 'tiktok',
    name: 'TikTok / Reels',
    targetDurationMinutes: 5,
    hookDurationSeconds: 4,
    description: 'រយៈពេលមាស ១ ដល់ ៥ នាទី (ចង្វាក់ញាប់ ព្រលឿន)'
  },
  facebook: {
    id: 'facebook',
    name: 'Facebook Video',
    targetDurationMinutes: 10,
    hookDurationSeconds: 6,
    description: 'រយៈពេលមាស ៨ ដល់ ១០ នាទី (ត្រូវម៉ាច់ In-Stream Ads)'
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube Long-form',
    targetDurationMinutes: 15,
    hookDurationSeconds: 8,
    description: 'រយៈពេលមាស ៨ ដល់ ១៥ នាទី (សាច់រឿងស៊ីជម្រៅ)'
  }
  // 🌟 ថ្ងៃក្រោយបើមាន Platform ថ្មី គ្រាន់តែមកថែមនៅទីនេះដោយសុវត្ថិភាព!
};
