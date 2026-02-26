import type { KeyConcept } from "../types/result.types";

interface KeyConceptsNetworkProps {
  keyConcepts: KeyConcept[];
}

export const KeyConceptsNetwork = ({
  keyConcepts,
}: KeyConceptsNetworkProps) => {
  if (!keyConcepts.length) return null;

  return (
    <div className="w-full mb-8">
      <h3 className="text-2xl font-semibold text-black mb-4 flex items-center gap-2">
        Key Concepts
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {keyConcepts.map((concept, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white/40 shadow-sm transition group"
          >
            <h4 className="font-medium text-xl text-black transition">
              {concept.name}
            </h4>
            <p className="text-sm text-gray-400 mt-2 text-lg">
              {concept.description}
            </p>
            {concept.related_concepts &&
              concept.related_concepts.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {concept.related_concepts.map((rc, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 text-lg"
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
