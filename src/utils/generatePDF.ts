import { createElement } from 'react';
import { pdf } from '@react-pdf/renderer';
import { PDFReport } from '../components/PDFReport';
import type { ResearchResult } from '../types/research';

/**
 * Sanitize topic for use in filename (remove invalid characters)
 */
function sanitizeFilename(topic: string): string {
  return topic
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .slice(0, 60);
}

/**
 * Sanitize Mermaid code from API: fix common malformed edge labels.
 */
function sanitizeMermaidCode(code: string): string {
  return code
    .trim()
    .replace(/\|\s*>\s*/g, '| ');
}

/**
 * Convert SVG string to a data URI for embedding in PDF.
 * Uses base64 with UTF-8-safe encoding for unicode in SVG.
 */
function svgToDataUri(svg: string): string {
  const encoded = btoa(unescape(encodeURIComponent(svg)));
  return `data:image/svg+xml;base64,${encoded}`;
}

/**
 * Render Mermaid diagram strings to SVG data URIs for PDF embedding.
 * Returns array of data URIs; failed renders produce null (caller skips them).
 */
export async function renderMermaidDiagrams(diagramCodes: string[]): Promise<(string | null)[]> {
  if (!diagramCodes?.length) return [];
  const mermaid = (await import('mermaid')).default;
  mermaid.initialize({
    startOnLoad: false,
    theme: 'neutral',
    securityLevel: 'loose',
    flowchart: { useMaxWidth: true },
  });
  const results: (string | null)[] = [];
  for (let i = 0; i < diagramCodes.length; i++) {
    const code = diagramCodes[i];
    if (!code?.trim()) {
      results.push(null);
      continue;
    }
    const sanitized = sanitizeMermaidCode(code);
    const id = `pdf-mermaid-${i}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    try {
      const { svg } = await mermaid.render(id, sanitized);
      results.push(svgToDataUri(svg));
    } catch {
      results.push(null);
    }
  }
  return results;
}

/**
 * Generate and download research report as PDF
 */
export async function downloadResearchPDF(result: ResearchResult): Promise<void> {
  const diagrams =
    result.generatedDiagrams?.length
      ? result.generatedDiagrams
      : result.parsedSummary?.generated_diagrams ?? [];
  const diagramDataUris = await renderMermaidDiagrams(diagrams);
  const blob = await pdf(
    createElement(PDFReport, { result, diagramDataUris }) as never
  ).toBlob();
  const url = URL.createObjectURL(blob);
  const dateStr = new Date().toISOString().slice(0, 10);
  const filename = `research-report-${sanitizeFilename(result.topic)}-${dateStr}.pdf`;

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
