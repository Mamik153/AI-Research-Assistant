import type { ResearchResultProps } from "../types/result.types";
import { MarkdownResearchResult } from "./MarkdownResearchResult";
import { DynamicResearchResult } from "./DynamicResearchResult";
import { config } from "@/shared/config/env";

/**
 * ResearchResult component that switches between Legacy Markdown and Dynamic UI
 * based on environment variable and data availability.
 */
export const ResearchResult = ({ result }: ResearchResultProps) => {
  const useDynamicUI = config.useDynamicUI;

  // Check if we have structured data available
  const hasStructuredData =
    result && (result.summary || (result.papers && result.papers.length > 0));

  // If Dynamic UI is enabled AND we have the data for it, render Dynamic
  if (useDynamicUI && hasStructuredData) {
    return <DynamicResearchResult result={result} />;
  }

  // Otherwise fallback to Legacy Markdown (or if only markdown report exists)
  return <MarkdownResearchResult result={result} />;
};
