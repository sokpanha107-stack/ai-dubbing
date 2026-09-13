import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
});

export const config = {
  // Exclude API routes, static files, and Next.js internal paths
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
