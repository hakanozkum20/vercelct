"use client"

import { useState, useEffect } from "react"
import { Dashboard } from "@/components/dashboard"
import { ExamTracker } from "@/components/exam-tracker"
import { Layout } from "@/components/layout"

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem("isAuthenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    } else {
      // Redirect to auth if not authenticated
      window.location.href = "/auth"
    }
    setIsLoading(false)
  }, [])

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
    return null // Will redirect in useEffect
  }

  // Sayfa içeriğini belirle
  const renderPageContent = () => {
    switch (currentPage) {
      case "exam-tracker":
        return <ExamTracker />
      case "dashboard":
      default:
        return <Dashboard />
    }
  }

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPageContent()}
    </Layout>
  )
}
