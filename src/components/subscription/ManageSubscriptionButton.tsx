import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ManageSubscriptionButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleManageSubscription = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.functions.invoke('create-portal-session', {
        method: 'POST',
      });

      if (error) throw error;

      // Redirect to the portal
      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating portal session:', error);
      toast({
        title: "Error",
        description: "Failed to open subscription management portal",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleManageSubscription}
      disabled={isLoading}
      variant="outline"
      className="w-full sm:w-auto"
    >
      {isLoading ? "Loading..." : "Manage Subscription"}
    </Button>
  );
};