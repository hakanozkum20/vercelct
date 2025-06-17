"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"

interface LayoutProps {
  children: React.ReactNode
  userFullName: string // Yeni prop
  userEmail: string // Yeni prop
}

export function Layout({ children, userFullName, userEmail }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Sabit Sidebar */}
      <Sidebar isOpen={sidebarOpen} userFullName={userFullName} userEmail={userEmail} />

      {/* Ana İçerik Alanı */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Sabit Header */}
        <Header
          title="Dashboard"
          description="Hoş geldiniz! İşte genel bakış."
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Kaydırılabilir İçerik */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
