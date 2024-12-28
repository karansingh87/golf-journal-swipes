export type TrendPatternType = 'hidden_strength' | 'mental_signature' | 'game_changing' | 'strategic_instinct' | 'growth_indicator';

export interface SupportingDetails {
  evidence: string;
  context: string;
  significance: string;
}

export interface TrendPattern {
  type: TrendPatternType;
  primary_insight: string;
  supporting_details: SupportingDetails;
  confidence_score: number;
  timespan: string;
}

export interface TrendAnalysisMetadata {
  sessions_analyzed: number;
  date_range: string;
  analysis_confidence: number;
}

export interface TrendOutput {
  patterns: TrendPattern[];
  metadata: TrendAnalysisMetadata;
}