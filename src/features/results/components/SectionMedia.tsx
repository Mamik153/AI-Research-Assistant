import React from "react";
import { Badge } from "@/shared/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/ui/carousel";

interface SectionMediaProps {
  confidence?: number;
  images?: string[];
}

export const SectionMedia: React.FC<SectionMediaProps> = ({
  confidence,
  images,
}) => {
  if (confidence == null && (!images || images.length === 0)) {
    return null;
  }

  // Format confidence
  const confPercent = confidence != null ? Math.round(confidence * 100) : null;

  let badgeColor = "bg-blue-500 hover:bg-blue-600";
  if (confPercent != null) {
    if (confPercent >= 80)
      badgeColor = "bg-green-500/20 border border-green-500/40 text-green-500";
    else if (confPercent >= 50)
      badgeColor =
        "bg-yellow-500/20 border border-yellow-500/40 text-yellow-500";
    else badgeColor = "bg-red-500/20 border border-red-500/40 text-red-500";
  }

  return (
    <div className="section-media my-4 space-y-4">
      {confPercent != null && (
        <div className="flex items-center gap-2 mb-2">
          <Badge className={`text-white shadow-sm ${badgeColor}`}>
            Confidence: {confPercent}%
          </Badge>
        </div>
      )}

      {images && images.length === 1 && (
        <div className="overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/20 shadow-md p-3">
          <img
            src={images[0]}
            alt="Section visual"
            className="w-auto h-auto object-contain max-h-[400px] rounded-md mx-auto"
            loading="lazy"
          />
        </div>
      )}

      {images && images.length > 1 && (
        <div className="md:px-12">
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((imgUrl, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="overflow-hidden rounded-lg border border-gray-700/50 bg-gray-800/20 shadow-md p-3">
                      <img
                        src={imgUrl}
                        alt={`Section visual ${index + 1}`}
                        className="w-auto object-contain h-[400px] rounded-md mx-auto"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 hover:opacity-100 text-black" />
            <CarouselNext className="hidden md:flex -right-12 hover:opacity-100 text-black" />
          </Carousel>
        </div>
      )}
    </div>
  );
};
