"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

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
    price: "₺15",
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
    price: "₺25",
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
      // window.location.href = "/auth"
      console.log("Ücretsiz plan seçildi - yönlendirme geçici olarak devre dışı")
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
            <Button 
              size="sm" 
              onClick={() => console.log("Giriş yap butonuna tıklandı - yönlendirme geçici olarak devre dışı")}
            >
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
                <div className="text-sm text-muted-foreground">Lansман</div>
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
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Size Uygun Planı Seçin</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              İhtiyaçlarınıza göre tasarlanmış esnek fiyatlandırma seçenekleri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={plan.id}
                className={cn(
                  "relative border-border transition-all duration-500 ease-out group cursor-pointer",
                  "hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 hover:scale-105",
                  "hover:border-primary/50 hover:bg-gradient-to-br hover:from-background hover:to-primary/5",
                  "animate-in fade-in slide-in-from-bottom-8",
                  plan.popular && "border-primary shadow-lg scale-105 bg-gradient-to-br from-background to-primary/5",
                  plan.popular && "hover:shadow-primary/20 hover:border-primary hover:scale-110",
                )}
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationDuration: "600ms",
                  animationFillMode: "both",
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-primary text-primary-foreground shadow-lg animate-pulse">En Popüler</Badge>
                  </div>
                )}

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Border glow effect */}
                <div className="absolute inset-0 rounded-lg border border-primary/0 group-hover:border-primary/30 transition-all duration-500" />

                <CardHeader className="text-center relative z-10">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <CardTitle className="text-foreground group-hover:text-primary transition-colors duration-300">
                      {plan.name}
                    </CardTitle>
                  </div>

                  <div className="mt-4 transform group-hover:scale-105 transition-transform duration-300">
                    <span className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-muted-foreground group-hover:text-primary/70 transition-colors duration-300">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <CardDescription className="group-hover:text-foreground transition-colors duration-300">
                    {plan.description}
                  </CardDescription>

                  <Badge
                    variant="outline"
                    className="mt-2 group-hover:border-primary group-hover:text-primary transition-all duration-300"
                  >
                    {plan.aiFeatures}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4 relative z-10">
                  <div className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                        style={{
                          transitionDelay: `${featureIndex * 50}ms`,
                        }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm text-foreground group-hover:text-foreground/90 transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {plan.limitations.length > 0 && (
                    <div className="space-y-2 pt-4 border-t border-border group-hover:border-primary/30 transition-colors duration-300">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <div
                          key={limitIndex}
                          className="flex items-center gap-2 transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
                          style={{
                            transitionDelay: `${(plan.features.length + limitIndex) * 50}ms`,
                          }}
                        >
                          <div className="w-4 h-4 rounded-full border border-muted-foreground flex-shrink-0 group-hover:border-primary/50 transition-colors duration-300" />
                          <span className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                            {limitation}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Button
                    className={cn(
                      "w-full mt-6 transform transition-all duration-300 group-hover:scale-105",
                      "group-hover:shadow-lg group-hover:shadow-primary/25",
                      plan.popular
                        ? "bg-primary hover:bg-primary/90 group-hover:bg-primary group-hover:shadow-primary/40"
                        : "group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary",
                    )}
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    <span className="group-hover:scale-105 transition-transform duration-200">{plan.buttonText}</span>
                  </Button>
                </CardContent>

                {/* Floating particles effect on hover */}
                <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                  <div className="absolute top-4 right-4 w-2 h-2 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-500" />
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-700" />
                  <div className="absolute top-1/2 left-4 w-1.5 h-1.5 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-opacity duration-600" />
                </div>
              </Card>
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
              <Card key={index} className="border-border">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-foreground italic">"{testimonial.content}"</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Başarı Hikayeniz İçin Hazır Olun</h2>
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

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12 px-4">
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
                AI destekli TYT-AYT hazırlık platformu ile başarı hikayenizi yazın.
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
              <h3 className="font-semibold text-foreground mb-4">Yasal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Gizlilik
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Şartlar
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    KVKK
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Çerezler
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
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
                    // window.location.href = "/auth"
                    console.log("Ödeme tamamlandı - auth yönlendirmesi geçici olarak devre dışı")
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