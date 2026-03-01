import { useState } from "react";

import type { ResearchPaper } from "../types/paper.types";
import { PaperCard } from "./PaperCard";
import { AbstractModal } from "@/shared/components";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/ui/carousel";
import { motion } from "motion/react";

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
    <div className="w-full mb-12 px-4 lg:px-0">
      <h3 className="text-2xl font-semibold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent mb-4 flex items-center gap-2">
        References & Source Papers
      </h3>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {papers.map((paper, idx) => (
            <CarouselItem
              key={idx}
              className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full"
              >
                <PaperCard
                  paper={paper}
                  index={idx}
                  onReadAbstract={() => setSelectedPaperIndex(idx)}
                />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block ">
          <CarouselPrevious className="-left-8 text-black" />
          <CarouselNext className="-right-8 text-black" />
        </div>
      </Carousel>

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
