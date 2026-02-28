import type {
    ResearchJobResponse,
    ResearchResultResponse,
    ResearchSubmissionRequest,
    ApiError
} from '../types/research.types';
import { config } from '@/shared/config/env';

// All requests go to same origin — the BFF proxy handles routing and auth
const API_BASE_URL = '/api';

// Helper function to create ApiError objects
const createApiError = (message: string, status?: number, type: ApiError['type'] = 'network', code?: string): ApiError => ({
    message,
    status,
    type,
    code
});

// Helper function to handle fetch responses
const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        let errorCode: string | undefined;
        let errorType: ApiError['type'] = 'server';

        try {
            const errorData = await response.json();

            // Handle 422 validation errors (detail is an array of objects)
            if (response.status === 422 && Array.isArray(errorData.detail)) {
                errorMessage = errorData.detail[0]?.msg || 'Validation error';
                errorType = 'validation';
            } else {
                errorMessage = errorData.detail || errorData.message || errorData.error || errorMessage;
            }

            errorCode = errorData.code;
        } catch {
            // If we can't parse the error response, use the default message
        }

        // Map specific status codes to error types
        if (response.status === 401) {
            errorType = 'server';
            errorMessage = 'Authentication failed. Please check server configuration.';
        } else if (response.status === 413) {
            errorType = 'payload_too_large';
            errorMessage = 'Request payload is too large. Please shorten your topic.';
        } else if (response.status === 400) {
            errorType = 'validation';
        }

        throw createApiError(errorMessage, response.status, errorType, errorCode);
    }

    try {
        return await response.json();
    } catch {
        throw createApiError('Invalid response format from server', response.status, 'server');
    }
};

/**
 * Submit a research topic to start a new research job
 */
export const submitResearch = async (topic: string): Promise<ResearchJobResponse> => {
    const trimmedTopic = topic.trim();

    if (!trimmedTopic) {
        throw createApiError('Research topic cannot be empty', undefined, 'validation');
    }

    if (trimmedTopic.length < 3) {
        throw createApiError('Topic must be at least 3 characters', undefined, 'validation');
    }

    if (trimmedTopic.length > 500) {
        throw createApiError('Topic must be at most 500 characters', undefined, 'validation');
    }

    const requestBody: ResearchSubmissionRequest = { topic: trimmedTopic };

    try {
        const useDynamic = config.useDynamicUI;
        const endpoint = useDynamic ? `${API_BASE_URL}/research/dynamic` : `${API_BASE_URL}/research`;

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        console.log("API KEY", config.apiKey)

        console.log(response);

        return await handleResponse<ResearchJobResponse>(response);
    } catch (error) {
        if (error instanceof TypeError) {
            throw createApiError('Unable to connect to the research service. Please check your connection.', undefined, 'network');
        }

        if (error && typeof error === 'object' && 'type' in error) {
            throw error;
        }

        throw createApiError('An unexpected error occurred while submitting research', undefined, 'network');
    }
};

/**
 * Get the current status of a research job
 */
export const getJobStatus = async (jobId: string): Promise<ResearchJobResponse> => {
    if (!jobId.trim()) {
        throw createApiError('Job ID cannot be empty', undefined, 'validation');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/research/${encodeURIComponent(jobId)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        return await handleResponse<ResearchJobResponse>(response);
    } catch (error) {
        if (error instanceof TypeError) {
            throw createApiError('Unable to connect to the research service. Please check your connection.', undefined, 'network');
        }

        if (error && typeof error === 'object' && 'type' in error) {
            throw error;
        }

        throw createApiError('An unexpected error occurred while checking job status', undefined, 'network');
    }
};

/**
 * Poll job status with automatic retry and interval management
 */
export const pollJobStatus = (
    jobId: string,
    onStatusUpdate: (status: ResearchJobResponse) => void,
    intervalMs: number = 10000
): { stop: () => void } => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let isPolling = true;

    const poll = async () => {
        if (!isPolling) return;

        try {
            const status = await getJobStatus(jobId);
            onStatusUpdate(status);

            // Continue polling if job is still pending or running
            if (isPolling && (status.status === 'pending' || status.status === 'running')) {
                timeoutId = setTimeout(poll, intervalMs);
            }
        } catch (error) {
            const apiError = error as ApiError;
            const isTransient = apiError && (
                apiError.status === 429 ||
                apiError.status === 503 ||
                apiError.code === 'SERVER_BUSY' ||
                apiError.code === 'RATE_LIMIT_EXCEEDED'
            );

            if (isPolling && isTransient) {
                const transientMessage = apiError.message
                    ? `${apiError.message} (Retrying in background...)`
                    : 'Server is busy, retrying in background...';
                onStatusUpdate({
                    job_id: jobId,
                    status: 'running',
                    created_at: new Date().toISOString(),
                    message: transientMessage
                });
                timeoutId = setTimeout(poll, intervalMs * 2);
                return;
            }

            const errorStatus: ResearchJobResponse = {
                job_id: jobId,
                status: 'failed',
                created_at: new Date().toISOString(),
                message: apiError && typeof apiError === 'object' && 'message' in apiError
                    ? apiError.message
                    : 'Failed to check job status'
            };
            onStatusUpdate(errorStatus);
        }
    };

    poll();

    return {
        stop: () => {
            isPolling = false;
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        }
    };
};

/**
 * Get the completed research result for a job
 */
export const getResearchResult = async (jobId: string): Promise<ResearchResultResponse> => {
    if (!jobId.trim()) {
        throw createApiError('Job ID cannot be empty', undefined, 'validation');
    }

    try {
        const useDynamic = config.useDynamicUI;
        const endpoint = useDynamic
            ? `${API_BASE_URL}/research/dynamic/${encodeURIComponent(jobId)}/result`
            : `${API_BASE_URL}/research/${encodeURIComponent(jobId)}/result`;

        const response = await fetch(endpoint, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        return await handleResponse<ResearchResultResponse>(response);
    } catch (error) {
        if (error instanceof TypeError) {
            throw createApiError('Unable to connect to the research service. Please check your connection.', undefined, 'network');
        }

        if (error && typeof error === 'object' && 'type' in error) {
            throw error;
        }

        throw createApiError('An unexpected error occurred while retrieving research results', undefined, 'network');
    }
};