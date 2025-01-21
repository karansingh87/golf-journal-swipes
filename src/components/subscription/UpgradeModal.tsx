import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { UpgradeButton } from "@/components/subscription/UpgradeButton";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getRemainingUsage } from "@/utils/subscription";
import { Progress } from "@/components/ui/progress";

export type Feature = 'trends' | 'pep-talk' | 'lesson-prep' | 'recording';

interface FeatureContent {
  title: string;
  description: string;
  usageKey?: keyof ReturnType<typeof getRemainingUsage>;
  limit?: number;
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
    usageKey: 'pepTalks',
    limit: 1,
  },
  'lesson-prep': {
    title: "Generate Lesson Prep",
    description: "Prepare effectively for your next coaching session.",
    usageKey: 'coachNotes',
    limit: 1,
  },
  'recording': {
    title: "Record Your Sessions",
    description: "Capture and analyze your golf sessions.",
    usageKey: 'recordings',
    limit: 3,
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
        .select('has_pro_access, monthly_recordings_count, monthly_pep_talks_count, monthly_coach_notes_count')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const usage = getRemainingUsage(profile);
  const usageKey = content.usageKey;
  const remainingUses = usageKey ? usage[usageKey] : null;
  const limit = content.limit;
  const usedCount = limit && remainingUses !== null ? limit - remainingUses : 0;
  const usagePercentage = limit ? (usedCount / limit) * 100 : 0;
  const hasRemainingUses = remainingUses !== null && remainingUses > 0;

  const handleContinue = () => {
    if (onContinue && hasRemainingUses) {
      onClose();
      onContinue();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{content.title}</DialogTitle>
          <DialogDescription className="pt-4 space-y-4">
            <p>{content.description}</p>
            {usageKey && remainingUses !== null && limit && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {remainingUses === 0 
                      ? "You've reached your free tier limit" 
                      : `${remainingUses} use${remainingUses !== 1 ? 's' : ''} remaining`
                    }
                  </span>
                  <span className="text-muted-foreground">
                    {usedCount}/{limit} used
                  </span>
                </div>
                <Progress value={usagePercentage} className="h-2" />
                {remainingUses === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Upgrade to Pro for unlimited access to all features and take your game to the next level.
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    You still have {remainingUses} free use{remainingUses !== 1 ? 's' : ''} this month.
                  </p>
                )}
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 space-y-3">
          {hasRemainingUses ? (
            <>
              <Button 
                onClick={handleContinue}
                className="w-full"
                variant="default"
              >
                Continue ({remainingUses} remaining)
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