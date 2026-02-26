import type {
  ParsedSummary,
  StructuredSections,
  OverviewSection,
  KeyConcept,
  BenefitItem,
  RiskItem,
  ApplicationItem,
  FutureDirection,
  Methodology,
  ComparisonData,
  ComparisonItem,
  TimelineEvent,
  StatisticItem,
} from '../types/result.types';

const emptyStructuredSections: StructuredSections = {
  overview: null,
  key_concepts: [],
  benefits: [],
  risks: [],
  applications: [],
  future_directions: [],
  methodologies: [],
  comparisons: null,
  timeline: [],
  statistics: [],
};

function ensureString(value: unknown): string {
  if (typeof value === 'string') return value;
  if (value == null) return '';
  return String(value);
}

function ensureStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((v) => (typeof v === 'string' ? v : String(v)));
  }
  return [];
}

function parseOverview(value: unknown): OverviewSection | null {
  if (value == null || typeof value !== 'object') return null;
  const o = value as Record<string, unknown>;
  const title = ensureString(o.title);
  const content = ensureString(o.content);
  if (!title && !content) return null;
  return {
    title: title || 'Overview',
    content: content || '',
    visualization_type: typeof o.visualization_type === 'string' ? o.visualization_type : undefined,
  };
}

function parseKeyConcept(value: unknown): KeyConcept | null {
  if (value == null || typeof value !== 'object') return null;
  const o = value as Record<string, unknown>;
  const name = ensureString(o.name);
  const description = ensureString(o.description);
  if (!name && !description) return null;
  return {
    name: name || '',
    description: description || '',
    related_concepts: Array.isArray(o.related_concepts)
      ? o.related_concepts.map((v) => (typeof v === 'string' ? v : String(v)))
      : undefined,
  };
}

function parseBenefitItem(value: unknown): BenefitItem | null {
  if (value == null || typeof value !== 'object') return null;
  const o = value as Record<string, unknown>;
  const title = ensureString(o.title);
  const description = ensureString(o.description);
  if (!title && !description) return null;
  return {
    title: title || '',
    description: description || '',
    importance: ['low', 'medium', 'high'].includes(String(o.importance)) ? (o.importance as BenefitItem['importance']) : undefined,
  };
}

function parseRiskItem(value: unknown): RiskItem | null {
  if (value == null || typeof value !== 'object') return null;
  const o = value as Record<string, unknown>;
  const title = ensureString(o.title);
  const description = ensureString(o.description);
  if (!title && !description) return null;
  return {
    title: title || '',
    description: description || '',
    severity: ['low', 'medium', 'high'].includes(String(o.severity)) ? (o.severity as RiskItem['severity']) : undefined,
  };
}

function parseApplicationItem(value: unknown): ApplicationItem | null {
  if (value == null || typeof value !== 'object') return null;
  const o = value as Record<string, unknown>;
  const title = ensureString(o.title);
  const description = ensureString(o.description);
  if (!title && !description) return null;
  return {
    title: title || '',
    description: description || '',
    industry: typeof o.industry === 'string' ? o.industry : undefined,
  };
}

function parseFutureDirection(value: unknown): FutureDirection | null {
  if (value == null || typeof value !== 'object') return null;
  const o = value as Record<string, unknown>;
  const title = ensureString(o.title);
  const description = ensureString(o.description);
  if (!title && !description) return null;
  return {
    title: title || '',
    description: description || '',
    timeframe: typeof o.timeframe === 'string' ? o.timeframe : undefined,
  };
}

function parseMethodology(value: unknown): Methodology | null {
  if (value == null || typeof value !== 'object') return null;
  const o = value as Record<string, unknown>;
  const name = ensureString(o.name);
  const description = ensureString(o.description);
  if (!name && !description) return null;
  return {
    name: name || '',
    description: description || '',
    use_cases: Array.isArray(o.use_cases) ? o.use_cases.map((v) => (typeof v === 'string' ? v : String(v))) : undefined,
  };
}

function parseComparisonItem(value: unknown): ComparisonItem | null {
  if (value == null || typeof value !== 'object') return null;
  const o = value as Record<string, unknown>;
  const name = ensureString(o.name);
  const values = Array.isArray(o.values) ? o.values.map((v) => String(v)) : [];
  if (!name && values.length === 0) return null;
  return { name: name || '', values };
}

function parseComparisonData(value: unknown): ComparisonData | null {
  if (value == null || typeof value !== 'object') return null;
  const o = value as Record<string, unknown>;
  const criteria = Array.isArray(o.criteria) ? o.criteria.map((v) => String(v)) : [];
  const itemsRaw = Array.isArray(o.items) ? o.items : [];
  const items = itemsRaw.map(parseComparisonItem).filter((v): v is ComparisonItem => v != null);
  if (criteria.length === 0 && items.length === 0) return null;
  return { criteria, items };
}

function parseTimelineEvent(value: unknown): TimelineEvent | null {
  if (value == null || typeof value !== 'object') return null;
  const o = value as Record<string, unknown>;
  const period = ensureString(o.period);
  const event = ensureString(o.event);
  if (!period && !event) return null;
  return {
    period: period || '',
    event: event || '',
    significance: typeof o.significance === 'string' ? o.significance : undefined,
  };
}

function parseStatisticItem(value: unknown): StatisticItem | null {
  if (value == null || typeof value !== 'object') return null;
  const o = value as Record<string, unknown>;
  const label = ensureString(o.label);
  const valueStr = ensureString(o.value);
  if (!label && !valueStr) return null;
  return {
    label: label || '',
    value: valueStr || '',
    context: typeof o.context === 'string' ? o.context : undefined,
    source: typeof o.source === 'string' ? o.source : undefined,
  };
}

function parseStructuredSections(value: unknown): StructuredSections {
  if (value == null || typeof value !== 'object') return { ...emptyStructuredSections };
  const o = value as Record<string, unknown>;
  return {
    overview: parseOverview(o.overview),
    key_concepts: Array.isArray(o.key_concepts)
      ? o.key_concepts.map(parseKeyConcept).filter((v): v is KeyConcept => v != null)
      : [],
    benefits: Array.isArray(o.benefits)
      ? o.benefits.map(parseBenefitItem).filter((v): v is BenefitItem => v != null)
      : [],
    risks: Array.isArray(o.risks) ? o.risks.map(parseRiskItem).filter((v): v is RiskItem => v != null) : [],
    applications: Array.isArray(o.applications)
      ? o.applications.map(parseApplicationItem).filter((v): v is ApplicationItem => v != null)
      : [],
    future_directions: Array.isArray(o.future_directions)
      ? o.future_directions.map(parseFutureDirection).filter((v): v is FutureDirection => v != null)
      : [],
    methodologies: Array.isArray(o.methodologies)
      ? o.methodologies.map(parseMethodology).filter((v): v is Methodology => v != null)
      : [],
    comparisons: parseComparisonData(o.comparisons),
    timeline: Array.isArray(o.timeline)
      ? o.timeline.map(parseTimelineEvent).filter((v): v is TimelineEvent => v != null)
      : [],
    statistics: Array.isArray(o.statistics)
      ? o.statistics.map(parseStatisticItem).filter((v): v is StatisticItem => v != null)
      : [],
  };
}

/**
 * Parses the summary field when it contains stringified JSON with rich structure.
 * Returns null if the value is not valid JSON or does not match the expected shape.
 */
export function parseSummary(summary: string | undefined): ParsedSummary | null {
  if (summary == null || typeof summary !== 'string' || summary.trim() === '') return null;
  const trimmed = summary.trim();
  // Must look like JSON (starts with {)
  if (!trimmed.startsWith('{')) return null;
  try {
    const parsed = JSON.parse(trimmed) as Record<string, unknown>;
    const innerSummary = ensureString(parsed.summary);
    const key_insights = ensureStringArray(parsed.key_insights);
    const generated_diagrams = ensureStringArray(parsed.generated_diagrams);
    const structured_sections = parseStructuredSections(parsed.structured_sections);
    const section_confidence = parsed.section_confidence as Record<string, number> | undefined;
    const section_images = parsed.section_images as Record<string, string[]> | null | undefined;
    return {
      summary: innerSummary,
      key_insights,
      generated_diagrams,
      structured_sections,
      section_confidence,
      section_images,
    };
  } catch {
    return null;
  }
}

/**
 * Builds ParsedSummary from flat API response fields (when summary is plain text
 * and key_insights, generated_diagrams, structured_sections are top-level).
 */
export function buildParsedSummaryFromFlat(
  summary: string | undefined,
  key_insights: string[] | undefined,
  generated_diagrams: string[] | undefined,
  structured_sections: unknown,
  section_confidence?: Record<string, number>,
  section_images?: Record<string, string[]> | null
): ParsedSummary {
  return {
    summary: summary ?? '',
    key_insights: ensureStringArray(key_insights),
    generated_diagrams: ensureStringArray(generated_diagrams),
    structured_sections: parseStructuredSections(structured_sections),
    section_confidence,
    section_images,
  };
}
