import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import type { PepTalk, PepTalkContent } from "@/types/pep-talk";
import { isPepTalkContent } from "@/types/pep-talk";

const PepTalkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: pepTalk, isLoading } = useQuery({
    queryKey: ['pep_talk', id],
    queryFn: async () => {
      if (!id) throw new Error('No pep talk ID provided');

      const { data, error } = await supabase
        .from('pep_talk')
        .select()
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Pep talk not found');

      try {
        const parsedContent = JSON.parse(data.content);
        if (!isPepTalkContent(parsedContent)) {
          throw new Error('Invalid pep talk content structure');
        }

        return {
          ...data,
          parsedContent
        };
      } catch (e) {
        throw new Error('Failed to parse pep talk content');
      }
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!pepTalk) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen pt-16">
        <p className="text-lg text-muted-foreground">Pep talk not found</p>
        <Button
          variant="ghost"
          onClick={() => navigate('/playbook')}
          className="mt-4"
        >
          Go back to playbook
        </Button>
      </div>
    );
  }

  const renderSection = (title: string, items: any[], keys: string[]) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="bg-muted/50 rounded-lg p-4">
            {keys.map((key) => (
              <div key={key} className="mb-2 last:mb-0">
                <span className="text-sm font-medium text-muted-foreground capitalize">
                  {key.replace(/_/g, ' ')}: 
                </span>
                <span className="text-sm ml-2">{item[key]}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0"
            onClick={() => navigate('/playbook')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-golf-gray-text-primary">
              Pep Talk
            </h1>
            <p className="text-sm text-golf-gray-text-secondary">
              {format(new Date(pepTalk.created_at), "MMMM d, yyyy")} • {format(new Date(pepTalk.created_at), "h:mm a")} • Based on {pepTalk.recording_ids.length} recording{pepTalk.recording_ids.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            {renderSection("🔥 Hot Right Now", pepTalk.parsedContent.hot_right_now, ['aspect', 'detail', 'proof'])}
            {renderSection("✨ Working Well", pepTalk.parsedContent.working_well, ['type', 'what', 'when'])}
            {renderSection("🎯 Go-To Shots", pepTalk.parsedContent.go_to_shots, ['situation', 'your_move', 'last_success'])}
            {renderSection("📍 Scoring Zones", pepTalk.parsedContent.scoring_zones, ['distance', 'club', 'pattern'])}
            {renderSection("💪 Confidence Builders", pepTalk.parsedContent.confidence_builders, ['moment', 'why_special', 'repeatable_element'])}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PepTalkDetail;