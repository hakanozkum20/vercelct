import { redirect } from "next/navigation"
import { ExamTracker } from "@/components/exam-tracker"
import { Layout } from "@/components/layout"
import { createClient } from "@/utils/supabase/server"

export default async function ExamTrackerPage() {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth")
  }

  return (
    <Layout>
      <ExamTracker />
    </Layout>
  )
}
