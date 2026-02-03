import { useState } from 'react';
import type { ResearchResultProps } from '../types/research';
import { ResearchHero } from './ResearchHero';
import { ResearchSummary } from './ResearchSummary';
import { KeyInsights } from './KeyInsights';
import { PapersGrid } from './PapersGrid';
import { DiagramViewer } from './DiagramViewer';
import { StructuredSectionsGrid } from './StructuredSectionsGrid';
import { Download, RefreshCw, Loader2 } from 'lucide-react';
import { downloadResearchPDF } from '../utils/generatePDF';

export const DynamicResearchResult = ({ result, onNewResearch }: ResearchResultProps) => {
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
                    <button
                        onClick={onNewResearch}
                        className="px-4 py-2 bg-blue-600 rounded-lg text-white text-sm hover:bg-blue-700 transition"
                    >
                        Try New Research
                    </button>
                </div>
            </div>
        );
    }

    const diagrams =
        result.generatedDiagrams?.length ?
            result.generatedDiagrams
        : result.parsedSummary?.generated_diagrams ?? [];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 animate-in fade-in duration-500">
            {/* Hero Section */}
            <ResearchHero result={result} />

            {/* Main Content */}
            <div className="space-y-8">
                {result.summary && (
                    <ResearchSummary summary={result.summary} />
                )}

                {diagrams.length > 0 && (
                    <DiagramViewer diagrams={diagrams} />
                )}

                {result.keyInsights && result.keyInsights.length > 0 && (
                    <KeyInsights insights={result.keyInsights} />
                )}

                {result.parsedSummary?.structured_sections && (
                    <StructuredSectionsGrid sections={result.parsedSummary.structured_sections} />
                )}
            </div>

            {/* Full Width: Papers Grid */}
            <div className="mt-8">
                {result.papers && (
                    <PapersGrid papers={result.papers} />
                )}
            </div>

            {/* Actions Footer */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-50">
                <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 text-white rounded-full px-2 py-2 shadow-2xl flex items-center gap-2">
                    <button
                        onClick={onNewResearch}
                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                    >
                        <RefreshCw className="w-4 h-4" />
                        New Research
                    </button>

                    <div className="w-px h-6 bg-gray-700 mx-1"></div>

                    <button
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-700/50 text-gray-300 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Download Report (PDF)"
                        disabled={isDownloading}
                        onClick={async () => {
                            if (isDownloading) return;
                            setIsDownloading(true);
                            try {
                                await downloadResearchPDF(result);
                            } catch (err) {
                                console.error('PDF download failed:', err);
                                alert('Failed to generate PDF. Please try again.');
                            } finally {
                                setIsDownloading(false);
                            }
                        }}
                    >
                        {isDownloading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Download className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
