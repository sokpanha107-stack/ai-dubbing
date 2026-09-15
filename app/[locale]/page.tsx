import { SharedSettings } from "@/components/dubbing-studio/shared-settings";
import { setRequestLocale } from "next-intl/server";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-black text-white p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        <SharedSettings />
      </div>
    </main>
  );
}
