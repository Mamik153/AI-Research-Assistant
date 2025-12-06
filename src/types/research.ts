// API Response Types
export interface ResearchJobResponse {
  job_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  created_at: string;
  message: string;
}

export interface ResearchResultResponse extends ResearchJobResponse {
  report?: string;
  completed_at?: string;
  error_message?: string;
}

// Application State Types
export type JobStatus = 'idle' | 'submitting' | 'pending' | 'running' | 'completed' | 'failed';

export interface ResearchJob {
  jobId: string;
  status: JobStatus;
  message: string;
  createdAt: string;
  topic: string;
}

export interface ResearchResult {
  jobId: string;
  report: string;
  completedAt: string;
  topic: string;
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
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export interface ApiError {
  message: string;
  status?: number;
  type: 'network' | 'server' | 'validation' | 'timeout';
}

// API Request Types
export interface ResearchSubmissionRequest {
  topic: string;
}

// Chat Interface Types
export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string; // User's submitted topic
  timestamp: string; // ISO 8601 format
  researchJob?: ResearchJob; // Present for assistant messages
  researchResult?: ResearchResult; // Present when research completes
}

export type LayoutMode = 'centered' | 'chat';