import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Shield, Eye, MoreHorizontal, Ban, CheckCircle, Search } from "lucide-react";

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
  const { toast } = useToast();

  const handleViewAll = () => {
    toast({
      title: "Threat Analysis",
      description: "Opening detailed threat analysis dashboard.",
    });
  };

  const handleInvestigate = (threatId: string) => {
    toast({
      title: "Investigation Started",
      description: `Investigating threat ${threatId} in detail.`,
    });
  };

  const handleResolve = (threatId: string) => {
    toast({
      title: "Threat Resolved",
      description: `Threat ${threatId} has been marked as resolved.`,
    });
  };

  const handleBlock = (threatId: string) => {
    toast({
      title: "Threat Blocked",
      description: `Threat ${threatId} has been blocked automatically.`,
      variant: "destructive",
    });
  };

  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <CardTitle className="text-lg font-satoshi">AI-Powered Threat Detection</CardTitle>
        </div>
        <Button variant="outline" size="sm" onClick={handleViewAll}>
          <Eye className="w-4 h-4 mr-2" />
          View All
        </Button>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {mockThreats.map((threat) => (
            <div
              key={threat.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-4 rounded-lg bg-secondary-dark/30 border border-border hover:bg-secondary-dark/50 transition-colors"
            >
              {/* Left: Threat Info */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-mono text-muted-foreground">{threat.id}</span>
                </div>

                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-foreground truncate">{threat.type}</span>
                    <Badge className={`text-xs px-2 py-1 ${getSeverityColor(threat.severity)}`}>
                      {threat.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{threat.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                    <span>{threat.timestamp}</span>
                    <span>•</span>
                    <span>{threat.source}</span>
                  </div>
                </div>
              </div>

              {/* Right: Status & Actions */}
              <div className="flex items-center gap-2 mt-2 sm:mt-0 flex-shrink-0">
                <Badge className={`text-xs px-2 py-1 ${getStatusColor(threat.status)}`}>
                  {threat.status}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 hover:bg-secondary-dark/50"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleInvestigate(threat.id)}>
                      <Search className="w-4 h-4 mr-2" />
                      Investigate
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleResolve(threat.id)}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Resolve
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBlock(threat.id)}>
                      <Ban className="w-4 h-4 mr-2" />
                      Block Source
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

  );
}