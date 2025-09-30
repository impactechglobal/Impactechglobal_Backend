import { useState } from "react";
import { ComplianceScoreGauge } from "@/components/ComplianceScoreGauge";
import { ThreatAlertsTable } from "@/components/ThreatAlertsTable";
import { GradientButton } from "@/components/ui/gradient-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Shield,
  Users,
  Activity,
  TrendingUp,
  Server,
  Smartphone,
  Download,
  UserPlus,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const quickStats = [
  {
    title: "Active Users",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-success"
  },
  {
    title: "Security Events",
    value: "156",
    change: "-8%",
    trend: "down",
    icon: Shield,
    color: "text-accent-orange"
  },
  {
    title: "System Health",
    value: "98.5%",
    change: "+0.3%",
    trend: "up",
    icon: Activity,
    color: "text-success"
  },
  {
    title: "Compliance Rate",
    value: "94.2%",
    change: "+2.1%",
    trend: "up",
    icon: CheckCircle,
    color: "text-success"
  }
];

const activeDevices = [
  { name: "Desktop Workstations", count: 1247, status: "online", icon: Server },
  { name: "Mobile Devices", count: 856, status: "online", icon: Smartphone },
  { name: "IoT Sensors", count: 324, status: "limited", icon: Activity },
  { name: "Virtual Machines", count: 89, status: "maintenance", icon: Server }
];

const getDeviceStatusColor = (status: string) => {
  switch (status) {
    case "online": return "status-success";
    case "limited": return "status-warning";
    case "maintenance": return "bg-muted text-muted-foreground border-muted";
    default: return "status-critical";
  }
};

export default function Dashboard() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const { toast } = useToast();

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Compliance dashboard report has been generated successfully.",
    });
  };

  const handleAddUser = () => {
    setIsAddUserOpen(false);
    toast({
      title: "User Added",
      description: "New user has been created and added to the system.",
    });
  };

  const handleSystemCheck = () => {
    toast({
      title: "Health Check Started",
      description: "System health check is running. Results will be available shortly.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-satoshi bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            AI Compliance Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Real-time security monitoring and intelligent compliance oversight
          </p>
        </div>

        {/* Buttons wrap on small screens */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <GradientButton
            size="default"
            className="w-full sm:w-auto"
            onClick={handleGenerateReport}
          >
            <Download className="w-4 h-4 mr-2" />
            Generate Report
          </GradientButton>

          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <GradientButton
                variant="outline"
                className="w-full sm:w-auto"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </GradientButton>
            </DialogTrigger>
            <DialogContent className="max-w-sm sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account with appropriate permissions and access levels.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-end">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => setIsAddUserOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="w-full sm:w-auto"
                  onClick={handleAddUser}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {quickStats.map((stat) => (
          <Card key={stat.title} className="glass-card">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-xl sm:text-2xl font-bold font-satoshi text-foreground">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp
                      className={`w-3 h-3 ${stat.trend === "up" ? "text-success" : "text-destructive"
                        }`}
                    />
                    <span
                      className={`text-xs font-medium ${stat.trend === "up" ? "text-success" : "text-destructive"
                        }`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-secondary-dark/50 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Compliance Score */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-satoshi text-base sm:text-lg">
              <Shield className="w-5 h-5 text-accent-orange" />
              Compliance Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ComplianceScoreGauge score={94.2} />
          </CardContent>
        </Card>

        {/* Active Devices */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-satoshi text-base sm:text-lg">
              <Activity className="w-5 h-5 text-accent-yellow" />
              Active Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeDevices.map((device) => (
                <div
                  key={device.name}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-lg bg-secondary-dark/30 border border-border hover:bg-secondary-dark/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <device.icon className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">{device.name}</p>
                      <p className="text-sm text-muted-foreground">{device.count} devices</p>
                    </div>
                  </div>
                  <Badge className={`text-xs px-2 py-1 self-start sm:self-auto ${getDeviceStatusColor(device.status)}`}>
                    {device.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-satoshi text-base sm:text-lg">
              <AlertTriangle className="w-5 h-5 text-warning" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "AI Engine", status: "Online", badge: "status-success" },
                { label: "Database", status: "Healthy", badge: "status-success" },
                { label: "API Gateway", status: "Limited", badge: "status-warning" },
                { label: "Backup System", status: "Running", badge: "status-success" }
              ].map((item) => (
                <div key={item.label} className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm font-medium">{item.label}</span>
                  <Badge className={item.badge}>{item.status}</Badge>
                </div>
              ))}

              <div className="mt-4 pt-4 border-t border-border">
                <GradientButton
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={handleSystemCheck}
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Run Health Check
                </GradientButton>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Last updated: 2 minutes ago
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Threat Alerts */}
      <ThreatAlertsTable />
    </div>
  );
}
