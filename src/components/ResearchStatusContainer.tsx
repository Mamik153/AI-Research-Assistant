import { JobStatus } from './JobStatus';
import { ResearchResult } from './ResearchResult';
import type { ResearchJob, ResearchResult as ResearchResultType } from '../types/research';
import './ResearchStatusContainer.css';

interface ResearchStatusContainerProps {
    currentJob: ResearchJob | null;
    result: ResearchResultType | null;
    onNewResearch?: () => void;
}

/**
 * Container component that manages job status display and real-time updates
 * Handles the complete job lifecycle from submission to completion
 */
export const ResearchStatusContainer = ({ 
    currentJob, 
    result,
    onNewResearch 
}: ResearchStatusContainerProps) => {

    // Handle starting new research
    const handleNewResearch = () => {
        if (onNewResearch) {
            onNewResearch();
        }
    };

    // Show research result if completed and result is available
    if (currentJob?.status === 'completed' && result) {
        console.log('Showing ResearchResult component with result:', result);
        return (
            <div className="research-status-container">
                <ResearchResult
                    result={result}
                    onNewResearch={handleNewResearch}
                />
            </div>
        );
    }

    if (!currentJob) {
        return null;
    }

    const showNewResearchButton = currentJob.status === 'completed' || currentJob.status === 'failed';

    return (
        <div className="research-status-container">
            <JobStatus
                jobId={currentJob.jobId}
                status={currentJob.status}
                message={currentJob.message}
                createdAt={currentJob.createdAt}
            />
            
            {/* Additional status information */}
            <div className="research-status-container__info">
                <div className="research-status-container__topic">
                    <span className="research-status-container__label">Research Topic:</span>
                    <span className="research-status-container__topic-text">
                        {currentJob.topic}
                    </span>
                </div>
            </div>

            {/* Action buttons for completed/failed jobs */}
            {showNewResearchButton && (
                <div className="research-status-container__actions">
                    <button
                        onClick={handleNewResearch}
                        className="research-status-container__new-research-btn"
                    >
                        Start New Research
                    </button>
                </div>
            )}

            {/* Real-time status updates indicator */}
            {(currentJob.status === 'pending' || currentJob.status === 'running') && (
                <div className="research-status-container__live-indicator">
                    <div className="research-status-container__live-dot"></div>
                    <span>Live updates</span>
                </div>
            )}
        </div>
    );
};