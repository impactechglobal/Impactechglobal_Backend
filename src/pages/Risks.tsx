import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, TrendingUp } from "lucide-react";

const mockRisks = [
  { id: "R001", title: "Unauthorized Access Attempts", severity: "Critical", probability: "High", impact: "High", status: "Active", description: "Multiple failed login attempts detected from external IPs" },
  { id: "R002", title: "Data Exfiltration Risk", severity: "High", probability: "Medium", impact: "Critical", status: "Monitoring", description: "Unusual data transfer patterns identified" },
  { id: "R003", title: "Compliance Violation", severity: "Medium", probability: "Low", impact: "Medium", status: "Mitigated", description: "Configuration drift from security baseline" },
  { id: "R004", title: "Insider Threat", severity: "High", probability: "Low", impact: "High", status: "Active", description: "Privileged user accessing sensitive data outside normal hours" }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "Critical": return "bg-destructive/20 text-destructive border-destructive/30";
    case "High": return "bg-warning/20 text-warning border-warning/30";
    case "Medium": return "bg-accent/20 text-accent-foreground border-accent/30";
    default: return "bg-muted/20 text-muted-foreground border-muted/30";
  }
};

export default function Risks() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Risk & Threats</h1>
          <p className="text-muted-foreground">Identify and manage security risks</p>
        </div>
        <Button className="bg-gradient-primary">
          <Shield className="w-4 h-4 mr-2" />
          Risk Assessment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Critical Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">3</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 mr-1 text-destructive" />
              +2 from last week
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">High Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">7</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 mr-1 text-warning" />
              +1 from last week
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Mitigated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">12</div>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 mr-1 text-success" />
              +5 this week
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-accent-orange" />
            Active Risk Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRisks.map((risk) => (
              <div key={risk.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary-dark/30 border border-border">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono text-muted-foreground">{risk.id}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">{risk.title}</span>
                      <Badge className={getSeverityColor(risk.severity)}>
                        {risk.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{risk.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Probability: {risk.probability}</span>
                      <span>•</span>
                      <span>Impact: {risk.impact}</span>
                      <span>•</span>
                      <span>Status: {risk.status}</span>
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