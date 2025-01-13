import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { UpgradeButton } from "@/components/subscription/UpgradeButton";

export type Feature = 'trends' | 'pep-talk' | 'lesson-prep' | 'recording';

interface FeatureContent {
  title: string;
  description: string;
}

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
}

export const UpgradeModal = ({ feature, isOpen, onClose }: UpgradeModalProps) => {
  const content = featureContent[feature];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{content.title}</DialogTitle>
          <DialogDescription className="pt-4">
            {content.description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6">
          <UpgradeButton showTrial className="w-full" />
        </div>
      </DialogContent>
    </Dialog>
  );
};