# Design Document

## Overview

The AI Research Interface will be built as a React TypeScript application using the existing Vite setup. The application will transform from a simple counter demo into a research interface that communicates with a backend API to submit research topics, monitor job progress, and display results. The design emphasizes user experience with real-time feedback, error handling, and a clean, intuitive interface.

## Architecture

### Component Architecture
The application will follow a component-based architecture with clear separation of concerns and responsive layout management:

```
App (Main Container with Layout Management)
├── ResearchFormContainer (Left Panel - 30% when active)
│   ├── ResearchForm (Input & Submit)
│   └── ResearchStatusContainer (Status Display)
├── ResearchResponseData (Right Panel - 70% when active)
│   ├── JobStatus (Progress Monitoring)
│   └── ResearchResult (Result Display)
└── ErrorBoundary (Error Handling)
```

### Layout States
The application will have two distinct layout states:
- **Full Screen Mode**: Initial state where ResearchFormContainer occupies 100% width
- **Split Screen Mode**: Active research state with 30%/70% split layout

### State Management
The application will use React's built-in state management with hooks:
- `useState` for component-level state and layout management
- Custom hooks for API operations and polling logic
- State will be lifted to the App component to coordinate between child components
- Layout state will be managed at the App level to control responsive transitions
- Animation states will be managed using CSS classes and React state

### API Integration
The application will communicate with three main endpoints:
- POST `/api/research` - Submit research topics
- GET `/api/research/{job_id}` - Check job status
- GET `/api/research/{job_id}/result` - Retrieve completed research

## Components and Interfaces

### ResearchForm Component
**Purpose:** Handle user input and research submission
**Props:**
```typescript
interface ResearchFormProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
  disabled: boolean;
}
```
**State:**
- `topic: string` - Current input value
- `isValid: boolean` - Input validation state

### JobStatus Component
**Purpose:** Display current job status and progress
**Props:**
```typescript
interface JobStatusProps {
  jobId: string | null;
  status: JobStatus;
  message: string;
  createdAt?: string;
}
```

### ResearchResult Component
**Purpose:** Display completed research reports
**Props:**
```typescript
interface ResearchResultProps {
  result: ResearchResult | null;
  onNewResearch: () => void;
}
```

### ResearchResponseData Component
**Purpose:** Container for the right panel that houses research status and results
**Props:**
```typescript
interface ResearchResponseDataProps {
  isVisible: boolean;
  currentJob: ResearchJob | null;
  result: ResearchResult | null;
  onNewResearch: () => void;
}
```

### Layout Management Components

#### App Component (Enhanced)
**Purpose:** Manage overall layout state and responsive transitions
**State:**
```typescript
interface AppState {
  layoutMode: 'fullscreen' | 'split';
  isAnimating: boolean;
}
```

### Custom Hooks

#### useResearchJob Hook
**Purpose:** Manage research job lifecycle
```typescript
interface UseResearchJobReturn {
  submitResearch: (topic: string) => Promise<void>;
  currentJob: ResearchJob | null;
  result: ResearchResult | null;
  error: string | null;
  isLoading: boolean;
  resetJob: () => void;
}
```

#### usePolling Hook
**Purpose:** Handle status polling logic
```typescript
interface UsePollingReturn {
  startPolling: (jobId: string) => void;
  stopPolling: () => void;
  isPolling: boolean;
}
```

## Data Models

### API Response Types
```typescript
interface ResearchJobResponse {
  job_id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  created_at: string;
  message: string;
}

interface ResearchResultResponse extends ResearchJobResponse {
  report?: string;
  completed_at?: string;
  error_message?: string;
}
```

### Application State Types
```typescript
interface ResearchJob {
  jobId: string;
  status: JobStatus;
  message: string;
  createdAt: string;
  topic: string;
}

interface ResearchResult {
  jobId: string;
  report: string;
  completedAt: string;
  topic: string;
}

type JobStatus = 'idle' | 'submitting' | 'pending' | 'running' | 'completed' | 'failed';
```

## Error Handling

### API Error Handling
- Network errors: Display connectivity messages with retry options
- HTTP errors: Parse and display server error messages
- Timeout errors: Handle long-running requests gracefully
- Invalid responses: Validate API response structure

### User Experience
- Loading states for all async operations
- Clear error messages with actionable guidance
- Graceful degradation when API is unavailable
- Retry mechanisms for failed operations

### Error Boundary
Implement a React Error Boundary to catch and handle unexpected errors:
```typescript
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}
```

## Testing Strategy

### Unit Testing Approach
- Component testing with React Testing Library
- Hook testing for custom hooks
- API service testing with mocked responses
- Error handling scenario testing

### Integration Testing
- End-to-end user flows
- API integration testing
- Polling behavior validation
- Error recovery testing

### Test Coverage Areas
- Form validation and submission
- Status polling lifecycle
- Result display and formatting
- Error states and recovery
- Loading states and transitions

## Responsive Layout Implementation

### CSS Framework
The application will use Tailwind CSS for styling and responsive layout management:
- Utility-first approach for rapid development
- Built-in responsive design utilities
- Consistent spacing and sizing system
- Easy animation and transition classes

### Layout Classes
```css
/* Full screen mode */
.layout-fullscreen {
  @apply w-full transition-all duration-500 ease-in-out;
}

/* Split screen mode */
.layout-split-left {
  @apply w-[30%] transition-all duration-500 ease-in-out;
}

.layout-split-right {
  @apply w-[70%] transition-all duration-500 ease-in-out opacity-0;
}

.layout-split-right.visible {
  @apply opacity-100 translate-x-0;
}
```

### Animation Strategy
- Use Tailwind's transition utilities for smooth layout changes
- CSS transforms for panel sliding animations
- Opacity transitions for content fade-in effects
- Duration of 500ms for optimal user experience

## Implementation Considerations

### Performance
- Debounce input validation
- Efficient polling with proper cleanup
- Memoization for expensive operations
- Lazy loading for large research reports
- CSS transforms for hardware-accelerated animations

### Accessibility
- Proper ARIA labels for dynamic content
- Keyboard navigation support
- Screen reader compatibility
- Focus management during state transitions
- Reduced motion preferences support

### Browser Compatibility
- Modern browser support (ES2020+)
- Fetch API with error handling
- CSS Grid/Flexbox with Tailwind utilities
- TypeScript for type safety
- CSS transforms and transitions

### Development Experience
- Hot module replacement with Vite
- TypeScript strict mode
- ESLint configuration
- Tailwind CSS IntelliSense
- Component development workflow