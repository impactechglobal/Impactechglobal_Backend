import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, BarChart3 } from "lucide-react";

const mockReports = [
  { id: "RPT001", title: "Monthly Compliance Report", type: "Compliance", status: "Ready", date: "2024-01-15", size: "2.4 MB" },
  { id: "RPT002", title: "Security Audit Summary", type: "Security", status: "Processing", date: "2024-01-14", size: "1.8 MB" },
  { id: "RPT003", title: "Risk Assessment Report", type: "Risk", status: "Ready", date: "2024-01-13", size: "3.1 MB" },
  { id: "RPT004", title: "Access Control Review", type: "Access", status: "Ready", date: "2024-01-12", size: "1.2 MB" }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Ready": return "bg-success/20 text-success border-success/30";
    case "Processing": return "bg-warning/20 text-warning border-warning/30";
    case "Failed": return "bg-destructive/20 text-destructive border-destructive/30";
    default: return "bg-muted/20 text-muted-foreground border-muted/30";
  }
};

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">Generate and manage compliance reports</p>
        </div>
        <Button className="bg-gradient-primary">
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">24</div>
            <div className="text-sm text-muted-foreground">This month</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ready</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">18</div>
            <div className="text-sm text-muted-foreground">Available for download</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">3</div>
            <div className="text-sm text-muted-foreground">In progress</div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent-orange">5</div>
            <div className="text-sm text-muted-foreground">Auto-generated</div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-accent-orange" />
            Recent Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary-dark/30 border border-border">
                <div className="flex items-center gap-4">
                  <FileText className="w-8 h-8 text-accent-orange" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">{report.title}</span>
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {report.date}
                      </span>
                      <span>•</span>
                      <span>{report.type}</span>
                      <span>•</span>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {report.status === "Ready" && (
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}