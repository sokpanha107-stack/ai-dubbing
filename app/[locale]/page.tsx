'use client';

import { useParams, useRouter } from 'next/navigation';
import PreviewScreen from "@/components/dubbing-studio/preview-screen";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl mx-auto flex flex-col flex-1">
        <PreviewScreen
          onLoginSuccess={() => router.push(`/${locale}/dashboard`)}
          onAdminSuccess={() => router.push(`/${locale}/admin`)}
        />
      </div>
    </main>
  );
}
