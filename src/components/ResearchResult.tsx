import type { JSX } from 'react';
import type { ResearchResultProps } from '../types/research';
import './ResearchResult.css';
import { BadgePlus, Copy, Download } from 'lucide-react';

/**
 * Enhanced markdown rendering function
 * Handles headers, lists, bold, italic, code blocks, and links
 */
const renderMarkdownContent = (content: string) => {

  
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentListItems: string[] = [];
    let inCodeBlock = false;
    let codeBlockContent: string[] = [];
    let codeBlockLanguage = '';

    const flushList = () => {
        if (currentListItems.length > 0) {
            elements.push(
                <ul key={`list-${elements.length}`} className="research-result__report-list">
                    {currentListItems.map((item, idx) => (
                        <li key={idx} className="research-result__report-list-item">
                            {renderInlineMarkdown(item)}
                        </li>
                    ))}
                </ul>
            );
            currentListItems = [];
        }
    };

    const flushCodeBlock = () => {
        if (codeBlockContent.length > 0) {
            elements.push(
                <pre key={`code-${elements.length}`} className="research-result__report-code-block">
                    <code className={`language-${codeBlockLanguage}`}>
                        {codeBlockContent.join('\n')}
                    </code>
                </pre>
            );
            codeBlockContent = [];
            codeBlockLanguage = '';
        }
    };

    lines.forEach((line, index) => {
        // Handle code blocks
        if (line.startsWith('```')) {
            if (inCodeBlock) {
                flushCodeBlock();
                inCodeBlock = false;
            } else {
                flushList();
                inCodeBlock = true;
                codeBlockLanguage = line.substring(3).trim();
            }
            return;
        }

        if (inCodeBlock) {
            codeBlockContent.push(line);
            return;
        }

        // Handle empty lines
        if (line.trim() === '') {
            flushList();
            elements.push(<br key={`br-${index}`} />);
            return;
        }

        // Handle headers
        if (line.startsWith('#')) {
            flushList();
            const level = line.match(/^#+/)?.[0].length || 1;
            const text = line.replace(/^#+\s*/, '');
            const HeaderTag = `h${Math.min(level + 2, 6)}` as keyof JSX.IntrinsicElements;
            
            elements.push(
                <HeaderTag 
                    key={`header-${index}`} 
                    className={`research-result__report-header research-result__report-header--h${level}`}
                >
                    {renderInlineMarkdown(text)}
                </HeaderTag>
            );
            return;
        }

        // Handle numbered lists
        if (line.match(/^\d+\.\s/)) {
            flushList();
            const text = line.replace(/^\d+\.\s/, '');
            if (currentListItems.length === 0) {
                // Start new numbered list
                elements.push(
                    <ol key={`ol-${index}`} className="research-result__report-ordered-list">
                        <li className="research-result__report-list-item">
                            {renderInlineMarkdown(text)}
                        </li>
                    </ol>
                );
            }
            return;
        }

        // Handle bullet points
        if (line.startsWith('- ') || line.startsWith('* ')) {
            const text = line.substring(2);
            currentListItems.push(text);
            return;
        }

        // Handle blockquotes
        if (line.startsWith('> ')) {
            flushList();
            const text = line.substring(2);
            elements.push(
                <blockquote key={`quote-${index}`} className="research-result__report-blockquote">
                    {renderInlineMarkdown(text)}
                </blockquote>
            );
            return;
        }

        // Regular paragraphs
        flushList();
        elements.push(
            <p key={`p-${index}`} className="research-result__report-paragraph">
                {renderInlineMarkdown(line)}
            </p>
        );
    });

    // Flush any remaining items
    flushList();
    flushCodeBlock();

    return elements;
};

/**
 * Render inline markdown elements (bold, italic, code, links)
 */
const renderInlineMarkdown = (text: string): (string | JSX.Element)[] => {
    const elements: (string | JSX.Element)[] = [];
    let currentText = text;
    let elementIndex = 0;

    // Handle inline code first (to avoid conflicts with other formatting)
    currentText = currentText.replace(/`([^`]+)`/g, (_, code) => {
        const placeholder = `__CODE_${elementIndex}__`;
        elements.push(
            <code key={`code-${elementIndex}`} className="research-result__report-inline-code">
                {code}
            </code>
        );
        elementIndex++;
        return placeholder;
    });

    // Handle bold text
    currentText = currentText.replace(/\*\*([^*]+)\*\*/g, (_, boldText) => {
        const placeholder = `__BOLD_${elementIndex}__`;
        elements.push(
            <strong key={`bold-${elementIndex}`} className="research-result__report-bold">
                {boldText}
            </strong>
        );
        elementIndex++;
        return placeholder;
    });

    // Handle italic text
    currentText = currentText.replace(/\*([^*]+)\*/g, (_, italicText) => {
        const placeholder = `__ITALIC_${elementIndex}__`;
        elements.push(
            <em key={`italic-${elementIndex}`} className="research-result__report-italic">
                {italicText}
            </em>
        );
        elementIndex++;
        return placeholder;
    });

    // Handle links
    currentText = currentText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, linkText, url) => {
        const placeholder = `__LINK_${elementIndex}__`;
        elements.push(
            <a 
                key={`link-${elementIndex}`} 
                href={url} 
                className="research-result__report-link"
                target="_blank" 
                rel="noopener noreferrer"
            >
                {linkText}
            </a>
        );
        elementIndex++;
        return placeholder;
    });

    // Split by placeholders and reconstruct
    const parts = currentText.split(/(__(?:CODE|BOLD|ITALIC|LINK)_\d+__)/);
    const result: (string | JSX.Element)[] = [];

    parts.forEach(part => {
        const match = part.match(/__(?:CODE|BOLD|ITALIC|LINK)_(\d+)__/);
        if (match) {
            const index = parseInt(match[1]);
            result.push(elements[index]);
        } else if (part) {
            result.push(part);
        }
    });

    return result.length > 0 ? result : [text];
};

/**
 * ResearchResult component for displaying completed research reports
 * Shows research content, metadata, and provides actions for new research
 */
export const ResearchResult = ({ result, onNewResearch }: ResearchResultProps) => {
    if (!result) {
        return null;
    }

    const formattedCompletedAt = new Date(result.completedAt).toLocaleString();
    const formattedDate = new Date(result.completedAt).toLocaleDateString();
    const formattedTime = new Date(result.completedAt).toLocaleTimeString();

    // Handle copy to clipboard
    const handleCopyReport = async () => {
        try {
            await navigator.clipboard.writeText(result.report);
            // You could add a toast notification here
            console.log('Report copied to clipboard');
        } catch (err) {
            console.error('Failed to copy report:', err);
        }
    };

    // Handle download as text file
    const handleDownloadReport = () => {
        const blob = new Blob([result.report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `research-report-${result.topic.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${formattedDate}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="research-result">
            <div className="research-result__header hidden">
                <div className="research-result__status-badge">
                    <span className="research-result__status-icon">✅</span>
                    <span className="research-result__status-text">Research Complete</span>
                </div>
                
                <div className="research-result__metadata">
                    <div className="research-result__topic">
                        <h2 className="research-result__topic-title">
                            Research Report: {result.topic}
                        </h2>
                    </div>
                    
                    <div className="research-result__details">
                        <div className="research-result__detail-item">
                            <span className="research-result__detail-label">Job ID:</span>
                            <code className="research-result__detail-value">{result.jobId}</code>
                        </div>
                        <div className="research-result__detail-item">
                            <span className="research-result__detail-label">Completed:</span>
                            <span className="research-result__detail-value">
                                {formattedDate} at {formattedTime}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="research-result__actions justify-end bg-gray-900 sticky top-0 hidden">
                <button
                    onClick={handleCopyReport}
                    className="research-result__action-btn research-result__action-btn--secondary"
                    title="Copy report to clipboard"
                >
                    📋 Copy Report
                </button>
                <button
                    onClick={handleDownloadReport}
                    className="research-result__action-btn research-result__action-btn--secondary"
                    title="Download report as text file"
                >
                    💾 Download
                </button>
                <button
                    onClick={onNewResearch}
                    className="research-result__action-btn research-result__action-btn--primary"
                >
                    🔍 New Research
                </button>
            </div>

            <div className="research-result__content text-white">
                <div className="research-result__content-header hidden">
                    <h3 className="research-result__content-title">Research Report</h3>
                    <div className="research-result__content-info">
                        Report generated on {formattedCompletedAt}
                    </div>
                </div>
                
                <div className="research-result__report">
                    <div className="research-result__report-content text-slate-300">
                        {renderMarkdownContent(result.report)}
                    </div>
                    <div className="research-result__report-content-footer mt-2 gap-2 flex items-center">
                        <button onClick={onNewResearch} className="research-result__report-content-footer-btn p-2 rounded-md hover:bg-gray-700/20">
                            <BadgePlus className="w-4 h-4" />
                        </button>
                        <button onClick={handleCopyReport} className="research-result__report-content-footer-btn p-2 rounded-md hover:bg-gray-700/20">
                            <Copy className="w-4 h-4" />
                        </button>
                        <button onClick={handleDownloadReport} className="research-result__report-content-footer-btn p-2 rounded-md hover:bg-gray-700/20">
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};