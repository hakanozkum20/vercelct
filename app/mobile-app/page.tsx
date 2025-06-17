import { Metadata } from "next"
import { MobileApp } from "@/components/landing-page/mobile-app"

export const metadata: Metadata = {
  title: "Mobil Uygulama | CoachTale - Yapay Zeka Destekli Sınav Takip Sistemi",
  description: "CoachTale mobil uygulaması ile her an, her yerde çalışın. iOS ve Android için özel tasarlanmış, yapay zeka destekli sınav takip uygulaması.",
  keywords: "tyt mobil uygulama, ayt mobil uygulama, sınav takip uygulaması, eğitim uygulaması, çalışma planı uygulaması",
}

export default function MobileAppPage() {
  return <MobileApp />
}
