import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { NavigationGuard } from "@/components/navigation-guard"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react" // Suspense'i import et

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CoachTale - Yapay Zeka Destekli Sınav Takip ve Ders Çalışma Planı | TYT AYT Hazırlık",
  description: "Yapay zeka destekli kişiselleştirilmiş çalışma planları ile TYT ve AYT'de başarıya ulaşın",
  keywords:
    "tyt hazırlık, ayt hazırlık, sınav takip, ders çalışma planı, öğrenci takip, eğitim yönetimi, akademik takip, öğrenci başarı takibi, ders programı, sınav hazırlık, eğitim planlama, akademik başarı, yapay zeka eğitim, ai destekli çalışma",
  authors: [{ name: "CoachTale", url: "https://coachtale.com" }],
  creator: "CoachTale",
  publisher: "CoachTale",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://coachtale.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CoachTale - Yapay Zeka Destekli Sınav Takip ve Ders Çalışma Planı | TYT AYT Hazırlık",
    description:
      "TYT ve AYT sınavlarına hazırlanan öğrenciler için yapay zeka destekli kişiselleştirilmiş çalışma planları. Akıllı sınav takibi, AI destekli öneriler ve motivasyon asistanı ile hedefinize ulaşın. Ücretsiz deneyin!",
    url: "https://coachtale.com",
    siteName: "CoachTale",
    locale: "tr_TR",
    type: "website",
  },
  other: {
    "instagram:username": "hakanozkum",
    "instagram:site": "https://instagram.com/hakanozkum",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "education",
  classification: "educational software",
    generator: 'v0.dev'
}

// Yapısal veri için JSON-LD
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CoachTale",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "TRY",
  },
  description:
    "TYT ve AYT sınavlarına hazırlanan öğrenciler için yapay zeka destekli kişiselleştirilmiş çalışma planları.",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "500",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="coachtale-theme"
        >
          <Suspense fallback={null}>
            {" "}
            {/* Suspense sınırını ekle */}
            <NavigationGuard />
            {children}
          </Suspense>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
