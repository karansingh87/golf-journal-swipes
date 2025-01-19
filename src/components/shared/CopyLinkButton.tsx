import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CopyLinkButtonProps {
  url: string;
  className?: string;
}

export const CopyLinkButton = ({ url, className }: CopyLinkButtonProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "Link copied",
        description: "The link has been copied to your clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try copying the link manually",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={copyToClipboard}
      className={className}
    >
      {copied ? (
        <Check className="h-4 w-4 mr-2" />
      ) : (
        <Copy className="h-4 w-4 mr-2" />
      )}
      Copy link
    </Button>
  );
};