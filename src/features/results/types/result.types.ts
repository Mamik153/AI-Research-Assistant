// Parsed summary structure (nested JSON inside summary field)
export interface OverviewSection {
  title: string;
  content: string;
  visualization_type?: string;
}

export interface KeyConcept {
  name: string;
  description: string;
  related_concepts?: string[];
}

export interface BenefitItem {
  title: string;
  description: string;
  importance?: 'low' | 'medium' | 'high';
}

export interface RiskItem {
  title: string;
  description: string;
  severity?: 'low' | 'medium' | 'high';
}

export interface ApplicationItem {
  title: string;
  description: string;
  industry?: string;
}

export interface FutureDirection {
  title: string;
  description: string;
  timeframe?: string;
}

export interface Methodology {
  name: string;
  description: string;
  use_cases?: string[];
}

export interface ComparisonItem {
  name: string;
  values: string[];
}

export interface ComparisonData {
  criteria: string[];
  items: ComparisonItem[];
}

export interface TimelineEvent {
  period: string;
  event: string;
  significance?: string;
}

export interface StatisticItem {
  label: string;
  value: string;
  context?: string;
  source?: string;
}

export interface StructuredSections {
  overview: OverviewSection | null;
  key_concepts: KeyConcept[];
  benefits: BenefitItem[];
  risks: RiskItem[];
  applications: ApplicationItem[];
  future_directions: FutureDirection[];
  methodologies: Methodology[];
  comparisons: ComparisonData | null;
  timeline: TimelineEvent[];
  statistics: StatisticItem[];
}

export interface ParsedSummary {
  summary: string;
  key_insights: string[];
  generated_diagrams: string[];
  structured_sections: StructuredSections;
  section_confidence?: Record<string, number>;
  section_images?: Record<string, string[]> | null;
}

export interface ResearchResultProps {
  result: {
    jobId: string;
    report?: string;
    summary?: string;
    parsedSummary?: {
      summary: string;
      key_insights: string[];
      generated_diagrams: string[];
      structured_sections: StructuredSections;
      section_confidence?: Record<string, number>;
      section_images?: Record<string, string[]> | null;
    };
    papers?: Array<{
      title: string;
      authors: string[];
      published: string;
      summary: string;
      pdf_url: string;
      images?: string[];
    }>;
    keyInsights?: string[];
    generatedDiagrams?: string[];
    completedAt: string;
    topic: string;
    tags?: string[];
    sectionConfidence?: Record<string, number>;
    sectionImages?: Record<string, string[]> | null;
  } | null;
}
