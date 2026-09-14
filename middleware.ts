import createMiddleware from 'next-intl/middleware';

const locales = [
  'en', 'km', 'fr', 'es', 'zh', 'ja', 'ko', 'th', 'vi', 'id', 
  'ms', 'my', 'lo', 'tl', 'ar', 'ru', 'de', 'pt', 'it', 'hi'
];

export default createMiddleware({
  locales,
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
