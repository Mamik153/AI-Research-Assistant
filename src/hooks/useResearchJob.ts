import { useState, useCallback, useRef, useEffect } from 'react';
import type {
    UseResearchJobReturn,
    ResearchJob,
    ResearchResult,
    JobStatus,
    ResearchJobResponse,
    ApiError
} from '../types/research';
import { submitResearch, pollJobStatus, getResearchResult } from '../services/researchApi';

/**
 * Custom hook to manage research job lifecycle
 * Handles job submission, status tracking, and result retrieval
 */
export const useResearchJob = (): UseResearchJobReturn => {
    const [currentJob, setCurrentJob] = useState<ResearchJob | null>(null);
    const [result, setResult] = useState<ResearchResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Ref to store polling control
    const pollingControlRef = useRef<{ stop: () => void } | null>(null);

    // Cleanup polling on unmount
    useEffect(() => {
        return () => {
            if (pollingControlRef.current) {
                pollingControlRef.current.stop();
            }
        };
    }, []);

    // Handle status updates from polling
    const handleStatusUpdate = useCallback((statusResponse: ResearchJobResponse) => {
        console.log('Status update received:', statusResponse);

        setCurrentJob(prevJob => {
            if (!prevJob) return null;

            const updatedJob: ResearchJob = {
                ...prevJob,
                status: statusResponse.status as JobStatus,
                message: statusResponse.message,
            };

            console.log('Updated job:', updatedJob);

            // Handle completed job
            if (statusResponse.status === 'completed') {
                console.log('Job completed, fetching results...');
                setIsLoading(true);
                getResearchResult(statusResponse.job_id)
                    .then((resultResponse) => {
                        console.log('Result response:', resultResponse);
                        if (resultResponse.report || resultResponse.summary || (resultResponse.papers && resultResponse.papers.length > 0)) {
                            const researchResult: ResearchResult = {
                                jobId: resultResponse.jobId,
                                report: resultResponse.report,
                                summary: resultResponse.summary,
                                papers: resultResponse.papers,
                                keyInsights: resultResponse.key_insights,
                                completedAt: resultResponse.completed_at || new Date().toISOString(),
                                topic: prevJob.topic,
                            };
                            console.log('Setting result:', researchResult);
                            setResult(researchResult);
                            setError(null);
                        } else {
                            setError('Research completed but no report was generated');
                        }
                    })
                    .catch((err) => {
                        console.error('Error fetching results:', err);
                        const errorMessage = err && typeof err === 'object' && 'message' in err
                            ? (err as ApiError).message
                            : 'Failed to retrieve research results';
                        setError(errorMessage);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            }

            // Handle failed job
            if (statusResponse.status === 'failed') {
                setError(statusResponse.message || 'Research job failed');
                setIsLoading(false);
            }

            return updatedJob;
        });
    }, []);

    // Submit a new research job
    const submitResearchJob = useCallback(async (topic: string): Promise<void> => {
        try {
            setIsLoading(true);
            setError(null);
            setResult(null);

            // Stop any existing polling
            if (pollingControlRef.current) {
                pollingControlRef.current.stop();
            }

            // Submit the research job
            const jobResponse = await submitResearch(topic);

            // Create job object
            const job: ResearchJob = {
                jobId: jobResponse.job_id,
                status: 'submitting',
                message: jobResponse.message,
                createdAt: jobResponse.created_at,
                topic: topic.trim(),
            };

            setCurrentJob(job);

            // Start polling for status updates
            pollingControlRef.current = pollJobStatus(jobResponse.job_id, handleStatusUpdate);

        } catch (err) {
            const errorMessage = err && typeof err === 'object' && 'message' in err
                ? (err as ApiError).message
                : 'Failed to submit research job';
            setError(errorMessage);
            setCurrentJob(null);
        } finally {
            setIsLoading(false);
        }
    }, [handleStatusUpdate]);

    // Reset job state for new research
    const resetJob = useCallback(() => {
        // Stop polling
        if (pollingControlRef.current) {
            pollingControlRef.current.stop();
            pollingControlRef.current = null;
        }

        // Reset all state
        setCurrentJob(null);
        setResult(null);
        setError(null);
        setIsLoading(false);
    }, []);

    return {
        submitResearch: submitResearchJob,
        currentJob,
        result,
        error,
        isLoading,
        resetJob,
    };
};