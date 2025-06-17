import { BookOpen, Target, Brain, MessageCircle, BarChart3, Users } from "lucide-react"

export interface Feature {
  icon: typeof BookOpen
  title: string
  description: string
}

export const features: Feature[] = [
  {
    icon: BookOpen,
    title: "Akıllı Sınav Takibi",
    description: "TYT ve AYT denemelerinizi detaylı şekilde takip edin, performansınızı analiz edin.",
  },
  {
    icon: Brain,
    title: "AI Destekli Öneriler",
    description: "Yapay zeka ile kişiselleştirilmiş çalışma planları ve konu önerileri alın.",
  },
  {
    icon: MessageCircle,
    title: "Motivasyon AI",
    description: "7/24 motivasyon desteği veren AI asistanınız ile hedeflerinize ulaşın.",
  },
  {
    icon: BarChart3,
    title: "Detaylı Analizler",
    description: "Güçlü ve zayıf yönlerinizi keşfedin, gelişim alanlarınızı belirleyin.",
  },
  {
    icon: Target,
    title: "Hedef Takibi",
    description: "Hedef puanınıza giden yolda ilerlemenizi takip edin ve planınızı optimize edin.",
  },
  {
    icon: Users,
    title: "Sosyal Özellikler",
    description: "Arkadaşlarınızla yarışın, liderlik tablolarında yerinizi alın.",
  },
]
