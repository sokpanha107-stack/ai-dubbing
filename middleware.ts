import createMiddleware from 'next-intl/middleware';

const locales = [
  'ar', 'de', 'en', 'es', 'fr', 'hi', 'id', 'it', 'ja', 'km', 
  'ko', 'lo', 'ms', 'my', 'pt', 'ru', 'th', 'tl', 'vi', 'zh'
];

export default createMiddleware({
  locales,
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
