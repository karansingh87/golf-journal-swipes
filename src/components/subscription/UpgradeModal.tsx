import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PricingSection from "@/components/landing/PricingSection";

export type Feature = 'trends' | 'pep-talk' | 'lesson-prep' | 'recording';

interface UpgradeModalProps {
  feature: Feature;
  isOpen: boolean;
  onClose: () => void;
  onContinue?: () => void;
}

export const UpgradeModal = ({ isOpen, onClose }: UpgradeModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-center">Choose Your Plan</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <PricingSection />
        </div>
      </DialogContent>
    </Dialog>
  );
};