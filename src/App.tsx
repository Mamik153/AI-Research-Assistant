import { useState, useEffect } from 'react'
import { ResearchFormContainer } from './components/ResearchFormContainer'
import { ErrorBoundary } from './components/ErrorBoundary'
import { useResearchJob } from './hooks/useResearchJob'
import { AIInputComponent } from './components'
import './App.css'
import ResearchResponseData from './components/ResearchResponseData'
// @ts-ignore - Plasma is a .jsx file without type definitions
import Plasma from './components/Plasma'

type LayoutMode = 'fullscreen' | 'split'

function App() {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('fullscreen')
  const [isAnimating, setIsAnimating] = useState(false)
  const [showAIInput, setShowAIInput] = useState(false)
  const [messages, setMessages] = useState<string[]>([])
  // Lift the research job state to App level
  const { submitResearch, isLoading, error, currentJob, result, resetJob } = useResearchJob()

  // Handle layout transitions based on research job status
  useEffect(() => {
    if (currentJob && layoutMode === 'fullscreen') {
      // Transition to split layout when research job is submitted
      setIsAnimating(true)
      setLayoutMode('split')

      // Reset animation state after transition completes
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 500) // Match the CSS transition duration

      return () => clearTimeout(timer)
    } else if (!currentJob && layoutMode === 'split') {
      // Transition back to fullscreen when job is reset
      setLayoutMode('fullscreen')
    }
  }, [currentJob, layoutMode])

  // Reset to fullscreen only if explicitly requested (not implemented yet)
  // This maintains split layout for subsequent research jobs as per requirements

  console.log("currentJob ============> ", currentJob)
  console.log("layoutMode ============> ", layoutMode)

  const handleTopicReset = () => {
    resetJob();
  }

  // AIInputComponent callback handlers
  const handleAISubmit = (message: string) => {
    console.log('AI Input submitted:', message)
    setMessages(prev => [...prev, message])
    // You can integrate this with your research submission or other functionality
    // For example: submitResearch({ topic: message, depth: 'basic' })
  }

  const handlePlusClick = () => {
    console.log('Plus button clicked - could open file picker or attachment menu')
    // Example: Open file picker for attachments
  }

  const handleMicClick = () => {
    console.log('Microphone button clicked - could start voice recording')
    // Example: Start voice recording functionality
  }

  return (
    <ErrorBoundary>
      <div className="h-screen h-full overflow-hidden bg-white dark:bg-black w-full flex flex-row items-start p-3 ">
        {/* Left Panel - Research Form Container */}
        <div className={`
          h-full rounded-3xl app relative flex flex-col overflow-hidden justify-between 
          transition-all duration-500 ease-in-out
          ${layoutMode === 'fullscreen' ? 'w-full' : 'w-[30%] overflow-y-auto'}
          ${isAnimating ? 'transform' : ''}
        `}>
          <div className="absolute top-0 left-0 w-full h-full w-full h-full">
            <Plasma
              color="#FDFBD4"
              speed={0.3}
              direction="forward"
              scale={2.1}
              opacity={0.1}
              mouseInteractive={false}
            />
          </div>

          {/* <header className="app-header bg-white/20 text-sm">
            <div className="app-header__content">
              <h1 className="app-title">AI Research Assistant</h1>
              <p className="app-subtitle">
                Get comprehensive research reports on any topic using AI-powered analysis
              </p>
            </div>
          </header> */}

          <main className="app-main">
            {/* <ResearchFormContainer
              submitResearch={submitResearch}
              isLoading={isLoading}
              error={error}
              currentJob={currentJob}
              result={result}
              resetJob={handleTopicReset}
            /> */}

             <div className="relative w-full h-full">
                <AIInputComponent
                  onSubmit={handleAISubmit}
                  onPlusClick={handlePlusClick}
                  onMicClick={handleMicClick}
                  placeholder="Enter a topic to research"
                  className="left-1/2"
                  disabled={false}
                />
              </div>
          </main>

          {/* <footer className="app-footer">
            <p>Powered by AI Research Crew</p>
          </footer> */}
        </div>

        {/* Right Panel - Research Response Data */}
        <div className={`
          h-screen overflow-y-auto bg-black
          transition-all duration-500 ease-in-out
          ${layoutMode === 'fullscreen' ? 'w-0 opacity-0' : 'w-[70%] opacity-100'}
          ${isAnimating ? 'transform' : ''}
        `}>
          <ResearchResponseData
            isVisible={layoutMode === 'split'}
            currentJob={currentJob}
            result={result}
            resetJob={resetJob}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default App
