import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import mkcert from 'vite-plugin-mkcert';
import fs from 'node:fs';
import path from 'node:path';

const REPO_NAME = 'frontend';

const CERT_KEY = path.resolve(__dirname, 'cert.key');
const CERT_CRT = path.resolve(__dirname, 'cert.crt');
const hasCerts = fs.existsSync(CERT_KEY) && fs.existsSync(CERT_CRT);

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? `/${REPO_NAME}/`,

  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      includeAssets: ['favicon.svg', 'logo192.png', 'logo512.png'],
      manifest: {
        name: 'Логистика.Про',
        short_name: 'Логистика',
        description: 'Сервис подбора транспорта и логистики',
        start_url: './',
        scope: './',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#1A3C8F',
        icons: [
          {
            src: 'logo192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'logo512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],

  server: {
    port: 5173,
    host: '0.0.0.0',
    ...(hasCerts
      ? {
          https: {
            key: fs.readFileSync(CERT_KEY),
            cert: fs.readFileSync(CERT_CRT),
          },
        }
      : {}),
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
      '/medialab1': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
