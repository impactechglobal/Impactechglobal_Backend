import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Search, Filter, Download, Calendar, Eye, AlertCircle } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const mockAuditLogs = [
  { id: "AUD001", timestamp: "2024-01-15 14:30:25", user: "admin@company.com", action: "User Created", resource: "john.doe@company.com", result: "Success", ip: "192.168.1.1", details: "New user account created with standard permissions" },
  { id: "AUD002", timestamp: "2024-01-15 14:28:15", user: "sarah.johnson@company.com", action: "File Access", resource: "compliance-report.pdf", result: "Success", ip: "192.168.1.101", details: "Downloaded quarterly compliance report" },
  { id: "AUD003", timestamp: "2024-01-15 14:25:10", user: "unknown", action: "Login Attempt", resource: "Login Portal", result: "Failed", ip: "203.0.113.45", details: "Multiple failed login attempts detected" },
  { id: "AUD004", timestamp: "2024-01-15 14:20:05", user: "mike.wilson@company.com", action: "Permission Change", resource: "Database Access", result: "Success", ip: "192.168.1.102", details: "Elevated database permissions granted" },
  { id: "AUD005", timestamp: "2024-01-15 14:15:30", user: "system", action: "Backup Created", resource: "Daily Backup", result: "Success", ip: "127.0.0.1", details: "Automated daily backup completed successfully" },
];

const mockComplianceEvents = [
  { regulation: "GDPR", event: "Data Export Request", status: "Completed", date: "2024-01-15", officer: "Sarah Johnson" },
  { regulation: "SOX", event: "Financial Data Access", status: "Under Review", date: "2024-01-14", officer: "Mike Wilson" },
  { regulation: "HIPAA", event: "Patient Record Access", status: "Approved", date: "2024-01-13", officer: "John Doe" },
];

export default function AuditTrails() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAction, setFilterAction] = useState("all");
  const [filterResult, setFilterResult] = useState("all");
  const [isExportOpen, setIsExportOpen] = useState(false);
  const { toast } = useToast();

  const handleExportLogs = () => {
    setIsExportOpen(false);
    toast({
      title: "Export Started",
      description: "Audit logs are being exported to CSV. Download will start shortly.",
    });
  };

  const handleViewDetails = (logId: string) => {
    toast({
      title: "Log Details",
      description: `Viewing detailed information for audit log: ${logId}`,
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Compliance audit report has been generated successfully.",
    });
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case "Success": return "bg-success/20 text-success border-success/30";
      case "Failed": return "bg-destructive/20 text-destructive border-destructive/30";
      case "Warning": return "bg-warning/20 text-warning border-warning/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": case "Approved": return "bg-success/20 text-success border-success/30";
      case "Under Review": return "bg-warning/20 text-warning border-warning/30";
      case "Rejected": return "bg-destructive/20 text-destructive border-destructive/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Audit Trails</h1>
          <p className="text-muted-foreground">Comprehensive logging and compliance tracking</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={handleGenerateReport} variant="outline" className="w-full sm:w-auto">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
            <DialogTrigger asChild>
              <GradientButton size="default" className="w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" />
                Export Logs
              </GradientButton>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Export Audit Logs</DialogTitle>
                <DialogDescription>
                  This will export all filtered audit logs to a CSV file. The export may take a few minutes for large datasets.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                <Button variant="outline" onClick={() => setIsExportOpen(false)}>Cancel</Button>
                <Button onClick={handleExportLogs}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Now
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[
          { title: "Total Events", value: "1,247", subtitle: "Last 30 days", color: "text-foreground" },
          { title: "Failed Actions", value: "23", subtitle: "Requires attention", color: "text-destructive" },
          { title: "Compliance Events", value: "45", subtitle: "Regulatory actions", color: "text-accent-orange" },
          { title: "Retention Period", value: "7 Years", subtitle: "Data retention", color: "text-success" },
        ].map((card, idx) => (
          <Card key={idx} className="glass-card">
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

      {/* Audit Log Search */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent-orange" />
              Audit Log Search
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="login">Login Attempts</SelectItem>
                  <SelectItem value="file">File Access</SelectItem>
                  <SelectItem value="user">User Management</SelectItem>
                  <SelectItem value="permission">Permissions</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterResult} onValueChange={setFilterResult}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Result" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Results</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative w-full sm:w-48">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-full"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAuditLogs.map((log) => (
              <div key={log.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg bg-secondary-dark/30 border border-border hover:bg-secondary-dark/50 transition-colors gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 sm:mb-0">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-mono text-muted-foreground truncate">{log.id}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 mb-1 flex-wrap">
                      <span className="font-medium text-foreground truncate">{log.action}</span>
                      <Badge className={getResultColor(log.result)}>{log.result}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground truncate mb-1">
                      User: {log.user} • Resource: {log.resource}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{log.timestamp} • {log.ip} • {log.details}</div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => handleViewDetails(log.id)}>
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Events */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-accent-orange" />
            Compliance Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockComplianceEvents.map((event, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg bg-secondary-dark/30 border border-border gap-2">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary-dark truncate">{event.regulation}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 mb-1 flex-wrap">
                      <span className="font-medium text-foreground truncate">{event.event}</span>
                      <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      Officer: {event.officer} • Date: {event.date}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Eye className="w-4 h-4 mr-2" />
                  Review
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
