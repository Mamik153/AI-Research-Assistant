// API Response Types
export interface ResearchJobResponse {
  job_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  created_at: string;
  message: string;
}

export interface ResearchPaper {
  title: string;
  authors: string[];
  published: string;
  summary: string;
  pdf_url: string;
}

export interface ResearchResultResponse {
  jobId: string;
  status: 'completed' | 'failed';
  report?: string; // Markdown report (legacy)
  summary?: string; // Main summary
  papers?: ResearchPaper[]; // List of papers
  key_insights?: string[]; // List of insights
  sources: string[];
  completed_at: string;
  topic: string;
  message?: string; // Optional in case error
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
  report?: string; // Legacy markdown
  summary?: string;
  papers?: ResearchPaper[];
  keyInsights?: string[];
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

export type AppView = 'DASHBOARD' | 'MINDMAP' | 'FLASHCARDS';


export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface GeminiResearchResult {
  summary: string;
  groundingChunks: GroundingChunk[];
  rawText: string;
}

export interface MindMapNode {
  id: string;
  label: string;
  group: number;
  description?: string;
}

export interface MindMapLink {
  source: string;
  target: string;
  value: number;
}

export interface MindMapData {
  nodes: MindMapNode[];
  links: MindMapLink[];
}

export interface FlashCard {
  front: string;
  back: string;
}

export interface StructuredResearchData {
  mindMap: MindMapData;
  flashCards: FlashCard[];
}

export type ImageSize = '1K' | '2K' | '4K';

export type CitationStyle = 'APA' | 'MLA';
