interface KeyInsightsProps {
  insights: string[];
}

export const KeyInsights = ({ insights }: KeyInsightsProps) => {
  if (!insights || insights.length === 0) return null;

  return (
    <div className="w-full mb-8">
      <h3 className="text-xl font-semibold text-black mb-4 flex items-center gap-2">
        Key Insights
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight: string, idx: number) => (
          <div
            key={idx}
            className="group p-5 rounded-2xl bg-white/40 shadow-sm transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-yellow-500/10 transition-colors"></div>
            <div className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 font-bold text-sm border border-yellow-500/20">
                {idx + 1}
              </span>
              <p className="text-gray-800 transition-colors leading-relaxed text-lg">
                {insight}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
