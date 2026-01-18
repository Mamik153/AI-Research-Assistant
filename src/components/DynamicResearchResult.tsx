import type { ResearchResultProps } from '../types/research';
import { ResearchHero } from './ResearchHero';
import { ResearchSummary } from './ResearchSummary';
import { KeyInsights } from './KeyInsights';
import { PapersGrid } from './PapersGrid';
import { Download, RefreshCw } from 'lucide-react';

export const DynamicResearchResult = ({ result, onNewResearch }: ResearchResultProps) => {
    if (!result) return null;

    const hasStructuredData = result.summary || (result.papers && result.papers.length > 0);

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

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 animate-in fade-in duration-500">
            {/* Hero Section */}
            <ResearchHero result={result} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column: Summary & Insights */}
                <div className="lg:col-span-12 xl:col-span-12 space-y-8">
                    {result.summary && (
                        <ResearchSummary summary={result.summary} />
                    )}

                    {result.keyInsights && (
                        <KeyInsights insights={result.keyInsights} />
                    )}
                </div>
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
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-700/50 text-gray-300 hover:text-white transition-colors"
                        title="Download Report"
                        onClick={() => {
                            // Simple text download for now, could be enhanced
                            const content = `Title: ${result.topic}\n\nSummary:\n${result.summary}\n\nInsights:\n${result.keyInsights?.join('\n- ')}\n\nPapers:\n${result.papers?.map(p => `- ${p.title} (${p.pdf_url})`).join('\n')}`;
                            const blob = new Blob([content], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `research-${result.topic.replace(/\s+/g, '-').toLowerCase()}.txt`;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                        }}
                    >
                        <Download className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};
