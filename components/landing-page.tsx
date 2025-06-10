"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  BookOpen,
  Target,
  Brain,
  MessageCircle,
  BarChart3,
  Users,
  CheckCircle,
  Star,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Clock,
  X,
  Check,
  Crown,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Apple,
  Play,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const plans = [
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

const features = [
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

const testimonials = [
  {
    name: "Ahmet Yılmaz",
    role: "12. Sınıf Öğrencisi",
    content: "TYT puanım 3 ayda 380'den 450'ye çıktı. AI önerileri gerçekten işe yarıyor!",
    rating: 5,
  },
  {
    name: "Zeynep Kaya",
    role: "Mezun Öğrenci",
    content: "Çalışma planım çok daha organize oldu. Hangi konulara odaklanacağımı biliyorum artık.",
    rating: 5,
  },
  {
    name: "Mehmet Demir",
    role: "11. Sınıf Öğrencisi",
    content: "Motivasyon AI'ı sayesinde çalışma disiplinimi koruyabiliyorum. Harika bir uygulama!",
    rating: 5,
  },
]

export function LandingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    if (planId !== "basic") {
      setIsPaymentOpen(true)
    } else {
      // Ücretsiz plan için direkt auth'a yönlendir
      window.location.href = "/auth"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="outline" size="sm">
              <Clock className="w-4 h-4 mr-2" />
              Yakında
            </Button>
            <Button size="sm" onClick={() => (window.location.href = "/auth")}>
              Giriş Yap
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            {/* Coming Soon Banner */}
            <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-xl">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Clock className="w-4 h-4" />
                <span className="font-semibold">Yakında Açılıyor!</span>
                <span className="text-sm text-muted-foreground">• Beta kayıtları başladı</span>
              </div>
            </div>

            <Badge variant="outline" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Destekli Çalışma Sistemi
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              TYT-AYT'de
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Başarının Hikayesi
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
              CoachTale ile yapay zeka destekli kişiselleştirilmiş çalışma planları oluşturun. TYT ve AYT'de
              hedeflediğiniz puanlara ulaşın, başarı hikayanizi yazın.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8">
                Beta Listesine Katıl
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Erken Erişim Al
                <Zap className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Email Signup for Early Access */}
            <div className="max-w-md mx-auto mb-12">
              <div className="flex flex-col sm:flex-row gap-2 p-2 bg-muted rounded-xl">
                <Input placeholder="E-posta adresiniz" className="flex-1 border-0 bg-background" />
                <Button className="sm:px-6">Erken Erişim</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Lansmanı kaçırmayın! İlk 1000 kullanıcıya özel indirim.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Beta Kayıt</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">Q1 2025</div>
                <div className="text-sm text-muted-foreground">Lansman</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">AI</div>
                <div className="text-sm text-muted-foreground">Destekli</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Destek</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Neden CoachTale?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Yapay zeka teknolojisi ile desteklenen özellikleriyle başarı hikayanizi yazın
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                    index === 0 && "bg-blue-500/10",
                    index === 1 && "bg-purple-500/10",
                    index === 2 && "bg-green-500/10",
                    index === 3 && "bg-orange-500/10",
                    index === 4 && "bg-red-500/10",
                    index === 5 && "bg-pink-500/10"
                  )}>
                    <feature.icon className={cn(
                      "w-6 h-6",
                      index === 0 && "text-blue-500",
                      index === 1 && "text-purple-500",
                      index === 2 && "text-green-500",
                      index === 3 && "text-orange-500",
                      index === 4 && "text-red-500",
                      index === 5 && "text-pink-500"
                    )} />
                  </div>
                  <CardTitle className="text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Fiyatlandırma</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              İhtiyacınıza en uygun planı seçin ve hemen başlayın.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                className={cn(
                  "relative h-[600px] w-full max-w-md mx-auto [perspective:1000px] group",
                  plan.popular && "border-primary"
                )}
              >
                <div className="relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                  {/* Front of card - Sadece temel bilgiler */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(0deg)]">
                    <Card className="h-full border-border hover:shadow-lg">
                      <div className="h-full flex flex-col items-center justify-center p-6">
                        <div className="text-center">
                          <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                          <div className="flex items-baseline justify-center gap-1 mb-6">
                            <span className="text-4xl font-bold">{plan.price}</span>
                            <span className="text-muted-foreground">/ay</span>
                          </div>
                          <p className="text-muted-foreground mb-8">{plan.description}</p>
                          <Button 
                            className={cn(
                              "w-full transform transition-all duration-300",
                              "hover:scale-105 hover:shadow-lg hover:shadow-primary/25",
                              plan.popular
                                ? "bg-primary hover:bg-primary/90 hover:shadow-primary/40"
                                : "hover:bg-primary hover:text-primary-foreground hover:border-primary"
                            )}
                            variant={plan.popular ? "default" : "outline"}
                            onClick={() => handlePlanSelect(plan.id)}
                          >
                            <span className="hover:scale-105 transition-transform duration-200">
                              {plan.popular ? "Hemen Başla" : "Planı Seç"}
                            </span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Back of card - Tüm özellikler */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <Card 
                      className="h-full border-border hover:shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, 
                          ${plan.popular ? 'rgba(var(--primary) / 0.1)' : 'rgba(var(--muted) / 0.1)'}, 
                          transparent)`,
                      }}
                    >
                      <div className="h-full flex flex-col p-6">
                        <div className="flex items-center justify-center mb-6">
                          {plan.popular ? (
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 rounded-full blur-xl animate-pulse" />
                              <Crown className="w-12 h-12 animate-bounce" style={{ 
                                animationDuration: '2s',
                                color: 'rgb(var(--primary))',
                                filter: 'drop-shadow(0 0 8px rgba(var(--primary), 0.5))'
                              }} />
                            </div>
                          ) : (
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/20 to-pink-500/30 rounded-full blur-xl animate-pulse" />
                              <Star className="w-12 h-12 animate-[spin_3s_linear_infinite]" style={{
                                color: 'rgb(var(--primary))',
                                filter: 'drop-shadow(0 0 8px rgba(var(--primary), 0.3))'
                              }} />
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-4 flex-grow overflow-y-auto">
                          <div className="space-y-3">
                            <h4 className="font-medium text-sm text-muted-foreground">Temel Özellikler</h4>
                            <ul className="space-y-2">
                              {plan.features.slice(0, 3).map((feature, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm group/item">
                                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                                  <span className="group-hover/item:text-foreground/90 transition-colors">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-3">
                            <h4 className="font-medium text-sm text-muted-foreground">Ek Özellikler</h4>
                            <ul className="space-y-2">
                              {plan.features.slice(3).map((feature, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm group/item">
                                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                                  <span className="group-hover/item:text-foreground/90 transition-colors">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {plan.limitations && plan.limitations.length > 0 && (
                            <div className="space-y-3 pt-4 border-t border-border">
                              <h4 className="font-medium text-sm text-muted-foreground">Bu planda olmayan özellikler</h4>
                              <ul className="space-y-2">
                                {plan.limitations.map((limitation, index) => (
                                  <li key={index} className="flex items-center gap-2 text-sm group/item">
                                    <div className="w-4 h-4 rounded-full border border-muted-foreground flex-shrink-0 group-hover/item:border-primary/50 transition-colors" />
                                    <span className="text-muted-foreground group-hover/item:text-muted-foreground/80 transition-colors">
                                      {limitation}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div className="pt-4 mt-auto">
                          <Button 
                            className={cn(
                              "w-full transform transition-all duration-300",
                              "hover:scale-105 hover:shadow-lg hover:shadow-primary/25",
                              plan.popular
                                ? "bg-primary hover:bg-primary/90 hover:shadow-primary/40"
                                : "hover:bg-primary hover:text-primary-foreground hover:border-primary"
                            )}
                            variant={plan.popular ? "default" : "outline"}
                            onClick={() => handlePlanSelect(plan.id)}
                          >
                            <span className="hover:scale-105 transition-transform duration-200">
                              {plan.popular ? "Hemen Başla" : "Planı Seç"}
                            </span>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Öğrencilerimiz Ne Diyor?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Binlerce öğrencinin başarı hikayelerinden sadece birkaçı
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="border-border hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 group relative after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-gradient-to-r after:from-primary/0 after:via-primary/20 after:to-primary/0 after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:duration-300"
              >
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-4 h-4 fill-yellow-400 text-yellow-400 group-hover:scale-110 transition-transform duration-300"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
                  <CardDescription className="text-foreground italic group-hover:text-primary/90 transition-colors duration-300">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="transform group-hover:translate-x-1 transition-transform duration-300">
                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Başarı Hikayaniz İçin Hazır Olun</h2>
            <p className="text-xl text-muted-foreground mb-8">
              CoachTale ile yapay zeka destekli çalışma sistemi yakında sizlerle
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Erken Erişim Listesi
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Shield className="w-5 h-5 mr-2" />
                İlk 1000 Kullanıcı
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobil Uygulama Tanıtımı */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Mobil Uygulamamızı Keşfedin</h2>
            <p className="text-xl text-muted-foreground mb-8">
              CoachTale mobil uygulaması ile her an, her yerde çalışın. App Store ve Google Play'den hemen indirin!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="outline" className="text-lg px-8 flex items-center gap-2">
                <FontAwesomeIcon icon={faApple} className="h-8 w-8 text-black dark:text-white" />
                App Store
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 flex items-center gap-2">
                <FontAwesomeIcon icon={faGooglePlay} className="h-8 w-8 text-green-500" />
                Google Play
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl text-foreground">CoachTale</span>
              </div>
              <p className="text-muted-foreground">
                AI destekli TYT-AYT hazırlık platformu ile başarı hikayanizi yazın.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Ürün</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#features" className="hover:text-foreground transition-colors">
                    Özellikler
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-foreground transition-colors">
                    Fiyatlar
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Demo
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Destek</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Yardım Merkezi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    İletişim
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Durum
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Geri Bildirim
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Sosyal Medya</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors flex items-center gap-2">
                    <Instagram className="w-5 h-5 text-pink-500" />
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors flex items-center gap-2">
                    <Twitter className="w-5 h-5 text-blue-400" />
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors flex items-center gap-2">
                    <Youtube className="w-5 h-5 text-red-500" />
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors flex items-center gap-2">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center text-muted-foreground">
            <p>&copy; 2025 CoachTale. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>

      {/* Payment Dialog */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ödeme Bilgileri</DialogTitle>
            <DialogDescription>
              {selectedPlan && plans.find((p) => p.id === selectedPlan)?.name} planı için ödeme bilgilerinizi girin
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input id="email" type="email" placeholder="ornek@email.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="card">Kart Numarası</Label>
              <Input id="card" placeholder="1234 5678 9012 3456" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Son Kullanma</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Kart Üzerindeki İsim</Label>
              <Input id="name" placeholder="Ad Soyad" />
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1"
                onClick={() => {
                  // Ödeme işlemi simülasyonu
                  setTimeout(() => {
                    setIsPaymentOpen(false)
                    window.location.href = "/auth"
                  }, 1000)
                }}
              >
                <Clock className="w-4 h-4 mr-2" />
                Ödemeyi Tamamla
              </Button>
              <Button variant="outline" onClick={() => setIsPaymentOpen(false)}>
                İptal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
