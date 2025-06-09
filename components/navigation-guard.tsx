"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function NavigationGuard() {
  const pathname = usePathname()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"

    // Protected routes
    const protectedRoutes = ["/dashboard", "/exam-tracker"]
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

    // Public routes that authenticated users shouldn't access
    const authRoutes = ["/auth"]
    const isAuthRoute = authRoutes.includes(pathname)

    if (isProtectedRoute && !isAuthenticated) {
      window.location.href = "/auth"
    } else if (isAuthRoute && isAuthenticated) {
      window.location.href = "/dashboard"
    }
  }, [pathname])

  return null
}
