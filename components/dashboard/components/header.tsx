"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, Search, Bell } from "lucide-react"

interface HeaderProps {
  title: string
  description: string
  onMenuClick: () => void
}

export function Header({ title, description, onMenuClick }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border px-6 py-4 shadow-premium">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="text-muted-foreground hover:text-foreground"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
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
  )
}
