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
      {/* 🌟 Layout តម្រៀបគ្នាជា Stack លើអេក្រង់តូច និង Grid លើអេក្រង់ធំ ដើម្បីការពារការបាត់ Option */}
      <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-3 gap-6 items-start">
        
        {/* ផ្នែកទី១៖ Dubbing Studio ដើម chiếm 2 ភាគ */}
        <div className="w-full lg:col-span-2">
          <DubbingStudio />
        </div>

        {/* ផ្នែកទី២៖ Option Control ស្ថិតនៅខាងស្តាំយ៉ាងមានរបៀប មិនបាត់បង់ */}
        <div className="w-full lg:col-span-1">
          <AutoPipelinePanel />
        </div>

      </div>
    </main>
  );
}
