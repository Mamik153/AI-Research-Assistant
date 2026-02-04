import type { ResearchJob, ResearchResult } from '@/features/research';

// Chat Interface Types
export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  researchJob?: ResearchJob;
  researchResult?: ResearchResult;
}
