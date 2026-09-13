import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SAVPD.io™ - AI Video Dubbing Studio',
    short_name: 'SAVPD.io™', // ែមសញ្ញា ™ ត្រង់នេះ
    description:
      'Translate and dub your videos into multiple languages automatically with AI.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#0b0f1a',
    theme_color: '#4A90E2',
    categories: ['multimedia', 'productivity', 'utilities'],
    icons: [
      {
        src: '/icon-512.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
