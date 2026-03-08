import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://arcadewave.gg'
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'ArcadeWave'
const gaId = process.env.NEXT_PUBLIC_GA_ID
const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Joue gratuitement aux meilleurs jeux en ligne`,
    template: `%s | ${siteName}`,
  },
  description: 'Joue gratuitement à des centaines de jeux HTML5 et Flash dans ton navigateur. RPG, FPS, Stratégie, Puzzle et plus encore. Sans téléchargement, sans inscription.',
  keywords: ['jeux gratuits', 'jeux en ligne', 'jeux navigateur', 'HTML5 games', 'flash games', 'arcadewave'],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteUrl,
    siteName,
    title: `${siteName} — Jeux gratuits en ligne`,
    description: 'La meilleure plateforme de jeux HTML5 et Flash gratuits. Joue directement dans ton navigateur.',
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} — Jeux gratuits en ligne`,
    description: 'La meilleure plateforme de jeux HTML5 et Flash gratuits.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: siteUrl },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        {/* Google AdSense */}
        {adsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
      </head>
      <body className="bg-[#07070f] text-white antialiased overflow-x-hidden">
        {children}

        {/* Google Analytics */}
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
