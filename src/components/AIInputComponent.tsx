import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { MicrophoneIcon, ArrowUpIcon } from './icons';

interface AIInputComponentProps {
  onSubmit: (topic: string) => void;
  isLoading?: boolean;
  disabled: boolean;
  onPlusClick?: () => void;
  onMicClick?: () => void;
  placeholder?: string;
  className?: string;
  isAtBottom?: boolean;
  onPositionTransitionComplete?: () => void;
}

// Type definitions for Web Speech API
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  onstart: () => void;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface WindowWithSpeechRecognition extends Window {
  SpeechRecognition?: {
    new (): SpeechRecognition;
  };
  webkitSpeechRecognition?: {
    new (): SpeechRecognition;
  };
}

export function AIInputComponent({
  onSubmit,
  isLoading,
  disabled,
  onMicClick,
  placeholder = 'Ask anything...',
  className = '',
  isAtBottom = false,
  onPositionTransitionComplete,
}: AIInputComponentProps) {
  // State management
  const [value, setValue] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMultiLine, setIsMultiLine] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);

  // Ref for textarea height manipulation
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const baseHeightRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Ref for speech recognition
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const finalTranscriptRef = useRef<string>('');

  // Check for speech recognition support and initialize
  useEffect(() => {
    const windowWithSpeech = window as unknown as WindowWithSpeechRecognition;
    const SpeechRecognition = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSpeechSupported(true);
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsRecording(true);
        // Store the current textarea value as the base when starting a new recording session
        // Use the textarea ref to get the current value directly
        if (textareaRef.current) {
          finalTranscriptRef.current = textareaRef.current.value.trim();
        } else {
          finalTranscriptRef.current = '';
        }
      };
      
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
        
        if (finalTranscript) {
          // Append final transcript to the stored base value
          finalTranscriptRef.current = finalTranscriptRef.current 
            ? `${finalTranscriptRef.current} ${finalTranscript.trim()}` 
            : finalTranscript.trim();
          setValue(finalTranscriptRef.current);
        } else if (interimTranscript) {
          // Show interim results appended to the final transcript so far
          const displayValue = finalTranscriptRef.current 
            ? `${finalTranscriptRef.current} ${interimTranscript}` 
            : interimTranscript;
          setValue(displayValue);
        }
      };
      
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
        
        // Handle specific errors
        if (event.error === 'no-speech') {
          // User didn't speak, just stop recording
          setIsRecording(false);
        } else if (event.error === 'audio-capture') {
          // No microphone found
          alert('No microphone found. Please check your microphone settings.');
        } else if (event.error === 'not-allowed') {
          // Permission denied
          alert('Microphone permission denied. Please enable microphone access in your browser settings.');
        }
      };
      
      recognition.onend = () => {
        setIsRecording(false);
        // Keep the final transcript for the next recording session
      };
      
      recognitionRef.current = recognition;
    } else {
      setIsSpeechSupported(false);
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Mount animation
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Measure base height on mount
  useEffect(() => {
    if (textareaRef.current && baseHeightRef.current === 0) {
      // Temporarily disable transition to get accurate measurement
      const originalTransition = textareaRef.current.style.transition;
      textareaRef.current.style.transition = 'none';
      textareaRef.current.style.height = 'auto';
      
      // Force reflow to ensure accurate measurement
      textareaRef.current.offsetHeight;
      
      baseHeightRef.current = textareaRef.current.scrollHeight;
      textareaRef.current.style.transition = originalTransition;
    }
  }, []);

  // Determine multi-line state based on character count (20 characters threshold)
  useEffect(() => {
    const hasLineBreak = value.includes('\n');
    const shouldBeMultiLine = value.length >= 20 || hasLineBreak;
    
    if (shouldBeMultiLine !== isMultiLine) {
      setIsMultiLine(shouldBeMultiLine);
    }
  }, [value, isMultiLine]);

  // Auto-adjust textarea height based on content
  // Once in multi-line mode, let it grow naturally
  useEffect(() => {
    if (textareaRef.current) {
      // Temporarily disable transition for accurate measurement
      const originalTransition = textareaRef.current.style.transition;
      textareaRef.current.style.transition = 'none';
      
      // Reset height to get correct scrollHeight
      textareaRef.current.style.height = 'auto';
      
      // Force reflow
      textareaRef.current.offsetHeight;
      
      // Calculate new height, capped at max height of 100px
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.min(scrollHeight, 100);
      
      // Re-enable transition before setting new height
      textareaRef.current.style.transition = originalTransition;
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [value]);

  // Recalculate height after isMultiLine changes to account for width change
  // This ensures height is measured at the correct width (wider when buttons are absolute)
  useEffect(() => {
    if (textareaRef.current && value && isMultiLine) {
      // Use requestAnimationFrame to ensure layout has updated after isMultiLine change
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          const originalTransition = textareaRef.current.style.transition;
          textareaRef.current.style.transition = 'none';
          textareaRef.current.style.height = 'auto';
          textareaRef.current.offsetHeight; // Force reflow
          
          const scrollHeight = textareaRef.current.scrollHeight;
          const newHeight = Math.min(scrollHeight, 100);
          
          textareaRef.current.style.transition = originalTransition;
          textareaRef.current.style.height = `${newHeight}px`;
        }
      });
    }
  }, [isMultiLine, value]);

  // Handle text change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  // Handle keyboard interactions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter without Shift submits the message
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    // Shift+Enter allows new line (default textarea behavior)
  };

  // Handle button clicks
  const handleMicClick = () => {
    if (!isSpeechSupported) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      onMicClick?.();
      return;
    }
    
    if (isLoading || disabled) {
      return;
    }
    
    if (isRecording) {
      // Stop recording
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } else {
      // Start recording
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (error) {
          // Recognition might already be starting
          console.error('Error starting speech recognition:', error);
        }
      }
    }
    
    // Call the optional callback
    onMicClick?.();
  };

  const handleSubmit = () => {
    const trimmedValue = value.trim();
    if (trimmedValue && !isLoading && !disabled) {
      // Stop recording if active
      if (isRecording && recognitionRef.current) {
        recognitionRef.current.stop();
      }
      
      // Trigger submit animation
      setIsAnimating(true);
      
      // Call onSubmit callback
      onSubmit(trimmedValue);
      
      // Clear textarea and reset states after animation completes
      setTimeout(() => {
        setValue('');
        finalTranscriptRef.current = '';
        setIsAnimating(false);
        setIsMultiLine(false);
      }, 300);
    }
  };
  // Handle position transition complete callback
  useEffect(() => {
    if (isAtBottom && onPositionTransitionComplete) {
      const timer = setTimeout(() => {
        onPositionTransitionComplete();
      }, 500); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isAtBottom, onPositionTransitionComplete]);

  // Calculate positioning based on isAtBottom prop
  const getPositionStyles = () => {
    if (!isMounted) {
      return {
        position: 'absolute' as const,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%) translateY(8px)',
        opacity: 0,
      };
    }

    if (isAtBottom) {
      // Bottom position for chat mode - responsive padding
      return {
        position: 'fixed' as const,
        left: '50%',
        bottom: '16px',
        transform: 'translateX(-50%)',
        transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
      };
    }

    // Centered position for initial state
    return {
      position: 'absolute' as const,
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  return (
    <div
      ref={containerRef}
      className={`z-10 w-[90%] sm:w-[80%] md:w-full max-w-sm md:max-w-2xl px-3 sm:px-4 rounded-3xl bg-white shadow-lg ${
        isMounted ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      style={{
        ...getPositionStyles(),
        willChange: isAtBottom ? 'auto' : 'transform, opacity'
      }}
    >
      <motion.div 
        className="relative p-4 flex items-center"
        animate={{
          paddingBottom: isMultiLine ? '56px' : '16px'
        }}
        transition={{
          duration: 0.2,
          ease: 'easeOut'
        }}
      >
        {/* Textarea wrapper - expands when buttons are absolutely positioned */}
        <div className="flex-1 pr-2" style={{ minWidth: 0 }}>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label="Message input"
            className="w-full resize-none rounded-md py-2 px-[15px] outline-none overflow-y-auto focus-visible:ring-0 focus-visible:ring-none focus-visible:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed text-black"
            style={{ 
              maxHeight: '100px',
              transition: 'height 200ms ease-out'
            }}
            rows={1}
            disabled={isLoading || disabled}
          />
        </div>

        {/* Action buttons group - positioned at bottom-right */}
        <motion.div 
          className={`flex gap-2 shrink-0 ${isMultiLine ? 'absolute' : 'relative'}`}
          animate={{
            bottom: isMultiLine ? '16px' : 'auto',
            right: isMultiLine ? '16px' : 'auto'
          }}
          transition={{
            duration: 0,
            ease: 'easeOut'
          }}
        >
          {/* MicrophoneButton - min 44x44px for touch */}
          <button
            onClick={handleMicClick}
            className={`flex min-w-[44px] min-h-[44px] size-11 items-center justify-center rounded-full p-1 transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
              isRecording 
                ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                : 'bg-gray-100 hover:bg-gray-200 text-black'
            }`}
            aria-label={isRecording ? 'Stop voice input' : 'Start voice input'}
            aria-pressed={isRecording}
            type="button"
            disabled={isLoading || disabled || !isSpeechSupported}
            title={!isSpeechSupported ? 'Speech recognition not supported' : isRecording ? 'Stop recording' : 'Start voice input'}
          >
            <MicrophoneIcon className="w-5 h-5" />
          </button>

          {/* SubmitButton with dark background - min 44x44px for touch */}
          <button
            onClick={handleSubmit}
            className={`flex min-w-[44px] min-h-[44px] size-11 items-center justify-center rounded-full p-1 transition-all duration-200 bg-[#121212] text-white hover:bg-[#2a2a2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
              isAnimating ? 'scale-90 rotate-90' : 'hover:scale-105 rotate-0'
            }`}
            aria-label="Submit message"
            type="button"
            disabled={!value.trim() || isLoading || disabled}
          >
            <ArrowUpIcon className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
