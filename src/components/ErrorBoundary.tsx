import { Component } from 'react';
import type { ReactNode } from 'react';
import type { ErrorBoundaryState } from '../types/research';
import './ErrorBoundary.css';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

/**
 * Error Boundary component to catch and handle unexpected errors
 * Provides fallback UI and error recovery options
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error details for debugging
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        
        // You could also log this to an error reporting service
        // logErrorToService(error, errorInfo);
    }

    handleRetry = () => {
        // Reset the error boundary state
        this.setState({ hasError: false, error: undefined });
    };

    handleReload = () => {
        // Reload the entire page
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            // Custom fallback UI
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default fallback UI
            return (
                <div className="error-boundary">
                    <div className="error-boundary__container">
                        <div className="error-boundary__icon">
                            ⚠️
                        </div>
                        
                        <div className="error-boundary__content">
                            <h1 className="error-boundary__title">
                                Something went wrong
                            </h1>
                            
                            <p className="error-boundary__message">
                                The AI Research Assistant encountered an unexpected error. 
                                This is likely a temporary issue.
                            </p>

                            {this.state.error && (
                                <details className="error-boundary__details">
                                    <summary className="error-boundary__details-summary">
                                        Technical Details
                                    </summary>
                                    <div className="error-boundary__error-info">
                                        <div className="error-boundary__error-name">
                                            <strong>Error:</strong> {this.state.error.name}
                                        </div>
                                        <div className="error-boundary__error-message">
                                            <strong>Message:</strong> {this.state.error.message}
                                        </div>
                                        {this.state.error.stack && (
                                            <div className="error-boundary__error-stack">
                                                <strong>Stack Trace:</strong>
                                                <pre className="error-boundary__stack-trace">
                                                    {this.state.error.stack}
                                                </pre>
                                            </div>
                                        )}
                                    </div>
                                </details>
                            )}

                            <div className="error-boundary__actions">
                                <button
                                    onClick={this.handleRetry}
                                    className="error-boundary__button error-boundary__button--primary"
                                >
                                    Try Again
                                </button>
                                
                                <button
                                    onClick={this.handleReload}
                                    className="error-boundary__button error-boundary__button--secondary"
                                >
                                    Reload Page
                                </button>
                            </div>

                            <div className="error-boundary__help">
                                <p className="error-boundary__help-text">
                                    If this problem persists, try:
                                </p>
                                <ul className="error-boundary__help-list">
                                    <li>Refreshing the page</li>
                                    <li>Clearing your browser cache</li>
                                    <li>Checking your internet connection</li>
                                    <li>Ensuring the research service is running on localhost:8000</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}