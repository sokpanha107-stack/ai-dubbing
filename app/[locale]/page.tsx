// app/[locale]/page.tsx
import { setRequestLocale } from "next-intl/server";
import PreviewScreen from "@/components/dubbing-studio/preview-screen";

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
        <PreviewScreen onLoginSuccess={() => {
          // Logic ពេល Login ត្រូវ (វាអាចរំលង ឬកែឆ្នៃទៅតាម State ក្នុង PreviewScreen)
        }} />
      </div>
    </main>
  );
}
