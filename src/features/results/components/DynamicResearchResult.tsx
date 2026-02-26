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
//import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/components/ui/tabs';
import { Separator } from "@/shared/components/ui/separator";
import { OverviewCard } from "./OverviewCard";

export const DynamicResearchResult = ({
  result,
  onNewResearch,
}: ResearchResultProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  if (!result) return null;

  const hasStructuredData =
    result.summary ||
    result.parsedSummary ||
    (result.papers && result.papers.length > 0);

  if (!hasStructuredData) {
    return (
      <div className="text-center p-8 text-gray-400">
        <p>Structured data not available for this research.</p>
        <div className="mt-4">
          <Button
            onClick={onNewResearch}
            variant="default"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Try New Research
          </Button>
        </div>
      </div>
    );
  }

  const diagrams = result.generatedDiagrams?.length
    ? result.generatedDiagrams
    : (result.parsedSummary?.generated_diagrams ?? []);

  const hasDiagrams = diagrams.length > 0;
  const hasKeyInsights = result.keyInsights && result.keyInsights.length > 0;
  const hasStructuredSections = result.parsedSummary?.structured_sections;
  const hasPapers = result.papers && result.papers.length > 0;

  console.log("result===>", result.parsedSummary!.structured_sections);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 animate-in fade-in duration-500">
      {/* Hero Section */}
      <ResearchHero result={result} />

      {/* Main Content with Tabs */}
      {/* <Tabs defaultValue="overview" className="w-full mt-8">
                <TabsList variant="line" className="w-full justify-start border-b border-gray-700">
                    <TabsTrigger value="overview" className="text-gray-300 data-[state=active]:text-white">
                        Overview
                    </TabsTrigger>
                    {hasDiagrams && (
                        <TabsTrigger value="diagrams" className="text-gray-300 data-[state=active]:text-white">
                            Diagrams
                        </TabsTrigger>
                    )}
                    {hasKeyInsights && (
                        <TabsTrigger value="insights" className="text-gray-300 data-[state=active]:text-white">
                            Key Insights
                        </TabsTrigger>
                    )}
                    {hasStructuredSections && (
                        <TabsTrigger value="sections" className="text-gray-300 data-[state=active]:text-white">
                            Sections
                        </TabsTrigger>
                    )}
                    {hasPapers && (
                        <TabsTrigger value="papers" className="text-gray-300 data-[state=active]:text-white">
                            Papers
                        </TabsTrigger>
                    )}
                </TabsList>*/}

      {result.parsedSummary!.structured_sections.overview && (
        <OverviewCard
          overview={result.parsedSummary!.structured_sections.overview}
        />
      )}

      <div id="overview" className="space-y-8 mt-6">
        {result.summary && <ResearchSummary summary={result.summary} />}
        {/* {hasKeyInsights && (
                        <>
                            <Separator className="bg-gray-700" />
                            <KeyInsights insights={result.keyInsights!} />
                        </>
                    )} */}
      </div>

      {hasDiagrams && (
        <div id="diagrams" className="mt-6">
          <DiagramViewer diagrams={diagrams} />
        </div>
      )}

      {hasKeyInsights && (
        <div id="insights" className="mt-6">
          <KeyInsights insights={result.keyInsights!} />
        </div>
      )}

      {hasStructuredSections && (
        <div id="sections" className="mt-6">
          <StructuredSectionsGrid
            sections={result.parsedSummary!.structured_sections}
          />
        </div>
      )}

      {hasPapers && (
        <div id="papers" className="mt-6">
          <PapersGrid papers={result.papers!} />
        </div>
      )}
      {/* </Tabs> */}

      {/* Actions Footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 text-white rounded-full px-2 py-2 shadow-2xl flex items-center gap-2">
          <Button
            onClick={onNewResearch}
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
        </div>
      </div>
    </div>
  );
};
