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
                let existingIndex = -1;
                for (let i = prev.length - 1; i >= 0; i--) {
                    if (prev[i].type === 'assistant') {
                        existingIndex = i;
                        break;
                    }
                }

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
                    let existingIndex = -1;
                    for (let i = prev.length - 1; i >= 0; i--) {
                        if (prev[i].type === 'assistant') {
                            existingIndex = i;
                            break;
                        }
                    }

                    if (existingIndex >= 0) {
                        const existingMsg = prev[existingIndex];
                        if (existingMsg.researchJob?.status === 'failed' && existingMsg.researchJob?.message === error) {
                            return prev;
                        }

                        const updated = [...prev];
                        updated[existingIndex] = {
                            ...existingMsg,
                            researchJob: {
                                jobId: existingMsg.researchJob?.jobId || 'submission-failed',
                                status: 'failed',
                                message: error,
                                createdAt: existingMsg.researchJob?.createdAt || new Date().toISOString(),
                                topic: existingMsg.researchJob?.topic || 'Research Request',
                            }
                        };
                        return updated;
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
