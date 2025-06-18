"use server"

import { put, del } from "@vercel/blob"
import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function uploadAvatar(formData: FormData) {
  const file = formData.get("avatar") as File
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: "Kullanıcı oturumu bulunamadı." }
  }

  if (!file || file.size === 0) {
    return { success: false, message: "Lütfen bir resim dosyası seçin." }
  }

  try {
    // Eski avatarı bul
    const { data: profile } = await supabase
      .from("profiles")
      .select("user_profile_image")
      .eq("id", user.id)
      .single()

    // Eğer eski avatar varsa ve vercel blob ise sil
    if (profile?.user_profile_image && profile.user_profile_image.includes("vercel-storage.com")) {
      try {
        await del(profile.user_profile_image)
      } catch (e) {
        // Silme hatası önemli değil, devam et
      }
    }

    // Yeni avatarı yükle
    const { url } = await put(`avatars/${user.id}/${file.name}`, file, {
      access: "public",
    })

    // Supabase'deki profiles tablosunu güncelle
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ user_profile_image: url })
      .eq("id", user.id)

    if (updateError) {
      console.error("Supabase profil güncelleme hatası:", updateError)
      return { success: false, message: "Profil resmi güncellenirken bir hata oluştu." }
    }

    revalidatePath("/dashboard/profile") // Profil sayfasını yeniden doğrula
    revalidatePath("/dashboard") // Dashboard sayfasını yeniden doğrula (sidebar için)

    return { success: true, message: "Profil resmi başarıyla güncellendi.", url }
  } catch (error) {
    console.error("Avatar yükleme hatası:", error)
    return { success: false, message: "Avatar yüklenirken bir hata oluştu." }
  }
}
