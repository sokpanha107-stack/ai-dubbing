import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

export const locales = [
  'ar', 'de', 'en', 'es', 'fr', 'hi', 'id', 'it', 'ja', 'km', 
  'ko', 'lo', 'ms', 'my', 'pt', 'ru', 'th', 'tl', 'vi', 'zh'
];

export const defaultLocale = 'en';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
