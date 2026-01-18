interface ResearchSummaryProps {
    summary: string;
}

export const ResearchSummary = ({ summary }: ResearchSummaryProps) => {
    return (
        <div className="w-full mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">📝</span> Executive Summary
            </h3>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 text-lg text-gray-300 leading-relaxed shadow-lg">
                {summary}
            </div>
        </div>
    );
};
