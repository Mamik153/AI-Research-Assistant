import { Calendar, Hash } from 'lucide-react';
import type { ResearchResult } from '../types/research';

interface ResearchHeroProps {
    result: ResearchResult;
}

export const ResearchHero = ({ result }: ResearchHeroProps) => {
    const formattedDate = new Date(result.completedAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="w-full mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8 shadow-2xl">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                            AI Research Report
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 tracking-tight leading-tight">
                            {result.topic}
                        </h1>
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-6 text-gray-400">
                    <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Hash className="w-4 h-4 text-gray-500" />
                        <span className="font-mono">{result.jobId.substring(0, 8)}...</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
