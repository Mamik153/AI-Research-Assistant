import { memo } from "react";
import type { StructuredSections } from "../types/result.types";
import { KeyConceptsNetwork } from "./KeyConceptsNetwork";
import { BenefitsRisksDisplay } from "./BenefitsRisksDisplay";
import { ApplicationsSection } from "./ApplicationsSection";
import { FutureDirectionsSection } from "./FutureDirectionsSection";
import { MethodologiesSection } from "./MethodologiesSection";
import { ComparisonRadarChart } from "./ComparisonRadarChart";
import { TimelineVertical } from "./TimelineVertical";
import { StatisticsCards } from "./StatisticsCards";

interface StructuredSectionsGridProps {
  sections: StructuredSections;
  sectionConfidence?: Record<string, number>;
  sectionImages?: Record<string, string[]> | null;
}

export const StructuredSectionsGrid = memo(
  ({
    sections,
    sectionConfidence,
    sectionImages,
  }: StructuredSectionsGridProps) => {
    const hasOverview = sections.overview != null;
    const hasKeyConcepts = sections.key_concepts.length > 0;
    const hasBenefitsRisks =
      sections.benefits.length > 0 || sections.risks.length > 0;
    const hasApplications = sections.applications.length > 0;
    const hasFutureDirections = sections.future_directions.length > 0;
    const hasMethodologies = sections.methodologies.length > 0;
    const hasComparisons =
      sections.comparisons != null && sections.comparisons.items.length > 0;
    const hasTimeline = sections.timeline.length > 0;
    const hasStatistics = sections.statistics.length > 0;

    const hasAny =
      hasOverview ||
      hasKeyConcepts ||
      hasBenefitsRisks ||
      hasApplications ||
      hasFutureDirections ||
      hasMethodologies ||
      hasComparisons ||
      hasTimeline ||
      hasStatistics;

    if (!hasAny) return null;

    return (
      <div className="grid grid-cols-1 gap-8">
        {/* {hasOverview && sections.overview && <OverviewCard overview={sections.overview} />} */}
        {hasKeyConcepts && (
          <KeyConceptsNetwork
            keyConcepts={sections.key_concepts}
            confidence={sectionConfidence?.["key_concepts"]}
            images={sectionImages?.["key_concepts"]}
          />
        )}
        {hasBenefitsRisks && (
          <BenefitsRisksDisplay
            benefits={sections.benefits}
            risks={sections.risks}
            confidence={
              sectionConfidence?.["benefits"] ?? sectionConfidence?.["risks"]
            }
            images={sectionImages?.["benefits"] ?? sectionImages?.["risks"]}
          />
        )}
        {hasApplications && (
          <ApplicationsSection
            applications={sections.applications}
            confidence={sectionConfidence?.["applications"]}
            images={sectionImages?.["applications"]}
          />
        )}
        {hasFutureDirections && (
          <FutureDirectionsSection
            futureDirections={sections.future_directions}
            confidence={sectionConfidence?.["future_directions"]}
            images={sectionImages?.["future_directions"]}
          />
        )}
        {hasMethodologies && (
          <MethodologiesSection
            methodologies={sections.methodologies}
            confidence={sectionConfidence?.["methodologies"]}
            images={sectionImages?.["methodologies"]}
          />
        )}
        {hasComparisons && sections.comparisons && (
          <ComparisonRadarChart
            comparisonData={sections.comparisons}
            confidence={sectionConfidence?.["comparisons"]}
            images={sectionImages?.["comparisons"]}
          />
        )}
        {hasTimeline && (
          <TimelineVertical
            events={sections.timeline}
            confidence={sectionConfidence?.["timeline"]}
            images={sectionImages?.["timeline"]}
          />
        )}
        {hasStatistics && (
          <StatisticsCards
            statistics={sections.statistics}
            confidence={sectionConfidence?.["statistics"]}
            images={sectionImages?.["statistics"]}
          />
        )}
      </div>
    );
  },
);
