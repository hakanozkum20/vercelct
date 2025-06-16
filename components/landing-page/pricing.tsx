"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, Crown, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { plans } from "./data/plans"

export function Pricing() {
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
                Ödemeyi Tamamla
              </Button>
              <Button variant="outline" onClick={() => setIsPaymentOpen(false)}>
                İptal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
} 