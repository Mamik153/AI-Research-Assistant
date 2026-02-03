// API Response Types
export interface ResearchJobResponse {
  job_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  created_at: string;
  message: string;
  chain_of_thought?: string[];
}

export interface ResearchPaper {
  title: string;
  authors: string[];
  published: string;
  summary: string;
  pdf_url: string;
  images?: string[];
}

// Parsed summary structure (nested JSON inside summary field)
export interface OverviewSection {
  title: string;
  content: string;
  visualization_type?: string;
}

export interface KeyConcept {
  name: string;
  description: string;
  related_concepts?: string[];
}

export interface BenefitItem {
  title: string;
  description: string;
  importance?: 'low' | 'medium' | 'high';
}

export interface RiskItem {
  title: string;
  description: string;
  severity?: 'low' | 'medium' | 'high';
}

export interface ApplicationItem {
  title: string;
  description: string;
  industry?: string;
}

export interface FutureDirection {
  title: string;
  description: string;
  timeframe?: string;
}

export interface Methodology {
  name: string;
  description: string;
  use_cases?: string[];
}

export interface ComparisonItem {
  name: string;
  values: string[];
}

export interface ComparisonData {
  criteria: string[];
  items: ComparisonItem[];
}

export interface TimelineEvent {
  period: string;
  event: string;
  significance?: string;
}

export interface StatisticItem {
  label: string;
  value: string;
  context?: string;
  source?: string;
}

export interface StructuredSections {
  overview: OverviewSection | null;
  key_concepts: KeyConcept[];
  benefits: BenefitItem[];
  risks: RiskItem[];
  applications: ApplicationItem[];
  future_directions: FutureDirection[];
  methodologies: Methodology[];
  comparisons: ComparisonData | null;
  timeline: TimelineEvent[];
  statistics: StatisticItem[];
}

export interface ParsedSummary {
  summary: string;
  key_insights: string[];
  generated_diagrams: string[];
  structured_sections: StructuredSections;
}

export interface ResearchResultResponse {
  jobId: string;
  status: 'completed' | 'failed';
  report?: string; // Markdown report (legacy)
  summary?: string; // Main summary
  papers?: ResearchPaper[]; // List of papers
  key_insights?: string[]; // List of insights
  generated_diagrams?: string[]; // Mermaid diagram strings (flat API)
  structured_sections?: StructuredSections; // Structured sections (flat API)
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
