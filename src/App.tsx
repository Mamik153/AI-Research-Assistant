import { useState, useEffect, useCallback } from 'react'
import { ErrorBoundary } from './components/ErrorBoundary'
import { useResearchJob } from './hooks/useResearchJob'
import { AIInputComponent } from './components'
import { ChatContainer } from './components/ChatContainer'
import './App.css'
import type { LayoutMode, ChatMessage } from './types/research'
// @ts-ignore - Plasma is a .jsx file without type definitions
import Plasma from './components/Plasma'

function App() {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('centered')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  // Lift the research job state to App level
  const { submitResearch, isLoading, error, currentJob, result, resetJob } = useResearchJob()

  // Handle research topic submission
  const handleSubmit = useCallback((topic: string) => {
    // 1. Set transitioning flag
    setIsTransitioning(true);

    // 2. Change layout mode to chat (triggers animation)
    setLayoutMode('chat');

    // 3. Add user message to chat
    /* const userMessage: ChatMessage = {
       id: `user-${Date.now()}`,
       type: 'user',
       content: topic,
       timestamp: new Date().toISOString()
     };
     setChatMessages(prev => [...prev, userMessage]);*/

    // 4. Submit research job
    submitResearch(topic);

    // 5. Reset transitioning flag after animation
    //setTimeout(() => setIsTransitioning(false), 500);
  }, [submitResearch]);

  // Handle position transition complete
  const handlePositionTransitionComplete = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  // Sync research job state with chat messages
  useEffect(() => {
    if (currentJob) {
      setChatMessages(prev => {
        // Check if assistant message already exists for this job
        const existingIndex = prev.findIndex(
          m => m.type === 'assistant' && m.researchJob?.jobId === currentJob.jobId
        );

        const assistantMessage: ChatMessage = {
          id: currentJob.jobId,
          type: 'assistant',
          content: '',
          timestamp: currentJob.createdAt,
          researchJob: currentJob,
          researchResult: result || undefined
        };

        if (existingIndex >= 0) {
          // Update existing assistant message
          const updated = [...prev];
          updated[existingIndex] = assistantMessage;
          return updated;
        } else {
          // Add new assistant message
          return [...prev, assistantMessage];
        }
      });
    }
  }, [currentJob, result]);

  // Handle errors
  useEffect(() => {
    if (error) {
      console.error('Research error:', error);
      // Error will be displayed in the ResearchResponseData component
    }
  }, [error]);

  // Placeholder handlers for future features
  const handlePlusClick = useCallback(() => {
    console.log('Plus button clicked')
  }, []);

  const handleMicClick = useCallback(() => {
    console.log('Microphone button clicked')
  }, []);

  return (
    <ErrorBoundary>
      <div className="h-screen w-full overflow-hidden relative app">
        {/* Background Plasma Effect */}
        <div className="absolute inset-0 z-0">
          { /* <Plasma
            color="#FDFBD4"
            speed={0.3}
            direction="forward"
            scale={2.1}
            opacity={0.1}
            mouseInteractive={false}
          />*/}
        </div>

        {/* Chat Container */}
        <div className="absolute top-0 left-0 right-0 z-10" style={{ bottom: '120px' }}>
          <ChatContainer
            topic={currentJob?.topic}
            isTransitioning={isTransitioning}
            messages={chatMessages}
            isVisible={layoutMode === 'chat'}
            className="h-full"
          />
        </div>

        {/* AI Input Component */}
        <AIInputComponent
          onSubmit={handleSubmit}
          onPlusClick={handlePlusClick}
          onMicClick={handleMicClick}
          placeholder="Enter a topic to research"
          disabled={isLoading}
          isAtBottom={layoutMode === 'chat'}
          onPositionTransitionComplete={handlePositionTransitionComplete}
          isLoading={isLoading}
        />
      </div>
    </ErrorBoundary>
  )
}

export default App
