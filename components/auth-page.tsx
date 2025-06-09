"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface AuthPageProps {
  onAuthenticated: () => void
}

export function AuthPage({ onAuthenticated }: AuthPageProps) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onAuthenticated()
    }, 1500)
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-muted/40 dark:from-background dark:via-muted/10 dark:to-muted/20 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-800/50 bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="relative w-full max-w-4xl">
        <Card className="overflow-hidden border-0 shadow-premium-lg glass">
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            {/* Left Side - Branding */}
            <div className="relative bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 p-8 flex flex-col justify-center text-background overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

              {/* Floating Elements - Subtle gray tones */}
              <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse" />
              <div className="absolute bottom-32 right-8 w-32 h-32 bg-white/3 rounded-full blur-2xl animate-pulse delay-1000" />
              <div className="absolute top-1/2 right-20 w-16 h-16 bg-white/5 rounded-full blur-lg animate-pulse delay-500" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h1 className="text-2xl font-bold">AdminPro</h1>
                </div>

                <h2 className="text-4xl font-bold mb-4 leading-tight">
                  Modern Admin
                  <br />
                  <span className="bg-gradient-to-r from-white/90 to-white/70 bg-clip-text text-transparent">
                    Dashboard
                  </span>
                </h2>

                <p className="text-background/70 text-lg mb-8 leading-relaxed">
                  Güçlü analitik araçları ve modern tasarımla işletmenizi yönetin. Verilerinizi görselleştirin ve
                  kararlarınızı hızlandırın.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-background/70">Real-time Analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-200" />
                    <span className="text-background/70">Advanced Security</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-400" />
                    <span className="text-background/70">Cloud Integration</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Forms */}
            <div className="relative p-8 flex flex-col justify-center bg-card">
              <div className="w-full max-w-sm mx-auto">
                {/* Toggle Buttons */}
                <div className="flex bg-muted rounded-xl p-1 mb-8">
                  <button
                    onClick={() => setIsSignUp(false)}
                    className={cn(
                      "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300",
                      !isSignUp
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    Giriş Yap
                  </button>
                  <button
                    onClick={() => setIsSignUp(true)}
                    className={cn(
                      "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300",
                      isSignUp
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    Kayıt Ol
                  </button>
                </div>

                {/* Form Container with Slide Animation */}
                <div className="relative overflow-hidden">
                  <div
                    className={cn(
                      "flex transition-transform duration-500 ease-in-out w-[200%]",
                      isSignUp ? "-translate-x-1/2" : "translate-x-0",
                    )}
                  >
                    {/* Sign In Form */}
                    <div className="w-1/2 pr-4">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-foreground mb-2">Tekrar Hoşgeldiniz</h3>
                        <p className="text-muted-foreground">Hesabınıza giriş yapın</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="email">E-posta</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="ornek@email.com"
                              className="pl-10 h-12 bg-background border-input focus:border-ring"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="password">Şifre</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="pl-10 pr-10 h-12 bg-background border-input focus:border-ring"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="rounded border-input" />
                            <span className="text-sm text-muted-foreground">Beni hatırla</span>
                          </label>
                          <button
                            type="button"
                            className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                          >
                            Şifremi unuttum
                          </button>
                        </div>

                        <Button
                          type="submit"
                          className="w-full h-12 bg-foreground hover:bg-foreground/90 text-background font-medium transition-all duration-200"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                              Giriş yapılıyor...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              Giriş Yap
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          )}
                        </Button>
                      </form>
                    </div>

                    {/* Sign Up Form */}
                    <div className="w-1/2 pl-4">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-foreground mb-2">Hesap Oluşturun</h3>
                        <p className="text-muted-foreground">Yeni hesabınızı oluşturun</p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Ad Soyad</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="name"
                              type="text"
                              placeholder="Adınız Soyadınız"
                              className="pl-10 h-12 bg-background border-input focus:border-ring"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-email">E-posta</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="signup-email"
                              type="email"
                              placeholder="ornek@email.com"
                              className="pl-10 h-12 bg-background border-input focus:border-ring"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-password">Şifre</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="signup-password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="pl-10 pr-10 h-12 bg-background border-input focus:border-ring"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded border-input" required />
                          <span className="text-sm text-muted-foreground">
                            <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                              Kullanım şartları
                            </a>{" "}
                            ve{" "}
                            <a href="#" className="text-foreground/70 hover:text-foreground transition-colors">
                              gizlilik politikası
                            </a>
                            nı kabul ediyorum
                          </span>
                        </div>

                        <Button
                          type="submit"
                          className="w-full h-12 bg-foreground hover:bg-foreground/90 text-background font-medium transition-all duration-200"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                              Hesap oluşturuluyor...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              Hesap Oluştur
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          )}
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
