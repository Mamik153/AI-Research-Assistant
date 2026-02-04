import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Users, ExternalLink } from 'lucide-react';
import type { ResearchPaper } from '../types/research';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'ArrowRight' && hasNext) onNext();
            if (e.key === 'ArrowLeft' && hasPrev) onPrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, hasNext, hasPrev, onNext, onPrev]);

    // Format date if possible
    const formattedDate = paper?.published
        ? new Date(paper.published).toLocaleDateString()
        : 'Unknown Date';

    if (!paper) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col bg-gray-900 border-gray-800 text-gray-100 p-0">
                <DialogHeader className="p-6 pb-4 border-b border-gray-800 space-y-4">
                    <div className="flex items-start gap-4">
                        <div className="h-10 w-1.5 rounded-3xl bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-80" />
                        <DialogTitle className="text-2xl font-bold text-gray-100 leading-tight pr-8">
                            {paper.title}
                        </DialogTitle>
                    </div>
                    <DialogDescription className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span className="flex items-start gap-2">
                            <Users className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                            <span>{paper.authors.length > 0 ? paper.authors.join(', ') : 'Unknown Authors'}</span>
                        </span>
                        <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
                            <span>{formattedDate}</span>
                        </span>
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="flex-1 px-6 py-4">
                    <div className="prose prose-invert max-w-none">
                        <h3 className="text-lg font-semibold text-gray-200 mb-2">Abstract</h3>
                        <p className="text-gray-300 leading-relaxed whitespace-pre-line text-base">
                            {paper.summary}
                        </p>
                    </div>
                </ScrollArea>

                <DialogFooter className="p-4 border-t border-gray-800 bg-gray-900/80 flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onPrev}
                            disabled={!hasPrev}
                            className="text-gray-400 hover:text-white hover:bg-gray-800"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Prev
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onNext}
                            disabled={!hasNext}
                            className="text-gray-400 hover:text-white hover:bg-gray-800"
                        >
                            Next
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>

                    <Button
                        variant="default"
                        size="sm"
                        asChild
                        className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
                    >
                        <a
                            href={paper.pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ExternalLink className="w-4 h-4" />
                            View Full PDF
                        </a>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
