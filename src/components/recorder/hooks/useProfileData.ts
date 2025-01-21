import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";

export const useProfileData = () => {
  const session = useSession();
  const { toast } = useToast();
  const userId = session?.user?.id;

  const { 
    data: profile, 
    isLoading: isProfileLoading, 
    error: profileError 
  } = useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => {
      try {
        if (!userId) {
          console.log('No authenticated user found');
          return null;
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('id, has_pro_access, subscription_tier')
          .eq('id', userId)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          throw error;
        }

        if (!data) {
          console.log('No profile found for user:', userId);
          return null;
        }

        return data;
      } catch (error) {
        console.error('Profile fetch error:', error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    staleTime: 1000 * 60,
    enabled: !!userId,
  });

  if (profileError) {
    console.error('Profile error:', profileError);
    toast({
      title: "Error loading profile",
      description: "Please try refreshing the page",
      variant: "destructive",
    });
  }

  return { 
    profile, 
    isProfileLoading, 
    profileError,
    isAuthenticated: !!userId 
  };
};