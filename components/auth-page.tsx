"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
// import { createClient } from "@/utils/supabase/server" // Kaldırıldı
// import { useRouter } from "next/navigation" // Kaldırıldı

import { login, signup } from "@/app/auth/actions" // Yeni eklenen server actions

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Toaster, toast } from "sonner";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Geçerli bir e-posta adresi girin." }),
  password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır." }),
  name: z.string().optional(), // Kayıt için isteğe bağlı
});

export function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get("signupSuccess") === "true") {
      toast.success("Başarılı bir şekilde kayıt oldunuz! Lütfen giriş yapın.")
      const newUrl = new URL(window.location.href)
      newUrl.searchParams.delete("signupSuccess")
      window.history.replaceState({}, document.title, newUrl.toString())
    }
  }, [searchParams])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    if (isSignUp && values.name) {
      formData.append("name", values.name);
    }

    try {
      let result;
      if (isSignUp) {
        result = await signup(formData);
      } else {
        result = await login(formData);
      }
      if (result && result.error) {
        toast.error(result.error);
        return;
      }
      // Başarılı ise yönlendirme zaten action'da yapılacak veya mevcut davranış devam edecek
    } catch (err: any) {
      toast.error(err.message || "Beklenmeyen bir kimlik doğrulama hatası oluştu.");
    } finally {
      setIsLoading(false);
    }
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    setError(null) // Mod değiştiğinde hatayı temizle
    form.reset(); // Formu sıfırla
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
                  <h1 className="text-2xl font-bold">CoachTale</h1>
                </div>

                <h2 className="text-4xl font-bold mb-4 leading-tight">
                  Sınav Başarınız İçin
                  <br />
                  <span className="bg-gradient-to-r from-white/90 to-white/70 bg-clip-text text-transparent">
                    Kişisel AI Asistanınız
                  </span>
                </h2>

                <p className="text-background/70 text-lg mb-8 leading-relaxed">
                  Yapay zeka destekli kişiselleştirilmiş çalışma planları ile TYT ve AYT'de hedefinize ulaşın. Öğrenci takip sistemi ve akıllı ders programı ile başarınızı artırın.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-background/70">Akıllı Sınav Takibi</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-200" />
                    <span className="text-background/70">AI Destekli Öneriler</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-400" />
                    <span className="text-background/70">Motivasyon ve Hedef Takibi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Auth Forms */}
            <div className="relative p-8 flex flex-col justify-center bg-card">
              <div className="w-full max-w-sm mx-auto">
                {/* Toggle Buttons */}
                <div className="flex bg-muted rounded-xl p-1 mb-8">
                  <Button
                    onClick={() => setIsSignUp(false)}
                    className={cn(
                      "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300",
                      !isSignUp
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    variant="ghost"
                  >
                    Giriş Yap
                  </Button>
                  <Button
                    onClick={() => setIsSignUp(true)}
                    className={cn(
                      "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300",
                      isSignUp
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    variant="ghost"
                  >
                    Kayıt Ol
                  </Button>
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

                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel htmlFor="email">E-posta</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input
                                      id="email"
                                      type="email"
                                      placeholder="ornek@email.com"
                                      className="pl-10 h-12 bg-background border-input focus:border-ring"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel htmlFor="password">Şifre</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input
                                      id="password"
                                      type={showPassword ? "text" : "password"}
                                      placeholder="••••••••"
                                      className="pl-10 pr-10 h-12 bg-background border-input focus:border-ring"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input type="checkbox" className="rounded border-input" />
                              <span className="text-sm text-muted-foreground">Beni hatırla</span>
                            </label>
                            <Button
                              type="button"
                              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
                              variant="link"
                            >
                              Şifremi unuttum
                            </Button>
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
                      </Form>
                    </div>

                    {/* Sign Up Form */}
                    <div className="w-1/2 pl-4">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-foreground mb-2">Hesap Oluşturun</h3>
                        <p className="text-muted-foreground">Yeni hesabınızı oluşturun</p>
                      </div>

                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          {isSignUp && (
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem className="space-y-2">
                                  <FormLabel htmlFor="signup-name">Adınız</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                      <Input
                                        id="signup-name"
                                        type="text"
                                        placeholder="Tam Adınız"
                                        className="pl-10 h-12 bg-background border-input focus:border-ring"
                                        {...field}
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel htmlFor="signup-email">E-posta</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input
                                      id="signup-email"
                                      type="email"
                                      placeholder="ornek@email.com"
                                      className="pl-10 h-12 bg-background border-input focus:border-ring"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem className="space-y-2">
                                <FormLabel htmlFor="signup-password">Şifre</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input
                                      id="signup-password"
                                      type={showPassword ? "text" : "password"}
                                      placeholder="••••••••"
                                      className="pl-10 pr-10 h-12 bg-background border-input focus:border-ring"
                                      {...field}
                                    />
                                  </div>
                                </FormControl>
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button
                            type="submit"
                            className="w-full h-12 bg-foreground hover:bg-foreground/90 text-background font-medium transition-all duration-200"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                                Kayıt olunuyor...
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                Kayıt Ol
                                <ArrowRight className="w-4 h-4" />
                              </div>
                            )}
                          </Button>
                        </form>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <Toaster position="bottom-right" richColors />
    </div>
  )
}
