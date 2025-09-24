import { ComplianceScoreGauge } from "@/components/ComplianceScoreGauge";
import { ThreatAlertsTable } from "@/components/ThreatAlertsTable";
import { GradientButton } from "@/components/ui/gradient-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold font-satoshi bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Compliance Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time security monitoring and compliance oversight
          </p>
        </div>
        <div className="flex gap-3">
          <GradientButton size="default">
            <Download className="w-4 h-4 mr-2" />
            Generate Report
          </GradientButton>
          <GradientButton variant="outline">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </GradientButton>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat) => (
          <Card key={stat.title} className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold font-satoshi text-foreground">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className={`w-3 h-3 ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`} />
                    <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Compliance Score */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-satoshi">
              <Shield className="w-5 h-5 text-accent-orange" />
              Compliance Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ComplianceScoreGauge score={94.2} />
          </CardContent>
        </Card>

        {/* Active Devices & Sessions */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-satoshi">
              <Activity className="w-5 h-5 text-accent-yellow" />
              Active Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeDevices.map((device) => (
                <div key={device.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary-dark/30 border border-border">
                  <div className="flex items-center gap-3">
                    <device.icon className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">{device.name}</p>
                      <p className="text-sm text-muted-foreground">{device.count} devices</p>
                    </div>
                  </div>
                  <Badge className={`text-xs px-2 py-1 ${getDeviceStatusColor(device.status)}`}>
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
            <CardTitle className="flex items-center gap-2 font-satoshi">
              <AlertTriangle className="w-5 h-5 text-warning" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">AI Engine</span>
                <Badge className="status-success">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database</span>
                <Badge className="status-success">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">API Gateway</span>
                <Badge className="status-warning">Limited</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Backup System</span>
                <Badge className="status-success">Running</Badge>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
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