import { useState, useEffect, useCallback } from 'react';
import type { ChatMessage } from '../types/chat.types';
import type { ResearchJob, ResearchResult } from '@/features/research';

interface UseChatMessagesReturn {
    chatMessages: ChatMessage[];
    addUserMessage: (topic: string) => void;
}

/**
 * Manages chat message state, syncing research job/result/error updates
 * into the message list. Extracted from App.tsx to separate concerns.
 */
export const useChatMessages = (
    currentJob: ResearchJob | null,
    result: ResearchResult | null,
    error: string | null,
): UseChatMessagesReturn => {
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

    // Add a user message to the chat
    const addUserMessage = useCallback((topic: string) => {
        const userMessage: ChatMessage = {
            id: `user-${Date.now()}`,
            type: 'user',
            content: topic,
            timestamp: new Date().toISOString(),
        };
        setChatMessages((prev) => [...prev, userMessage]);
    }, []);

    // Sync research job state with chat messages
    useEffect(() => {
        if (currentJob) {
            setChatMessages((prev) => {
                const existingIndex = prev.findIndex((m) => m.type === 'assistant');

                const assistantMessage: ChatMessage = {
                    id: existingIndex >= 0 ? prev[existingIndex].id : currentJob.jobId,
                    type: 'assistant',
                    content: '',
                    timestamp:
                        existingIndex >= 0
                            ? prev[existingIndex].timestamp
                            : currentJob.createdAt,
                    researchJob: currentJob,
                    researchResult: result || undefined,
                };

                if (existingIndex >= 0) {
                    const updated = [...prev];
                    updated[existingIndex] = assistantMessage;
                    return updated;
                } else {
                    return [...prev, assistantMessage];
                }
            });
        }
    }, [currentJob, result]);

    // Handle errors — add error messages to chat
    useEffect(() => {
        if (error) {
            console.error('Research error:', error);

            if (!currentJob) {
                setChatMessages((prev) => {
                    const lastMsg = prev[prev.length - 1];
                    if (
                        lastMsg?.researchJob?.status === 'failed' &&
                        lastMsg.researchJob.message === error
                    ) {
                        return prev;
                    }

                    const errorMessage: ChatMessage = {
                        id: `error-${Date.now()}`,
                        type: 'assistant',
                        content: '',
                        timestamp: new Date().toISOString(),
                        researchJob: {
                            jobId: 'submission-failed',
                            status: 'failed',
                            message: error,
                            createdAt: new Date().toISOString(),
                            topic: 'Research Request',
                        },
                    };

                    return [...prev, errorMessage];
                });
            }
        }
    }, [error, currentJob]);

    return { chatMessages, addUserMessage };
};
