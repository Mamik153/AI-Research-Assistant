import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import type { ResearchPaper } from '../types/research';
import { PaperCard } from './PaperCard';
import { AbstractModal } from './AbstractModal';

interface PapersGridProps {
    papers: ResearchPaper[];
}

export const PapersGrid = ({ papers }: PapersGridProps) => {
    const [selectedPaperIndex, setSelectedPaperIndex] = useState<number | null>(null);

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
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-purple-100" />
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
                hasNext={selectedPaperIndex !== null && selectedPaperIndex < papers.length - 1}
                hasPrev={selectedPaperIndex !== null && selectedPaperIndex > 0}
            />
        </div>
    );
};
