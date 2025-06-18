"use client"

import { cn } from "@/lib/utils"
import { toast } from "sonner"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { User, Mail, Save, ImageIcon, KeyRound, Loader2 } from "lucide-react"
import { uploadAvatar } from "@/actions/upload-avatar"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

interface ProfileSettingsProps {
  initialProfile: {
    fullName: string
    email: string
    profileImage: string | null
    
  }
}

export function ProfileSettings({ initialProfile }: ProfileSettingsProps) {
  const [fullName, setFullName] = useState(initialProfile.fullName)
  const [email, setEmail] = useState(initialProfile.email)
  
  const [profileImage, setProfileImage] = useState<string | null>(initialProfile.profileImage)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const avatarInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    setFullName(initialProfile.fullName)
    setEmail(initialProfile.email)
    
    setProfileImage(initialProfile.profileImage)
    setAvatarFile(null) // Reset avatar file on initialProfile change
  }, [initialProfile])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatarFile(file)
      setProfileImage(URL.createObjectURL(file)) // Önizleme için
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      toast.error("Kullanıcı oturumu bulunamadı.")
      setIsLoading(false)
      return
    }

    let newProfileImageUrl = profileImage
    let uploadSuccess = true

    // Avatar dosyasını yükle
    if (avatarFile) {
      const formData = new FormData()
      formData.append("avatar", avatarFile)
      const uploadResult = await uploadAvatar(formData)
      if (uploadResult.success && uploadResult.url) {
        newProfileImageUrl = uploadResult.url
        setProfileImage(uploadResult.url) // State'i güncel URL ile güncelle
      } else {
        toast.error(uploadResult.message || "Avatar yüklenirken hata oluştu.")
        uploadSuccess = false
      }
    }

    if (!uploadSuccess) {
      setIsLoading(false)
      return
    }

    // Profil adını ve biyografiyi güncelle
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ full_name: fullName, user_profile_image: newProfileImageUrl })
      .eq("id", user.id)

    if (updateError) {
      toast.error(updateError.message || "Profil güncellenirken hata oluştu.")
    } else {
      toast.success("Profil başarıyla güncellendi!")
      router.refresh() // Sayfayı yenileyerek sidebar'ın güncellenmesini sağla
    }

    setIsLoading(false)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    toast.error("Şifre değiştirme özelliği henüz aktif değil. Lütfen daha sonra deneyin.")
    // Gerçek bir backend entegrasyonu burada yapılacaktır.
  }

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-foreground mb-2">Profil Ayarları</h1>
        <p className="text-lg text-muted-foreground">Kişisel bilgilerinizi ve hesap ayarlarınızı yönetin.</p>
      </div>

      {/* Genel Bilgiler Kartı */}
      <Card className="border-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <User className="w-6 h-6 text-primary" />
            Genel Bilgiler
          </CardTitle>
          <CardDescription>Adınız, e-posta adresiniz ve profil resminizi güncelleyin.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="relative w-32 h-32 flex-shrink-0">
                <Avatar className="w-full h-full border-4 border-primary/50 shadow-xl">
                  <AvatarImage src={profileImage || "/placeholder-user.jpg"} alt="Profil Resmi" />
                  <AvatarFallback className="bg-primary/10 text-primary text-4xl font-semibold">
                    {fullName
                      ? fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      : "JD"}
                  </AvatarFallback>
                </Avatar>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={avatarInputRef}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-background border-border shadow-md hover:bg-accent"
                  onClick={() => avatarInputRef.current?.click()}
                  title="Profil resmini değiştir"
                >
                  <ImageIcon className="w-5 h-5 text-muted-foreground" />
                  <span className="sr-only">Profil resmini değiştir</span>
                </Button>
              </div>

              <div className="flex-1 w-full space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Ad Soyad</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Adınız Soyadınız"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      disabled // E-posta genellikle buradan değiştirilmez
                      className="pl-10 bg-muted/50 cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              
              
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading} className="px-6 py-3">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Kaydediliyor...
                  </div>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Değişiklikleri Kaydet
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Şifre ve Güvenlik Kartı */}
      <Card className="border-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <KeyRound className="w-6 h-6 text-primary" />
            Şifre ve Güvenlik
          </CardTitle>
          <CardDescription>Şifrenizi güncelleyin veya güvenlik ayarlarınızı yönetin.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Mevcut Şifre</Label>
                <Input id="current-password" type="password" placeholder="••••••••" />
              </div>
              <div></div> {/* Boşluk bırakmak için */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="new-password">Yeni Şifre</Label>
                <Input id="new-password" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-new-password">Yeni Şifreyi Onayla</Label>
                <Input id="confirm-new-password" type="password" placeholder="••••••••" />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" variant="outline" className="px-6 py-3">
                <Save className="w-4 h-4 mr-2" />
                Şifreyi Değiştir
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
