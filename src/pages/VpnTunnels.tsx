import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Globe, Shield, Zap, Server, Plus, Play, Square, Settings } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const mockTunnels = [
  { id: "VPN001", name: "US East Gateway", location: "New York", status: "Connected", users: 45, bandwidth: "2.4 Gbps", latency: "12ms" },
  { id: "VPN002", name: "EU Central Hub", location: "Frankfurt", status: "Connected", users: 32, bandwidth: "1.8 Gbps", latency: "8ms" },
  { id: "VPN003", name: "Asia Pacific", location: "Singapore", status: "Maintenance", users: 0, bandwidth: "0 Gbps", latency: "N/A" },
  { id: "VPN004", name: "UK Gateway", location: "London", status: "Connected", users: 28, bandwidth: "1.2 Gbps", latency: "15ms" },
];

const mockConnections = [
  { user: "john.doe@company.com", server: "US East", ip: "10.0.1.45", connected: "2h 15m", data: "1.2 GB" },
  { user: "sarah.devid@company.com", server: "EU Central", ip: "10.0.2.23", connected: "45m", data: "456 MB" },
  { user: "mike.wilson@company.com", server: "UK Gateway", ip: "10.0.3.12", connected: "1h 30m", data: "890 MB" },
];

export default function VpnTunnels() {
  const [autoConnect, setAutoConnect] = useState(true);
  const [isCreateTunnelOpen, setIsCreateTunnelOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateTunnel = () => {
    setIsCreateTunnelOpen(false);
    toast({
      title: "Tunnel Created",
      description: "New VPN tunnel has been created and is initializing.",
    });
  };

  const handleStartTunnel = (tunnelId: string) => {
    toast({
      title: "Tunnel Started",
      description: `VPN tunnel ${tunnelId} is now connecting.`,
    });
  };

  const handleStopTunnel = (tunnelId: string) => {
    toast({
      title: "Tunnel Stopped",
      description: `VPN tunnel ${tunnelId} has been disconnected.`,
      variant: "destructive",
    });
  };

  const handleConfigureTunnel = (tunnelName: string) => {
    toast({
      title: "Configuration",
      description: `Opening configuration for ${tunnelName}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Connected": return "bg-success/20 text-success border-success/30";
      case "Maintenance": return "bg-warning/20 text-warning border-warning/30";
      case "Disconnected": return "bg-destructive/20 text-destructive border-destructive/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
  <div className="space-y-6">
  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold text-foreground">VPN & Tunnels</h1>
      <p className="text-muted-foreground">Secure network connections and encrypted tunnels</p>
    </div>
    <Dialog open={isCreateTunnelOpen} onOpenChange={setIsCreateTunnelOpen}>
      <DialogTrigger asChild>
        <GradientButton size="default">
          <Plus className="w-4 h-4 mr-2" />
          Create Tunnel
        </GradientButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create VPN Tunnel</DialogTitle>
          <DialogDescription>
            Set up a new secure VPN tunnel with custom configuration and routing rules.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
          <Button variant="outline" onClick={() => setIsCreateTunnelOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateTunnel}>
            <Plus className="w-4 h-4 mr-2" /> Create Tunnel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>

  {/* Stats Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {[
      { title: "Active Tunnels", value: "3", color: "text-success", subtitle: "Currently running" },
      { title: "Connected Users", value: "105", color: "text-accent-orange", subtitle: "Across all tunnels" },
      { title: "Total Bandwidth", value: "5.4 Gbps", color: "text-foreground", subtitle: "Combined capacity" },
      { title: "Avg Latency", value: "11ms", color: "text-success", subtitle: "Network response" },
    ].map((card) => (
      <Card key={card.title} className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${card.color}`}>{card.value}</div>
          <div className="text-sm text-muted-foreground">{card.subtitle}</div>
        </CardContent>
      </Card>
    ))}
  </div>

  {/* VPN Gateways & Security Settings */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 flex-wrap">
          <Globe className="w-5 h-5 text-accent-orange" /> VPN Gateways
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockTunnels.map((tunnel) => (
          <div key={tunnel.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-secondary-dark/30 border border-border gap-2">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <Server className="w-8 h-8 text-accent-orange" />
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-medium text-foreground">{tunnel.name}</span>
                  <Badge className={getStatusColor(tunnel.status)}>{tunnel.status}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">{tunnel.location} • {tunnel.users} users • {tunnel.bandwidth}</div>
                <div className="text-xs text-muted-foreground">Latency: {tunnel.latency}</div>
              </div>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              {tunnel.status === "Connected" ? (
                <Button variant="outline" size="sm" onClick={() => handleStopTunnel(tunnel.id)} className="text-destructive hover:text-destructive">
                  <Square className="w-4 h-4" />
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={() => handleStartTunnel(tunnel.id)} className="text-success hover:text-success">
                  <Play className="w-4 h-4" />
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={() => handleConfigureTunnel(tunnel.name)}>
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>

    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 flex-wrap">
          <Shield className="w-5 h-5 text-accent-orange" /> Security Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {[
          { label: "Auto-Connect", description: "Automatically connect to best server", checked: autoConnect, onChange: setAutoConnect },
          { label: "Kill Switch", description: "Block traffic if VPN disconnects", checked: true },
          { label: "DNS Leak Protection", description: "Prevent DNS queries outside VPN", checked: true },
          { label: "Split Tunneling", description: "Route specific apps outside VPN", checked: false },
        ].map((setting) => (
          <div key={setting.label} className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
            <div>
              <span className="font-medium text-foreground">{setting.label}</span>
              <p className="text-sm text-muted-foreground">{setting.description}</p>
            </div>
            <Switch checked={setting.checked} onCheckedChange={setting.onChange} />
          </div>
        ))}
      </CardContent>
    </Card>
  </div>

  {/* Active Connections */}
  <Card className="glass-card">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 flex-wrap">
        <Zap className="w-5 h-5 text-accent-orange" /> Active Connections
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {mockConnections.map((connection, index) => (
        <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-secondary-dark/30 border border-border gap-2">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <div>
              <span className="font-medium text-foreground">{connection.user}</span>
              <div className="text-sm text-muted-foreground">{connection.server} • {connection.ip}</div>
            </div>
          </div>
          <div className="text-right mt-2 sm:mt-0">
            <div className="text-sm font-medium text-foreground">{connection.connected}</div>
            <div className="text-xs text-muted-foreground">{connection.data} transferred</div>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
</div>

  );
}