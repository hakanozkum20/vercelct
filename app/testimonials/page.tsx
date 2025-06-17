import { Metadata } from "next"
import { Testimonials } from "@/components/landing-page/testimonials"

export const metadata: Metadata = {
  title: "Başarı Hikayeleri | CoachTale - Yapay Zeka Destekli Sınav Takip Sistemi",
  description: "CoachTale kullanıcılarının başarı hikayeleri. TYT ve AYT'de hedeflerine ulaşan öğrencilerin deneyimleri ve yorumları.",
  keywords: "tyt başarı hikayeleri, ayt başarı hikayeleri, sınav başarı hikayeleri, öğrenci yorumları, coachtale başarı hikayeleri",
}

export default function TestimonialsPage() {
  return <Testimonials />
}
