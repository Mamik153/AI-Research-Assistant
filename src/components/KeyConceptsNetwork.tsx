import { Network } from 'lucide-react';
import type { KeyConcept } from '../types/research';

interface KeyConceptsNetworkProps {
  keyConcepts: KeyConcept[];
}

export const KeyConceptsNetwork = ({ keyConcepts }: KeyConceptsNetworkProps) => {
  if (!keyConcepts.length) return null;

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Network className="w-5 h-5 text-cyan-400" />
        Key Concepts
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {keyConcepts.map((concept, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-cyan-500/30 transition group"
          >
            <h4 className="font-medium text-white group-hover:text-cyan-300 transition">{concept.name}</h4>
            <p className="text-sm text-gray-400 mt-1">{concept.description}</p>
            {concept.related_concepts && concept.related_concepts.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {concept.related_concepts.map((rc, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-300"
                  >
                    {rc}
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
