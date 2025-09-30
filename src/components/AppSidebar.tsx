// AppSidebar.tsx
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Shield,
  Lock,
  Wifi,
  Users,
  Bot,
  Settings,
  ChevronLeft,
  Key,
  Network,
  Eye,
} from "lucide-react";
import logo from "@/assets/logo.svg";
import fav from "@/assets/fav.svg";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Compliance", url: "/compliance", icon: Shield },
  { title: "Access Control", url: "/access-control", icon: Lock },
  { title: "VPN & Tunnels", url: "/vpn-tunnels", icon: Wifi },
  { title: "AI Monitoring", url: "/ai-monitoring", icon: Bot },
  { title: "Encryption", url: "/encryption", icon: Key },
  { title: "Audit Trails", url: "/audit-trails", icon: Eye },
  { title: "Network Security", url: "/network-security", icon: Network },
  { title: "Users", url: "/users", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar
      className={`${
        collapsed ? "w-16" : "w-64"
      } transition-all duration-300 border-r border-sidebar-border bg-primary-dark overflow-hidden`}
      collapsible="icon"
    >
      <SidebarContent className="bg-primary-dark flex flex-col h-full overflow-hidden">
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border flex items-center justify-center">
          {collapsed ? (
            <img src={fav} alt="ImpactechGlobal" className="h-8 w-auto" />
          ) : (
            <img src={logo} alt="ImpactechGlobal" className="h-8 w-auto max-w-full" />
          )}
        </div>

        {/* Menu */}
        <SidebarGroup className="p-2 flex-1 overflow-y-auto overflow-x-hidden">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    end
                    className={({ isActive }) =>
                      `flex items-center ${collapsed ? 'justify-center' : 'gap-3'} px-3 py-2 h-10 rounded-lg transition-all duration-200 truncate
                      ${
                        isActive
                          ? "bg-gradient-to-r from-accent-orange to-accent-orange/80 text-white font-semibold shadow-md border border-accent-orange/30"
                          : "text-sidebar-foreground hover:bg-secondary-dark/50 hover:text-accent-orange"
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && (
                      <span className="font-medium truncate">{item.title}</span>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Collapse Button */}
        <div className="p-3 border-t border-sidebar-border">
          <SidebarTrigger className="w-full flex items-center justify-center h-10 rounded-lg hover:bg-secondary-dark/50 transition-colors">
            <ChevronLeft
              className={`w-5 h-5 transition-transform duration-200 ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </SidebarTrigger>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
