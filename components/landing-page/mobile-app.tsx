import { Button } from "@/components/ui/button"
import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function MobileApp() {
  return (
    <section id="mobile-app" className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Mobil Uygulamamızı Keşfedin</h2>
            <p className="text-xl text-muted-foreground mb-8">
              CoachTale mobil uygulaması ile her an, her yerde çalışın. App Store ve Google Play'den hemen indirin!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" variant="outline" className="text-lg px-8 flex items-center gap-2 group">
                <FontAwesomeIcon 
                  icon={faApple} 
                  className="h-6 w-6 text-black dark:text-white transition-transform group-hover:scale-110" 
                />
                <span>App Store</span>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 flex items-center gap-2 group">
                <FontAwesomeIcon 
                  icon={faGooglePlay} 
                  className="h-6 w-6 text-green-500 transition-transform group-hover:scale-110" 
                />
                <span>Google Play</span>
              </Button>
            </div>
          </div>
          
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-[280px] h-[560px]">
              {/* Telefon çerçevesi */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 rounded-[3rem] border border-primary/20 shadow-xl" />
              
              {/* Ekran */}
              <div className="absolute inset-[0.5rem] bg-background rounded-[2.5rem] overflow-hidden">
                {/* Ekran içeriği */}
                <div className="h-full bg-gradient-to-br from-primary/5 to-primary/10 p-4">
                  <div className="space-y-4">
                    {/* Üst bar */}
                    <div className="h-8 bg-primary/10 rounded-lg" />
                    
                    {/* Ana içerik */}
                    <div className="space-y-3">
                      <div className="h-24 bg-primary/10 rounded-lg" />
                      <div className="h-16 bg-primary/10 rounded-lg" />
                      <div className="h-16 bg-primary/10 rounded-lg" />
                      <div className="h-16 bg-primary/10 rounded-lg" />
                    </div>
                    
                    {/* Alt navigasyon */}
                    <div className="absolute bottom-4 left-4 right-4 h-12 bg-primary/10 rounded-lg" />
                  </div>
                </div>
              </div>
              
              {/* Parlaklık efekti */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[3rem] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 