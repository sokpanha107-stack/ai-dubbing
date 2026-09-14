// lib/ai-agent/story-engine.ts

/**
 * ប្រព័ន្ធគ្រប់គ្រងសាច់រឿងស្វ័យប្រវត្តិ (Dual-Direction Story Engine)
 * គាំទ្រទាំងការបំបែករឿងវែង (Top-Down) និងការផ្គុំរឿងរាយ (Bottom-Up)
 */

export interface PlatformConfig {
  name: 'tiktok' | 'facebook' | 'youtube';
  targetDurationMinutes: number; // រយៈពេលគោលដៅក្នុងមួយភាគ
  hookDurationSeconds: number;   // រយៈពេល Hook ចាប់អារម្មណ៍ដើមរឿង
}

export interface EpisodeSegment {
  episodeNumber: number;
  title: string;
  hookTimeRange: { start: number; end: number }; // វិនាទីចាប់ផ្តើម និងបញ្ចប់ Hook
  climaxTimeRange: { start: number; end: number };
  durationEstimateSeconds: number;
  scriptSummary: string;
  nextEpisodeTeaser: string; // ឈុតខ្លីទាក់ទាញចូលភាគបន្ទាប់ (Preview)
}

export interface ScatteredClip {
  id: string;
  title: string;
  durationSeconds: number;
  description?: string;
  keywords: string[];
}

export interface AssembledStory {
  storyTitle: string;
  totalDurationSeconds: number;
  orderedClipSequence: string[]; // លំដាប់ ID នៃឃ្លីបដែលត្រូវផ្គុំ
  voiceoverNarrative: string;   // អត្ថបទសម្រាប់ AI អានសម្លេងភ្ជាប់រឿង
  platformRecommendation: string;
}

export class SavpdStoryEngine {
  // ក្បួនកំណត់កម្រិតរយៈពេលមាសតាម Platform
  private static platformRules: Record<string, PlatformConfig> = {
    tiktok: { name: 'tiktok', targetDurationMinutes: 5, hookDurationSeconds: 4 },
    facebook: { name: 'facebook', targetDurationMinutes: 9, hookDurationSeconds: 6 },
    youtube: { name: 'youtube', targetDurationMinutes: 12, hookDurationSeconds: 8 }
  };

  /**
   * ១. ទម្រង់ TOP-DOWN: បំបែករឿងវែង (១-២ ម៉ោង) ឱ្យចេញជាភាគៗ
   */
  public static async splitLongStory(params: {
    storyContent: string;
    totalVideoDurationSeconds: number;
    targetPlatform: 'tiktok' | 'facebook' | 'youtube';
  }): Promise<EpisodeSegment[]> {
    const platform = this.platformRules[params.targetPlatform] || this.platformRules.tiktok;
    const targetSeconds = platform.targetDurationMinutes * 60;
    
    // គណនាចំនួនភាគប៉ាន់ស្មាន
    const estimatedEpisodes = Math.max(1, Math.round(params.totalVideoDurationSeconds / targetSeconds));
    const episodes: EpisodeSegment[] = [];

    for (let i = 1; i <= estimatedEpisodes; i++) {
      const epDuration = Math.min(targetSeconds, params.totalVideoDurationSeconds - (i - 1) * targetSeconds);
      
      episodes.push({
        episodeNumber: i,
        title: `ភាគទី ${i}: ដំណាក់កាលប្រយុទ្ធដ៏ក្តៅគគុក`,
        hookTimeRange: {
          start: 0,
          end: platform.hookDurationSeconds
        },
        climaxTimeRange: {
          start: Math.floor(epDuration * 0.7),
          end: Math.floor(epDuration * 0.85)
        },
        durationEstimateSeconds: epDuration,
        scriptSummary: `សាច់រឿងសង្ខេបសម្រាប់ភាគ ${i} សម្រិតសម្រាំងសម្រាប់ ${platform.name.toUpperCase()}...`,
        nextEpisodeTeaser: i < estimatedEpisodes 
          ? `តាមដានរឿងរ៉ាវដ៏រន្ធត់ក្នុងភាគទី ${i + 1} បន្តទៀត...` 
          : 'ទីបញ្ចប់នៃសាច់រឿង!'
      });
    }

    return episodes;
  }

  /**
   * ២. ទម្រង់ BOTTOM-UP: ផ្គុំឃ្លីប និងរឿងរ៉ាយប៉ាយឱ្យចេញជារឿងពេញលេញ
   */
  public static async assembleScatteredStory(params: {
    clips: ScatteredClip[];
    targetPlatform: 'tiktok' | 'facebook' | 'youtube';
    overallTheme: string;
  }): Promise<AssembledStory> {
    const { clips, targetPlatform, overallTheme } = params;

    // តម្រៀបឃ្លីបតាមលំដាប់លំហូរនៃសាច់រឿង (Hook -> Introduction -> Climax -> Ending)
    const sortedClips = [...clips].sort((a, b) => b.keywords.length - a.keywords.length);
    const clipIds = sortedClips.map(clip => clip.id);
    const totalDuration = sortedClips.reduce((sum, c) => sum + c.durationSeconds, 0);

    return {
      storyTitle: `រឿងរ៉ាវពិសេស: ${overallTheme}`,
      totalDurationSeconds: totalDuration,
      orderedClipSequence: clipIds,
      voiceoverNarrative: `នេះជារឿងរ៉ាវដែលប្រមូលផ្តុំពីឈុតឆាកពិសេសៗលើប្រធានបទ "${overallTheme}" ដោយរៀបចំកាត់តស្របតាមក្បួនខ្នាតរបស់ ${targetPlatform.toUpperCase()}។`,
      platformRecommendation: targetPlatform
    };
  }
}
