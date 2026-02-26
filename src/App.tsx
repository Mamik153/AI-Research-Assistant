import { useState, useEffect, useCallback } from "react";
import { ErrorBoundary } from "@/shared/components";
import { useResearchJob } from "@/features/research";
import { AIInputComponent } from "@/features/research";
import { ChatContainer } from "@/features/chat";
import "./App.css";
import type { LayoutMode } from "@/shared/types";
import type { ChatMessage } from "@/features/chat/types/chat.types";

function App() {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("centered");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  // Lift the research job state to App level
  const { submitResearch, isLoading, error, currentJob, result, resetJob } =
    useResearchJob();

  // Handle research topic submission
  const handleSubmit = useCallback(
    (topic: string) => {
      // 1. Set transitioning flag
      setIsTransitioning(true);

      // 2. Change layout mode to chat (triggers animation)
      setLayoutMode("chat");

      // 3. Add user message to chat
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        type: "user",
        content: topic,
        timestamp: new Date().toISOString(),
      };
      setChatMessages((prev) => [...prev, userMessage]);

      // 4. Submit research job
      submitResearch(topic);

      // 5. Reset transitioning flag after animation
      //setTimeout(() => setIsTransitioning(false), 500);
    },
    [submitResearch],
  );

  // Handle position transition complete
  const handlePositionTransitionComplete = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  // Reset research: clear job, messages, and return to centered layout so user can start fresh
  const handleReset = useCallback(() => {
    resetJob();
    setChatMessages([]);
    setLayoutMode("centered");
  }, [resetJob]);

  // Once we have a job, transition is done — show chat (loading/result). Input is already hidden.
  useEffect(() => {
    if (currentJob) {
      setIsTransitioning(false);
    }
  }, [currentJob]);

  // Sync research job state with chat messages
  useEffect(() => {
    if (currentJob) {
      setChatMessages((prev) => {
        // Check if assistant message already exists for this job
        const existingIndex = prev.findIndex(
          (m) =>
            m.type === "assistant" && m.researchJob?.jobId === currentJob.jobId,
        );

        const assistantMessage: ChatMessage = {
          id: currentJob.jobId,
          type: "assistant",
          content: "",
          timestamp: currentJob.createdAt,
          researchJob: currentJob,
          researchResult: result || undefined,
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
      console.error("Research error:", error);

      // If there's an error but no current job, it means submission failed
      // We need to show this error in the chat
      if (!currentJob) {
        setChatMessages((prev) => {
          // Check if the last message is already this error to avoid duplicates
          const lastMsg = prev[prev.length - 1];
          if (
            lastMsg?.researchJob?.status === "failed" &&
            lastMsg.researchJob.message === error
          ) {
            return prev;
          }

          const errorMessage: ChatMessage = {
            id: `error-${Date.now()}`,
            type: "assistant",
            content: "",
            timestamp: new Date().toISOString(),
            researchJob: {
              jobId: "submission-failed",
              status: "failed",
              message: error,
              createdAt: new Date().toISOString(),
              topic: "Research Request",
            },
          };

          return [...prev, errorMessage];
        });
      }
    }
  }, [error, currentJob]);

  // Placeholder handlers for future features
  const handlePlusClick = useCallback(() => {
    // console.log('Plus button clicked')
  }, []);

  const handleMicClick = useCallback(() => {
    // console.log('Microphone button clicked')
  }, []);

  return (
    <ErrorBoundary>
      <div className="h-screen w-full overflow-hidden relative app bg-[#09090b] text-gray-200">
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
        <header className="absolute top-0 left-0 right-0 z-50 p-6 flex items-center pointer-events-none w-full bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-2 max-w-3xl mx-auto w-full">
            <img
              src="/logo1.png"
              alt="Logo"
              className="h-8 w-auto object-contain rounded-full"
            />
            <p className="font-semibold text-white/90 tracking-wide">
              SlickResearch
            </p>
          </div>
        </header>

        {/* Chat Container */}
        <div
          className="absolute top-0 left-0 right-0 z-10"
          style={{ bottom: chatMessages.length === 0 ? "120px" : "0" }}
        >
          <ChatContainer
            topic={currentJob?.topic}
            isTransitioning={isTransitioning}
            messages={chatMessages}
            isVisible={layoutMode === "chat"}
            onReset={handleReset}
            className="h-full"
          />
        </div>

        {/* AI Input Component - only visible on initial load and after "Try New Research" */}
        {!currentJob && !result && (
          <AIInputComponent
            onSubmit={handleSubmit}
            onPlusClick={handlePlusClick}
            onMicClick={handleMicClick}
            placeholder="Enter a topic to research"
            disabled={isLoading}
            isAtBottom={layoutMode === "chat"}
            onPositionTransitionComplete={handlePositionTransitionComplete}
            isLoading={isLoading}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
