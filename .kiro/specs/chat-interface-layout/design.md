# Design Document

## Overview

This design transforms the AI Research Assistant from a split-panel layout into a modern chat interface. The key innovation is a dynamic layout that transitions from a centered input state to a bottom-anchored chat interface upon first submission. The AI Input Component animates smoothly to the bottom while a scrollable chat area appears above it, creating an intuitive conversation-style experience.

The design leverages React state management, Framer Motion animations, and CSS transitions to create fluid, performant transitions. The architecture maintains separation of concerns with the App component orchestrating layout state while child components handle their own presentation logic.

## Architecture

### Component Hierarchy

```
App (Layout Orchestrator)
├── ChatContainer (New - Scrollable Area)
│   └── ChatMessageList (New)
│       └── ChatMessage[] (New - wraps ResearchResponseData)
│           ├── UserMessage (displays submitted topic)
│           └── AssistantMessage (displays research status/results)
└── AIInputComponent (Modified - Position-aware)
```

### State Management

**App-level State:**
- `layoutMode`: 'centered' | 'chat' - Controls overall layout configuration
- `chatMessages`: Array of research submissions and responses
- `isTransitioning`: Boolean flag during layout animation
- Research job state (existing via `useResearchJob` hook)

**AIInputComponent State:**
- `isAtBottom`: Boolean indicating if component is in bottom position
- Existing states (value, isRecording, isMultiLine, etc.)

### Layout Modes

**Centered Mode (Initial State):**
- AI Input Component positioned at viewport center
- No chat area visible
- Full-screen gradient background with Plasma effect
- Triggered: On app load, no submissions yet

**Chat Mode (Active State):**
- AI Input Component fixed at bottom with padding
- Chat area occupies space from top to input component
- Scrollable message history
- Triggered: After first submission

## Components and Interfaces

### 1. ChatContainer Component (New)

**Purpose:** Manages the scrollable chat area and message rendering

**Props Interface:**
```typescript
interface ChatContainerProps {
  messages: ChatMessage[];
  isVisible: boolean;
  className?: string;
}
```

**Key Features:**
- Auto-scroll to bottom on new messages
- Smooth fade-in animation when transitioning from centered mode
- Handles empty state gracefully
- Responsive padding and spacing

**Implementation Notes:**
- Uses `useEffect` with `scrollIntoView` for auto-scroll behavior
- Applies `overflow-y-auto` for vertical scrolling
- Implements fade-in transition with opacity and transform

### 2. ChatMessage Component (New)

**Purpose:** Renders individual chat messages (user queries and assistant responses)

**Props Interface:**
```typescript
interface ChatMessageProps {
  message: ChatMessage;
  isLatest: boolean;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string; // User's topic
  timestamp: string;
  researchJob?: ResearchJob; // For assistant messages
  researchResult?: ResearchResult; // For completed research
}
```

**Key Features:**
- Distinct styling for user vs assistant messages
- User messages: Right-aligned, compact, shows submitted topic
- Assistant messages: Left-aligned, wraps ResearchResponseData component
- Timestamp display
- Loading states for in-progress research

### 3. AIInputComponent (Modified)

**Changes Required:**
- Add `isAtBottom` prop to control positioning behavior
- Modify positioning logic to support both centered and bottom states
- Add animation for transition between states
- Update `className` prop to accept position-specific classes

**New Props:**
```typescript
interface AIInputComponentProps {
  // ... existing props
  isAtBottom: boolean; // New prop
  onPositionTransitionComplete?: () => void; // New callback
}
```

**Positioning Logic:**
```typescript
// Centered state (isAtBottom = false)
style={{
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)'
}}

// Bottom state (isAtBottom = true)
style={{
  position: 'fixed',
  left: '50%',
  bottom: '24px',
  transform: 'translateX(-50%)',
  transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)'
}}
```

### 4. App Component (Modified)

**Layout Structure:**
```tsx
<div className="h-screen w-full overflow-hidden bg-gradient relative">
  {/* Background Plasma Effect */}
  <Plasma {...plasmaProps} />
  
  {/* Chat Container - Fades in when layoutMode === 'chat' */}
  <ChatContainer
    messages={chatMessages}
    isVisible={layoutMode === 'chat'}
    className="absolute top-0 left-0 right-0"
    style={{ bottom: 'calc(AIInputHeight + 48px)' }}
  />
  
  {/* AI Input - Animates from center to bottom */}
  <AIInputComponent
    isAtBottom={layoutMode === 'chat'}
    onSubmit={handleSubmit}
    onPositionTransitionComplete={handleTransitionComplete}
    {...otherProps}
  />
</div>
```

**State Transitions:**
```typescript
// On first submission
const handleSubmit = (topic: string) => {
  // 1. Set transitioning flag
  setIsTransitioning(true);
  
  // 2. Change layout mode (triggers animation)
  setLayoutMode('chat');
  
  // 3. Add user message to chat
  const userMessage: ChatMessage = {
    id: generateId(),
    type: 'user',
    content: topic,
    timestamp: new Date().toISOString()
  };
  setChatMessages(prev => [...prev, userMessage]);
  
  // 4. Submit research job
  submitResearch(topic);
  
  // 5. Reset transitioning flag after animation
  setTimeout(() => setIsTransitioning(false), 500);
};

// On research job updates
useEffect(() => {
  if (currentJob) {
    // Update or add assistant message
    setChatMessages(prev => {
      const existingIndex = prev.findIndex(
        m => m.researchJob?.jobId === currentJob.jobId
      );
      
      const assistantMessage: ChatMessage = {
        id: currentJob.jobId,
        type: 'assistant',
        content: '',
        timestamp: currentJob.createdAt,
        researchJob: currentJob,
        researchResult: result
      };
      
      if (existingIndex >= 0) {
        // Update existing message
        const updated = [...prev];
        updated[existingIndex] = assistantMessage;
        return updated;
      } else {
        // Add new message
        return [...prev, assistantMessage];
      }
    });
  }
}, [currentJob, result]);
```

## Data Models

### ChatMessage Type
```typescript
interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string; // User's submitted topic
  timestamp: string; // ISO 8601 format
  researchJob?: ResearchJob; // Present for assistant messages
  researchResult?: ResearchResult; // Present when research completes
}
```

### Layout State
```typescript
type LayoutMode = 'centered' | 'chat';

interface LayoutState {
  mode: LayoutMode;
  isTransitioning: boolean;
  chatMessages: ChatMessage[];
}
```

## Animation Specifications

### Input Component Transition
- **Duration:** 500ms
- **Easing:** cubic-bezier(0.4, 0, 0.2, 1) (ease-in-out)
- **Properties:** position (top/bottom), transform
- **Sequence:**
  1. User clicks submit
  2. Input animates from center to bottom
  3. Chat container fades in simultaneously
  4. Transition complete callback fires

### Chat Container Fade-In
- **Duration:** 400ms
- **Delay:** 100ms (starts slightly after input begins moving)
- **Easing:** ease-out
- **Properties:** opacity (0 → 1), transform (translateY(20px) → translateY(0))

### Message Appearance
- **Duration:** 300ms
- **Easing:** ease-out
- **Properties:** opacity (0 → 1), transform (translateY(10px) → translateY(0))
- **Stagger:** 50ms between user and assistant messages

## Styling Approach

### Tailwind Classes

**Chat Container:**
```tsx
className="absolute top-0 left-0 right-0 overflow-y-auto px-4 py-6 
           transition-opacity duration-400 ease-out
           scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
```

**User Message:**
```tsx
className="ml-auto max-w-[70%] bg-blue-500 text-white rounded-2xl 
           rounded-tr-sm px-4 py-2 shadow-sm"
```

**Assistant Message:**
```tsx
className="mr-auto max-w-[85%] bg-white rounded-2xl rounded-tl-sm 
           px-4 py-3 shadow-md"
```

**Input Component (Bottom State):**
```tsx
className="fixed left-1/2 -translate-x-1/2 bottom-6 z-50 
           w-full max-w-2xl px-4"
```

### CSS Custom Properties
```css
:root {
  --chat-input-height: 80px; /* Dynamic based on content */
  --chat-padding-bottom: 24px;
  --chat-container-bottom: calc(var(--chat-input-height) + var(--chat-padding-bottom) + 24px);
}
```

## Error Handling

### Transition Failures
- If animation doesn't complete within timeout, force layout mode change
- Log warning to console for debugging
- Ensure UI remains functional even if animation is skipped

### Empty States
- **No messages yet:** Show centered input with welcoming placeholder
- **Research failed:** Display error message in assistant message bubble
- **Network issues:** Show retry button within assistant message

### Edge Cases
- **Rapid submissions:** Queue messages, prevent layout thrashing
- **Browser back button:** Maintain chat history in session storage
- **Window resize during transition:** Recalculate positions, maintain smooth animation

## Testing Strategy

### Unit Tests

**ChatContainer Component:**
- Renders empty state correctly
- Displays messages in correct order
- Auto-scrolls to bottom on new message
- Handles visibility toggle

**ChatMessage Component:**
- Renders user messages with correct styling
- Renders assistant messages with research data
- Displays timestamps correctly
- Shows loading state for in-progress research

**AIInputComponent:**
- Transitions between centered and bottom positions
- Maintains functionality during transition
- Calls position transition callback
- Preserves existing features (voice input, multi-line, etc.)

### Integration Tests

**Layout Transition Flow:**
1. App loads with centered input
2. User submits first topic
3. Input animates to bottom
4. Chat container appears
5. User message displays
6. Assistant message appears with research status
7. Research completes, result displays
8. User submits second topic
9. Layout remains in chat mode
10. New messages append to history

**State Management:**
- Chat messages persist across submissions
- Research job state syncs with chat messages
- Layout mode persists correctly
- Transition flags reset properly

### Visual Regression Tests
- Screenshot comparison for centered state
- Screenshot comparison for chat state
- Animation frame captures for transition
- Responsive layout at various breakpoints

### Accessibility Tests
- Keyboard navigation through chat messages
- Screen reader announces new messages
- Focus management during transition
- ARIA labels for message types
- Color contrast for message bubbles

## Performance Considerations

### Optimization Strategies

**Virtual Scrolling:**
- Implement for chat history > 50 messages
- Use `react-window` or `react-virtualized`
- Maintain scroll position on new messages

**Animation Performance:**
- Use `transform` and `opacity` (GPU-accelerated)
- Avoid animating `height`, `width`, `top`, `left` directly
- Use `will-change` hint for transitioning elements
- Remove `will-change` after transition completes

**State Updates:**
- Batch chat message updates
- Debounce scroll position calculations
- Memoize message components with `React.memo`
- Use `useCallback` for event handlers

**Bundle Size:**
- Lazy load ResearchResponseData component
- Code-split chat components
- Tree-shake unused Framer Motion features

### Performance Metrics
- Layout transition: < 500ms
- Time to Interactive: < 2s
- First Contentful Paint: < 1s
- Message render time: < 50ms
- Scroll performance: 60fps

## Responsive Design

### Breakpoints

**Mobile (< 640px):**
- Input component: 90% width, 16px horizontal padding
- Chat messages: 95% max-width
- Reduced vertical spacing
- Smaller font sizes

**Tablet (640px - 1024px):**
- Input component: 80% width, max 600px
- Chat messages: 85% max-width
- Standard spacing

**Desktop (> 1024px):**
- Input component: max 700px width
- Chat messages: 70% max-width for user, 85% for assistant
- Generous spacing

### Touch Interactions
- Larger tap targets for mobile (min 44x44px)
- Swipe gestures for message actions (future enhancement)
- Pull-to-refresh for chat history (future enhancement)

## Browser Compatibility

**Supported Browsers:**
- Chrome/Edge: 90+
- Firefox: 88+
- Safari: 14+

**Fallbacks:**
- CSS Grid → Flexbox for older browsers
- Framer Motion animations → CSS transitions
- Smooth scroll → Instant scroll
- Backdrop filter → Solid background

## Future Enhancements

1. **Message Actions:** Copy, regenerate, share buttons
2. **Chat History:** Persist across sessions, search functionality
3. **Multi-turn Conversations:** Follow-up questions on research
4. **Streaming Responses:** Real-time research updates
5. **Message Reactions:** Thumbs up/down for feedback
6. **Export Chat:** Download conversation as PDF/Markdown
7. **Voice Output:** Text-to-speech for research results
8. **Collaborative Features:** Share chat sessions with others
