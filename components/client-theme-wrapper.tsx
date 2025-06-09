"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface ClientThemeWrapperProps {
  children: React.ReactNode
}

export function ClientThemeWrapper({ children }: ClientThemeWrapperProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder that matches the expected structure
    return <div className="min-h-screen bg-background text-foreground">{children}</div>
  }

  return <>{children}</>
}
