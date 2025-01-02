import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useSession } from "@supabase/auth-helpers-react";
import AuthContainer from "@/components/auth/AuthContainer";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthTestingAlert from "@/components/auth/AuthTestingAlert";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const session = useSession();

  useEffect(() => {
    const checkSessionAndOnboarding = async () => {
      if (session?.user) {
        try {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('onboarding_completed, onboarding_skipped')
            .eq('id', session.user.id)
            .single();

          if (profileError) throw profileError;

          const { error: updateError } = await supabase
            .from('profiles')
            .update({ display_name: displayName })
            .eq('id', session.user.id);

          if (updateError) throw updateError;

          if (!profile.onboarding_completed && !profile.onboarding_skipped) {
            navigate("/onboarding");
          } else {
            navigate("/record");
          }
        } catch (error) {
          console.error('Error checking profile:', error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to complete signup. Please try again.",
          });
        }
      }
    };

    checkSessionAndOnboarding();
  }, [session, navigate, displayName, toast]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!displayName.trim() || !email.trim() || !password.trim()) {
      toast({
        variant: "destructive",
        title: "All fields required",
        description: "Please fill in all fields to continue",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Account created",
        description: "Please check your email for verification link.",
      });

    } catch (error) {
      console.error('Signup error:', error);
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: "Please try again.",
      });
    }
  };

  return (
    <AuthContainer>
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>
      </div>

      <AuthHeader 
        title="Create an Account" 
        subtitle="Join GolfLog to start tracking your progress" 
      />

      <AuthCard>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your display name"
              className="w-full"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
            Create Account
          </Button>
        </form>
      </AuthCard>

      <AuthTestingAlert />

      <div className="text-center">
        <Button
          variant="link"
          className="text-gray-500 hover:text-gray-700"
          onClick={() => navigate("/login")}
        >
          Already have an account? Sign in
        </Button>
      </div>
    </AuthContainer>
  );
};

export default Signup;