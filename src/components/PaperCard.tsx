import { Calendar, Users, ExternalLink, FileText } from 'lucide-react';
import type { ResearchPaper } from '../types/research';

interface PaperCardProps {
    paper: ResearchPaper;
    index: number;
    onReadAbstract: () => void;
}

export const PaperCard = ({ paper, index, onReadAbstract }: PaperCardProps) => {
    // Format date if possible
    const formattedDate = paper.published
        ? new Date(paper.published).toLocaleDateString()
        : 'Unknown Date';

    return (
        <div
            className="group relative bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 hover:bg-gray-900/60 transition-all duration-300 flex flex-col h-full"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={onReadAbstract}
        >
            {/* Gradient accent top */}
            {/* <div className="h-1 w-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 opacity-50 group-hover:opacity-100 transition-opacity"></div> */}

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-100 leading-tight group-hover:text-blue-400 transition-colors">
                            {paper.title}
                        </h4>
                    </div>
                </div>

                <div className="flex flex-wrap gap-y-2 gap-x-4 mb-4 text-xs text-gray-500 font-medium uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[150px]">
                            {paper.authors.length > 0 ? paper.authors.join(', ') : 'Unknown Authors'}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formattedDate}</span>
                    </div>
                </div>

                <div className=" mb-6 flex-grow">
                    <div className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                        {paper.summary}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800/50">

                    <button
                        onClick={onReadAbstract}
                        className="text-xs font-medium text-gray-100 hover:text-white flex items-center gap-1 transition-colors px-3 py-1.5 rounded-md hover:bg-gray-100/10 border border-transparent hover:border-gray-300"
                    >
                        Read Abstract <FileText className="w-3 h-3" />
                    </button>

                    <a
                        href={paper.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-lg transition-all"
                    >
                        View PDF <ExternalLink className="w-3 h-3" />
                    </a>
                </div>
            </div>
        </div>
    );
};
