import { useState, useEffect } from 'react'
import { ResearchFormContainer } from './components/ResearchFormContainer'
import { ErrorBoundary } from './components/ErrorBoundary'
import { useResearchJob } from './hooks/useResearchJob'
import './App.css'
import ResearchResponseData from './components/ResearchResponseData'

type LayoutMode = 'fullscreen' | 'split'

function App() {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('fullscreen')
  const [isAnimating, setIsAnimating] = useState(false)
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

  return (
    <ErrorBoundary>
      <div className="app max-h-screen overflow-hidden w-screen flex flex-row items-start">
        {/* Left Panel - Research Form Container */}
        <div className={`
          h-screen flex flex-col justify-between
          transition-all duration-500 ease-in-out
          ${layoutMode === 'fullscreen' ? 'w-full' : 'w-[30%] overflow-y-auto'}
          ${isAnimating ? 'transform' : ''}
        `}>
          <header className="app-header bg-white/20 text-sm">
            <div className="app-header__content">
              <h1 className="app-title">AI Research Assistant</h1>
              <p className="app-subtitle">
                Get comprehensive research reports on any topic using AI-powered analysis
              </p>
            </div>
          </header>

          <main className="app-main">
            <ResearchFormContainer
              submitResearch={submitResearch}
              isLoading={isLoading}
              error={error}
              currentJob={currentJob}
              result={result}
              resetJob={handleTopicReset}
            />
          </main>

          <footer className="app-footer">
            <p>Powered by AI Research Crew</p>
          </footer>
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
