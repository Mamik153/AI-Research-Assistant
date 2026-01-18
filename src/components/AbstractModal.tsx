import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Calendar, Users, ExternalLink } from 'lucide-react';
import type { ResearchPaper } from '../types/research';

interface AbstractModalProps {
    paper: ResearchPaper | null;
    isOpen: boolean;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    hasNext: boolean;
    hasPrev: boolean;
}

export const AbstractModal = ({
    paper,
    isOpen,
    onClose,
    onNext,
    onPrev,
    hasNext,
    hasPrev
}: AbstractModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight' && hasNext) onNext();
            if (e.key === 'ArrowLeft' && hasPrev) onPrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, hasNext, hasPrev, onClose, onNext, onPrev]);

    // Handle click outside
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    // Format date if possible
    const formattedDate = paper?.published
        ? new Date(paper.published).toLocaleDateString()
        : 'Unknown Date';

    return (
        <AnimatePresence>
            {isOpen && paper && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleBackdropClick}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        ref={modalRef}
                        layoutId={`paper-${paper.pdf_url}`} // Optional: for shared layout animation if we want
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="relative w-full max-w-3xl max-h-[85vh] flex flex-col bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden"
                    >

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-700/80 rounded-full transition-colors backdrop-blur-md"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex flex-col h-full overflow-hidden">
                            {/* Header Section */}
                            <div className="p-6 pb-4 border-b border-gray-800 bg-gray-900/50">

                                <div className="flex items-start gap-4">
                                    {/* Header Gradient */}
                                    <div className="h-10 w-1.5 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80" />
                                    <h2 className="text-2xl font-bold text-gray-100 leading-tight mb-3 pr-8">
                                        {paper.title}
                                    </h2>
                                </div>


                                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                    <div className="flex items-start gap-2">
                                        <Users className="w-5 h-5 text-blue-400 mt-0.5" />
                                        <span>{paper.authors.length > 0 ? paper.authors.join(', ') : 'Unknown Authors'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-purple-400" />
                                        <span>{formattedDate}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                                <div className="prose prose-invert max-w-none">
                                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Abstract</h3>
                                    <p className="text-gray-300 leading-relaxed whitespace-pre-line text-base">
                                        {paper.summary}
                                    </p>
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="p-4 border-t border-gray-800 bg-gray-900/80 backdrop-blur-md flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={onPrev}
                                        disabled={!hasPrev}
                                        className="p-2 flex items-center gap-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed
                                                 text-gray-400 hover:text-white hover:bg-gray-800"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                        Prev
                                    </button>
                                    <button
                                        onClick={onNext}
                                        disabled={!hasNext}
                                        className="p-2 flex items-center gap-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed
                                                 text-gray-400 hover:text-white hover:bg-gray-800"
                                    >
                                        Next
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>

                                <a
                                    href={paper.pdf_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-blue-900/20"
                                >
                                    View Full PDF <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
