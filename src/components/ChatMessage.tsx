import { memo } from 'react';
import { motion } from 'motion/react';
import type { ChatMessage as ChatMessageType } from '../types/research';
import ResearchResponseData from './ResearchResponseData';

interface ChatMessageProps {
  message: ChatMessageType;
  isLatest: boolean;
}

export const ChatMessage = memo(function ChatMessage({ message }: ChatMessageProps) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (message.type === 'user') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex justify-end mb-3 sm:mb-4"
      >
        <div className="flex flex-col items-end max-w-[95%] sm:max-w-[85%] md:max-w-[70%]">
          <div className="bg-blue-500 text-white rounded-2xl rounded-tr-sm px-3 py-2 sm:px-4 shadow-sm">
            <p className="text-sm sm:text-base">{message.content}</p>
          </div>
          <span className="text-xs text-gray-400 mt-1">
            {formatTimestamp(message.timestamp)}
          </span>
        </div>
      </motion.div>
    );
  }

  // Assistant message
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut', delay: 0.05 }}
      className="flex justify-start mb-3 sm:mb-4"
    >
      <div className="flex flex-col items-start max-w-[95%] sm:max-w-[90%] md:max-w-[85%] w-full mx-auto">
        <div className="w-full overflow-hidden mx-auto">
          <ResearchResponseData
            isVisible={true}
            currentJob={message.researchJob || null}
            result={message.researchResult || null}
            resetJob={() => {}}
          />
        </div>
        <span className="text-xs text-gray-400 mt-1">
          {formatTimestamp(message.timestamp)}
        </span>
      </div>
    </motion.div>
  );
});
