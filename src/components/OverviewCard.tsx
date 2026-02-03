import type { OverviewSection } from '../types/research';

interface OverviewCardProps {
  overview: OverviewSection;
}

export const OverviewCard = ({ overview }: OverviewCardProps) => {
  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6 shadow-lg">
      {overview.title && (
        <h3 className="text-lg font-semibold text-white mb-3">{overview.title}</h3>
      )}
      <p className="text-gray-300 leading-relaxed">{overview.content}</p>
    </div>
  );
};
