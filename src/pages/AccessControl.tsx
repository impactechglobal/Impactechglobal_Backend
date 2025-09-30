import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Shield, Lock, Key, UserCheck, Plus, Search, Filter, Trash2 } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const mockAccessPolicies = [
  { id: "AP001", name: "Executive Access", users: 12, resources: 45, status: "Active", lastModified: "2024-01-15" },
  { id: "AP002", name: "Developer Access", users: 28, resources: 23, status: "Active", lastModified: "2024-01-14" },
  { id: "AP003", name: "Guest Access", users: 5, resources: 8, status: "Restricted", lastModified: "2024-01-13" },
];

const mockPermissions = [
  { resource: "Financial Reports", level: "Read Only", users: 15, groups: 3 },
  { resource: "Customer Database", level: "Full Access", users: 8, groups: 2 },
  { resource: "System Configuration", level: "Admin Only", users: 3, groups: 1 },
];

export default function AccessControl() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreatePolicyOpen, setIsCreatePolicyOpen] = useState(false);
  const { toast } = useToast();

  const handleCreatePolicy = () => {
    setIsCreatePolicyOpen(false);
    toast({
      title: "Policy Created",
      description: "New access policy has been created successfully.",
    });
  };

  const handleRevokeAccess = (policyId: string) => {
    toast({
      title: "Access Revoked",
      description: `Access has been revoked for policy: ${policyId}`,
      variant: "destructive",
    });
  };

  const handleEditPermissions = (resource: string) => {
    toast({
      title: "Permissions Updated",
      description: `Permissions for ${resource} have been updated.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Access Control</h1>
          <p className="text-muted-foreground">Manage user permissions and access policies</p>
        </div>
        <Dialog open={isCreatePolicyOpen} onOpenChange={setIsCreatePolicyOpen}>
          <DialogTrigger asChild>
            <GradientButton size="default" className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Create Policy
            </GradientButton>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Access Policy</DialogTitle>
              <DialogDescription>
                Define a new access policy with specific permissions and user assignments.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreatePolicyOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePolicy}>
                <Plus className="w-4 h-4 mr-2" />
                Create Policy
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[
          { title: "Active Policies", value: "24", color: "text-success", subtitle: "Currently enforced" },
          { title: "Protected Resources", value: "156", color: "text-accent-orange", subtitle: "Under access control" },
          { title: "Access Violations", value: "3", color: "text-destructive", subtitle: "Last 24 hours" },
          { title: "Compliance Score", value: "98%", color: "text-success", subtitle: "Policy adherence" },
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

      {/* Policies & Permissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Access Policies */}
        <Card className="glass-card">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent-orange" />
                Access Policies
              </CardTitle>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Filter className="w-4 h-4" />
                </Button>
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search policies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-full sm:w-40"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAccessPolicies.map((policy) => (
                <div key={policy.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg bg-secondary-dark/30 border border-border gap-2 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-medium text-foreground">{policy.name}</span>
                      <Badge className={policy.status === "Active" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"}>
                        {policy.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{policy.users} users • {policy.resources} resources</div>
                    <div className="text-xs text-muted-foreground">Modified: {policy.lastModified}</div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="outline" size="sm" onClick={() => handleEditPermissions(policy.name)} className="flex-1 sm:flex-none">
                      <Key className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleRevokeAccess(policy.id)} className="text-destructive hover:text-destructive flex-1 sm:flex-none">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resource Permissions */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-accent-orange" />
              Resource Permissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockPermissions.map((permission, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg bg-secondary-dark/30 border border-border gap-2 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-foreground">{permission.resource}</span>
                    <div className="text-sm text-muted-foreground">{permission.users} users • {permission.groups} groups</div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className="bg-accent/20 text-accent-foreground">{permission.level}</Badge>
                    <Switch defaultChecked onCheckedChange={() => handleEditPermissions(permission.resource)} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Access Events */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-accent-orange" />
            Recent Access Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { user: "john.doe@company.com", action: "Granted access", resource: "Financial Reports", time: "2 min ago" },
              { user: "sarah.johnson@company.com", action: "Access denied", resource: "System Config", time: "5 min ago" },
              { user: "mike.wilson@company.com", action: "Permission updated", resource: "Customer DB", time: "10 min ago" },
            ].map((event, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg bg-secondary-dark/30 border border-border gap-1 sm:gap-2">
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-foreground">{event.user}</span>
                  <div className="text-sm text-muted-foreground truncate">{event.action} • {event.resource}</div>
                </div>
                <span className="text-xs text-muted-foreground">{event.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
