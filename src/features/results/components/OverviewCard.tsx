import type { OverviewSection } from "../types/result.types";

interface OverviewCardProps {
  overview: OverviewSection;
}

export const OverviewCard = ({ overview }: OverviewCardProps) => {
  return (
    <div className="w-full mb-8">
      {overview.title && (
        <h3 className="text-xl font-semibold text-black mb-3">
          {overview.title}
        </h3>
      )}
      <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 text-lg text-gray-600 leading-relaxed shadow-sm">
        <p>{overview.content}</p>
      </div>
    </div>
  );
};
