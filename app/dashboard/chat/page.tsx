import { redirect } from "next/navigation"
import { Layout } from "@/components/layout"
import { createClient } from "@/utils/supabase/server"
import { ChatInterface } from "@/components/chat/chat-interface"

async function ChatPage() {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth")
  }

  // Kullanıcının profil bilgilerini çek
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, user_profile_image")
    .eq("id", session.user.id)
    .single()

  // Eğer profiles tablosundan full_name gelmezse, session.user.email'i kullan
  const userFullName = profile?.full_name || session.user.email || "Kullanıcı"
  const userEmail = session.user.email || ""
  const userProfileImage = profile?.user_profile_image || null

  return (
    <Layout userFullName={userFullName} userEmail={userEmail} userProfileImage={userProfileImage}>
      <ChatInterface />
    </Layout>
  )
}

export default ChatPage 