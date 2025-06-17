"use client"

import { useState, useEffect } from "react"
import { AuthPage } from "@/components/auth-page"

export default function AuthPageRoute() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if already authenticated
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus === "true") {
      // Redirect to dashboard if already authenticated
      window.location.href = "/dashboard"
    } else {
      setIsLoading(false)
    }
  }, [])

  const handleAuthenticated = () => {
    // Set authentication status
    localStorage.setItem("isAuthenticated", "true")
    // Redirect to dashboard
    window.location.href = "/dashboard"
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
