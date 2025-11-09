import { useCallback } from 'react';
import { ResearchForm } from './ResearchForm';
import { ResearchStatusContainer } from './ResearchStatusContainer';
import type { UseResearchJobReturn } from '../types/research';
import './ResearchFormContainer.css';

interface ResearchFormContainerProps {
    submitResearch: UseResearchJobReturn['submitResearch'];
    isLoading: UseResearchJobReturn['isLoading'];
    error: UseResearchJobReturn['error'];
    currentJob: UseResearchJobReturn['currentJob'];
    result: UseResearchJobReturn['result'];
    resetJob: UseResearchJobReturn['resetJob'];
}

/**
 * Container component that integrates ResearchForm with API services
 * Handles form submission, loading states, and error management
 */
export const ResearchFormContainer = ({
    submitResearch,
    isLoading,
    error,
    currentJob,
    result,
    resetJob
}: ResearchFormContainerProps) => {

    // Handle form submission
    const handleSubmit = useCallback(async (topic: string) => {
        try {
            await submitResearch(topic);
        } catch (err) {
            // Error is handled by the useResearchJob hook
            console.error('Failed to submit research:', err);
        }
    }, [submitResearch]);

    // Determine if form should be disabled
    const isDisabled = currentJob?.status === 'pending' ||
        currentJob?.status === 'running' ||
        currentJob?.status === 'completed';

    console.log("currentJob status: ", currentJob);
    console.log("result: ", result);

    return (
        <div className="research-form-container">
            <ResearchForm
                onSubmit={handleSubmit}
                isLoading={isLoading}
                disabled={isDisabled}
            />

            {/* Real-time job status updates */}
            {/* <ResearchStatusContainer
                currentJob={currentJob}
                result={result}
                onNewResearch={resetJob}
            />*/}

            {error && (
                <div className="research-form-container__error" role="alert">
                    <div className="research-form-container__error-title">
                        Submission Failed
                    </div>
                    <div className="research-form-container__error-message">
                        {error}
                    </div>
                    <button
                        className="research-form-container__retry-button"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
};