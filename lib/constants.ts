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
