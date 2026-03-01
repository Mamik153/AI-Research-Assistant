import { ResearchResult } from "@/features/results";
import type {
  ResearchJob,
  ResearchResult as ResearchResultType,
} from "@/features/research";
import { LoadingAnimation } from "./LoadingAnimation";

interface ResearchResponseDataProps {
  isVisible: boolean;
  currentJob: ResearchJob | null;
  result: ResearchResultType | null;
}

export const ResearchResponseData = ({
  isVisible,
  currentJob,
  result,
}: ResearchResponseDataProps) => {
  // Don't render anything if not visible
  if (!isVisible) {
    return null;
  }

  // console.log(currentJob);

  return (
    <div className="w-full relative text-white mt-20">
      {currentJob && (
        <div className="space-y-4">
          {currentJob.status !== "completed" &&
          currentJob.status !== "failed" ? (
            <LoadingAnimation
              chainOfThought={currentJob?.chainOfThought}
              topic={currentJob?.topic}
              message={currentJob?.message}
            />
          ) : null}
          {currentJob.status === "failed" ? (
            <div className="bg-red-400/20 backdrop-blur-xl border border-red-400/50 rounded-2xl p-4 text-red-100">
              <div className="font-semibold mb-1 text-white">
                Research Failed
              </div>
              <div className="text-sm">
                {currentJob.message ||
                  "An unexpected error occurred during research generation."}
              </div>
              <button
                className="mt-3 ml-auto text-sm flex bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl transition-colors duration-200"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : null}
          {currentJob?.status === "completed" ? (
            <ResearchResult result={result} />
          ) : null}
        </div>
      )}

      {!currentJob && (
        <div className="flex items-center justify-center p-4">
          <p className="text-gray-400 text-base">No research data available</p>
        </div>
      )}
    </div>
  );
};
