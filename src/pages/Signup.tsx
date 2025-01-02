import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "@supabase/auth-helpers-react";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const session = useSession();

  useEffect(() => {
    if (session?.user) {
      // Update the profile with display name if it exists
      if (displayName) {
        updateProfile(session.user.id, displayName);
      }
      // Redirect to onboarding
      navigate("/onboarding");
    }
  }, [session, navigate, displayName]);

  const updateProfile = async (userId: string, name: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ display_name: name })
        .eq('id', userId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      });
    }
  };

  const handleDisplayNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      toast({
        variant: "destructive",
        title: "Display name required",
        description: "Please enter a display name to continue",
      });
      return;
    }
    setShowAuth(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-6">
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

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Create an Account</h1>
          <p className="text-gray-500">Join GolfLog to start tracking your progress</p>
        </div>

        {!showAuth ? (
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <form onSubmit={handleDisplayNameSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your display name"
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </form>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#000000',
                      brandAccent: '#333333',
                    },
                  },
                },
                className: {
                  button: 'w-full px-4 py-2 text-white bg-black hover:bg-gray-800',
                  input: 'w-full px-3 py-2 border rounded-md',
                  label: 'text-sm font-medium text-gray-700',
                },
              }}
              theme="light"
              providers={[]}
              view="sign_up"
              redirectTo={`${window.location.origin}/onboarding`}
            />
          </div>
        )}

        <Alert className="bg-blue-50 border-blue-200">
          <AlertDescription className="text-sm text-blue-800">
            For testing, you can create a new account with any email. The verification email step has been disabled.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default Signup;