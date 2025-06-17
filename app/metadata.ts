import { Metadata } from "next"

export const metadata: Metadata = {
  title: "CoachTale - Yapay Zeka Destekli Sınav Takip ve Ders Çalışma Planı | TYT AYT Hazırlık",
  description: "TYT ve AYT sınavlarına hazırlanan öğrenciler için yapay zeka destekli kişiselleştirilmiş çalışma planları. Akıllı sınav takibi, AI destekli öneriler ve motivasyon asistanı ile hedefinize ulaşın. Ücretsiz deneyin!",
  keywords: "tyt hazırlık, ayt hazırlık, sınav takip, yapay zeka destekli eğitim, çalışma planı, üniversite hazırlık, sınav başarısı, verimli çalışma, kişiselleştirilmiş eğitim",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "CoachTale - Yapay Zeka Destekli Sınav Takip ve Ders Çalışma Planı | TYT AYT Hazırlık",
    description: "TYT ve AYT sınavlarına hazırlanan öğrenciler için yapay zeka destekli kişiselleştirilmiş çalışma planları. Akıllı sınav takibi, AI destekli öneriler ve motivasyon asistanı ile hedefinize ulaşın. Ücretsiz deneyin!",
    url: 'https://coachtale.com',
    siteName: 'CoachTale',
    locale: 'tr_TR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
