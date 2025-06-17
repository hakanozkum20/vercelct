"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// Import useUser hook
import { useUser } from "@/components/user-context"
import { useRouter } from "next/navigation" // Import useRouter

interface HeaderProps {
  isDarkTheme: boolean
  toggleTheme: () => void
}

export function Header({ isDarkTheme, toggleTheme }: HeaderProps) {
  // Inside Header component
  const { user, profile, isLoading, signOut } = useUser()
  const router = useRouter()

  const handleLoginClick = () => {
    router.push("/auth")
  }

  const handleLogout = async () => {
    await signOut()
    router.push("/") // Logout sonrası ana sayfaya yönlendir
  }

  return (
    <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-50 w-full border-b">
      <div className="container flex items-center justify-between h-16">
        <p className="font-bold text-2xl">SAAS</p>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={toggleTheme}>
            {isDarkTheme ? "Açık Tema" : "Koyu Tema"}
          </Button>
          {isLoading ? (
            <div className="w-20 h-10 bg-muted rounded-md animate-pulse" /> // Loading state
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder-user.jpg"} />
                    <AvatarFallback>{user.email ? user.email[0].toUpperCase() : "U"}</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Kullanıcı menüsünü aç</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || user.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Plan:{" "}
                  {profile?.plan_type
                    ? profile.plan_type.charAt(0).toUpperCase() + profile.plan_type.slice(1)
                    : "Yükleniyor..."}
                </DropdownMenuItem>
                {profile?.is_admin && <DropdownMenuItem>Admin Yetkisi: Evet</DropdownMenuItem>}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Çıkış Yap</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" onClick={() => (window.location.href = "/auth")}>
              Giriş Yap
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
