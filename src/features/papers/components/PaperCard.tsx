import { Calendar, Users, ExternalLink, FileText } from 'lucide-react';
import type { ResearchPaper } from '../types/paper.types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';

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
        <Card
            className="group relative bg-gray-900/40 backdrop-blur-sm border-gray-600 hover:border-gray-500 transition-all duration-300 h-full"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-gray-100 leading-tight line-clamp-2">
                    {paper.title}
                </CardTitle>
                <CardDescription className="flex flex-wrap gap-y-2 gap-x-4 text-xs text-gray-300 font-medium uppercase tracking-wider pt-2">
                    <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[150px]">
                            {paper.authors.length > 0 ? paper.authors.join(', ') : 'Unknown Authors'}
                        </span>
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formattedDate}</span>
                    </span>
                </CardDescription>
            </CardHeader>

            <CardContent className="pb-3 flex-grow">
                <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                    {paper.summary}
                </p>
            </CardContent>

            <CardFooter className="flex items-center justify-between gap-2 pt-4 border-t border-gray-700/50">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onReadAbstract}
                    className="text-gray-100 hover:text-white hover:bg-gray-100/10"
                >
                    <FileText className="w-3.5 h-3.5" />
                    Read Abstract
                </Button>

                <Button
                    variant="default"
                    size="sm"
                    asChild
                    className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 border-blue-500/30"
                >
                    <a
                        href={paper.pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        View PDF
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
};
