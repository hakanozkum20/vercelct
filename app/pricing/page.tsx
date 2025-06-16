import { Metadata } from "next"
import { Pricing } from "@/components/landing-page/pricing"

export const metadata: Metadata = {
  title: "Fiyatlandırma | CoachTale - Yapay Zeka Destekli Sınav Takip Sistemi",
  description: "CoachTale'nin uygun fiyatlı planları: Ücretsiz başlangıç planı, standart ve premium özellikler. TYT ve AYT hazırlık için en iyi değer.",
  keywords: "tyt fiyat, ayt fiyat, sınav takip fiyatları, ai destekli eğitim fiyatları, çalışma planı fiyatları",
}

export default function PricingPage() {
  return <Pricing />
} 