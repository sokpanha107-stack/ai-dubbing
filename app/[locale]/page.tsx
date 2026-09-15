// app/[locale]/page.tsx
import { DashboardContainer } from "@/components/dubbing-studio";
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
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl mx-auto flex flex-col flex-1">
        <DashboardContainer />
      </div>
    </main>
  );
}
