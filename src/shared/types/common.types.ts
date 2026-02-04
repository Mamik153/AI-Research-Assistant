// Shared common types used across features

export type LayoutMode = 'centered' | 'chat';

export type AppView = 'DASHBOARD' | 'MINDMAP' | 'FLASHCARDS';

// Error Handling Types
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// Gemini-specific types
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

// Mind Map types
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

// Flash Card types
export interface FlashCard {
  front: string;
  back: string;
}

export interface StructuredResearchData {
  mindMap: MindMapData;
  flashCards: FlashCard[];
}
