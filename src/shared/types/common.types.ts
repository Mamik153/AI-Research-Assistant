// Shared common types used across features

export type LayoutMode = 'centered' | 'chat';

// Error Handling Types
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// API Error type — shared across features
export interface ApiError {
  message: string;
  status?: number;
  type: 'network' | 'server' | 'validation' | 'timeout' | 'payload_too_large';
  code?: string;
}

// Flash Card types
export interface FlashCard {
  front: string;
  back: string;
}

