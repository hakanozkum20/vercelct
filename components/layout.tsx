"use client"

import { useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  CreditCard,
  Home,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Users,
  BookOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface LayoutProps {
  children: ReactNode
  currentPage: string
  onNavigate: (page: string) => void
}

export function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const sidebarItems = [
    { icon: Home, label: "Dashboard", page: "dashboard" },
    { icon: BarChart3, label: "Analytics", page: "analytics" },
    { icon: ShoppingCart, label: "Orders", page: "orders" },
    { icon: Package, label: "Products", page: "products" },
    { icon: Users, label: "Customers", page: "customers" },
    { icon: CreditCard, label: "Payments", page: "payments" },
    { icon: Calendar, label: "Calendar", page: "calendar" },
    { icon: BookOpen, label: "TYT-AYT Takip", page: "exam-tracker" },
    { icon: Settings, label: "Settings", page: "settings" },
  ]

  // Sayfa başlığını belirle
  const getPageTitle = () => {
    switch (currentPage) {
      case "dashboard":
        return "Dashboard"
      case "exam-tracker":
        return "TYT-AYT Takip Sistemi"
      case "analytics":
        return "Analytics"
      case "orders":
        return "Orders"
      case "products":
        return "Products"
      case "customers":
        return "Customers"
      case "payments":
        return "Payments"
      case "calendar":
        return "Calendar"
      case "settings":
        return "Settings"
      default:
        return "Dashboard"
    }
  }

  // Sayfa açıklamasını belirle
  const getPageDescription = () => {
    switch (currentPage) {
      case "dashboard":
        return "Hoşgeldiniz, işletmenizin genel görünümü"
      case "exam-tracker":
        return "Deneme ve test sonuçlarınızı takip edin, performansınızı analiz edin"
      case "analytics":
        return "Detaylı analiz ve raporlar"
      default:
        return "Hoşgeldiniz"
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={cn(
          "bg-card border-r border-border transition-all duration-300 flex flex-col shadow-premium",
          sidebarOpen ? "w-64" : "w-16",
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-sm">
              <BarChart3 className="w-4 h-4 text-primary-foreground" />
            </div>
            {sidebarOpen && <span className="font-bold text-xl text-foreground">AdminPro</span>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => onNavigate(item.page)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group",
                    item.page === currentPage
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile */}
        {sidebarOpen && (
          <div className="p-4 border-t border-border">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-foreground">John Doe</p>
                    <p className="text-xs text-muted-foreground">john@example.com</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profil</DropdownMenuItem>
                <DropdownMenuItem>Ayarlar</DropdownMenuItem>
                <DropdownMenuItem>Destek</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    localStorage.removeItem("isAuthenticated")
                    window.location.href = "/"
                  }}
                >
                  Çıkış Yap
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4 shadow-premium">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{getPageTitle()}</h1>
                <p className="text-muted-foreground">{getPageDescription()}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Ara..." className="pl-10 w-64 bg-background border-input focus:border-ring" />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative hover:bg-accent">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground">
                  3
                </span>
              </Button>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-background">{children}</main>
      </div>
    </div>
  )
}
