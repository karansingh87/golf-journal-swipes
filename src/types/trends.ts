export type TrendPatternType = 'hidden_strength' | 'mental_signature' | 'game_changing' | 'strategic_instinct' | 'growth_indicator';

export interface TrendPattern {
  type: TrendPatternType;
  title: string;
  insight: string;
  pattern_evidence: string;
  strength_rating: number;
  observation_window: string;
  deeper_meaning: string;
}

export interface TrendAnalysisMetadata {
  sessions_reviewed: number;
  time_period: string;
  pattern_confidence: number;
}

export interface Trend {
  patterns: TrendPattern[];
  analysis_metadata: TrendAnalysisMetadata;
  created_at: string;
}