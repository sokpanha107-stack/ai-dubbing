import { getLocale, setRequestLocale } from 'next-intl/server';

export default async function NotFound() {
  const locale = await getLocale().catch(() => 'en');
  
  // 👈 ដាក់បញ្ចូល setRequestLocale ដើម្បីការពារ Prerender Error លើ Vercel
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className="flex h-dvh flex-col items-center justify-center bg-background text-foreground">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">404 — Page Not Found</h2>
          <p className="text-sm text-muted-foreground">Could not find the requested resource.</p>
          <a
            href="/"
            className="inline-block mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Return Home
          </a>
        </div>
      </body>
    </html>
  );
}
