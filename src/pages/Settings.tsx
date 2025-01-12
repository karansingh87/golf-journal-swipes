import { useEffect, useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { SubscriptionSection } from "@/components/subscription/SubscriptionSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const Settings = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const shouldStartTrial = searchParams.get('trial') === 'true';
  const session = useSession();
  const { toast } = useToast();

  useEffect(() => {
    const initiateCheckout = async () => {
      if (shouldStartTrial) {
        try {
          const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke(
            'create-checkout-session',
            {
              headers: {
                Authorization: `Bearer ${session?.access_token}`,
              },
            }
          );

          if (checkoutError) throw checkoutError;

          if (checkoutData?.url) {
            window.location.href = checkoutData.url;
          }
        } catch (error: any) {
          console.error('Checkout error:', error);
          toast({
            variant: "destructive",
            title: "Trial activation failed",
            description: "Please try again or contact support if the issue persists.",
          });
        }
      }
    };

    initiateCheckout();
  }, [shouldStartTrial]);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [displayName, setDisplayName] = useState(profile?.display_name || '');

  useEffect(() => {
    if (profile?.display_name) {
      setDisplayName(profile.display_name);
    }
  }, [profile?.display_name]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user?.id) return;

    try {
      setIsUpdating(true);
      const { error } = await supabase
        .from('profiles')
        .update({ display_name: displayName })
        .eq('id', session.user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8 space-y-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Settings
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                disabled={isUpdating}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={profile?.email || ''}
                disabled
                readOnly
              />
            </div>

            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </Card>
      </div>

      <SubscriptionSection />
    </div>
  );
};

export default Settings;