// app/page.tsx
import { DubbingStudio } from "@/components/dubbing-studio";
import { setRequestLocale } from "next-intl/server";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  
  // ប្រាប់ Next.js និង next-intl ឱ្យដឹង Locale ស្ដង់ដារ
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8 flex flex-col items-center justify-center">
      
      {/* 🌟 បង្ហាញតែ Dashboard ថ្មីដែលបានរួមបញ្ចូល Option គ្រប់យ៉ាងតែមួយគត់ (Unified Dashboard) */}
      <div className="w-full max-w-2xl mx-auto">
        <DubbingStudio />
      </div>

    </main>
  );
}
