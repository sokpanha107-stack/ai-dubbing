export const TECHNICAL_TERMS = [
  "AI",
  "API",
  "Admin",
  "Dashboard",
  "Settings",
  "Login",
  "Passcode",
  "Render",
  "Dubbing",
  "Install App",
  "MP4",
  "MOV",
  "WEBM",
  "SAVPD.io",
  "SAVPD.io™",
  "SAVPD.io™ Studio"
] as const;

export type TechnicalTerm = typeof TECHNICAL_TERMS[number];

// 👉 ថែមកូដផ្នែកនេះចូលដើម្បីឱ្យ Vercel ស្គាល់ឈ្មោះប្រេនដែលយើងបានហៅប្រើ
export const SAVPD_CONSTANTS = {
  BRAND: {
    NAME: "SAVPD.io",
    TRADEMARK: "SAVPD.io™",
    STUDIO: "SAVPD.io™",
  },
};
