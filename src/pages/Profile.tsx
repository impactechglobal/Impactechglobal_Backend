import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GradientButton } from "@/components/ui/gradient-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Calendar, Shield, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const recentActivity = [
  { action: "Logged in", timestamp: "2024-01-15 14:30:25", ip: "192.168.1.100" },
  { action: "Generated compliance report", timestamp: "2024-01-15 13:45:10", ip: "192.168.1.100" },
  { action: "Updated user permissions", timestamp: "2024-01-15 12:20:05", ip: "192.168.1.100" },
  { action: "Reviewed security alerts", timestamp: "2024-01-15 11:15:30", ip: "192.168.1.100" }
];

export default function Profile() {
  const { toast } = useToast();
  const handleSaveProfile = () => {
    toast({
      title: "Profile Saved",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </div>
        <GradientButton
          size="default"
          className="w-full sm:w-auto"
          onClick={handleSaveProfile}
        >
          Save Profile
        </GradientButton>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="glass-card md:col-span-1">
          <CardHeader className="text-center">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-primary-dark" />
            </div>
            <CardTitle>Sarah Johnson</CardTitle>
            <p className="text-muted-foreground">Compliance Officer</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">sarah.johnson@company.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Joined January 2023</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <Badge className="bg-success/20 text-success border-success/30">
                Verified Account
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card className="glass-card md:col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Sarah" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Johnson" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="sarah.johnson@company.com" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" defaultValue="Risk & Compliance" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                defaultValue="Experienced compliance officer with 8+ years in regulatory frameworks"
              />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="glass-card md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent-orange" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary-dark/30 border border-border"
                >
                  <div>
                    <span className="font-medium text-foreground">{activity.action}</span>
                    <div className="text-sm text-muted-foreground">
                      {activity.timestamp} • {activity.ip}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
