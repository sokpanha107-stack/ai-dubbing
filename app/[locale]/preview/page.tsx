import { PreviewScreen } from '@/components/dubbing-studio/preview-screen';

export default function PreviewPage() {
  // ខ្ញុំបន្ថែម onLoginSuccess ដើម្បីកុំឱ្យលោត Error ពេលហៅ Component នេះមកប្រើ
  return (
    <PreviewScreen 
      onLoginSuccess={() => {
        console.log("Login Successful!");
        // អ្នកអាចសរសេរកូដ redirect ឬធ្វើអ្វីផ្សេងទៀតនៅទីនេះនៅពេល Login ត្រូវ
      }} 
    />
  );
}
