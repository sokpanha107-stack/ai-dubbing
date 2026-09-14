import { DubbingStudio } from "@/components/dubbing-studio";
import { setRequestLocale } from "next-intl/server";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  
  // ប្រាប់ Next.js និង next-intl ឱ្យដឹង Locale ស្ដង់ដារ ដើម្បីការពារ Prerender Error លើ Vercel
  setRequestLocale(locale);

  return (
    <main>
      <DubbingStudio />
    </main>
  );
}

