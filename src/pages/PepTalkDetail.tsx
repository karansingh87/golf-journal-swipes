import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PageBreadcrumb from "@/components/shared/PageBreadcrumb";
import { Card, CardContent } from "@/components/ui/card";

const PepTalkDetail = () => {
  const { id } = useParams();

  const { data: pepTalk, isLoading } = useQuery({
    queryKey: ['pep_talk', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pep_talk')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      {/* Header offset for fixed navigation */}
      <div className="h-14" />
      
      <PageBreadcrumb currentPage="Pep Talk" />
      
      <div className="flex-1 w-full px-6 py-6 max-w-3xl mx-auto">
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="prose prose-zinc max-w-none">
              {pepTalk?.content?.text}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PepTalkDetail;