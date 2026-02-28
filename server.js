import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000';
const API_KEY = process.env.API_KEY || '';

if (!API_KEY) {
  console.warn('⚠️  API_KEY is not set. Proxied requests will not include authentication.');
}

// Proxy /api and /static to the backend, injecting the Authorization header
const proxyOptions = {
  target: API_BASE_URL,
  changeOrigin: true,
  on: {
    proxyReq: (proxyReq) => {
      if (API_KEY) {
        proxyReq.setHeader('X-API-Key', API_KEY);
      }
    },
  },
};

app.use('/api', createProxyMiddleware(proxyOptions));
app.use('/static', createProxyMiddleware(proxyOptions));

// Serve the built frontend
app.use(express.static(path.join(__dirname, 'dist')));

// SPA fallback — serve index.html for all non-API routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 BFF server running on http://localhost:${PORT}`);
  console.log(`   Proxying API requests to ${API_BASE_URL}`);
});
