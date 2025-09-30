import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Shield, Wifi, Lock, AlertTriangle, Activity, Zap, Play, Square, Settings } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const mockFirewallRules = [
  { id: "FW001", name: "Block Malicious IPs", source: "Threat Intel", target: "All Ports", action: "Block", status: "Active", hits: 1247 },
  { id: "FW002", name: "Allow HTTPS Traffic", source: "0.0.0.0/0", target: "Port 443", action: "Allow", status: "Active", hits: 45623 },
  { id: "FW003", name: "Restrict SSH Access", source: "Internal Network", target: "Port 22", action: "Allow", status: "Active", hits: 234 },
  { id: "FW004", name: "Block P2P Traffic", source: "Any", target: "BitTorrent Ports", action: "Block", status: "Inactive", hits: 0 },
];

const mockNetworkDevices = [
  { name: "Core Router", ip: "192.168.1.1", status: "Online", load: "45%", uptime: "99.9%" },
  { name: "Firewall", ip: "192.168.1.2", status: "Online", load: "32%", uptime: "99.8%" },
  { name: "IDS/IPS", ip: "192.168.1.3", status: "Online", load: "67%", uptime: "99.7%" },
  { name: "Load Balancer", ip: "192.168.1.4", status: "Maintenance", load: "0%", uptime: "98.5%" },
];

const mockThreats = [
  { type: "DDoS Attack", source: "203.0.113.0/24", severity: "High", blocked: true, time: "2 min ago" },
  { type: "Port Scan", source: "198.51.100.45", severity: "Medium", blocked: true, time: "5 min ago" },
  { type: "Malware C&C", source: "192.0.2.123", severity: "Critical", blocked: true, time: "8 min ago" },
];

export default function NetworkSecurity() {
  const [intrusionPrevention, setIntrusionPrevention] = useState(true);
  const [ddosProtection, setDdosProtection] = useState(true);
  const [isCreateRuleOpen, setIsCreateRuleOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateRule = () => {
    setIsCreateRuleOpen(false);
    toast({
      title: "Rule Created",
      description: "New firewall rule has been created and activated.",
    });
  };

  const handleToggleRule = (ruleId: string, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    toast({
      title: `Rule ${newStatus}`,
      description: `Firewall rule ${ruleId} has been ${newStatus.toLowerCase()}.`,
    });
  };

  const handleBlockThreat = (threatSource: string) => {
    toast({
      title: "Threat Blocked",
      description: `Threat source ${threatSource} has been blocked successfully.`,
      variant: "destructive",
    });
  };

  const handleDeviceMonitor = (deviceName: string) => {
    toast({
      title: "Device Monitoring",
      description: `Opening monitoring dashboard for ${deviceName}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Online": case "Active": return "bg-success/20 text-success border-success/30";
      case "Maintenance": case "Inactive": return "bg-warning/20 text-warning border-warning/30";
      case "Offline": return "bg-destructive/20 text-destructive border-destructive/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-destructive/20 text-destructive border-destructive/30";
      case "High": return "bg-warning/20 text-warning border-warning/30";
      case "Medium": return "bg-accent/20 text-accent-foreground border-accent/30";
      case "Low": return "bg-success/20 text-success border-success/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <div className="space-y-6">
  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold text-foreground">Network Security</h1>
      <p className="text-muted-foreground">Monitor and protect network infrastructure</p>
    </div>
    <Dialog open={isCreateRuleOpen} onOpenChange={setIsCreateRuleOpen}>
      <DialogTrigger asChild>
        <GradientButton size="default">
          <Shield className="w-4 h-4 mr-2" />
          Create Rule
        </GradientButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Firewall Rule</DialogTitle>
          <DialogDescription>
            Define a new firewall rule to control network traffic. Specify source, destination, and action parameters.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
          <Button variant="outline" onClick={() => setIsCreateRuleOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateRule}>
            <Shield className="w-4 h-4 mr-2" />
            Create Rule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>

  {/* Stats */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Repeat cards for Threats Blocked, Network Load, Active Rules, Uptime */}
  </div>

  {/* Firewall Rules & Network Devices */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Firewall Rules Card */}
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 flex-wrap">
          <Shield className="w-5 h-5 text-accent-orange" />
          Firewall Rules
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockFirewallRules.map((rule) => (
            <div key={rule.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-secondary-dark/30 border border-border gap-2">
              <div className="flex items-center gap-4 flex-1 flex-wrap">
                <Lock className="w-6 h-6 text-accent-orange" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-medium text-foreground">{rule.name}</span>
                    <Badge className={getStatusColor(rule.status)}>
                      {rule.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {rule.source} → {rule.target} • {rule.action}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Hits: {rule.hits.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap mt-2 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleRule(rule.id, rule.status)}
                >
                  {rule.status === "Active" ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Network Devices Card */}
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 flex-wrap">
          <Wifi className="w-5 h-5 text-accent-orange" />
          Network Devices
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockNetworkDevices.map((device, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-secondary-dark/30 border border-border gap-2">
              <div className="flex items-center gap-4 flex-1 flex-wrap">
                <div className={`w-3 h-3 rounded-full ${device.status === "Online" ? "bg-success animate-pulse" : device.status === "Maintenance" ? "bg-warning" : "bg-destructive"}`}></div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-medium text-foreground">{device.name}</span>
                    <Badge className={getStatusColor(device.status)}>
                      {device.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {device.ip} • Load: {device.load}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Uptime: {device.uptime}
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDeviceMonitor(device.name)}
              >
                <Activity className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>

  {/* Recent Threats & Security Settings */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Recent Threats Card */}
    {/* Security Settings Card */}
  </div>
</div>

  );
}