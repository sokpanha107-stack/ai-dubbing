"use client" // ត្រូវដាក់ use client ព្រោះយើងត្រូវបញ្ជូន function (onLogout) ទៅកាន់ Client Component

import { AdminDashboard } from '@/components/admin/admin-dashboard'; // កែមកប្រើ { } វិញ (Named Import)
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  const handleLogout = () => {
    // ឯងអាចដាក់កូដ Clear Token ឬ Session នៅទីនេះនៅថ្ងៃក្រោយ
    console.log("អ្នកបានចុចចាកចេញ!");
    router.push('/'); // បញ្ជូនត្រឡប់ទៅទំព័រដើមវិញ
  };

  return <AdminDashboard onLogout={handleLogout} />;
}
