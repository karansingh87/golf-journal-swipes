import {
  PepTalkHotSection,
  PepTalkWorkingSection,
  PepTalkShotSection,
  PepTalkScoringSection,
  PepTalkConfidenceSection
} from './section-types';

export interface PepTalkContent {
  hot_right_now: PepTalkHotSection[];
  working_well: PepTalkWorkingSection[];
  go_to_shots: PepTalkShotSection[];
  scoring_zones: PepTalkScoringSection[];
  confidence_builders: PepTalkConfidenceSection[];
}