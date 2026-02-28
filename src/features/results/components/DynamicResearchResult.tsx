import { useState } from "react";
import type { ResearchResultProps } from "../types/result.types";
import { ResearchHero } from "./ResearchHero";
import { ResearchSummary } from "./ResearchSummary";
import { KeyInsights } from "./KeyInsights";
import { PapersGrid } from "@/features/papers";
import { DiagramViewer } from "@/features/diagrams";
import { StructuredSectionsGrid } from "./StructuredSectionsGrid";
import { Download, RefreshCw, Loader2 } from "lucide-react";
import { downloadResearchPDF } from "@/features/export";
import { Button } from "@/shared/components/ui/button";

import { Separator } from "@/shared/components/ui/separator";
import { OverviewCard } from "./OverviewCard";
import { motion } from "motion/react";

export const DynamicResearchResult = ({ result }: ResearchResultProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  // Scroll cue logic was removed

  if (!result) return null;

  const hasStructuredData =
    result.summary ||
    result.parsedSummary ||
    (result.papers && result.papers.length > 0);

  if (!hasStructuredData) {
    return (
      <motion.div
        className="text-center p-8 text-gray-400"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>Structured data not available for this research.</p>
        <div className="mt-4">
          <Button
            onClick={() => window.location.reload()}
            variant="default"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Try New Research
          </Button>
        </div>
      </motion.div>
    );
  }

  const diagrams = result.generatedDiagrams?.length
    ? result.generatedDiagrams
    : (result.parsedSummary?.generated_diagrams ?? []);

  const hasDiagrams = diagrams.length > 0;
  const hasKeyInsights = result.keyInsights && result.keyInsights.length > 0;
  const hasStructuredSections = result.parsedSummary?.structured_sections;
  const hasPapers = result.papers && result.papers.length > 0;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <ResearchHero result={result} />
      </motion.div>

      {result.parsedSummary!.structured_sections.overview && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <OverviewCard
            overview={result.parsedSummary!.structured_sections.overview}
            confidence={result.sectionConfidence?.["overview"]}
            images={result.sectionImages?.["overview"]}
          />
        </motion.div>
      )}

      <motion.div
        id="overview"
        className="space-y-8 mt-6"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      >
        {result.summary && <ResearchSummary summary={result.summary} />}
      </motion.div>

      {hasDiagrams && (
        <motion.div
          id="diagrams"
          className="mt-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <DiagramViewer diagrams={diagrams} />
        </motion.div>
      )}

      {hasKeyInsights && (
        <motion.div
          id="insights"
          className="mt-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <KeyInsights insights={result.keyInsights!} />
        </motion.div>
      )}

      {hasStructuredSections && (
        <motion.div
          id="sections"
          className="mt-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <StructuredSectionsGrid
            sections={result.parsedSummary!.structured_sections}
            sectionConfidence={result.sectionConfidence}
            sectionImages={result.sectionImages}
          />
        </motion.div>
      )}

      {hasPapers && (
        <motion.div
          id="papers"
          className="mt-6"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <PapersGrid papers={result.papers!} />
        </motion.div>
      )}
      {/* Actions Footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 text-white rounded-full px-2 py-2 shadow-2xl flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button
            onClick={() => window.location.reload()}
            variant="default"
            size="lg"
            className="bg-blue-600 hover:bg-blue-500 rounded-full shadow-lg shadow-blue-500/20 active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            New Research
          </Button>

          <Separator orientation="vertical" className="h-6 bg-gray-700 mx-1" />

          <Button
            variant="ghost"
            size="icon"
            disabled={isDownloading}
            onClick={async () => {
              if (isDownloading) return;
              setIsDownloading(true);
              try {
                await downloadResearchPDF(result);
              } catch (err) {
                console.error("PDF download failed:", err);
                alert("Failed to generate PDF. Please try again.");
              } finally {
                setIsDownloading(false);
              }
            }}
            className="rounded-full hover:bg-gray-700/50 text-gray-300 hover:text-white"
            title="Download Report (PDF)"
          >
            {isDownloading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
