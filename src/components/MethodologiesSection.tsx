import { FlaskConical } from 'lucide-react';
import type { Methodology } from '../types/research';

interface MethodologiesSectionProps {
  methodologies: Methodology[];
}

export const MethodologiesSection = ({ methodologies }: MethodologiesSectionProps) => {
  if (!methodologies.length) return null;

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <FlaskConical className="w-5 h-5 text-purple-400" />
        Methodologies
      </h3>
      <div className="space-y-4">
        {methodologies.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-purple-500/30 transition"
          >
            <h4 className="font-medium text-white">{item.name}</h4>
            <p className="text-sm text-gray-400 mt-1">{item.description}</p>
            {item.use_cases && item.use_cases.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {item.use_cases.map((uc, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300"
                  >
                    {uc}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
