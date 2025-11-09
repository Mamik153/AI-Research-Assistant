import { JobStatus } from './JobStatus';
import { ResearchResult } from './ResearchResult';
import type { ResearchJob, ResearchResult as ResearchResultType } from '../types/research';

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
        <div className={`
            h-full w-full relative text-white
            transition-all duration-500 ease-in-out
            ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
        `}>
            {currentJob && (
                <div className="space-y-6">
                    <JobStatus 
                        jobId={currentJob.jobId}
                        status={currentJob.status}
                        message={currentJob.message}
                        createdAt={currentJob.createdAt}
                    />
                    
                    {result && (
                        <ResearchResult 
                            result={result}
                            onNewResearch={resetJob}
                        />
                    )}
                </div>
            )}
            
            {!currentJob && (
                <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400 text-lg">
                        Submit a research topic to see results here
                    </p>
                </div>
            )}
        </div>
    )
}

export default ResearchResponseData