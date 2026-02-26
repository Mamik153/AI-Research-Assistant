import { useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  ExternalLink,
} from "lucide-react";
import type { ResearchPaper } from "@/features/papers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

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
  hasPrev,
}: AbstractModalProps) => {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowRight" && hasNext) onNext();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, hasNext, hasPrev, onNext, onPrev]);

  // Format date if possible
  const formattedDate = paper?.published
    ? new Date(paper.published).toLocaleDateString()
    : "Unknown Date";

  if (!paper) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col bg-white/20 border border-white/10 rounded-3xl backdrop-blur-xl text-gray-100 p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4 border-b border-gray-500/30 space-y-4">
          <div className="flex items-start gap-4">
            <div className="h-10 w-1.5 rounded-3xl bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-80" />
            <DialogTitle className="text-2xl font-bold text-gray-50 leading-tight pr-8">
              {paper.title}
            </DialogTitle>
          </div>
          <DialogDescription className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-start gap-2">
              <Users className="w-5 h-5 text-blue-300 mt-0.5 shrink-0" />
              <span className="text-gray-50">
                {paper.authors.length > 0
                  ? paper.authors.join(", ")
                  : "Unknown Authors"}
              </span>
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-300 shrink-0" />
              <span className="text-gray-50">{formattedDate}</span>
            </span>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-4 h-[300px] overflow-y-auto">
          <div className="prose prose-invert max-w-none">
            <h3 className="text-lg font-semibold text-gray-50 mb-2">
              Abstract
            </h3>
            <p className="text-gray-200 leading-relaxed whitespace-pre-line text-base">
              {paper.summary}
            </p>
          </div>
        </ScrollArea>

        <DialogFooter className="p-4 border-t border-gray-500/30 flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onPrev}
              disabled={!hasPrev}
              className="text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <ChevronLeft className="w-5 h-5" />
              Prev
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onNext}
              disabled={!hasNext}
              className="text-gray-300 hover:text-white hover:bg-gray-800"
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
            <a href={paper.pdf_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
              View Full PDF
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
