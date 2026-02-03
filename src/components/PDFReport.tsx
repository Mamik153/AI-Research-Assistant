import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Link,
  Image,
} from '@react-pdf/renderer';
import type {
  ResearchResult,
  StructuredSections,
  OverviewSection,
  KeyConcept,
  BenefitItem,
  RiskItem,
  ApplicationItem,
  FutureDirection,
  Methodology,
  ComparisonData,
  TimelineEvent,
  StatisticItem,
} from '../types/research';

// Professional report styles - white background, print-friendly
const styles = StyleSheet.create({
  page: {
    padding: 48,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  titlePage: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 120,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 24,
    lineHeight: 1.3,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 24,
    marginTop: 32,
  },
  metaItem: {
    fontSize: 10,
    color: '#6b7280',
  },
  metaLabel: {
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    marginTop: 24,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  bodyText: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.6,
    marginBottom: 8,
  },
  insightItem: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  insightNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fef3c7',
    color: '#92400e',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 4,
  },
  insightText: {
    flex: 1,
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.5,
  },
  paperCard: {
    marginBottom: 20,
    padding: 14,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
  },
  paperTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
    lineHeight: 1.3,
  },
  paperMeta: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 6,
  },
  paperSummary: {
    fontSize: 10,
    color: '#4b5563',
    lineHeight: 1.5,
    marginBottom: 6,
  },
  paperLink: {
    fontSize: 9,
    color: '#2563eb',
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 48,
    right: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 8,
    color: '#9ca3af',
  },
  header: {
    position: 'absolute',
    top: 24,
    left: 48,
    right: 48,
    fontSize: 8,
    color: '#9ca3af',
  },
  // Structured sections
  overviewTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  overviewContent: {
    fontSize: 11,
    color: '#374151',
    lineHeight: 1.6,
    marginBottom: 16,
  },
  conceptCard: {
    marginBottom: 14,
    padding: 12,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
  },
  conceptName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  conceptDesc: {
    fontSize: 10,
    color: '#4b5563',
    lineHeight: 1.5,
    marginBottom: 4,
  },
  conceptTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  tag: {
    fontSize: 8,
    color: '#6b7280',
    backgroundColor: '#e5e7eb',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 2,
  },
  benefitRiskCard: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9fafb',
    borderLeftWidth: 3,
    borderLeftColor: '#2563eb',
    borderRadius: 2,
  },
  riskCard: {
    borderLeftColor: '#dc2626',
  },
  benefitRiskTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  benefitRiskDesc: {
    fontSize: 10,
    color: '#4b5563',
    lineHeight: 1.5,
  },
  importanceBadge: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  appCard: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
  },
  appTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  appIndustry: {
    fontSize: 8,
    color: '#6b7280',
    marginBottom: 4,
  },
  methodologyItem: {
    marginBottom: 12,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#e5e7eb',
  },
  methodologyName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  methodologyDesc: {
    fontSize: 10,
    color: '#4b5563',
    lineHeight: 1.5,
    marginBottom: 4,
  },
  useCaseItem: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 2,
  },
  comparisonTable: {
    marginBottom: 16,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 6,
  },
  tableHeader: {
    fontWeight: 'bold',
    backgroundColor: '#f3f4f6',
  },
  tableCell: {
    fontSize: 10,
    color: '#374151',
    flex: 1,
    paddingHorizontal: 6,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 14,
    gap: 12,
  },
  timelineMarker: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563eb',
    marginTop: 5,
  },
  timelineContent: {
    flex: 1,
  },
  timelinePeriod: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  timelineEvent: {
    fontSize: 10,
    color: '#374151',
    lineHeight: 1.5,
    marginBottom: 2,
  },
  timelineSignificance: {
    fontSize: 9,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  statItem: {
    width: '48%',
    padding: 10,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
  },
  statLabel: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 2,
  },
  statContext: {
    fontSize: 9,
    color: '#4b5563',
  },
  diagramContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  diagramImage: {
    maxWidth: 450,
    maxHeight: 280,
    objectFit: 'contain',
  },
  diagramPlaceholder: {
    fontSize: 10,
    color: '#9ca3af',
    fontStyle: 'italic',
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
  },
});

interface PDFReportProps {
  result: ResearchResult;
  diagramDataUris?: (string | null)[];
}

const sections = (result: ResearchResult): StructuredSections | null =>
  result.parsedSummary?.structured_sections ?? null;

export const PDFReport = ({ result, diagramDataUris = [] }: PDFReportProps) => {
  const formattedDate = new Date(result.completedAt).toLocaleDateString(
    undefined,
    { year: 'numeric', month: 'long', day: 'numeric' }
  );
  const structured = sections(result);
  const validDiagramUris = diagramDataUris.filter((u): u is string => u != null && u.length > 0);

  return (
    <Document>
      {/* Title page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.titlePage}>
          <Text style={styles.badge}>AI RESEARCH REPORT</Text>
          <Text style={styles.title}>{result.topic}</Text>
          <View style={styles.metaRow}>
            <View>
              <Text style={styles.metaLabel}>Date</Text>
              <Text style={styles.metaItem}>{formattedDate}</Text>
            </View>
            <View>
              <Text style={styles.metaLabel}>Report ID</Text>
              <Text style={styles.metaItem}>{result.jobId}</Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Text>AI Research Assistant</Text>
          <Text>Page 1</Text>
        </View>
      </Page>

      {/* Executive Summary */}
      {result.summary && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Executive Summary</Text>
          <Text style={styles.bodyText}>{result.summary}</Text>
          <View style={styles.footer}>
            <Text>AI Research Assistant</Text>
            <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
          </View>
        </Page>
      )}

      {/* Key Insights */}
      {result.keyInsights && result.keyInsights.length > 0 && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Key Insights</Text>
          {result.keyInsights.map((insight, idx) => (
            <View key={idx} style={styles.insightItem}>
              <Text style={styles.insightNumber}>{idx + 1}</Text>
              <Text style={styles.insightText}>{insight}</Text>
            </View>
          ))}
          <View style={styles.footer}>
            <Text>AI Research Assistant</Text>
            <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
          </View>
        </Page>
      )}

      {/* Research Diagrams */}
      {validDiagramUris.length > 0 && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Research Diagrams</Text>
          {validDiagramUris.map((uri, idx) => (
            <View key={idx} style={styles.diagramContainer}>
              <Image src={uri} style={styles.diagramImage} />
            </View>
          ))}
          <View style={styles.footer}>
            <Text>AI Research Assistant</Text>
            <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
          </View>
        </Page>
      )}

      {/* Overview Section */}
      {structured?.overview && (structured.overview.title || structured.overview.content) && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>
            {(structured.overview as OverviewSection).title || 'Overview'}
          </Text>
          <Text style={styles.overviewContent}>
            {(structured.overview as OverviewSection).content}
          </Text>
          <View style={styles.footer}>
            <Text>AI Research Assistant</Text>
            <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
          </View>
        </Page>
      )}

      {/* Key Concepts */}
      {structured?.key_concepts && structured.key_concepts.length > 0 && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Key Concepts</Text>
          {structured.key_concepts.map((concept: KeyConcept, idx: number) => (
            <View key={idx} style={styles.conceptCard}>
              <Text style={styles.conceptName}>{concept.name}</Text>
              <Text style={styles.conceptDesc}>{concept.description}</Text>
              {concept.related_concepts && concept.related_concepts.length > 0 && (
                <View style={styles.conceptTags}>
                  {concept.related_concepts.map((rel, i) => (
                    <Text key={i} style={styles.tag}>{rel}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}
          <View style={styles.footer}>
            <Text>AI Research Assistant</Text>
            <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
          </View>
        </Page>
      )}

      {/* Benefits & Risks */}
      {structured && ((structured.benefits?.length ?? 0) > 0 || (structured.risks?.length ?? 0) > 0) && (
        <Page size="A4" style={styles.page}>
          {structured.benefits && structured.benefits.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Benefits</Text>
              {structured.benefits.map((item: BenefitItem, idx: number) => (
                <View key={idx} style={styles.benefitRiskCard}>
                  {item.importance && (
                    <Text style={styles.importanceBadge}>Importance: {item.importance}</Text>
                  )}
                  <Text style={styles.benefitRiskTitle}>{item.title}</Text>
                  <Text style={styles.benefitRiskDesc}>{item.description}</Text>
                </View>
              ))}
            </>
          )}
          {structured.risks && structured.risks.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Risks</Text>
              {structured.risks.map((item: RiskItem, idx: number) => (
                <View key={idx} style={[styles.benefitRiskCard, styles.riskCard]}>
                  {item.severity && (
                    <Text style={styles.importanceBadge}>Severity: {item.severity}</Text>
                  )}
                  <Text style={styles.benefitRiskTitle}>{item.title}</Text>
                  <Text style={styles.benefitRiskDesc}>{item.description}</Text>
                </View>
              ))}
            </>
          )}
          <View style={styles.footer}>
            <Text>AI Research Assistant</Text>
            <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
          </View>
        </Page>
      )}

      {/* Applications */}
      {structured?.applications && structured.applications.length > 0 && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Applications</Text>
          {structured.applications.map((item: ApplicationItem, idx: number) => (
            <View key={idx} style={styles.appCard}>
              <Text style={styles.appTitle}>{item.title}</Text>
              {item.industry && (
                <Text style={styles.appIndustry}>Industry: {item.industry}</Text>
              )}
              <Text style={styles.bodyText}>{item.description}</Text>
            </View>
          ))}
          <View style={styles.footer}>
            <Text>AI Research Assistant</Text>
            <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
          </View>
        </Page>
      )}

      {/* Methodologies */}
      {structured?.methodologies && structured.methodologies.length > 0 && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Methodologies</Text>
          {structured.methodologies.map((item: Methodology, idx: number) => (
            <View key={idx} style={styles.methodologyItem}>
              <Text style={styles.methodologyName}>{item.name}</Text>
              <Text style={styles.methodologyDesc}>{item.description}</Text>
              {item.use_cases && item.use_cases.length > 0 && (
                <View>
                  {item.use_cases.map((uc, i) => (
                    <Text key={i} style={styles.useCaseItem}>• {uc}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}
          <View style={styles.footer}>
            <Text>AI Research Assistant</Text>
            <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
          </View>
        </Page>
      )}

      {/* Future Directions */}
      {structured?.future_directions && structured.future_directions.length > 0 && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Future Directions</Text>
          {structured.future_directions.map((item: FutureDirection, idx: number) => (
            <View key={idx} style={styles.benefitRiskCard}>
              <Text style={styles.benefitRiskTitle}>{item.title}</Text>
              {item.timeframe && (
                <Text style={styles.importanceBadge}>Timeframe: {item.timeframe}</Text>
              )}
              <Text style={styles.benefitRiskDesc}>{item.description}</Text>
            </View>
          ))}
          <View style={styles.footer}>
            <Text>AI Research Assistant</Text>
            <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
          </View>
        </Page>
      )}

      {/* Comparisons */}
      {structured?.comparisons && structured.comparisons.criteria?.length > 0 && structured.comparisons.items?.length > 0 && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Comparison</Text>
          <View style={styles.comparisonTable}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, { flex: 2 }]}>Item</Text>
              {(structured.comparisons as ComparisonData).criteria.map((c, i) => (
                <Text key={i} style={[styles.tableCell, { flex: 1 }]}>{c}</Text>
              ))}
            </View>
            {(structured.comparisons as ComparisonData).items.map((row, idx) => (
              <View key={idx} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 2, fontWeight: 'bold' }]}>{row.name}</Text>
                {row.values.map((v, i) => (
                  <Text key={i} style={[styles.tableCell, { flex: 1 }]}>{v}</Text>
                ))}
              </View>
            ))}
          </View>
          <View style={styles.footer}>
            <Text>AI Research Assistant</Text>
            <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
          </View>
        </Page>
      )}

      {/* Timeline */}
      {structured?.timeline && structured.timeline.length > 0 && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Timeline</Text>
          {structured.timeline.map((item: TimelineEvent, idx: number) => (
            <View key={idx} style={styles.timelineItem}>
              <View style={styles.timelineMarker} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelinePeriod}>{item.period}</Text>
                <Text style={styles.timelineEvent}>{item.event}</Text>
                {item.significance && (
                  <Text style={styles.timelineSignificance}>{item.significance}</Text>
                )}
              </View>
            </View>
          ))}
          <View style={styles.footer}>
            <Text>AI Research Assistant</Text>
            <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
          </View>
        </Page>
      )}

      {/* Statistics */}
      {structured?.statistics && structured.statistics.length > 0 && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statGrid}>
            {structured.statistics.map((item: StatisticItem, idx: number) => (
              <View key={idx} style={styles.statItem}>
                <Text style={styles.statLabel}>{item.label}</Text>
                <Text style={styles.statValue}>{item.value}</Text>
                {item.context && (
                  <Text style={styles.statContext}>{item.context}</Text>
                )}
                {item.source && (
                  <Text style={[styles.statContext, { fontStyle: 'italic', marginTop: 2 }]}>
                    Source: {item.source}
                  </Text>
                )}
              </View>
            ))}
          </View>
          <View style={styles.footer}>
            <Text>AI Research Assistant</Text>
            <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
          </View>
        </Page>
      )}

      {/* Academic Papers - may span multiple pages */}
      {result.papers && result.papers.length > 0 && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Academic Papers</Text>
          {result.papers.map((paper, idx) => (
            <View key={idx} style={styles.paperCard}>
              <Text style={styles.paperTitle}>{paper.title}</Text>
              <Text style={styles.paperMeta}>
                {paper.authors?.length ? paper.authors.join(', ') : '—'} •{' '}
                {paper.published || '—'}
              </Text>
              {paper.summary && (
                <Text style={styles.paperSummary}>{paper.summary}</Text>
              )}
              {paper.pdf_url && (
                <Link src={paper.pdf_url} style={styles.paperLink}>
                  View PDF
                </Link>
              )}
            </View>
          ))}
          <View style={styles.footer}>
            <Text>AI Research Assistant</Text>
            <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
          </View>
        </Page>
      )}

      {/* Fallback: if only title page content, ensure at least summary/insights placeholders don't leave empty */}
      {!result.summary && (!result.keyInsights || result.keyInsights.length === 0) && (!result.papers || result.papers.length === 0) && !structured?.overview && (structured?.key_concepts?.length ?? 0) === 0 && (structured?.benefits?.length ?? 0) === 0 && (structured?.risks?.length ?? 0) === 0 && (structured?.applications?.length ?? 0) === 0 && (structured?.methodologies?.length ?? 0) === 0 && (structured?.future_directions?.length ?? 0) === 0 && !structured?.comparisons && (structured?.timeline?.length ?? 0) === 0 && (structured?.statistics?.length ?? 0) === 0 && validDiagramUris.length === 0 && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.sectionTitle}>Report Details</Text>
          <Text style={styles.bodyText}>No additional content available for this research.</Text>
          <View style={styles.footer}>
            <Text>AI Research Assistant</Text>
            <Text>Page 2</Text>
          </View>
        </Page>
      )}
    </Document>
  );
};
