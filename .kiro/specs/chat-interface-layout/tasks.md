# Implementation Plan

- [x] 1. Create ChatMessage type definition and update App state management


  - Define ChatMessage interface in types/research.ts with id, type, content, timestamp, researchJob, and researchResult fields
  - Add layoutMode state ('centered' | 'chat') to App component
  - Add chatMessages state array to App component
  - Add isTransitioning state flag to App component
  - _Requirements: 1.1, 2.1, 3.1, 4.1_

- [x] 2. Create ChatMessage component for individual message rendering


  - Create src/components/ChatMessage.tsx component file
  - Implement user message styling (right-aligned, blue background, rounded corners)
  - Implement assistant message styling (left-aligned, white background, wraps ResearchResponseData)
  - Add timestamp display with proper formatting
  - Add fade-in animation on mount using Framer Motion
  - _Requirements: 2.2, 2.3, 3.3_

- [x] 3. Create ChatContainer component for scrollable message area


  - Create src/components/ChatContainer.tsx component file
  - Implement scrollable container with overflow-y-auto
  - Add auto-scroll to bottom functionality using useEffect and scrollIntoView
  - Implement fade-in transition when isVisible prop changes
  - Add empty state handling
  - Apply responsive padding and spacing
  - _Requirements: 2.1, 2.2, 2.4, 5.2_

- [x] 4. Modify AIInputComponent to support position transitions


  - Add isAtBottom prop to AIInputComponentProps interface
  - Add onPositionTransitionComplete callback prop
  - Implement centered positioning logic (absolute, centered with transform)
  - Implement bottom positioning logic (fixed, bottom with horizontal centering)
  - Add smooth transition between positions using CSS transitions (500ms, cubic-bezier easing)
  - Update component to maintain functionality during position changes
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 3.2_

- [x] 5. Update App component layout structure


  - Remove split-panel layout (left/right panels)
  - Implement single-column layout with full-screen container
  - Position Plasma background effect as full-screen backdrop
  - Add ChatContainer with dynamic bottom positioning based on input height
  - Update AIInputComponent integration with isAtBottom prop
  - Apply proper z-index layering (background < chat < input)
  - _Requirements: 3.1, 3.2, 5.1, 5.2, 5.3_



- [ ] 6. Implement submission handler and layout transition logic
  - Create handleSubmit function that triggers layout mode change
  - Add user message to chatMessages array on submission
  - Set isTransitioning flag and trigger layoutMode change to 'chat'
  - Integrate with existing submitResearch from useResearchJob hook
  - Add transition complete timeout to reset isTransitioning flag

  - Ensure subsequent submissions maintain chat layout mode
  - _Requirements: 1.1, 3.2, 3.3, 4.1, 4.4_

- [x] 7. Sync research job state with chat messages

  - Create useEffect to monitor currentJob and result changes
  - Update or add assistant message when research job updates
  - Handle job status changes (submitting, processing, completed, failed)
  - Update assistant message with research results when completed
  - Handle error states by displaying error in assistant message
  - _Requirements: 2.2, 2.3, 2.4, 4.2, 4.3_

- [x] 8. Implement responsive design and mobile optimizations


  - Add responsive breakpoints for mobile (< 640px), tablet (640-1024px), desktop (> 1024px)
  - Adjust input component width and padding for each breakpoint
  - Adjust chat message max-width for each breakpoint
  - Ensure touch targets are minimum 44x44px on mobile
  - Test and adjust spacing for different screen sizes
  - Verify scroll behavior on mobile devices
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 9. Add animation polish and performance optimizations


  - Implement staggered message appearance animations (50ms delay)
  - Add will-change CSS hints for transitioning elements
  - Memoize ChatMessage components with React.memo
  - Use useCallback for event handlers in App component
  - Ensure animations use GPU-accelerated properties (transform, opacity)
  - Test animation performance and adjust timing if needed
  - _Requirements: 1.3, 3.3, 3.4_

- [x] 10. Clean up unused code and update imports



  - Remove unused ResearchFormContainer import and component
  - Remove unused state variables (showAIInput, setShowAIInput, messages)
  - Remove split-panel layout code and related CSS
  - Update component exports in index files
  - Remove or update handleTopicReset, handlePlusClick references
  - Clean up console.log statements
  - _Requirements: All (code quality)_
