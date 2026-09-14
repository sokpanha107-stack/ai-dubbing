import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Noto_Sans_Khmer } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { ThemeProvider } from '@/lib/theme'
import './globals.css'

// បន្ថែមកូដមួយបន្ទាត់នេះដើម្បីដោះស្រាយបញ្ហា Build Error 404 នៅលើ Vercel
export const dynamic = 'force-dynamic'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const notoKhmer = Noto_Sans_Khmer({
  subsets: ['khmer'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-khmer',
})

export const metadata: Metadata = {
  title: 'SAVPD.io™ — Professional Web Application',
  description:
    'បកប្រែ និងបញ្ចូលសំឡេងវីដេអូដោយ AI — Translate and dub your videos with AI across multiple languages.',
  generator: 'v0.app',
  applicationName: 'SAVPD.io™',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'SAVPD.io™',
    startupImage: [
      {
        url: '/icon-512.png',
        media: '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)',
      },
    ],
  },
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/icon-512.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b0f1a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${geist.variable} ${notoKhmer.variable} bg-background`}>
      <head>
        <link rel="apple-touch-icon" href="/icon-512.png" />
        <link rel="apple-touch-icon-precomposed" href="/icon-512.png" />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
