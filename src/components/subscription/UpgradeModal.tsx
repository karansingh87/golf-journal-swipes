import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { UpgradeButton } from "@/components/subscription/UpgradeButton";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";

export type Feature = 'trends' | 'pep-talk' | 'lesson-prep' | 'recording';

interface FeatureContent {
  title: string;
  description: string;
}

const MONTHLY_PRICE_ID = "price_1QjbKgLbszPXbxPVjqNTDLHQ";

const featureContent: Record<Feature, FeatureContent> = {
  'trends': {
    title: "Unlock Trends Analysis",
    description: "Get deep insights into your progress and patterns over time.",
  },
  'pep-talk': {
    title: "Access Pep Talks",
    description: "Get personalized confidence boosters before your next round.",
  },
  'lesson-prep': {
    title: "Generate Lesson Prep",
    description: "Prepare effectively for your next coaching session.",
  },
  'recording': {
    title: "Record Your Sessions",
    description: "Capture and analyze your golf sessions.",
  },
};

interface UpgradeModalProps {
  feature: Feature;
  isOpen: boolean;
  onClose: () => void;
  onContinue?: () => void;
}

export const UpgradeModal = ({ feature, isOpen, onClose, onContinue }: UpgradeModalProps) => {
  const content = featureContent[feature];

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('profiles')
        .select('has_pro_access, subscription_tier')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const hasAccess = profile?.has_pro_access || profile?.subscription_tier === 'lifetime';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{content.title}</DialogTitle>
          <DialogDescription className="pt-4 space-y-4">
            <p>{content.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {hasAccess ? 'Unlimited access' : 'Pro feature'}
                </span>
              </div>
              {!hasAccess && (
                <p className="text-sm text-muted-foreground">
                  Upgrade to Pro for unlimited access to all features and take your game to the next level.
                </p>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 space-y-3">
          {hasAccess ? (
            <>
              <Button 
                onClick={onContinue}
                className="w-full"
                variant="default"
              >
                Continue
              </Button>
              <Button 
                onClick={onClose}
                className="w-full"
                variant="outline"
              >
                Cancel
              </Button>
            </>
          ) : (
            <UpgradeButton 
              priceId={MONTHLY_PRICE_ID}
              className="w-full" 
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};