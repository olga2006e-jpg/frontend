// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,
//   },
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
        proxy: {
      '/api': {
        target: 'http://localhost:8000', // <-- укажи порт твоего бэкенда
        changeOrigin: true,
        secure: false,
      },
      '/medialab1': {
        target: 'http://localhost:9000', // MinIO уже на 9000 порту
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
