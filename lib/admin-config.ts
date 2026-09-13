export type AdminConfig = {
  openaiApiKey: string;
  elevenlabsApiKey: string;
  translationApiKey: string;
  customPrompt: string;
  adminPasscode: string; // បន្ថែមសម្រាប់កែលេខកូដសម្ងាត់
};

const STORAGE_KEY = "savpd_admin_config_v2";

const DEFAULT_CONFIG: AdminConfig = {
  openaiApiKey: "",
  elevenlabsApiKey: "",
  translationApiKey: "",
  customPrompt: "Translate and dub accurately, maintaining cinematic emotion and pace sync.",
  adminPasscode: "@2000", // លេខកូដសម្ងាត់ដើម
};

export function getAdminConfig(): AdminConfig {
  if (typeof window === "undefined") {
    return DEFAULT_CONFIG;
  }
  
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      return {
        openaiApiKey: parsed.openaiApiKey || DEFAULT_CONFIG.openaiApiKey,
        elevenlabsApiKey: parsed.elevenlabsApiKey || DEFAULT_CONFIG.elevenlabsApiKey,
        translationApiKey: parsed.translationApiKey || DEFAULT_CONFIG.translationApiKey,
        customPrompt: parsed.customPrompt || DEFAULT_CONFIG.customPrompt,
        adminPasscode: parsed.adminPasscode || DEFAULT_CONFIG.adminPasscode,
      };
    }
  } catch (error) {
    console.error("Error reading admin config from storage:", error);
  }
  
  return DEFAULT_CONFIG;
}

export function saveAdminConfig(config: AdminConfig): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error("Error saving admin config to storage:", error);
  }
}
