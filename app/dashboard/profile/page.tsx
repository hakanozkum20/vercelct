export const dynamic = "force-dynamic"

import { redirect } from "next/navigation"
import { Layout } from "@/components/layout"
import { createClient } from "@/utils/supabase/server"
import { ProfileSettings } from "@/components/dashboard/components/profile-settings"

async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth")
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, user_profile_image")
    .eq("id", user.id)
    .single()

  if (profileError) {
    console.error("Profil bilgileri çekilirken hata:", profileError)
    // Hata durumunda varsayılan değerler veya hata mesajı gösterilebilir
  }

  const userFullName = profile?.full_name || user.email || "Kullanıcı"
  const userEmail = user.email || ""
  const userProfileImage = profile?.user_profile_image || null

  return (
    <Layout userFullName={userFullName} userEmail={userEmail} userProfileImage={userProfileImage}>
      <ProfileSettings
        initialProfile={{
          fullName: userFullName,
          email: userEmail,
          profileImage: userProfileImage,
        }}
      />
    </Layout>
  )
}

export default ProfilePage
