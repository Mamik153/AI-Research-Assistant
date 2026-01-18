import type {
    ResearchJobResponse,
    ResearchResultResponse,
    ResearchSubmissionRequest,
    ApiError
} from '../types/research';

const API_BASE_URL = 'http://localhost:8000/api';

// Helper function to create ApiError objects
const createApiError = (message: string, status?: number, type: ApiError['type'] = 'network'): ApiError => ({
    message,
    status,
    type
});

// Helper function to handle fetch responses
const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

        try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
            // If we can't parse the error response, use the default message
        }

        throw createApiError(errorMessage, response.status, 'server');
    }

    try {
        return await response.json();
    } catch (error) {
        throw createApiError('Invalid response format from server', response.status, 'server');
    }
};

/**
 * Submit a research topic to start a new research job
 * @param topic - The research topic to submit
 * @returns Promise<ResearchJobResponse> - The job details including job_id
 * @throws ApiError - When the request fails
 */
export const submitResearch = async (topic: string): Promise<ResearchJobResponse> => {
    if (!topic.trim()) {
        throw createApiError('Research topic cannot be empty', undefined, 'validation');
    }

    const requestBody: ResearchSubmissionRequest = { topic: topic.trim() };

    try {
        const useDynamic = import.meta.env.VITE_USE_DYNAMIC_UI === 'true';
        const endpoint = useDynamic ? `${API_BASE_URL}/research/dynamic` : `${API_BASE_URL}/research`;

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        return await handleResponse<ResearchJobResponse>(response);
    } catch (error) {
        if (error instanceof TypeError) {
            // Network error (fetch failed)
            throw createApiError('Unable to connect to the research service. Please check your connection.', undefined, 'network');
        }

        if (error && typeof error === 'object' && 'type' in error) {
            // Re-throw ApiError objects
            throw error;
        }

        // Unknown error
        throw createApiError('An unexpected error occurred while submitting research', undefined, 'network');
    }
};

/**
 * Get the current status of a research job
 * @param jobId - The job ID to check status for
 * @returns Promise<ResearchJobResponse> - The current job status and details
 * @throws ApiError - When the request fails
 */
export const getJobStatus = async (jobId: string): Promise<ResearchJobResponse> => {
    if (!jobId.trim()) {
        throw createApiError('Job ID cannot be empty', undefined, 'validation');
    }

    try {
        const response = await fetch(`${API_BASE_URL}/research/${encodeURIComponent(jobId)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await handleResponse<ResearchJobResponse>(response);
    } catch (error) {
        if (error instanceof TypeError) {
            // Network error (fetch failed)
            throw createApiError('Unable to connect to the research service. Please check your connection.', undefined, 'network');
        }

        if (error && typeof error === 'object' && 'type' in error) {
            // Re-throw ApiError objects
            throw error;
        }

        // Unknown error
        throw createApiError('An unexpected error occurred while checking job status', undefined, 'network');
    }
};

/**
 * Poll job status with automatic retry and interval management
 * @param jobId - The job ID to poll
 * @param onStatusUpdate - Callback function called with each status update
 * @param intervalMs - Polling interval in milliseconds (default: 3000)
 * @returns Object with stop function to cancel polling
 */
export const pollJobStatus = (
    jobId: string,
    onStatusUpdate: (status: ResearchJobResponse) => void,
    intervalMs: number = 3000
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
            // Pass error to callback as a failed status
            const errorStatus: ResearchJobResponse = {
                job_id: jobId,
                status: 'failed',
                created_at: new Date().toISOString(),
                message: error && typeof error === 'object' && 'message' in error
                    ? (error as ApiError).message
                    : 'Failed to check job status'
            };
            onStatusUpdate(errorStatus);
        }
    };

    // Start polling immediately
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
};/**
 *
 Get the completed research result for a job
 * @param jobId - The job ID to get results for
 * @returns Promise<ResearchResultResponse> - The research result with report content
 * @throws ApiError - When the request fails or result is not available
 */
export const getResearchResult = async (jobId: string): Promise<ResearchResultResponse> => {
    if (!jobId.trim()) {
        throw createApiError('Job ID cannot be empty', undefined, 'validation');
    }

    try {
        const useDynamic = import.meta.env.VITE_USE_DYNAMIC_UI === 'true';
        // For dynamic: /research/dynamic/:jobId/result
        // For legacy: /research/:jobId/result
        const endpoint = useDynamic
            ? `${API_BASE_URL}/research/dynamic/${encodeURIComponent(jobId)}/result`
            : `${API_BASE_URL}/research/${encodeURIComponent(jobId)}/result`;

        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return await handleResponse<ResearchResultResponse>(response);
    } catch (error) {
        if (error instanceof TypeError) {
            // Network error (fetch failed)
            throw createApiError('Unable to connect to the research service. Please check your connection.', undefined, 'network');
        }

        if (error && typeof error === 'object' && 'type' in error) {
            // Re-throw ApiError objects
            throw error;
        }

        // Unknown error
        throw createApiError('An unexpected error occurred while retrieving research results', undefined, 'network');
    }
};