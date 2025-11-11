# Design Document: Animated AI Input Component

## Overview

The Animated AI Input Component is a modern, interactive React component that provides a floating text input interface for AI interactions. Built with React 19, TypeScript, and Tailwind CSS 4, it features auto-expanding textarea functionality, action buttons, and smooth animations. The component is designed to be reusable, accessible, and performant.

## Architecture

### Component Structure

```
AIInputComponent (Container)
├── FloatingContainer (Styled wrapper)
│   ├── InputArea
│   │   ├── PlusButton (ActionButton)
│   │   └── AutoExpandTextarea
│   └── ActionButtonGroup
│       ├── MicrophoneButton (ActionButton)
│       └── SubmitButton (ActionButton)
```

### Technology Stack

- **React 19.1.1**: Component framework
- **TypeScript 5.9.3**: Type safety
- **Tailwind CSS 4.1.14**: Utility-first styling
- **Vite 7.1.7**: Build tool

## Components and Interfaces

### 1. AIInputComponent (Main Component)

**File**: `src/components/AIInputComponent.tsx`

**Props Interface**:
```typescript
interface AIInputComponentProps {
  onSubmit: (value: string) => void;
  onPlusClick?: () => void;
  onMicClick?: () => void;
  placeholder?: string;
  className?: string;
}
```

**State**:
```typescript
interface AIInputState {
  value: string;
  isFocused: boolean;
  isAnimating: boolean;
}
```

**Responsibilities**:
- Manage textarea value state
- Handle user interactions (typing, button clicks)
- Coordinate animations
- Emit events to parent components via callbacks

### 2. Icon Components

**Files**: 
- `src/components/icons/PlusIcon.tsx`
- `src/components/icons/MicrophoneIcon.tsx`
- `src/components/icons/ArrowUpIcon.tsx`

**Props Interface**:
```typescript
interface IconProps {
  className?: string;
  size?: number;
}
```

**Responsibilities**:
- Render SVG icons with consistent styling
- Accept size and className props for customization

## Data Models

### Component State Model

```typescript
// Internal state management
type InputValue = string;
type FocusState = boolean;
type AnimationState = boolean;

interface ComponentState {
  value: InputValue;
  isFocused: FocusState;
  isAnimating: AnimationState;
}
```

### Event Handlers Model

```typescript
interface EventHandlers {
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
  handlePlusClick: () => void;
  handleMicClick: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
}
```

## Styling Strategy

### Tailwind CSS Classes

**FloatingContainer**:
```
absolute z-10 w-full max-w-sm rounded-3xl bg-white shadow-lg
transition-all duration-300 ease-in-out
```

**Textarea**:
```
w-full resize-none rounded-md py-2 outline-none
focus-visible:ring-0 field-sizing-content
```

**ActionButton (Base)**:
```
flex size-11 items-center justify-center rounded-full p-1
transition-transform duration-200 hover:scale-105
```

**SubmitButton (Specific)**:
```
bg-[#121212] text-white hover:bg-[#2a2a2a]
```

### CSS Module (Optional)

**File**: `src/components/AIInputComponent.css`

For custom animations not easily achievable with Tailwind:
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.ai-input-enter {
  animation: fadeIn 300ms ease-out;
}

.textarea-expand {
  transition: height 200ms ease-out;
}
```

## Implementation Details

### Auto-Expanding Textarea

**Approach**: Use CSS `field-sizing: content` property (modern browsers) with JavaScript fallback

```typescript
const textareaRef = useRef<HTMLTextAreaElement>(null);

useEffect(() => {
  if (textareaRef.current) {
    // Reset height to auto to get correct scrollHeight
    textareaRef.current.style.height = 'auto';
    // Set height to scrollHeight, capped at max height
    const newHeight = Math.min(textareaRef.current.scrollHeight, 100);
    textareaRef.current.style.height = `${newHeight}px`;
  }
}, [value]);
```

### Keyboard Handling

```typescript
const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSubmit();
  }
  // Shift+Enter allows new line (default behavior)
};
```

### Animation Strategy

1. **Mount Animation**: Use CSS animation on component mount
2. **Button Interactions**: Use Tailwind's `hover:scale-105` and `transition-transform`
3. **Submit Animation**: Add temporary class on submit button click

```typescript
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = () => {
  setIsSubmitting(true);
  onSubmit(value);
  
  setTimeout(() => {
    setIsSubmitting(false);
    setValue(''); // Clear input after submit
  }, 300);
};
```

## Accessibility

### ARIA Labels

```typescript
<button
  aria-label="Add attachment"
  onClick={handlePlusClick}
>
  <PlusIcon />
</button>

<button
  aria-label="Voice input"
  onClick={handleMicClick}
>
  <MicrophoneIcon />
</button>

<button
  aria-label="Submit message"
  onClick={handleSubmit}
>
  <ArrowUpIcon />
</button>

<textarea
  aria-label="Message input"
  placeholder={placeholder}
/>
```

### Focus Management

- Maintain visible focus indicators using Tailwind's `focus-visible:` utilities
- Ensure Tab navigation works correctly between buttons
- Trap focus within component when appropriate

### Keyboard Navigation

- Enter (without Shift): Submit
- Shift+Enter: New line
- Tab: Navigate between buttons
- Escape: Clear input (optional enhancement)

## Error Handling

### Input Validation

```typescript
const handleSubmit = () => {
  const trimmedValue = value.trim();
  
  if (!trimmedValue) {
    // Don't submit empty messages
    return;
  }
  
  if (trimmedValue.length > 5000) {
    // Handle max length exceeded
    console.warn('Message too long');
    return;
  }
  
  onSubmit(trimmedValue);
};
```

### Callback Error Handling

```typescript
const handleSubmit = () => {
  try {
    onSubmit(value);
    setValue('');
  } catch (error) {
    console.error('Submit failed:', error);
    // Optionally show error state
  }
};
```

## Testing Strategy

### Component Testing

**Test Cases**:
1. Renders with default placeholder
2. Accepts custom placeholder prop
3. Updates value on text input
4. Calls onSubmit when Enter is pressed (without Shift)
5. Inserts new line when Shift+Enter is pressed
6. Calls onPlusClick when plus button is clicked
7. Calls onMicClick when microphone button is clicked
8. Clears input after successful submit
9. Does not submit empty messages
10. Auto-expands textarea as content grows
11. Caps textarea height at 100px
12. Applies correct ARIA labels

### Accessibility Testing

- Keyboard navigation works correctly
- Screen reader announces all interactive elements
- Focus indicators are visible
- Color contrast meets WCAG AA standards

### Performance Testing

- Animations maintain 60fps
- No layout thrashing during auto-expand
- Efficient re-renders (use React.memo if needed)

## Integration

### Usage Example

```typescript
import { AIInputComponent } from './components/AIInputComponent';

function ChatInterface() {
  const handleSubmit = (message: string) => {
    console.log('Sending message:', message);
    // Send to API or state management
  };

  const handleAttachment = () => {
    console.log('Opening file picker');
  };

  const handleVoiceInput = () => {
    console.log('Starting voice recording');
  };

  return (
    <div className="relative h-screen">
      <AIInputComponent
        onSubmit={handleSubmit}
        onPlusClick={handleAttachment}
        onMicClick={handleVoiceInput}
        placeholder="Ask me anything..."
      />
    </div>
  );
}
```

## Performance Considerations

1. **Debounce Auto-Expand**: If performance issues arise, debounce the height calculation
2. **Memoization**: Use `React.memo` for icon components
3. **CSS Containment**: Use `contain: layout style` on FloatingContainer
4. **Will-Change**: Add `will-change: transform` to animated elements

## Future Enhancements

1. **Rich Text Support**: Add markdown or formatting toolbar
2. **File Attachments**: Implement file upload functionality
3. **Voice Recording**: Add actual voice recording capability
4. **Emoji Picker**: Add emoji selection interface
5. **Command Palette**: Support slash commands (e.g., /search, /summarize)
6. **Multi-line Suggestions**: Show AI-powered autocomplete suggestions
7. **Character Counter**: Display character count near limit
8. **Draft Persistence**: Save draft to localStorage
