interface ResearchSummaryProps {
  summary: string;
}

export const ResearchSummary = ({ summary }: ResearchSummaryProps) => {
  return (
    <div className="w-full mb-8">
      <h3 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
        Executive Summary
      </h3>
      <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 text-lg text-gray-600 leading-relaxed shadow-sm">
        <p>{summary}</p>
      </div>
    </div>
  );
};
