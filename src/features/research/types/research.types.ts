import type { ParsedSummary } from '@/features/results';
import type { ResearchPaper } from '@/features/papers';

// API Response Types
export interface ResearchJobResponse {
  job_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  created_at: string;
  message: string;
  chain_of_thought?: string[];
}

export interface ResearchResultResponse {
  jobId: string;
  status: 'completed' | 'failed';
  report?: string; // Markdown report (legacy)
  summary?: string; // Main summary
  papers?: ResearchPaper[];
  key_insights?: string[];
  generated_diagrams?: string[];
  structured_sections?: unknown; // StructuredSections type will be in results feature
  sources: string[];
  completed_at: string;
  topic: string;
  message?: string;
  section_confidence?: Record<string, number>;
  section_images?: Record<string, string[]> | null;
}

// Application State Types
export type JobStatus = 'idle' | 'submitting' | 'pending' | 'running' | 'completed' | 'failed';

export interface ResearchJob {
  jobId: string;
  status: JobStatus;
  message: string;
  createdAt: string;
  topic: string;
  chainOfThought?: string[];
}

export interface ResearchResult {
  jobId: string;
  report?: string; // Legacy markdown
  summary?: string;
  parsedSummary?: ParsedSummary;
  papers?: ResearchPaper[];
  keyInsights?: string[];
  generatedDiagrams?: string[];
  completedAt: string;
  topic: string;
  tags?: string[];
  sectionConfidence?: Record<string, number>;
  sectionImages?: Record<string, string[]> | null;
}

// Component Props Interfaces
export interface ResearchFormProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
  disabled: boolean;
}

export interface JobStatusProps {
  jobId: string | null;
  status: JobStatus;
  message: string;
  createdAt?: string;
}

export interface ResearchResultProps {
  result: ResearchResult | null;
  onNewResearch: () => void;
}

// Custom Hook Return Types
export interface UseResearchJobReturn {
  submitResearch: (topic: string) => Promise<void>;
  currentJob: ResearchJob | null;
  result: ResearchResult | null;
  error: string | null;
  isLoading: boolean;
  resetJob: () => void;
}

export interface UsePollingReturn {
  startPolling: (jobId: string) => void;
  stopPolling: () => void;
  isPolling: boolean;
}

// Error Handling Types
export interface ApiError {
  message: string;
  status?: number;
  type: 'network' | 'server' | 'validation' | 'timeout';
  code?: string;
}

// API Request Types
export interface ResearchSubmissionRequest {
  topic: string;
}
