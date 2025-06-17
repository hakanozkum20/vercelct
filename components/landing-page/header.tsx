import { Button } from "@/components/ui/button"
import { BookOpen, Clock } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-foreground">CoachTale</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Özellikler
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Fiyatlar
          </a>
          <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
            Yorumlar
          </a>
          <a href="#mobile-app" className="text-muted-foreground hover:text-foreground transition-colors">
            Mobil Uygulamalar
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="outline" size="sm">
            <Clock className="w-4 h-4 mr-2" />
            Yakında
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="opacity-50 cursor-not-allowed"
            disabled
          >
            Giriş Yap
          </Button>
        </div>
      </div>
    </header>
  )
}
