import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import AuthContainer from "@/components/auth/AuthContainer";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthCard from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const session = useSession();
  const form = useForm<LoginForm>();

  useEffect(() => {
    const checkSessionAndOnboarding = async () => {
      if (session?.user) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('onboarding_completed, onboarding_skipped')
            .eq('id', session.user.id)
            .single();

          if (error) throw error;

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
            description: "Failed to check profile status. Please try again.",
          });
        }
      }
    };

    checkSessionAndOnboarding();
  }, [navigate, toast, session]);

  const onSubmit = async (data: LoginForm) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message,
      });
    }
  };

  return (
    <AuthContainer>
      <AuthHeader 
        title="Welcome Back" 
        subtitle="Please sign in to continue" 
      />

      <AuthCard>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...form.register('email')}
              placeholder="Enter your email"
              autoComplete="username email" // Added for password manager
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...form.register('password')}
              placeholder="Enter your password"
              autoComplete="current-password" // Added for password manager
            />
          </div>

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Button
            variant="link"
            className="text-gray-500 hover:text-gray-700"
            onClick={() => navigate("/")}
          >
            Don't have an account? Sign up
          </Button>
        </div>
      </AuthCard>
    </AuthContainer>
  );
};

export default Login;