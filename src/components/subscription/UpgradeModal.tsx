import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { UpgradeButton } from "@/components/subscription/UpgradeButton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getRemainingUsage } from "@/utils/subscription";

export type Feature = 'trends' | 'pep-talk' | 'lesson-prep' | 'recording';

interface FeatureContent {
  title: string;
  description: string;
  usageKey?: keyof ReturnType<typeof getRemainingUsage>;
}

const MONTHLY_PRICE_ID = "price_1QjBd2LbszPXbxPVv7deyKtT";

const featureContent: Record<Feature, FeatureContent> = {
  'trends': {
    title: "Unlock Trends Analysis",
    description: "Get deep insights into your progress and patterns over time.",
  },
  'pep-talk': {
    title: "Access Pep Talks",
    description: "Get personalized confidence boosters before your next round.",
    usageKey: 'pepTalks',
  },
  'lesson-prep': {
    title: "Generate Lesson Prep",
    description: "Prepare effectively for your next coaching session.",
    usageKey: 'coachNotes',
  },
  'recording': {
    title: "Record Your Sessions",
    description: "Capture and analyze your golf sessions.",
    usageKey: 'recordings',
  },
};

interface UpgradeModalProps {
  feature: Feature;
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeModal = ({ feature, isOpen, onClose }: UpgradeModalProps) => {
  const content = featureContent[feature];

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const usage = getRemainingUsage(profile);
  const usageKey = content.usageKey;
  const remainingUses = usageKey ? usage[usageKey] : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{content.title}</DialogTitle>
          <DialogDescription className="pt-4 space-y-2">
            <p>{content.description}</p>
            {usageKey && remainingUses !== null && (
              <p className="text-sm text-muted-foreground">
                {remainingUses === 0 
                  ? "You've reached your free tier limit for this month." 
                  : `You have ${remainingUses} use${remainingUses !== 1 ? 's' : ''} remaining this month.`
                }
              </p>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <UpgradeButton 
            showTrial 
            priceId={MONTHLY_PRICE_ID}
            className="w-full" 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};