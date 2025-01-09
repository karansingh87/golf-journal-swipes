import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PageBreadcrumb from "@/components/shared/PageBreadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import type { PepTalk, isPepTalkContent } from "@/types/pep-talk";

const PepTalkDetail = () => {
  const { id } = useParams();

  const { data: pepTalk, isLoading } = useQuery<PepTalk>({
    queryKey: ['pep_talk', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pep_talk')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (!data || !isPepTalkContent(data.content)) {
        throw new Error('Invalid pep talk data');
      }

      return data as PepTalk;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!pepTalk) {
    return <div className="p-8">Pep talk not found</div>;
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
    <div className="min-h-[calc(100dvh-3.5rem)] bg-background">
      <div className="h-14" /> {/* Navigation offset */}
      <div className="p-6 max-w-4xl mx-auto">
        <PageBreadcrumb currentPage="Pep Talk" />

        <Card className="mt-6">
          <CardContent className="p-6">
            {renderSection("🔥 Hot Right Now", pepTalk.content.hot_right_now, ['aspect', 'detail', 'proof'])}
            {renderSection("✨ Working Well", pepTalk.content.working_well, ['type', 'what', 'when'])}
            {renderSection("🎯 Go-To Shots", pepTalk.content.go_to_shots, ['situation', 'your_move', 'last_success'])}
            {renderSection("📍 Scoring Zones", pepTalk.content.scoring_zones, ['distance', 'club', 'pattern'])}
            {renderSection("💪 Confidence Builders", pepTalk.content.confidence_builders, ['moment', 'why_special', 'repeatable_element'])}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PepTalkDetail;