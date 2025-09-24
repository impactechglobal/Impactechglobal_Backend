import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Shield,
  Activity,
  AlertTriangle,
  FileText,
  Users,
  Settings,
  ChevronLeft,
  Bot
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Compliance", url: "/compliance", icon: Shield },
  { title: "Access Logs", url: "/access-logs", icon: Activity },
  { title: "Risk & Threats", url: "/risks", icon: AlertTriangle },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Users", url: "/users", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-gradient-primary text-primary-dark font-semibold shadow-glow" 
      : "hover:bg-secondary-dark/50 text-sidebar-foreground";

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300 border-r border-sidebar-border bg-primary-dark`}
      collapsible="icon"
    >
      <SidebarContent className="bg-primary-dark">
        {/* Logo Section */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-dark" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-satoshi font-bold text-foreground">ImpactechGlobal</h2>
                <p className="text-xs text-muted-foreground">AI Compliance Suite</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="p-4">
          <SidebarGroupLabel className="text-muted-foreground text-xs font-satoshi font-medium mb-2">
            {!collapsed && "NAVIGATION"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-10">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavCls({ isActive })}`
                      }
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Collapse Toggle */}
        <div className="mt-auto p-4 border-t border-sidebar-border">
          <SidebarTrigger className="w-full flex items-center justify-center h-10 rounded-lg hover:bg-secondary-dark/50 transition-colors">
            <ChevronLeft className={`w-5 h-5 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`} />
          </SidebarTrigger>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}