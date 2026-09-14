import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// បញ្ជីភាសាដែលគាំទ្រក្នុងប្រព័ន្ធ (២០ ភាសា)
export const locales = ['en', 'km', 'zh', 'th', 'vi', 'ja', 'ko', 'hi', 'es', 'fr', 'de', 'id', 'pt', 'ru', 'ar', 'it', 'tr', 'ph', 'ms', 'bn'];
export const defaultLocale = 'en';

export default getRequestConfig(async ({ locale }) => {
  // ផ្ទៀងផ្ទាត់ភាសា បើគ្មានក្នុងបញ្ជីទម្លាក់ទៅ 404
  if (!locales.includes(locale as any)) notFound();

  return {
    locale, // <-- នេះហើយជាចំណុចសំខាន់ដែលត្រូវបន្ថែម ដើម្បីបំបាត់ Error របស់ Vercel
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
