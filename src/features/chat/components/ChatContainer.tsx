import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import type { ChatMessage as ChatMessageType } from "../types/chat.types";
import { ChatMessage } from "./ChatMessage";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

interface ChatContainerProps {
  messages: ChatMessageType[];
  isVisible: boolean;
  className?: string;
  isTransitioning?: boolean;
  topic?: string;
  onReset?: () => void;
}

export function ChatContainer({
  messages,
  isVisible,
  className = "",
  onReset,
}: ChatContainerProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (bottomRef.current && isVisible) {
      // Use a small timeout to allow the DOM to render the new message before scrolling
      setTimeout(() => {
        if (bottomRef.current) {
          bottomRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }, 50);
    }
  }, [messages.length, isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
      className={`h-full ${className}`}
    >
      <ScrollArea className="h-full px-3 py-4 sm:px-4 sm:py-6 sm:pb-0">
        {messages.length === 0 ? null : (
          <div className="max-w-4xl mx-auto">
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                isLatest={index === messages.length - 1}
                onReset={onReset}
              />
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </ScrollArea>
    </motion.div>
  );
}
