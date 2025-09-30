import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Download, Filter } from "lucide-react";

const mockLogs = [
  { id: "AL001", user: "john.doe@company.com", action: "Login", resource: "Dashboard", timestamp: "2024-01-15 14:30:25", status: "Success", ip: "192.168.1.100" },
  { id: "AL002", user: "sarah.johnson@company.com", action: "File Access", resource: "compliance-report.pdf", timestamp: "2024-01-15 14:28:15", status: "Success", ip: "192.168.1.101" },
  { id: "AL003", user: "mike.wilson@company.com", action: "Failed Login", resource: "Login Page", timestamp: "2024-01-15 14:25:10", status: "Failed", ip: "203.0.113.45" },
  { id: "AL004", user: "admin@company.com", action: "Settings Change", resource: "User Permissions", timestamp: "2024-01-15 14:20:05", status: "Success", ip: "192.168.1.1" }
];

export default function AccessLogs() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Access Logs</h1>
          <p className="text-muted-foreground">Monitor user activities and system access</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-accent-orange" />
            Recent Access Activities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary-dark/30 border border-border">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono text-muted-foreground">{log.id}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{log.user}</span>
                      <Badge variant={log.status === "Success" ? "default" : "destructive"} className="text-xs">
                        {log.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{log.action} - {log.resource}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span>{log.timestamp}</span>
                      <span>•</span>
                      <span>{log.ip}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}