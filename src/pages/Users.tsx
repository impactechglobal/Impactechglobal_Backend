import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users as UsersIcon, UserPlus, Shield, Settings } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const mockUsers = [
  { id: "U001", name: "Sarah Johnson", email: "sarah.johnson@company.com", role: "Compliance Officer", status: "Active", lastLogin: "2024-01-15 14:30" },
  { id: "U002", name: "Mike Wilson", email: "mike.wilson@company.com", role: "Security Analyst", status: "Active", lastLogin: "2024-01-15 13:45" },
  { id: "U003", name: "John Doe", email: "john.doe@company.com", role: "Auditor", status: "Inactive", lastLogin: "2024-01-10 09:15" },
  { id: "U004", name: "Admin User", email: "admin@company.com", role: "Administrator", status: "Active", lastLogin: "2024-01-15 15:00" }
];

const getRoleColor = (role: string) => {
  switch (role) {
    case "Administrator": return "bg-destructive/20 text-destructive border-destructive/30";
    case "Compliance Officer": return "bg-accent/20 text-accent-foreground border-accent/30";
    case "Security Analyst": return "bg-warning/20 text-warning border-warning/30";
    default: return "bg-muted/20 text-muted-foreground border-muted/30";
  }
};

const getStatusColor = (status: string) => {
  return status === "Active"
    ? "bg-success/20 text-success border-success/30"
    : "bg-muted/20 text-muted-foreground border-muted/30";
};

export default function Users() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const { toast } = useToast();

  const handleAddUser = () => {
    setIsAddUserOpen(false);
    toast({
      title: "User Added",
      description: "New user account has been created successfully.",
    });
  };

  const handleManagePermissions = (userName: string) => {
    toast({
      title: "Permissions Manager",
      description: `Opening permission settings for ${userName}.`,
    });
  };

  const handleUserSettings = (userName: string) => {
    toast({
      title: "User Settings",
      description: `Opening user configuration for ${userName}.`,
    });
  };

  return (
 <div className="space-y-6">
  {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold text-foreground">User Management</h1>
      <p className="text-muted-foreground">Manage user accounts and permissions</p>
    </div>
    <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
      <DialogTrigger asChild>
        <GradientButton size="default">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </GradientButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Create a new user account with appropriate role and permissions for system access.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
          <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddUser}>
            <UserPlus className="w-4 h-4 mr-2" />
            Create User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>

  {/* Stats Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Repeat your 4 stats cards here */}
  </div>

  {/* User Directory */}
  <Card className="glass-card">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 flex-wrap">
        <UsersIcon className="w-5 h-5 text-accent-orange" />
        User Directory
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {mockUsers.map((user) => (
          <div
            key={user.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-secondary-dark/30 border border-border gap-4"
          >
            {/* Avatar + Info */}
            <div className="flex items-center gap-4 flex-1 min-w-0 flex-wrap">
              <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-primary-dark">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-medium text-foreground truncate">{user.name}</span>
                  <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                  <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1 truncate">{user.email}</p>
                <div className="text-xs text-muted-foreground truncate">
                  Last login: {user.lastLogin}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 flex-wrap mt-2 sm:mt-0">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleManagePermissions(user.name)}
              >
                <Shield className="w-4 h-4 mr-2" />
                Permissions
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleUserSettings(user.name)}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
</div>

  );
}