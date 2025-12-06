import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import type { ChatMessage as ChatMessageType } from '../types/research';
import { ChatMessage } from './ChatMessage';
import LoadingAnimation from './LoadingAnimation';

interface ChatContainerProps {
  messages: ChatMessageType[];
  isVisible: boolean;
  className?: string;
  isTransitioning?: boolean;
  topic?: string;
}

export function ChatContainer({ messages, isVisible, isTransitioning, className = '', topic }: ChatContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (bottomRef.current && isVisible) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
      className={`overflow-y-auto px-3 py-4 sm:px-4 sm:py-6 ${className}`}
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#cbd5e0 transparent'
      }}
    >
      {isTransitioning || messages.length === 0 ? ( // Show loading animation while transitioning
        null
      ) : (
        <div className="max-w-4xl mx-auto">
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              isLatest={index === messages.length - 1}
            />
          ))}
          <div ref={bottomRef} />
        </div>
      )
      }
    </motion.div>
  );
}
