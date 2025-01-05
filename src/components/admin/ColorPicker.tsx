import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ColorPickerProps {
  colors: Record<string, string>;
  onChange: (colors: Record<string, string>) => void;
}

const ColorPicker = ({ colors, onChange }: ColorPickerProps) => {
  const [localColors, setLocalColors] = useState(colors);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setLocalColors(colors);
    setHasChanges(false);
  }, [colors]);

  const handleColorChange = (key: string, value: string) => {
    setLocalColors((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onChange(localColors);
    setHasChanges(false);
  };

  const colorGroups = {
    "Base Colors": ["background", "foreground"],
    "Component Colors": [
      "card",
      "card-foreground",
      "popover",
      "popover-foreground",
      "primary",
      "primary-foreground",
      "secondary",
      "secondary-foreground",
    ],
    "UI States": [
      "muted",
      "muted-foreground",
      "accent",
      "accent-foreground",
      "destructive",
      "destructive-foreground",
    ],
    "Utility Colors": ["border", "input", "ring"],
  };

  const formatColorName = (name: string) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Color Configuration</h3>
        <Button
          onClick={handleSave}
          disabled={!hasChanges}
          className="flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {Object.entries(colorGroups).map(([groupName, colorKeys]) => (
          <AccordionItem key={groupName} value={groupName}>
            <AccordionTrigger>{groupName}</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-4">
                {colorKeys.map((key) => (
                  <div key={key} className="grid gap-2">
                    <Label htmlFor={key}>{formatColorName(key)}</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        id={key}
                        value={localColors[key] || ""}
                        onChange={(e) => handleColorChange(key, e.target.value)}
                        placeholder="H S% L%"
                        className="font-mono"
                      />
                      <div
                        className="w-10 h-10 rounded border"
                        style={{
                          backgroundColor: `hsl(${localColors[key]})`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ColorPicker;