import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";

export const useProfileData = () => {
  const session = useSession();
  const { toast } = useToast();

  const { data: profile, isLoading: isProfileLoading, error: profileError } = useQuery({
    queryKey: ['profile', session?.user?.id],
    queryFn: async () => {
      try {
        if (!session?.user?.id) {
          throw new Error('No authenticated user');
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('has_pro_access, monthly_recordings_count')
          .eq('id', session.user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching profile:', error);
          throw error;
        }

        if (!data) {
          throw new Error('No profile found');
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
    enabled: !!session?.user?.id,
  });

  if (profileError) {
    toast({
      title: "Error loading profile",
      description: "Please try refreshing the page",
      variant: "destructive",
    });
  }

  return { profile, isProfileLoading, profileError };
};