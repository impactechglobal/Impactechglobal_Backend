import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, Eye, MoreHorizontal } from "lucide-react";

interface ThreatAlert {
  id: string;
  type: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  description: string;
  timestamp: string;
  source: string;
  status: "Active" | "Resolved" | "In Progress";
}

const mockThreats: ThreatAlert[] = [
  {
    id: "T001",
    type: "Unauthorized Access",
    severity: "Critical",
    description: "Multiple failed login attempts from suspicious IP",
    timestamp: "2 minutes ago",
    source: "192.168.1.100",
    status: "Active"
  },
  {
    id: "T002", 
    type: "Data Anomaly",
    severity: "High",
    description: "Unusual data access pattern detected",
    timestamp: "15 minutes ago",
    source: "Internal System",
    status: "In Progress"
  },
  {
    id: "T003",
    type: "Compliance Drift",
    severity: "Medium", 
    description: "Configuration changes not following policy",
    timestamp: "1 hour ago",
    source: "Server-03",
    status: "Active"
  },
  {
    id: "T004",
    type: "Permission Escalation",
    severity: "High",
    description: "User attempting to access restricted resources",
    timestamp: "2 hours ago",
    source: "john.doe@company.com",
    status: "Resolved"
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "Critical": return "status-critical";
    case "High": return "bg-destructive/20 text-destructive border-destructive/30";
    case "Medium": return "status-warning";
    case "Low": return "status-success";
    default: return "bg-muted text-muted-foreground";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active": return "status-critical";
    case "In Progress": return "status-warning";
    case "Resolved": return "status-success";
    default: return "bg-muted text-muted-foreground";
  }
};

export function ThreatAlertsTable() {
  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <CardTitle className="text-lg font-satoshi">Real-time Threat Alerts</CardTitle>
        </div>
        <Button variant="outline" size="sm" className="hover:bg-secondary-dark/50">
          <Eye className="w-4 h-4 mr-2" />
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockThreats.map((threat) => (
            <div
              key={threat.id}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary-dark/30 border border-border hover:bg-secondary-dark/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-mono text-muted-foreground">{threat.id}</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{threat.type}</span>
                    <Badge className={`text-xs px-2 py-1 ${getSeverityColor(threat.severity)}`}>
                      {threat.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{threat.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{threat.timestamp}</span>
                    <span>•</span>
                    <span>{threat.source}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge className={`text-xs px-2 py-1 ${getStatusColor(threat.status)}`}>
                  {threat.status}
                </Badge>
                <Button variant="ghost" size="icon" className="w-8 h-8 hover:bg-secondary-dark/50">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}