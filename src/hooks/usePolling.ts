import { useState, useCallback, useRef, useEffect } from 'react';
import type { UsePollingReturn } from '../types/research';

/**
 * Custom hook for managing polling operations with start/stop controls
 * Provides reusable polling logic with proper cleanup and memory leak prevention
 */
export const usePolling = (
    pollingFunction?: (jobId: string) => Promise<void>,
    options?: {
        interval?: number;
        shouldContinue?: (jobId: string) => boolean;
    }
): UsePollingReturn => {
    const [isPolling, setIsPolling] = useState(false);

    // Refs to store polling state
    const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const currentJobIdRef = useRef<string | null>(null);
    const intervalMs = options?.interval || 3000; // Default 3 seconds

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopPolling();
        };
    }, []);

    // Internal polling function
    const poll = useCallback(async () => {
        if (!isPolling || !pollingFunction || !currentJobIdRef.current) return;

        try {
            await pollingFunction(currentJobIdRef.current);

            // Check if we should continue polling
            const shouldContinue = options?.shouldContinue 
                ? options.shouldContinue(currentJobIdRef.current)
                : true;

            if (isPolling && shouldContinue) {
                timeoutIdRef.current = setTimeout(poll, intervalMs);
            } else {
                setIsPolling(false);
            }
        } catch (error) {
            // On error, stop polling
            setIsPolling(false);
            console.error('Polling error:', error);
        }
    }, [isPolling, pollingFunction, options, intervalMs]);

    // Start polling with a job ID
    const startPolling = useCallback((jobId: string) => {
        if (!pollingFunction) {
            console.warn('No polling function provided to usePolling hook');
            return;
        }

        // Stop any existing polling
        stopPolling();

        // Set up new polling
        currentJobIdRef.current = jobId;
        setIsPolling(true);

        // Start polling immediately
        poll();
    }, [poll, pollingFunction]);

    // Stop polling
    const stopPolling = useCallback(() => {
        setIsPolling(false);

        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
            timeoutIdRef.current = null;
        }

        currentJobIdRef.current = null;
    }, []);

    return {
        startPolling,
        stopPolling,
        isPolling,
    };
};

