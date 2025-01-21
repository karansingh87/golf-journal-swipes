import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UpgradeButton } from "./UpgradeButton";

export type Feature = 'trends' | 'pep-talk' | 'lesson-prep' | 'recording';

const featureDescriptions = {
  'trends': {
    title: 'Unlock Game Trends',
    description: 'Get deep insights into your game patterns and progress over time.',
  },
  'pep-talk': {
    title: 'Get AI Pep Talks',
    description: 'Receive personalized mental game coaching based on your recent rounds.',
  },
  'lesson-prep': {
    title: 'Smart Lesson Prep',
    description: 'Organize your recent rounds into focused notes for your coach.',
  },
  'recording': {
    title: 'Voice Recording',
    description: 'Record and analyze your golf sessions with AI insights.',
  }
};

interface UpgradeModalProps {
  feature: Feature;
  isOpen: boolean;
  onClose: () => void;
  onContinue?: () => void;
}

const MONTHLY_PRICE_ID = "price_1QjbKgLbszPXbxPVjqNTDLHQ";

export const UpgradeModal = ({ feature, isOpen, onClose }: UpgradeModalProps) => {
  const featureInfo = featureDescriptions[feature];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{featureInfo.title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-4">
          <p className="text-center text-zinc-600">
            {featureInfo.description}
          </p>
          <div className="w-full max-w-sm">
            <UpgradeButton 
              priceId={MONTHLY_PRICE_ID}
              className="w-full bg-primary text-white hover:bg-primary/90 h-11"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};