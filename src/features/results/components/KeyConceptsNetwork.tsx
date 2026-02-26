import type { KeyConcept } from "../types/result.types";
import { motion } from "motion/react";

interface KeyConceptsNetworkProps {
  keyConcepts: KeyConcept[];
}

export const KeyConceptsNetwork = ({
  keyConcepts,
}: KeyConceptsNetworkProps) => {
  if (!keyConcepts.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.9 }}
      className="w-full mb-8"
    >
      <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mb-4 flex items-center gap-2">
        Key Concepts
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {keyConcepts.map((concept, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-sm hover:bg-white/10 transition group"
          >
            <h4 className="font-medium text-xl text-white/90 transition">
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
                      className="text-xs px-2 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-lg"
                    >
                      {rc}
                    </span>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};
