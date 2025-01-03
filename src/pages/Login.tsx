import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { LoginForm, LoginFormData } from "@/components/auth/LoginForm";
import AuthContainer from "@/components/auth/AuthContainer";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthCard from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const session = useSession();
  const [mounted, setMounted] = useState(false);
  const { signIn, isLoading } = useAuth();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const checkSessionAndOnboarding = async () => {
      if (session?.user && mounted) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('onboarding_completed, onboarding_skipped')
            .eq('id', session.user.id)
            .maybeSingle();

          if (error) throw error;

          if (profile && (!profile.onboarding_completed && !profile.onboarding_skipped)) {
            navigate("/onboarding");
          } else {
            navigate("/record");
          }
        } catch (error) {
          console.error('Error checking profile:', error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to check user profile. Please try again.",
          });
        }
      }
    };

    checkSessionAndOnboarding();
  }, [session, navigate, mounted, toast]);

  const handleSubmit = async (data: LoginFormData) => {
    const success = await signIn(data.email, data.password);
    if (success) {
      // Session will be handled by the useEffect above
      console.log("Login successful");
    }
  };

  return (
    <AuthContainer>
      <AuthHeader 
        title="Welcome Back" 
        subtitle="Please sign in to continue" 
      />

      <AuthCard>
        <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />

        <div className="mt-4 text-center">
          <Button
            variant="link"
            className="text-gray-500 hover:text-gray-700"
            onClick={() => navigate("/signup")}
            disabled={isLoading}
          >
            Don't have an account? Sign up
          </Button>
        </div>
      </AuthCard>
    </AuthContainer>
  );
};

export default Login;