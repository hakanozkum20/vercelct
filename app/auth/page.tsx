"use client"

import { useState, useEffect } from "react"
import { AuthPage } from "@/components/auth-page"

// Import Supabase client
import { createBrowserClient } from "@/lib/supabase"
import { useRouter } from "next/navigation" // Import useRouter

export default function AuthPageRoute() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter() // Initialize useRouter

  useEffect(() => {
    const supabase = createBrowserClient()
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        // Redirect to dashboard if already authenticated
        router.push("/dashboard")
      } else {
        setIsLoading(false)
      }
    }

    checkAuth()

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push("/dashboard")
      } else {
        setIsLoading(false)
      }
    })

    return () => {
      authListener?.unsubscribe()
    }
  }, [router])

  const handleAuthenticated = () => {
    // Supabase'in oturumu yönetmesine izin veriyoruz, bu fonksiyon sadece yönlendirmeyi tetikleyecek.
    // onAuthStateChange zaten yönlendirmeyi yapacağı için burada ekstra bir şey yapmaya gerek kalmayabilir,
    // ancak yine de bir fallback olarak bırakabiliriz.
    router.push("/dashboard")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-muted-foreground">Kontrol ediliyor...</span>
        </div>
      </div>
    )
  }

  return <AuthPage onAuthenticated={handleAuthenticated} />
}
