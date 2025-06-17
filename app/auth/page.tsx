import { redirect } from "next/navigation"
import { AuthPage } from "@/components/auth-page"
import { createClient } from "@/utils/supabase/server"

export default async function AuthPageRoute() {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/dashboard")
  }

  return <AuthPage />
}
