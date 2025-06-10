import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">CoachTale</h3>
            <p className="text-muted-foreground mb-4">
              Yapay zeka destekli kişisel çalışma asistanınız. Hedeflerinize ulaşmanıza yardımcı oluyoruz.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="w-5 h-5 text-[#1877F2]" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="w-5 h-5 text-[#E4405F]" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="w-5 h-5 text-[#1DA1F2]" />
              </Button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Hızlı Bağlantılar</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Özellikler
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Fiyatlandırma
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                  Yorumlar
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">İletişim</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                info@coachtale.com
              </li>
              <li className="text-muted-foreground">
                +90 (538) 818 86 72
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CoachTale. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
} 