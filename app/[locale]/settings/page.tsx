'use client';

import { useRouter } from 'next/navigation';
import SharedSettings from '@/components/dubbing-studio/shared-settings';

export default function SettingsPage() {
  const router = useRouter();

  return (
    <SharedSettings
      isOpen={true}
      onClose={() => router.back()}
    />
  );
}
