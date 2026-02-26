import { useState } from "react";

import type { ResearchPaper } from "../types/paper.types";
import { PaperCard } from "./PaperCard";
import { AbstractModal } from "@/shared/components";

interface PapersGridProps {
  papers: ResearchPaper[];
}

export const PapersGrid = ({ papers }: PapersGridProps) => {
  const [selectedPaperIndex, setSelectedPaperIndex] = useState<number | null>(
    null,
  );

  const handleNext = () => {
    if (selectedPaperIndex !== null && selectedPaperIndex < papers.length - 1) {
      setSelectedPaperIndex(selectedPaperIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedPaperIndex !== null && selectedPaperIndex > 0) {
      setSelectedPaperIndex(selectedPaperIndex - 1);
    }
  };

  if (!papers || papers.length === 0) return null;

  return (
    <div className="w-full mb-12">
      <h3 className="text-2xl font-semibold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mb-4 flex items-center gap-2">
        References & Source Papers
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {papers.map((paper, idx) => (
          <PaperCard
            key={idx}
            paper={paper}
            index={idx}
            onReadAbstract={() => setSelectedPaperIndex(idx)}
          />
        ))}
      </div>

      <AbstractModal
        paper={selectedPaperIndex !== null ? papers[selectedPaperIndex] : null}
        isOpen={selectedPaperIndex !== null}
        onClose={() => setSelectedPaperIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
        hasNext={
          selectedPaperIndex !== null && selectedPaperIndex < papers.length - 1
        }
        hasPrev={selectedPaperIndex !== null && selectedPaperIndex > 0}
      />
    </div>
  );
};
