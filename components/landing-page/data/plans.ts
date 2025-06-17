export interface Plan {
  id: string
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  limitations: string[]
  buttonText: string
  popular: boolean
  aiFeatures: string
}

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Temel Plan",
    price: "Ücretsiz",
    description: "Başlangıç için ideal",
    features: [
      "Haftalık çalışma önerileri",
      "Temel performans analizi",
      "10 deneme/ay limit",
      "Basit istatistikler",
      "Email destek",
    ],
    limitations: ["Chat AI yok", "Detaylı kişiselleştirme yok", "Video çözümler yok"],
    buttonText: "Ücretsiz Başla",
    popular: false,
    aiFeatures: "Temel AI",
  },
  {
    id: "standard",
    name: "Standart Plan",
    price: "$10",
    period: "/ay",
    description: "En popüler seçim",
    features: [
      "Sınırsız deneme takibi",
      "Detaylı performans analizi",
      "AI çalışma planı (aylık)",
      "Chat AI (5 mesaj/gün)",
      "Konu önerileri",
      "Video çözüm anlatımları",
      "Öncelikli destek",
    ],
    limitations: [],
    buttonText: "Standart'ı Seç",
    popular: true,
    aiFeatures: "Gelişmiş AI",
  },
  {
    id: "premium",
    name: "Premium Plan",
    price: "$15",
    period: "/ay",
    description: "Maksimum performans",
    features: [
      "Tüm Standart özellikler",
      "Günlük çalışma önerileri",
      "Sınırsız Chat AI",
      "Akıllı soru üretimi",
      "Duygusal destek AI",
      "1-on-1 mentörlük",
      "Canlı dersler",
      "Gelişmiş AI öğretmen",
    ],
    limitations: [],
    buttonText: "Premium'u Seç",
    popular: false,
    aiFeatures: "Ultra AI",
  },
]
