import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// When running locally with Firebase Emulator, set VITE_API_URL in .env.local:
//   VITE_API_URL=http://localhost:5001/YOUR_PROJECT_ID/us-central1
// In production (Firebase Hosting), rewrites handle /api/* → functions automatically.

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Fallback proxy for local dev without Firebase Emulator
      '/api': {
        target: process.env.VITE_API_PROXY ?? 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
})
