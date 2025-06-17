"use client"

import type React from "react"

import { useEffect, useState } from "react"
// Import Supabase client
import { createBrowserClient } from "@/lib/supabase"
import { useRouter } from "next/navigation" // Import useRouter

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter() // Initialize useRouter

  useEffect(() => {
    const supabase = createBrowserClient()
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        setIsAuthenticated(true)
      } else {
        router.push("/auth")
      }
      setIsLoading(false)
    }

    checkAuth()

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsAuthenticated(true)
      } else {
        router.push("/auth")
      }
      setIsLoading(false)
    })

    return () => {
      authListener?.unsubscribe()
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span className="text-muted-foreground">Yükleniyor...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Or a loading spinner, but redirect is handled by useEffect
  }

  return <>{children}</>
}
