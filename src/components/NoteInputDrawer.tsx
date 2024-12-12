import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface NoteInputDrawerProps {
  text: string;
  onTextChange: (text: string) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
}

const NoteInputDrawer = ({
  text,
  onTextChange,
  onSave,
  onCancel,
  isSaving,
}: NoteInputDrawerProps) => {
  return (
    <DrawerContent className="h-[80vh] bg-[#F5F5F5] focus:outline-none">
      <div className="mx-auto w-full max-w-3xl h-full flex flex-col">
        <DrawerHeader className="border-b border-golf-gray-card px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onCancel}
              disabled={isSaving}
              className="text-golf-gray-text-primary hover:text-golf-gray-text-primary/80 hover:bg-golf-gray-card"
            >
              Cancel
            </Button>
            <DrawerTitle className="absolute left-1/2 -translate-x-1/2 text-golf-gray-text-primary">
              Add Note
            </DrawerTitle>
            <Button
              onClick={onSave}
              disabled={isSaving || !text.trim()}
              className="bg-golf-green hover:bg-golf-muted text-golf-white disabled:opacity-50"
            >
              Save
            </Button>
          </div>
        </DrawerHeader>

        <div className="flex-1 p-6 space-y-6 overflow-hidden">
          <Textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="What's on your mind about your game?"
            className="min-h-[200px] h-full max-h-[calc(80vh-8rem)] bg-transparent border-0 text-golf-gray-text-primary placeholder:text-golf-gray-text-hint focus-visible:ring-0 resize-none text-lg leading-relaxed"
            disabled={isSaving}
          />
        </div>
      </div>
    </DrawerContent>
  );
};

export default NoteInputDrawer;