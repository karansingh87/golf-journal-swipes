import { format } from "date-fns";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";

interface PromptHistory {
  id: string;
  prompt_type: string;
  old_value: string;
  changed_at: string;
}

interface PromptHistoryTableProps {
  history: PromptHistory[];
}

const PromptHistoryTable = ({ history }: PromptHistoryTableProps) => {
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The prompt has been copied to your clipboard.",
    });
  };

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Type</TableHead>
            <TableHead className="whitespace-nowrap">Previous Value</TableHead>
            <TableHead className="whitespace-nowrap">Changed At</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium capitalize whitespace-nowrap">
                {item.prompt_type}
              </TableCell>
              <TableCell className="font-mono text-sm max-w-[300px] sm:max-w-[500px] truncate">
                {item.old_value}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {format(new Date(item.changed_at), 'MMM d, yyyy HH:mm')}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(item.old_value)}
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PromptHistoryTable;