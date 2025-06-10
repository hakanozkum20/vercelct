"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Progress } from "@/components/ui/progress"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    if (!auth) {
      router.push("/auth")
    } else {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-4">
        <Progress value={75} className="w-[200px]" />
        <p className="text-sm text-muted-foreground">Yükleniyor...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Sabit Sidebar */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Ana İçerik Alanı */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Sabit Header */}
        <Header
          title="Dashboard"
          description="Hoş geldiniz! İşte genel bakış."
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Kaydırılabilir İçerik */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
