import { generatePdf } from '../utils/pdfUtils';

/**
 * Hook for PDF export functionality
 */
export const usePdfExport = () => {
  const exportToPdf = (topic: string) => {
    const filename = `${topic.replace(/\s+/g, '_')}_research.pdf`;
    generatePdf('research-content', filename);
  };

  return {
    exportToPdf,
  };
};
