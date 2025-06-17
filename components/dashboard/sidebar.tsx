"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  BarChart3,
  ChevronDown,
  CreditCard,
  Home,
  Package,
  ShoppingCart,
  Users,
  BookOpen,
  Settings,
  Calendar,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/utils/supabase/client"

interface SidebarProps {
  isOpen: boolean
  userFullName: string // Yeni prop
  userEmail: string // Yeni prop
}

export function Sidebar({ isOpen, userFullName, userEmail }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const sidebarItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: ShoppingCart, label: "Orders", href: "/dashboard/orders" },
    { icon: Package, label: "Products", href: "/dashboard/products" },
    { icon: Users, label: "Customers", href: "/dashboard/customers" },
    { icon: CreditCard, label: "Payments", href: "/dashboard/payments" },
    { icon: Calendar, label: "Calendar", href: "/dashboard/calendar" },
    { icon: BookOpen, label: "TYT-AYT Takip", href: "/dashboard/exam-tracker" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ]

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  // Avatar fallback için baş harfleri al
  const getInitials = (name: string) => {
    if (!name) return "JD" // Default if name is empty
    const parts = name.split(" ")
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return parts[0][0].toUpperCase()
  }

  return (
    <div className={cn("bg-card border-r border-border flex flex-col shadow-premium", isOpen ? "w-64" : "w-20")}>
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-sm">
            <BarChart3 className="w-4 h-4 text-primary-foreground" />
          </div>
          {isOpen && <span className="font-bold text-xl text-foreground">AdminPro</span>}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left group",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  !isOpen && "justify-center px-2",
                )}
                prefetch={false}
              >
                <item.icon className={cn("w-5 h-5 flex-shrink-0", !isOpen && "w-6 h-6")} />
                {isOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-primary/10 text-primary">{getInitials(userFullName)}</AvatarFallback>
              </Avatar>
              {isOpen && (
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground">{userFullName}</p>
                  <p className="text-xs text-muted-foreground">{userEmail}</p>
                </div>
              )}
              {isOpen && <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 animate-in slide-in-from-top-2 duration-200">
            <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>Ayarlar</DropdownMenuItem>
            <DropdownMenuItem>Destek</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>Çıkış Yap</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
