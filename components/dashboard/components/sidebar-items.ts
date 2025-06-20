import { Home, User, BarChart3, ShoppingCart, Package, Users, CreditCard, Calendar, BookOpen, Settings, MessageSquare } from "lucide-react";

export interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

export const sidebarItems: SidebarItem[] = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: ShoppingCart, label: "Orders", href: "/dashboard/orders" },
  { icon: Package, label: "Products", href: "/dashboard/products" },
  { icon: Users, label: "Customers", href: "/dashboard/customers" },
  { icon: CreditCard, label: "Payments", href: "/dashboard/payments" },
  { icon: Calendar, label: "Calendar", href: "/dashboard/calendar" },
  { icon: BookOpen, label: "TYT-AYT Takip", href: "/dashboard/exam-tracker" },
  { icon: MessageSquare, label: "Chat", href: "/dashboard/chat" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]; 