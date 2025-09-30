import { useState } from "react";
import { Shield, TrendingUp, AlertCircle, CheckCircle, FileText, Download, Settings, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function Compliance() {
  const { toast } = useToast();
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  const handleRunAssessment = () => setIsAssessmentOpen(true);
  const handleConfirmAssessment = () => {
    setIsAssessmentOpen(false);
    toast({
      title: "Assessment Started",
      description: "Compliance assessment is now running. You'll be notified when complete.",
    });
  };
  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Compliance report has been generated successfully.",
    });
  };
  const handleViewDetails = (framework: string) => {
    toast({
      title: `${framework} Details`,
      description: `Viewing detailed compliance information for ${framework}.`,
    });
  };
  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Compliance data export is being prepared. Download will start shortly.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-satoshi bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Compliance Monitoring
          </h1>
          <p className="text-muted-foreground mt-1">
            Track compliance metrics and regulatory requirements
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button onClick={handleGenerateReport} variant="outline" className="w-full sm:w-auto">
            <FileText className="w-4 h-4 mr-2" /> Generate Report
          </Button>
          <Dialog open={isAssessmentOpen} onOpenChange={setIsAssessmentOpen}>
            <DialogTrigger asChild>
              <GradientButton onClick={handleRunAssessment} className="w-full sm:w-auto">
                <Shield className="w-4 h-4 mr-2" /> Run Assessment
              </GradientButton>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Run Compliance Assessment</DialogTitle>
                <DialogDescription>
                  This will perform a comprehensive compliance assessment across all frameworks.
                  The process may take several minutes to complete.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAssessmentOpen(false)}>Cancel</Button>
                <Button onClick={handleConfirmAssessment}>
                  <Play className="w-4 h-4 mr-2" /> Start Assessment
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Compliance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {[
          { title: "SOC 2 Compliance", icon: Shield, color: "text-success", value: "98%", status: "Compliant", btn: "View Details" },
          { title: "GDPR Status", icon: AlertCircle, color: "text-warning", value: "85%", status: "In Progress", btn: "Configure" },
          { title: "ISO 27001", icon: TrendingUp, color: "text-accent-orange", value: "92%", status: "Certified", btn: "Export Data" },
        ].map((card, index) => (
          <Card key={index} className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <card.icon className={`w-5 h-5 ${card.color}`} />
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-2xl font-bold ${card.color}`}>{card.value}</span>
                <Badge className={card.status === "Compliant" || card.status === "Certified" ? "status-success" : "status-warning"}>
                  {card.status}
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  if (card.btn === "View Details") handleViewDetails(card.title);
                  else if (card.btn === "Export Data") handleExportData();
                }}
              >
                {card.btn === "View Details" && <CheckCircle className="w-4 h-4 mr-2" />}
                {card.btn === "Configure" && <Settings className="w-4 h-4 mr-2" />}
                {card.btn === "Export Data" && <Download className="w-4 h-4 mr-2" />}
                {card.btn}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Assessments & Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent-orange" /> Recent Assessments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { framework: "SOC 2 Type II", date: "2024-01-15", score: "98%", status: "Passed" },
                { framework: "ISO 27001", date: "2024-01-10", score: "92%", status: "Certified" },
                { framework: "GDPR Audit", date: "2024-01-05", score: "85%", status: "In Progress" },
              ].map((assessment, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg bg-secondary-dark/30 border border-border gap-2 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-foreground">{assessment.framework}</span>
                    <div className="text-sm text-muted-foreground truncate">
                      {assessment.date} • Score: {assessment.score}
                    </div>
                  </div>
                  <Badge className={assessment.status === "Passed" || assessment.status === "Certified" ? "status-success" : "status-warning"}>
                    {assessment.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-accent-orange" /> Action Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { task: "Update data retention policy", priority: "High", due: "2024-01-20" },
                { task: "Review access permissions", priority: "Medium", due: "2024-01-25" },
                { task: "Complete security training", priority: "Low", due: "2024-02-01" },
              ].map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg bg-secondary-dark/30 border border-border gap-2 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-foreground">{item.task}</span>
                    <div className="text-sm text-muted-foreground truncate">
                      Due: {item.due}
                    </div>
                  </div>
                  <Badge className={
                    item.priority === "High"
                      ? "bg-destructive/20 text-destructive"
                      : item.priority === "Medium"
                        ? "bg-warning/20 text-warning"
                        : "bg-success/20 text-success"
                  }>
                    {item.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
