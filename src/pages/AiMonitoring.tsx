import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bot, Brain, Eye, Zap, TrendingUp, AlertCircle, Play, Pause } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const mockAiModels = [
  { id: "AI001", name: "Threat Detection Engine", status: "Active", accuracy: "98.5%", alerts: 12, lastTrained: "2024-01-14" },
  { id: "AI002", name: "Anomaly Detector", status: "Active", accuracy: "96.2%", alerts: 8, lastTrained: "2024-01-13" },
  { id: "AI003", name: "Compliance Monitor", status: "Training", accuracy: "94.8%", alerts: 0, lastTrained: "2024-01-12" },
  { id: "AI004", name: "Behavioral Analyzer", status: "Active", accuracy: "97.1%", alerts: 5, lastTrained: "2024-01-11" },
];

const mockPredictions = [
  { type: "Security Breach", probability: "High", confidence: "92%", timeframe: "Next 24h", impact: "Critical" },
  { type: "Compliance Violation", probability: "Medium", confidence: "78%", timeframe: "Next 48h", impact: "High" },
  { type: "System Overload", probability: "Low", confidence: "65%", timeframe: "Next 72h", impact: "Medium" },
];

export default function AiMonitoring() {
  const [autoResponse, setAutoResponse] = useState(true);
  const [isDeployModelOpen, setIsDeployModelOpen] = useState(false);
  const { toast } = useToast();

  const handleDeployModel = () => {
    setIsDeployModelOpen(false);
    toast({
      title: "Model Deployed",
      description: "New AI model has been deployed and is initializing.",
    });
  };

  const handleStartModel = (modelId: string) => {
    toast({
      title: "Model Started",
      description: `AI model ${modelId} is now active and monitoring.`,
    });
  };

  const handleStopModel = (modelId: string) => {
    toast({
      title: "Model Stopped",
      description: `AI model ${modelId} has been paused.`,
      variant: "destructive",
    });
  };

  const handleRetrainModel = (modelId: string) => {
    toast({
      title: "Retraining Started",
      description: `AI model ${modelId} is being retrained with latest data.`,
    });
  };

  const handleMitigateThreat = (threatType: string) => {
    toast({
      title: "Mitigation Initiated",
      description: `Automated mitigation for ${threatType} has been activated.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-success/20 text-success border-success/30";
      case "Training": return "bg-warning/20 text-warning border-warning/30";
      case "Inactive": return "bg-muted/20 text-muted-foreground border-muted/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getProbabilityColor = (probability: string) => {
    switch (probability) {
      case "High": return "bg-destructive/20 text-destructive border-destructive/30";
      case "Medium": return "bg-warning/20 text-warning border-warning/30";
      case "Low": return "bg-success/20 text-success border-success/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Monitoring</h1>
          <p className="text-muted-foreground">Intelligent threat detection and predictive analytics</p>
        </div>
        <Dialog open={isDeployModelOpen} onOpenChange={setIsDeployModelOpen}>
          <DialogTrigger asChild>
            <GradientButton size="default" className="w-full sm:w-auto">
              <Bot className="w-4 h-4 mr-2" />
              Deploy New Model
            </GradientButton>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Deploy AI Model</DialogTitle>
              <DialogDescription>
                Deploy a new AI model for threat detection, anomaly analysis, or compliance monitoring.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end">
              <Button variant="outline" onClick={() => setIsDeployModelOpen(false)}>Cancel</Button>
              <Button onClick={handleDeployModel}>
                <Bot className="w-4 h-4 mr-2" />
                Deploy Model
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[
          { title: "Active Models", value: "3", color: "text-success", subtitle: "Currently monitoring" },
          { title: "Threats Detected", value: "25", color: "text-destructive", subtitle: "Last 24 hours" },
          { title: "Avg Accuracy", value: "97.2%", color: "text-accent-orange", subtitle: "Model performance" },
          { title: "Response Time", value: "0.3s", color: "text-success", subtitle: "Average detection" },
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

      {/* AI Models & Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* AI Models */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-accent-orange" />
              AI Models
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAiModels.map((model) => (
              <div key={model.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg bg-secondary-dark/30 border border-border gap-2 sm:gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <Bot className="w-8 h-8 text-accent-orange" />
                  <div className="truncate">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-medium text-foreground truncate">{model.name}</span>
                      <Badge className={getStatusColor(model.status)}>{model.status}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      Accuracy: {model.accuracy} • {model.alerts} alerts today
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      Last trained: {model.lastTrained}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap mt-2 sm:mt-0">
                  {model.status === "Active" ? (
                    <Button variant="outline" size="sm" onClick={() => handleStopModel(model.id)} className="text-destructive hover:text-destructive w-full sm:w-auto">
                      <Pause className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" onClick={() => handleStartModel(model.id)} className="text-success hover:text-success w-full sm:w-auto">
                      <Play className="w-4 h-4" />
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => handleRetrainModel(model.id)} className="w-full sm:w-auto">
                    Retrain
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Configuration */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-accent-orange" />
              AI Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Auto Response", description: "Automatically respond to threats", state: autoResponse, setState: setAutoResponse },
              { label: "Learning Mode", description: "Continuously improve models", state: true, setState: () => { } },
              { label: "Real-time Analysis", description: "Monitor data streams live", state: true, setState: () => { } },
              { label: "Predictive Alerts", description: "Forecast potential threats", state: true, setState: () => { } },
            ].map((config, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <span className="font-medium text-foreground">{config.label}</span>
                  <p className="text-sm text-muted-foreground">{config.description}</p>
                </div>
                <Switch checked={config.state} onCheckedChange={config.setState} className="self-start sm:self-auto" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Predictive Analytics */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent-orange" />
            Predictive Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockPredictions.map((prediction, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg bg-secondary-dark/30 border border-border gap-2 sm:gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <AlertCircle className="w-6 h-6 text-warning" />
                <div className="truncate">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-medium text-foreground truncate">{prediction.type}</span>
                    <Badge className={getProbabilityColor(prediction.probability)}>{prediction.probability} Risk</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground truncate">
                    Confidence: {prediction.confidence} • Impact: {prediction.impact}
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-1 mt-2 sm:mt-0">
                <div className="text-sm font-medium text-foreground">{prediction.timeframe}</div>
                <Button variant="outline" size="sm" onClick={() => handleMitigateThreat(prediction.type)} className="w-full sm:w-auto">
                  <Zap className="w-4 h-4 mr-1" />
                  Mitigate
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
