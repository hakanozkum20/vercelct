import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { NavigationGuard } from "@/components/navigation-guard"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CoachTale - AI Destekli TYT-AYT Hazırlık",
  description: "Yapay zeka destekli kişiselleştirilmiş çalışma planları ile TYT ve AYT'de başarıya ulaşın",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="coachtale-theme"
        >
          <NavigationGuard />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
