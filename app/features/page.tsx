import { Metadata } from "next"
import { Features } from "@/components/landing-page/features"

export const metadata: Metadata = {
  title: "Özellikler | CoachTale - Yapay Zeka Destekli Sınav Takip Sistemi",
  description: "CoachTale'nin yapay zeka destekli özellikleri: Akıllı sınav takibi, kişiselleştirilmiş çalışma planları, AI destekli öneriler, motivasyon asistanı ve daha fazlası.",
  keywords: "tyt özellikleri, ayt özellikleri, sınav takip özellikleri, ai destekli özellikler, çalışma planı özellikleri",
}

export default function FeaturesPage() {
  return <Features />
} 