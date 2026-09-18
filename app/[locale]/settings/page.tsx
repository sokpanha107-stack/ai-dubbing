'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import SharedSettings from '@/components/dubbing-studio/shared-settings';
import { AdminAuthGate } from '@/components/admin/admin-auth-gate';

// 🔑 ចំណុចចូល Admin (សង្កត់រូបគ្រាប់ភ្នែក ៥ វិនាទី ក្នុង Display Mode)
// ត្រូវផ្លាស់មកដាក់ទីនេះ ព្រោះផ្ទាំង Login ដើម (ដែលធ្លាប់ផ្ទុកចំណុចនេះ) ត្រូវបានផ្អាកហើយ
export default function SettingsPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'km';
  const [adminGateOpen, setAdminGateOpen] = useState(false);

  return (
    <>
      <SharedSettings
        isOpen={true}
        onClose={() => router.back()}
        onAdminClick={() => setAdminGateOpen(true)}
      />

      {adminGateOpen && (
        <AdminAuthGate
          onAuthenticated={() => {
            setAdminGateOpen(false);
            router.push(`/${locale}/admin`);
          }}
          onClose={() => setAdminGateOpen(false)}
        />
      )}
    </>
  );
}

