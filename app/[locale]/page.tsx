// app/page.tsx
import { AutoPipelinePanel } from "@/components/dubbing-studio/auto-pipeline-panel"; // ឬ path ទៅតាមទីតាំងជាក់ស្តែងរបស់សម្លាញ់
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
    <main className="min-h-screen bg-black text-white p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl">
        {/* បង្ហាញផ្ទាំងបញ្ជា Master Chef Control Center ថ្មីរបស់យើង */}
        <AutoPipelinePanel />
      </div>
    </main>
  );
}
