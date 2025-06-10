import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Brain, Calendar, Clock, Users, ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Arka plan desenleri */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:20px_20px]" />
      </div>

      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          {/* Coming Soon Banner */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 text-primary group hover:from-primary/20 hover:to-primary/10 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 backdrop-blur-sm border border-primary/10">
              <span className="relative flex h-3 w-3 mr-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="group-hover:scale-105 transition-transform duration-300 font-medium tracking-wide">Çok Yakında</span>
            </div>

            {/* AI Badge */}
            <Badge variant="outline" className="text-lg px-5 py-2.5 border-primary/30 hover:border-primary/50 bg-gradient-to-r from-background to-background/80 hover:from-primary/5 hover:to-primary/10 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/10 backdrop-blur-sm">
              <Brain className="w-5 h-5 mr-2.5 text-primary group-hover:scale-110 transition-transform duration-300" />
              <span className="group-hover:text-primary transition-colors duration-300 font-medium tracking-wide">Yapay Zeka Destekli</span>
            </Badge>
          </div>

          {/* Ana Başlık */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-gradient">
            Çalışma Asistanınız
          </h1>

          {/* Açıklama */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Yapay zeka destekli kişisel çalışma asistanınız ile hedeflerinize ulaşın
          </p>

          {/* Butonlar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
            >
              <span className="relative z-10 flex items-center">
                Beta Listesine Katıl
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10 hover:bg-primary/5 hover:border-primary/50"
            >
              <span className="flex items-center">
                Erken Erişim
                <Sparkles className="w-5 h-5 ml-2 group-hover:animate-pulse" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            </Button>
          </div>

          {/* E-posta Girişi */}
          <div className="max-w-md mx-auto">
            <div className="flex gap-2 p-2 bg-muted/50 rounded-xl backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
              <Input
                type="email"
                placeholder="E-posta adresiniz"
                className="bg-background/50 backdrop-blur-sm focus:ring-2 focus:ring-primary/20 transition-all duration-300"
              />
              <Button className="hover:scale-105 transition-transform duration-300">Katıl</Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              İlk 1000 kullanıcıya özel %50 indirim!
            </p>
          </div>

          {/* İstatistikler */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center group">
              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">1000+</div>
              <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">Beta Kaydı</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">15</div>
              <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">Gün Kaldı</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">24/7</div>
              <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">AI Desteği</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
              <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">Memnuniyet</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}