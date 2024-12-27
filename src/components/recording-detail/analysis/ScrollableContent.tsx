import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";

interface ScrollableContentProps {
  children: ReactNode;
}

const ScrollableContent = ({ children }: ScrollableContentProps) => {
  return (
    <ScrollArea className="flex-1 px-6 pt-6">
      <div className="space-y-6 pb-32">
        {children}
      </div>
    </ScrollArea>
  );
};

export default ScrollableContent;