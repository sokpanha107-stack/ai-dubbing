import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Noto_Sans_Khmer } from 'next/font/google'
import { ThemeProvider } from '@/lib/theme'
import './globals.css'

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
  },
  formatDetection: { telephone: false },
  icons: {
    icon: '/icon-512.png',
    apple: '/icon-512.png',
    shortcut: '/icon-512.png',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="km" className={`${geist.variable} ${notoKhmer.variable} bg-background`}>
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
