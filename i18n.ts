import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// 1. กำหนดรายชื่อភាសាទាំង ២០ របស់យើងជាផ្លូវការនៅទីនេះ ដើម្បីឱ្យ system ស្គាល់ទូទាំង app
export const locales = [
  'en', 'km', 'zh', 'th', 'vi', 'ja', 'ko', 'hi', 
  'es', 'fr', 'de', 'id', 'pt', 'ru', 'ar', 'it', 
  'tr', 'ph', 'ms', 'bn'
];

export const defaultLocale = 'en';

export default getRequestConfig(async ({ locale }) => {
  // 2. ផ្ទៀងផ្ទាត់ថាតើ locale ដែលសុំមកស្ថិតក្នុងបញ្ជី ២០ ភាសាដែរឬទេ
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return {
    // 3. ផ្សារភ្ជាប់និងទាញយកហ្វាល់ JSON មកតាម Dynamic អូតូ ទៅកាន់ Dictionary របស់ app
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
