"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Brain, Calendar, Clock, Users, ArrowRight, Sparkles, Target, Zap, Trophy, BookOpen, GraduationCap } from "lucide-react"

export function Hero() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Arka plan desenleri */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:20px_20px]" />
      </div>

      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent animate-gradient">
              Sınav Başarınız İçin
            </span>
            <br />
            <span className="text-foreground">
              Kişisel AI Asistanınız
            </span>
          </h1>

          {/* Açıklama */}
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Yapay zeka destekli kişiselleştirilmiş çalışma planları ile TYT ve AYT'de hedefinize ulaşın. Öğrenci takip sistemi ve akıllı ders programı ile başarınızı artırın.
          </p>

          {/* Özellikler */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20 transition-all duration-300 group">
              <Target className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-medium text-foreground">Hedef Odaklı</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20 transition-all duration-300 group">
              <Brain className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-medium text-foreground">AI Destekli</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20 transition-all duration-300 group">
              <Calendar className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-medium text-foreground">Akıllı Plan</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20 transition-all duration-300 group">
              <Trophy className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-medium text-foreground">Başarı Takibi</span>
            </div>
          </div>

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
              <div className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">%50</div>
              <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">Erken İndirim</div>
            </div>
          </div>

          {/* Başarı Hikayeleri Önizleme */}
          <div className="mt-20">
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="p-2 rounded-full bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 animate-pulse">
                <Trophy className="w-6 h-6 text-primary animate-bounce" />
              </div>
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Başarı Hikayeleri</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 hover:from-primary/10 hover:via-primary/20 hover:to-primary/10 transition-all duration-300 group border border-primary/10 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 via-blue-400/30 to-blue-300/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <GraduationCap className="w-6 h-6 text-blue-500 group-hover:text-blue-400 transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Ahmet Y.</h3>
                    <p className="text-sm text-primary/80">TYT Öğrencisi</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">"CoachTale sayesinde çalışma programımı düzenledim ve hedefime ulaştım. Özellikle AI destekli konu analizi sayesinde eksiklerimi hızlıca tespit edip tamamladım."</p>
                <div className="flex items-center gap-2 text-sm text-primary/80">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>6 aylık kullanım</span>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 hover:from-primary/10 hover:via-primary/20 hover:to-primary/10 transition-all duration-300 group border border-primary/10 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 via-purple-400/30 to-purple-300/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-6 h-6 text-purple-500 group-hover:text-purple-400 transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Zeynep K.</h3>
                    <p className="text-sm text-primary/80">AYT Öğrencisi</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">"AI destekli çalışma planı ile verimli çalışmayı öğrendim. Her gün yapılan mini testler sayesinde konuları pekiştirdim ve sınavda çok rahat ettim."</p>
                <div className="flex items-center gap-2 text-sm text-primary/80">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <span>8 aylık kullanım</span>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 hover:from-primary/10 hover:via-primary/20 hover:to-primary/10 transition-all duration-300 group border border-primary/10 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/20 via-amber-400/30 to-amber-300/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Trophy className="w-6 h-6 text-amber-500 group-hover:text-amber-400 transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Mehmet A.</h3>
                    <p className="text-sm text-primary/80">TYT Öğrencisi</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">"Kişiselleştirilmiş çalışma planı ile eksiklerimi tamamladım. Özellikle deneme sınavı analizleri sayesinde hangi konulara odaklanmam gerektiğini öğrendim."</p>
                <div className="flex items-center gap-2 text-sm text-primary/80">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <span>1 yıllık kullanım</span>
                </div>
              </div>
            </div>

            {/* İstatistikler */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 hover:from-primary/10 hover:via-primary/20 hover:to-primary/10 transition-all duration-300 group border border-primary/10 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10 text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
                <div className="text-sm text-blue-500/80">Başarılı Öğrenci</div>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 hover:from-primary/10 hover:via-primary/20 hover:to-primary/10 transition-all duration-300 group border border-primary/10 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10 text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">%85</div>
                <div className="text-sm text-purple-500/80">Hedefine Ulaşan</div>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 hover:from-primary/10 hover:via-primary/20 hover:to-primary/10 transition-all duration-300 group border border-primary/10 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10 text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-amber-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">1000+</div>
                <div className="text-sm text-amber-500/80">Saat Çalışma</div>
              </div>
              <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 hover:from-primary/10 hover:via-primary/20 hover:to-primary/10 transition-all duration-300 group border border-primary/10 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10 text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">%92</div>
                <div className="text-sm text-emerald-500/80">Memnuniyet</div>
              </div>
            </div>

            {/* CTA Butonu */}
            <div className="mt-8 text-center">
              <Button 
                size="lg" 
                variant="outline" 
                className="group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 hover:bg-primary/5 hover:border-primary/50"
              >
                <span className="flex items-center">
                  Tüm Başarı Hikayelerini Gör
                  <ArrowRight className="w-5 h-5 ml-2 text-primary group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
