// Vercel Serverless Function — proxies /api/* to your backend and injects the X-API-Key header server-side.
// For production: set API_BASE_URL and API_KEY in your Vercel (or equivalent) project environment.
// Default below is for local development only.

export default async function handler(req, res) {
  const API_BASE_URL =
    process.env.API_BASE_URL || 'http://localhost:8000';
  const API_KEY = process.env.API_KEY || '';

  // `req.url` from Vercel might be `/api/proxy?path=research/dynamic` or just `/api/something` depending on the rewrite.
  // We'll safely parse the actual requested URL to forward it.
  
  // Easiest approach given a rewrite `source: /api/(.*)`, `destination: /api/proxy.js`:
  // The Vercel function often receives the original URL in `req.url` (e.g., `/api/research/dynamic`).
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  
  // Reconstruct the target URL
  const targetUrl = new URL(requestUrl.pathname, API_BASE_URL);
  targetUrl.search = requestUrl.search; // Forward query params

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

    const response = await fetch(targetUrl.toString(), fetchOptions);

    // Forward the status code and response headers
    res.status(response.status);

    const contentType = response.headers.get('content-type');
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }

    if (contentType && contentType.includes('text/event-stream')) {
      // For SSE streaming, we must pipe the body to the client
      // instead of buffering it with await response.text()
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');
      
      const { Readable } = require('stream');
      if (response.body) {
         Readable.fromWeb(response.body).pipe(res);
         return; // Let the stream keep the response open
      }
    }

    const body = await response.text();
    res.send(body);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(502).json({
      error: 'Bad Gateway',
      message: 'Failed to reach the backend service.',
      details: error.message
    });
  }
}
