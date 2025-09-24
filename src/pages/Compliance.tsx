import { Shield, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GradientButton } from "@/components/ui/gradient-button";

export default function Compliance() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold font-satoshi bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Compliance Monitoring
          </h1>
          <p className="text-muted-foreground mt-1">
            Track compliance metrics and regulatory requirements
          </p>
        </div>
        <GradientButton>
          <Shield className="w-4 h-4 mr-2" />
          Run Assessment
        </GradientButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-success" />
              SOC 2 Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-success">98%</span>
              <Badge className="status-success">Compliant</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              GDPR Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-warning">85%</span>
              <Badge className="status-warning">In Progress</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent-orange" />
              ISO 27001
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-accent-orange">92%</span>
              <Badge className="status-success">Certified</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Compliance Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Detailed compliance monitoring features are being developed. This will include real-time compliance tracking, 
            audit trails, and automated reporting for various regulatory frameworks.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}