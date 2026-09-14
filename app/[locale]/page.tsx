// app/page.tsx
import { DubbingStudio } from "@/components/dubbing-studio";
import AutoPipelinePanel from "@/components/dubbing-studio/auto-pipeline-panel";
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
    <main className="min-h-screen bg-black text-white p-4 md:p-8">
      {/* 🌟 ដាក់បញ្ជូលគ្នាក្នុង Screen តែមួយ៖ Dashboard ដើម និង Option Control */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* ផ្នែកទី១៖ Dubbing Studio ដើម chiếm 2 ភាគ */}
        <div className="lg:col-span-2">
          <DubbingStudio />
        </div>

        {/* ផ្នែកទី២៖ Option Control ថ្មី ស្ថិតនៅខាងស្តាំយ៉ាងស្អាត */}
        <div className="lg:col-span-1 sticky top-6">
          <AutoPipelinePanel />
        </div>

      </div>
    </main>
  );
}
