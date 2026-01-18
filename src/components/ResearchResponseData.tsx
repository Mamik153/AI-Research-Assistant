
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

    console.log("currentJob: ", currentJob);
    console.log("result: ", result);

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

                    {currentJob.status === 'failed' ? (
                        <div className="bg-red-400/20 backdrop-blur-xl border border-red-400/50 rounded-2xl p-4 text-red-100">
                            <div className="font-semibold mb-1 text-white">
                                Research Failed
                            </div>
                            <div className="text-sm">
                                {currentJob.message || 'An unexpected error occurred during research generation.'}
                            </div>
                            {resetJob && (
                                <button
                                    className="mt-3 ml-auto text-sm flex bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl transition-colors duration-200"
                                    onClick={resetJob}
                                >
                                    Try Again
                                </button>
                            )}
                        </div>
                    ) : result ? (
                        <ResearchResult
                            result={result}
                            onNewResearch={resetJob}
                        />
                    ) : (
                        <LoadingAnimation
                            topic={currentJob?.topic || ''}
                            message={currentJob?.message}
                        />
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