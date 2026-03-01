import { useState, useCallback, useRef, useEffect } from 'react';
import type {
    UseResearchJobReturn,
    ResearchJob,
    ResearchResult,
    JobStatus,
    ResearchJobResponse,
    ResearchResultResponse,
    ApiError
} from '../types/research.types';
import { submitResearch, pollJobStatus, streamJobStatus, getResearchResult } from '../services/researchApi';
import { parseSummary, buildParsedSummaryFromFlat } from '@/features/results';
import { config } from '@/shared/config/env';

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
        setCurrentJob(prevJob => {
            if (!prevJob) return null;

            const updatedJob: ResearchJob = {
                ...prevJob,
                status: statusResponse.status as JobStatus,
                message: statusResponse.message,
                chainOfThought: statusResponse.chain_of_thought ?? prevJob.chainOfThought,
            };



            // Handle completed job
            if (statusResponse.status === 'completed') {
                setIsLoading(true);
                getResearchResult(statusResponse.job_id)
                    .then((resultResponse) => {
                        if (resultResponse.report || resultResponse.summary || (resultResponse.papers && resultResponse.papers.length > 0)) {
                            const parsed = parseSummary(resultResponse.summary);
                            const hasFlatStructure =
                                (resultResponse.key_insights?.length ?? 0) > 0 ||
                                (resultResponse.generated_diagrams?.length ?? 0) > 0 ||
                                resultResponse.structured_sections != null;
                            const parsedSummary = parsed ?? (hasFlatStructure
                                ? buildParsedSummaryFromFlat(
                                    resultResponse.summary,
                                    resultResponse.key_insights,
                                    resultResponse.generated_diagrams,
                                    resultResponse.structured_sections,
                                    resultResponse.section_confidence,
                                    resultResponse.section_images
                                )
                                : undefined);
                            const summaryText = parsedSummary?.summary ?? resultResponse.summary;
                            const keyInsights = parsedSummary?.key_insights?.length
                                ? parsedSummary.key_insights
                                : resultResponse.key_insights;
                            const generatedDiagrams = parsedSummary?.generated_diagrams?.length
                                ? parsedSummary.generated_diagrams
                                : resultResponse.generated_diagrams;
                            const sectionConfidence = parsedSummary?.section_confidence ?? resultResponse.section_confidence;
                            const sectionImages = parsedSummary?.section_images ?? resultResponse.section_images;
                            const researchResult: ResearchResult = {
                                jobId: resultResponse.jobId,
                                report: resultResponse.report,
                                summary: summaryText,
                                parsedSummary: parsedSummary ?? undefined,
                                papers: resultResponse.papers,
                                keyInsights,
                                generatedDiagrams,
                                completedAt: resultResponse.completed_at || new Date().toISOString(),
                                topic: prevJob.topic,
                                sectionConfidence,
                                sectionImages,
                            };

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

    const handleStreamingResult = useCallback((resultResponse: ResearchResultResponse) => {
        setCurrentJob(prevJob => {
            if (!prevJob) return null;

            if (resultResponse.report || resultResponse.summary || (resultResponse.papers && resultResponse.papers.length > 0)) {
                const parsed = parseSummary(resultResponse.summary);
                const hasFlatStructure =
                    (resultResponse.key_insights?.length ?? 0) > 0 ||
                    (resultResponse.generated_diagrams?.length ?? 0) > 0 ||
                    resultResponse.structured_sections != null;
                const parsedSummary = parsed ?? (hasFlatStructure
                    ? buildParsedSummaryFromFlat(
                        resultResponse.summary,
                        resultResponse.key_insights,
                        resultResponse.generated_diagrams,
                        resultResponse.structured_sections,
                        resultResponse.section_confidence,
                        resultResponse.section_images
                    )
                    : undefined);
                const summaryText = parsedSummary?.summary ?? resultResponse.summary;
                const keyInsights = parsedSummary?.key_insights?.length
                    ? parsedSummary.key_insights
                    : resultResponse.key_insights;
                const generatedDiagrams = parsedSummary?.generated_diagrams?.length
                    ? parsedSummary.generated_diagrams
                    : resultResponse.generated_diagrams;
                const sectionConfidence = parsedSummary?.section_confidence ?? resultResponse.section_confidence;
                const sectionImages = parsedSummary?.section_images ?? resultResponse.section_images;
                const researchResult: ResearchResult = {
                    jobId: resultResponse.jobId || prevJob.jobId || '',
                    report: resultResponse.report,
                    summary: summaryText,
                    parsedSummary: parsedSummary ?? undefined,
                    papers: resultResponse.papers,
                    keyInsights,
                    generatedDiagrams,
                    completedAt: resultResponse.completed_at || new Date().toISOString(),
                    topic: prevJob.topic,
                    sectionConfidence,
                    sectionImages,
                };

                setResult(researchResult);
                setError(null);

                // Mark job as completed successfully
                return { ...prevJob, status: 'completed' };
            } else {
                setError('Research completed but no report was generated');
                return { ...prevJob, status: 'failed', message: 'Research completed but no report was generated' };
            }
        });
        setIsLoading(false);
    }, []);

    const handleStreamingFinding = useCallback((finding: string) => {
        setCurrentJob(prevJob => {
            if (!prevJob) return null;

            return {
                ...prevJob,
                chainOfThought: [...(prevJob.chainOfThought || []), finding],
            };
        });
    }, []);

    // Submit a new research job
    const submitResearchJob = useCallback(async (topic: string): Promise<void> => {
        try {
            setIsLoading(true);
            setError(null);
            setResult(null);

            // Optimistic job to show loading state immediately
            const optimisticJob: ResearchJob = {
                jobId: `optimistic-${Date.now()}`,
                status: 'submitting',
                message: 'Initializing research...',
                createdAt: new Date().toISOString(),
                topic: topic.trim(),
            };
            setCurrentJob(optimisticJob);

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
                chainOfThought: []
            };

            setCurrentJob(job);

            // Start streaming (or polling as fallback if dynamic is disabled)
            if (config.useDynamicUI) {
                const streamControl = streamJobStatus(
                    jobResponse.job_id,
                    handleStatusUpdate,
                    handleStreamingFinding,
                    handleStreamingResult,
                    (errorMsg) => {
                        // On error, fallback to polling
                        console.warn(`Stream closed or failed (${errorMsg}), falling back to polling...`);
                        pollingControlRef.current = pollJobStatus(jobResponse.job_id, handleStatusUpdate);
                    }
                );
                pollingControlRef.current = streamControl;
            } else {
                pollingControlRef.current = pollJobStatus(jobResponse.job_id, handleStatusUpdate);
            }

        } catch (err) {
            const errorMessage = err && typeof err === 'object' && 'message' in err
                ? (err as ApiError).message
                : 'Failed to submit research job';
            setError(errorMessage);
            setCurrentJob(null);
        } finally {
            setIsLoading(false);
        }
    }, [handleStatusUpdate, handleStreamingFinding, handleStreamingResult]);

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