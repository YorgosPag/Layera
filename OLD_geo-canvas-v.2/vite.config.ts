import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Προωθεί τις αιτήσεις /api στον backend server
      '/api': {
        target: 'http://127.0.0.1:3001', // Changed from localhost to 127.0.0.1 for reliability
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
