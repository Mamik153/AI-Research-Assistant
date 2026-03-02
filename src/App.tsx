import { useState, useEffect, useCallback } from "react";
import { ErrorBoundary } from "@/shared/components";
import { useResearchJob } from "@/features/research";
import { AIInputComponent } from "@/features/research";
import { ChatContainer, useChatMessages } from "@/features/chat";
import { Toaster } from "sonner";
import "./App.css";
import type { LayoutMode } from "@/shared/types";

function App() {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("centered");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { submitResearch, isLoading, error, currentJob, result } =
    useResearchJob();
  const { chatMessages, addUserMessage } = useChatMessages(
    currentJob,
    result,
    error,
  );

  // Handle research topic submission
  const handleSubmit = useCallback(
    (topic: string) => {
      setIsTransitioning(true);
      setLayoutMode("chat");
      addUserMessage(topic);
      submitResearch(topic);
    },
    [submitResearch, addUserMessage],
  );

  // Handle position transition complete
  const handlePositionTransitionComplete = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  // Once we have a job, transition is done
  useEffect(() => {
    if (currentJob) {
      setIsTransitioning(false);
    }
  }, [currentJob]);

  return (
    <ErrorBoundary>
      <div className="h-screen w-full overflow-hidden relative app bg-[#09090b] text-gray-200">
        {/* Skip to main content - visible on focus for keyboard/screen reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:p-4 focus:bg-white focus:text-gray-900 focus:font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Skip to main content
        </a>

        {/* Animated AI Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div
            className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen"
            style={{
              animation: "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }}
          />
          <div
            className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px] mix-blend-screen"
            style={{
              animation: "pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite 2s",
            }}
          />
          <div
            className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-indigo-600/20 blur-[120px] mix-blend-screen"
            style={{
              animation: "pulse 12s cubic-bezier(0.4, 0, 0.6, 1) infinite 4s",
            }}
          />
        </div>

        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-50 flex items-center pointer-events-none w-full bg-white/5 backdrop-blur-md pt-[calc(1.5rem+var(--safe-area-inset-top))] pb-6 px-4 sm:px-6">
          <div className="flex items-center gap-2 max-w-3xl mx-auto w-full">
            <img
              src="/logo1.png"
              alt="SlickResearch logo"
              className="h-8 w-auto object-contain rounded-full"
            />
            <h1 className="font-semibold text-white/90 tracking-wide text-xl">
              SlickResearch
            </h1>
          </div>
        </header>

        {/* Main content: chat and input */}
        <main id="main-content" className="contents" aria-label="Main content">
          {/* Chat Container */}
          <div
            className="absolute top-0 left-0 right-0 z-10"
            style={{
              bottom:
                chatMessages.length === 0 ? "var(--input-bar-offset)" : "0",
            }}
          >
            <ChatContainer
              topic={currentJob?.topic}
              isTransitioning={isTransitioning}
              messages={chatMessages}
              isVisible={layoutMode === "chat"}
              className="h-full"
            />
          </div>

          {/* AI Input Component - only visible on initial load and after "Try New Research" */}
          {!currentJob && !result && (
            <AIInputComponent
              onSubmit={handleSubmit}
              placeholder="Enter a topic to research"
              disabled={isLoading}
              isAtBottom={layoutMode === "chat"}
              onPositionTransitionComplete={handlePositionTransitionComplete}
              isLoading={isLoading}
            />
          )}
        </main>
        <Toaster
          theme="dark"
          position="bottom-right"
          richColors
          offset={{
            bottom: "var(--input-bar-offset)",
            right: "max(1rem, var(--safe-area-inset-right))",
          }}
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
