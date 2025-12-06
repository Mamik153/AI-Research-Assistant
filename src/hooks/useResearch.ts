import { useState } from 'react';
import type { ResearchResult, StructuredResearchData } from '../types/research';
import { performResearch, structureResearchData } from '../services/geminiService';

/**
 * Hook for managing research state and operations
 */
export const useResearch = () => {
  const [isResearching, setIsResearching] = useState(false);
  const [researchResult, setResearchResult] = useState<any | null>(null);
  const [structuredData, setStructuredData] = useState<StructuredResearchData | null>(null);

  const executeResearch = async (topic: string) => {
    if (!topic.trim()) return;

    setIsResearching(true);

    try {
      // Step 1: Get Content + Search Data
      const result = await performResearch(topic);
      setResearchResult(result);

      // Step 2: Structure Data for Tools
      const structured = await structureResearchData(result.rawText);
      setStructuredData(structured);
    } catch (error) {
      console.error("Research flow failed", error);
      alert("Something went wrong during research. Please check your API configuration.");
      throw error;
    } finally {
      setIsResearching(false);
    }
  };

  const resetResearch = () => {
    setResearchResult(null);
    setStructuredData(null);
  };

  return {
    isResearching,
    researchResult,
    structuredData,
    executeResearch,
    resetResearch,
  };
};
