import { JobStatus } from './JobStatus';
import { ResearchResult } from './ResearchResult';
import type { ResearchJob, ResearchResult as ResearchResultType } from '../types/research';
import LoadingAnimation from './LoadingAnimation';

interface ResearchResponseDataProps {
  isVisible: boolean;
  currentJob: ResearchJob | null;
  result: ResearchResultType | null;
  resetJob: () => void;
}

const ResearchResponseData = ({ isVisible, currentJob, result, resetJob }: ResearchResponseDataProps) => {
    
    // Don't render anything if not visible
    if (!isVisible) {
        return null;
    }
    
    return (
        <div className="w-full relative text-white">
            {currentJob && (
                <div className="space-y-4">
                    {/*<JobStatus 
                        jobId={currentJob.jobId}
                        status={currentJob.status}
                        message={currentJob.message}
                        createdAt={currentJob.createdAt}
                    />*/}
                    
                    {result ? (
                        <ResearchResult 
                            result={result}
                            onNewResearch={resetJob}
                        />
                    ) : (
                        <LoadingAnimation topic={currentJob?.topic || ''} />
                    )}
                </div>
            )}
            
            {!currentJob && (
                <div className="flex items-center justify-center p-4">
                    <p className="text-gray-400 text-base">
                        No research data available
                    </p>
                </div>
            )}
        </div>
    )
}

export default ResearchResponseData