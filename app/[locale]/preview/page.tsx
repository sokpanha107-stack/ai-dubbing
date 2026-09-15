"use client" // បន្ថែមបន្ទាត់នេះដើម្បីអាចបញ្ជូន Function (onLoginSuccess) ទៅកាន់ Client Component បាន

import PreviewScreen from '@/components/dubbing-studio/preview-screen'; // លុបវង់ក្រចកទំពក់ {} ចេញ

export default function PreviewPage() {
  return (
    <PreviewScreen 
      onLoginSuccess={() => {
        console.log("Login Successful!");
        // អ្នកអាចសរសេរកូដ redirect ឬធ្វើអ្វីផ្សេងទៀតនៅទីនេះនៅពេល Login ត្រូវ
      }} 
    />
  );
}
