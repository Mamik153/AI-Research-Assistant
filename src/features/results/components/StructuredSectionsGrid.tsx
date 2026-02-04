import type { StructuredSections } from '../types/result.types';
import { KeyConceptsNetwork } from './KeyConceptsNetwork';
import { BenefitsRisksDisplay } from './BenefitsRisksDisplay';
import { ApplicationsSection } from './ApplicationsSection';
import { FutureDirectionsSection } from './FutureDirectionsSection';
import { MethodologiesSection } from './MethodologiesSection';
import { ComparisonRadarChart } from './ComparisonRadarChart';
import { TimelineVertical } from './TimelineVertical';
import { StatisticsCards } from './StatisticsCards';

interface StructuredSectionsGridProps {
  sections: StructuredSections;
}

export const StructuredSectionsGrid = ({ sections }: StructuredSectionsGridProps) => {
  const hasOverview = sections.overview != null;
  const hasKeyConcepts = sections.key_concepts.length > 0;
  const hasBenefitsRisks = sections.benefits.length > 0 || sections.risks.length > 0;
  const hasApplications = sections.applications.length > 0;
  const hasFutureDirections = sections.future_directions.length > 0;
  const hasMethodologies = sections.methodologies.length > 0;
  const hasComparisons = sections.comparisons != null && sections.comparisons.items.length > 0;
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
      {hasKeyConcepts && <KeyConceptsNetwork keyConcepts={sections.key_concepts} />}
      {hasBenefitsRisks && (
        <BenefitsRisksDisplay benefits={sections.benefits} risks={sections.risks} />
      )}
      {hasApplications && <ApplicationsSection applications={sections.applications} />}
      {hasFutureDirections && (
        <FutureDirectionsSection futureDirections={sections.future_directions} />
      )}
      {hasMethodologies && <MethodologiesSection methodologies={sections.methodologies} />}
      {hasComparisons && sections.comparisons && (
        <ComparisonRadarChart comparisonData={sections.comparisons} />
      )}
      {hasTimeline && <TimelineVertical events={sections.timeline} />}
      {hasStatistics && <StatisticsCards statistics={sections.statistics} />}
    </div>
  );
};
