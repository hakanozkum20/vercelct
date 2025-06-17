import { redirect } from "next/navigation"
import { Dashboard } from "@/components/dashboard/dashboard"
import { Layout } from "@/components/layout"
import { createClient } from "@/utils/supabase/server"

export default async function DashboardPage() {
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
    .select("full_name")
    .eq("id", session.user.id)
    .single()

  // Eğer profiles tablosundan full_name gelmezse, session.user.email'i kullan
  const userFullName = profile?.full_name || session.user.email || "Kullanıcı"
  const userEmail = session.user.email || ""

  return (
    <Layout userFullName={userFullName} userEmail={userEmail}>
      <Dashboard />
    </Layout>
  )
}
