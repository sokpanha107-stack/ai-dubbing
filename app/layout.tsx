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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="km" className={`${geist.variable} ${notoKhmer.variable} bg-background`}>
      <head>
        {/* បង្ខំឱ្យ iOS ប្រើប្រាស់ Apple Touch Icon ផ្ទាល់ខ្លួន */}
        <link rel="apple-touch-icon" href="/icon-512.png" />
        <link rel="apple-touch-icon-precomposed" href="/icon-512.png" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
