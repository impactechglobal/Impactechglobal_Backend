import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthLayout } from "@/components/AuthLayout";
import { DashboardLayout } from "@/components/DashboardLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Compliance from "./pages/Compliance";
import AccessControl from "./pages/AccessControl";
import VpnTunnels from "./pages/VpnTunnels";
import AiMonitoring from "./pages/AiMonitoring";
import Encryption from "./pages/Encryption";
import AuditTrails from "./pages/AuditTrails";
import NetworkSecurity from "./pages/NetworkSecurity";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
          <Route path="/compliance" element={<DashboardLayout><Compliance /></DashboardLayout>} />
          <Route path="/access-control" element={<DashboardLayout><AccessControl /></DashboardLayout>} />
          <Route path="/vpn-tunnels" element={<DashboardLayout><VpnTunnels /></DashboardLayout>} />
          <Route path="/ai-monitoring" element={<DashboardLayout><AiMonitoring /></DashboardLayout>} />
          <Route path="/encryption" element={<DashboardLayout><Encryption /></DashboardLayout>} />
          <Route path="/audit-trails" element={<DashboardLayout><AuditTrails /></DashboardLayout>} />
          <Route path="/network-security" element={<DashboardLayout><NetworkSecurity /></DashboardLayout>} />
          <Route path="/users" element={<DashboardLayout><Users /></DashboardLayout>} />
          <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
          <Route path="/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
