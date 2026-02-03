import { Briefcase } from 'lucide-react';
import type { ApplicationItem } from '../types/research';

interface ApplicationsSectionProps {
  applications: ApplicationItem[];
}

export const ApplicationsSection = ({ applications }: ApplicationsSectionProps) => {
  if (!applications.length) return null;

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-blue-400" />
        Applications
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {applications.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-blue-500/30 transition group"
          >
            <h4 className="font-medium text-white group-hover:text-blue-300 transition">{item.title}</h4>
            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
            {item.industry && (
              <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                {item.industry}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
