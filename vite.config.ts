import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs';

export default defineConfig(({ mode }) => {
  // Load ALL env vars (including non-VITE_ ones) for server-side proxy use only
  const env = loadEnv(mode, '.', '');

  const apiBaseUrl = env.API_BASE_URL || 'http://localhost:8000';
  const apiKey = env.API_KEY || '';
  const siteUrl = env.VITE_APP_URL || 'http://localhost:5173';

  return {
    server: {
      port: 5173,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: apiBaseUrl,
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (apiKey) {
                proxyReq.setHeader('X-API-Key', apiKey);
              }
            });
          },
        },
        '/static': {
          target: apiBaseUrl,
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              if (apiKey) {
                proxyReq.setHeader('X-API-Key', apiKey);
              }
            });
          },
        },
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'inject-site-url',
        transformIndexHtml(html) {
          return html.replace(/__VITE_APP_URL__/g, siteUrl);
        },
        closeBundle() {
          const distDir = path.resolve(__dirname, 'dist');
          for (const file of ['robots.txt', 'sitemap.xml']) {
            const filePath = path.join(distDir, file);
            if (fs.existsSync(filePath)) {
              let content = fs.readFileSync(filePath, 'utf-8');
              content = content.replace(/__VITE_APP_URL__/g, siteUrl);
              fs.writeFileSync(filePath, content);
            }
          }
        },
      },
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('recharts')) return 'recharts';
              if (id.includes('mermaid')) return 'mermaid';
              if (id.includes('three') || id.includes('@react-three')) return 'three';
              if (id.includes('@react-pdf/renderer')) return 'react-pdf';
            }
          },
        },
      },
      chunkSizeWarningLimit: 600,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    }
  };
});
