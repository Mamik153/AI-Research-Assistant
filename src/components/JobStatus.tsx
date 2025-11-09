import type { JobStatusProps } from '../types/research';
import './JobStatus.css';

/**
 * Categorizes error messages and provides appropriate titles
 */
const getErrorTitle = (message: string): string => {
    if (!message) return 'Research Failed';

    const lowerMessage = message.toLowerCase();

    // HTTP Status Code errors
    if (lowerMessage.includes('404') || lowerMessage.includes('not found')) {
        return 'Service Not Found';
    }
    if (lowerMessage.includes('500') || lowerMessage.includes('internal server error')) {
        return 'Server Error';
    }
    if (lowerMessage.includes('502') || lowerMessage.includes('bad gateway')) {
        return 'Service Unavailable';
    }
    if (lowerMessage.includes('503') || lowerMessage.includes('service unavailable')) {
        return 'Service Temporarily Unavailable';
    }
    if (lowerMessage.includes('401') || lowerMessage.includes('unauthorized')) {
        return 'Authentication Required';
    }
    if (lowerMessage.includes('403') || lowerMessage.includes('forbidden')) {
        return 'Access Denied';
    }

    // Application-specific errors
    if (lowerMessage.includes('authentication') || lowerMessage.includes('api_key') || lowerMessage.includes('openai_api_key')) {
        return 'API Configuration Error';
    }
    if (lowerMessage.includes('network') || lowerMessage.includes('connection') || lowerMessage.includes('timeout')) {
        return 'Connection Error';
    }
    if (lowerMessage.includes('rate limit') || lowerMessage.includes('quota')) {
        return 'API Limit Reached';
    }
    if (lowerMessage.includes('invalid') || lowerMessage.includes('validation')) {
        return 'Invalid Request';
    }

    return 'Research Failed';
};

/**
 * Provides user-friendly error messages based on error type
 */
const getErrorMessage = (message: string): string => {
    if (!message) {
        return 'The research job failed to complete. Please try again with a different topic or check your connection.';
    }

    const lowerMessage = message.toLowerCase();

    // HTTP Status Code errors
    if (lowerMessage.includes('404') || lowerMessage.includes('not found')) {
        return 'The research service endpoint could not be found. The service may not be running or the URL may be incorrect.';
    }
    if (lowerMessage.includes('500') || lowerMessage.includes('internal server error')) {
        return 'The research service encountered an internal error. This is a server-side issue that needs to be resolved by the service administrator.';
    }
    if (lowerMessage.includes('502') || lowerMessage.includes('bad gateway')) {
        return 'The research service is currently unavailable. The server may be down or experiencing connectivity issues.';
    }
    if (lowerMessage.includes('503') || lowerMessage.includes('service unavailable')) {
        return 'The research service is temporarily unavailable, possibly due to maintenance or high load.';
    }
    if (lowerMessage.includes('401') || lowerMessage.includes('unauthorized')) {
        return 'Authentication is required to access the research service. Please check your credentials.';
    }
    if (lowerMessage.includes('403') || lowerMessage.includes('forbidden')) {
        return 'Access to the research service is denied. You may not have the required permissions.';
    }

    // Application-specific errors
    if (lowerMessage.includes('authentication') || lowerMessage.includes('api_key') || lowerMessage.includes('openai_api_key')) {
        return 'The research service is not properly configured with API credentials. This is a server configuration issue.';
    }
    if (lowerMessage.includes('network') || lowerMessage.includes('connection') || lowerMessage.includes('timeout')) {
        return 'Unable to connect to the research service. Please check your internet connection and try again.';
    }
    if (lowerMessage.includes('rate limit') || lowerMessage.includes('quota')) {
        return 'The research service has reached its usage limit. Please try again later.';
    }
    if (lowerMessage.includes('invalid') || lowerMessage.includes('validation')) {
        return 'The research request was invalid. Please try with a different topic.';
    }

    // For other errors, show the original message but clean it up
    return message.replace(/^Research failed:\s*/i, '').trim();
};

/**
 * Provides helpful guidance based on error type
 */
const getErrorHelp = (message: string): string | null => {
    if (!message) return null;

    const lowerMessage = message.toLowerCase();

    // HTTP Status Code errors
    if (lowerMessage.includes('404') || lowerMessage.includes('not found')) {
        return 'Verify that the research service is running on localhost:8000 and that the API endpoints are correctly configured.';
    }
    if (lowerMessage.includes('500') || lowerMessage.includes('internal server error')) {
        return 'Check the server logs for detailed error information. This usually indicates a bug in the server code or a configuration issue.';
    }
    if (lowerMessage.includes('502') || lowerMessage.includes('bad gateway')) {
        return 'Ensure the research service is running and accessible. Check if there are any proxy or load balancer issues.';
    }
    if (lowerMessage.includes('503') || lowerMessage.includes('service unavailable')) {
        return 'Wait a few minutes and try again. If the problem persists, contact your system administrator.';
    }
    if (lowerMessage.includes('401') || lowerMessage.includes('unauthorized')) {
        return 'Check that your authentication credentials are valid and properly configured in the application.';
    }
    if (lowerMessage.includes('403') || lowerMessage.includes('forbidden')) {
        return 'Contact your administrator to verify that your account has the necessary permissions to use the research service.';
    }

    // Application-specific errors
    if (lowerMessage.includes('authentication') || lowerMessage.includes('api_key') || lowerMessage.includes('openai_api_key')) {
        return 'Contact your system administrator to configure the OpenAI API key in the server environment variables.';
    }
    if (lowerMessage.includes('network') || lowerMessage.includes('connection') || lowerMessage.includes('timeout')) {
        return 'Check that the research service is running on localhost:8000 and your internet connection is stable.';
    }
    if (lowerMessage.includes('rate limit') || lowerMessage.includes('quota')) {
        return 'Wait a few minutes before trying again, or contact your administrator about increasing API limits.';
    }
    if (lowerMessage.includes('invalid') || lowerMessage.includes('validation')) {
        return 'Try rephrasing your research topic or make it more specific.';
    }

    return null;
};

/**
 * JobStatus component for displaying research job progress
 * Shows current status with appropriate messages and loading indicators
 */
export const JobStatus = ({ jobId, status, message, createdAt }: JobStatusProps) => {
    if (!jobId || status === 'idle') {
        return null;
    }

    // Get status-specific styling and content
    const getStatusInfo = () => {
        switch (status) {
            case 'submitting':
                return {
                    className: 'job-status--submitting',
                    icon: '📤',
                    title: 'Submitting Research Request',
                    showSpinner: true
                };
            case 'pending':
                return {
                    className: 'job-status--pending',
                    icon: '⏳',
                    title: 'Research Queued',
                    showSpinner: true
                };
            case 'running':
                return {
                    className: 'job-status--running',
                    icon: '🔍',
                    title: 'Research in Progress',
                    showSpinner: true
                };
            case 'completed':
                return {
                    className: 'job-status--completed',
                    icon: '✅',
                    title: 'Research Completed',
                    showSpinner: false
                };
            case 'failed':
                return {
                    className: 'job-status--failed',
                    icon: '❌',
                    title: 'Research Failed',
                    showSpinner: false
                };
            default:
                return {
                    className: 'job-status--unknown',
                    icon: '❓',
                    title: 'Unknown Status',
                    showSpinner: false
                };
        }
    };

    const statusInfo = getStatusInfo();
    const formattedDate = createdAt ? new Date(createdAt).toLocaleString() : '';
    

    if(status === 'failed') {
        console.error('Research failed:', message);
    }

    if(status === 'completed') {
        console.log('Research completed:', message);
        return null
    }

    return (
        <div className={`job-status !m-4 ${statusInfo.className}`} role="status" aria-live="polite">
            <div className="job-status__header">
                <div className="job-status__icon-container">
                    <span className="job-status__icon" aria-hidden="true">
                        {statusInfo.icon}
                    </span>
                    {statusInfo.showSpinner && (
                        <div className="job-status__spinner" aria-hidden="true">
                            <div className="job-status__spinner-circle"></div>
                        </div>
                    )}
                </div>
                <div className="job-status__title-container">
                    <h3 className="job-status__title">{statusInfo.title}</h3>
                    {formattedDate && (
                        <div className="job-status__timestamp">
                            Started: {formattedDate}
                        </div>
                    )}
                </div>
            </div>

            <div className="job-status__content">
                <div className="job-status__message">
                    {message}
                </div>

                <div className="job-status__details">
                    <div className="job-status__job-id">
                        <span className="job-status__label">Job ID:</span>
                        <code className="job-status__code">{jobId}</code>
                    </div>
                </div>
            </div>

            {/* Progress bar for active states */}
            {statusInfo.showSpinner && (
                <div className="job-status__progress">
                    <div className="job-status__progress-bar">
                        <div className="job-status__progress-fill"></div>
                    </div>
                    <div className="job-status__progress-text">
                        {status === 'submitting' && 'Initializing research crew...'}
                        {status === 'pending' && 'Waiting for research crew to start...'}
                        {status === 'running' && 'AI agents are researching your topic...'}
                    </div>
                </div>
            )}

            {/* Error handling for failed status */}
            {status === 'failed' && (
                <div className="job-status__error">
                    <div className="job-status__error-header">
                        <span className="job-status__error-icon">⚠️</span>
                        <span className="job-status__error-title">{getErrorTitle(message)}</span>
                    </div>
                    <div className="job-status__error-message">
                        {getErrorMessage(message)}
                    </div>
                    {getErrorHelp(message) && (
                        <div className="job-status__error-help">
                            <div className="job-status__error-help-title">💡 How to fix this:</div>
                            <div className="job-status__error-help-content">
                                {getErrorHelp(message)}
                            </div>
                        </div>
                    )}
                    <div className="job-status__error-actions">
                        <button
                            className="job-status__retry-btn"
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};