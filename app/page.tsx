"use client";

import { DubbingStudio } from "@/components/dubbing-studio";
import { I18nProvider } from "@/lib/i18n";

export default function Page() {
  return (
    <I18nProvider>
      <DubbingStudio />
    </I18nProvider>
  );
}
