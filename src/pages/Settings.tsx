import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, Save, Shield, Bell, User } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [isSaveChangesOpen, setIsSaveChangesOpen] = useState(false);
  const { toast } = useToast();

  const handleSaveChanges = () => {
    setIsSaveChangesOpen(false);
    toast({
      title: "Settings Saved",
      description: "All configuration changes have been saved successfully.",
    });
  };

  const handleChangePassword = () => {
    toast({
      title: "Password Change",
      description: "Opening password change dialog.",
    });
  };

  return (
    <div className="space-y-6">
  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold text-foreground">Settings</h1>
      <p className="text-muted-foreground">Configure system preferences and security</p>
    </div>
    <Dialog open={isSaveChangesOpen} onOpenChange={setIsSaveChangesOpen}>
      <DialogTrigger asChild>
        <GradientButton size="default">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </GradientButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Configuration Changes</DialogTitle>
          <DialogDescription>
            This will save all current settings and apply them to your account. Some changes may require a logout.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
          <Button variant="outline" onClick={() => setIsSaveChangesOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveChanges}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>

  {/* Settings Cards Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
    {/* Profile Settings Card */}
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 flex-wrap">
          <User className="w-5 h-5 text-accent-orange" />
          Profile Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 w-full">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" defaultValue="Sarah Johnson" className="w-full" />
        </div>
        <div className="space-y-2 w-full">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" defaultValue="sarah.johnson@company.com" className="w-full" />
        </div>
        <div className="space-y-2 w-full">
          <Label htmlFor="role">Role</Label>
          <Input id="role" defaultValue="Compliance Officer" disabled className="w-full" />
        </div>
        <div className="space-y-2 w-full">
          <Label htmlFor="department">Department</Label>
          <Input id="department" defaultValue="Risk & Compliance" className="w-full" />
        </div>
      </CardContent>
    </Card>

    {/* Security Settings Card */}
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 flex-wrap">
          <Shield className="w-5 h-5 text-accent-orange" />
          Security Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {["Two-Factor Authentication", "Session Timeout"].map((setting) => (
          <div key={setting} className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
            <div>
              <Label>{setting}</Label>
              <p className="text-sm text-muted-foreground">
                {setting === "Two-Factor Authentication"
                  ? "Add an extra layer of security"
                  : "Auto-logout after inactivity"}
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        ))}
        <div className="space-y-2 w-full">
          <Label htmlFor="sessionDuration">Session Duration (minutes)</Label>
          <Input id="sessionDuration" type="number" defaultValue="30" className="w-full" />
        </div>
        <Button variant="outline" className="w-full" onClick={handleChangePassword}>
          Change Password
        </Button>
      </CardContent>
    </Card>

    {/* Notification Preferences Card */}
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 flex-wrap">
          <Bell className="w-5 h-5 text-accent-orange" />
          Notification Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {["Email Notifications", "Security Alerts", "Compliance Updates", "Weekly Reports"].map((notif) => (
          <div key={notif} className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
            <div>
              <Label>{notif}</Label>
              <p className="text-sm text-muted-foreground">
                {notif === "Email Notifications"
                  ? "Receive alerts via email"
                  : notif === "Security Alerts"
                  ? "Critical security notifications"
                  : notif === "Compliance Updates"
                  ? "Regulatory change notifications"
                  : "Automated report summaries"}
              </p>
            </div>
            <Switch defaultChecked={notif !== "Weekly Reports" ? true : false} />
          </div>
        ))}
      </CardContent>
    </Card>

    {/* System Preferences Card */}
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 flex-wrap">
          <SettingsIcon className="w-5 h-5 text-accent-orange" />
          System Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 w-full">
          <Label htmlFor="timezone">Timezone</Label>
          <Input id="timezone" defaultValue="UTC-5 (Eastern Time)" className="w-full" />
        </div>
        <div className="space-y-2 w-full">
          <Label htmlFor="language">Language</Label>
          <Input id="language" defaultValue="English (US)" className="w-full" />
        </div>
        {["Dark Mode", "Auto-refresh Dashboard"].map((pref) => (
          <div key={pref} className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
            <div>
              <Label>{pref}</Label>
              <p className="text-sm text-muted-foreground">
                {pref === "Dark Mode" ? "Use dark theme" : "Update data automatically"}
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
</div>

  );
}