import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GradientButton } from "@/components/ui/gradient-button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import logo from "@/assets/logo.svg";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Handle demo credentials
      if (email === "demo@impactechglobal.com" && password === "demo123") {
        // For demo purposes, bypass Firebase and go directly to dashboard
        navigate("/dashboard");
        return;
      }
      
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please check your email and password.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-full h-full flex items-center justify-center mx-auto">
            <img src={logo} alt="ImpactechGlobal" className="w-full h-16" />
          </div>
        </div>

        {/* Login Form */}
        <div className="glass-card p-8 rounded-2xl">
          <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your ImpactechGlobal account</p>
        </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@impactechglobal.com"
                className="h-12 bg-input border-border focus:border-accent-orange focus:ring-accent-orange"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="demo123"
                  className="h-12 bg-input border-border focus:border-accent-orange focus:ring-accent-orange pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Demo Credentials Hint */}
            <div className="bg-secondary-dark/50 border border-border rounded-lg p-3">
              <p className="text-sm text-muted-foreground mb-1">Demo Credentials:</p>
              <p className="text-xs text-accent-orange">Email: demo@impactechglobal.com</p>
              <p className="text-xs text-accent-orange">Password: demo123</p>
            </div>

            <GradientButton type="submit" disabled={loading} className="w-full h-12 text-base font-semibold">
              {loading ? "Signing In..." : "Sign In"}
            </GradientButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-accent-orange hover:text-accent-yellow transition-colors font-medium"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}