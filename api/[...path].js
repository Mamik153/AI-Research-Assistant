// Vercel Serverless Function — proxies /api/* to the Railway backend
// and injects the X-API-Key header server-side.

export default async function handler(req, res) {
  const API_BASE_URL =
    process.env.API_BASE_URL ||
    'https://ai-research-assistant-backend-production-7c89.up.railway.app';
  const API_KEY = process.env.API_KEY || '';

  // Reconstruct the backend URL from the catch-all path segments
  // req.query.path is an array like ['research', 'dynamic']
  const pathSegments = req.query.path || [];
  const backendPath = `/api/${pathSegments.join('/')}`;
  const url = new URL(backendPath, API_BASE_URL);

  // Forward query parameters
  const queryString = new URL(req.url, `http://${req.headers.host}`).search;
  if (queryString) {
    url.search = queryString;
  }

  // Build headers, forwarding relevant ones from the original request
  const headers = {
    'Content-Type': req.headers['content-type'] || 'application/json',
  };

  if (API_KEY) {
    headers['X-API-Key'] = API_KEY;
  }

  try {
    const fetchOptions = {
      method: req.method,
      headers,
    };

    // Forward the body for non-GET/HEAD requests
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      fetchOptions.body =
        typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }

    const response = await fetch(url.toString(), fetchOptions);

    // Forward the status code and response headers
    res.status(response.status);

    // Forward content-type header
    const contentType = response.headers.get('content-type');
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }

    // Stream the response body
    const body = await response.text();
    res.send(body);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(502).json({
      error: 'Bad Gateway',
      message: 'Failed to reach the backend service.',
    });
  }
}
