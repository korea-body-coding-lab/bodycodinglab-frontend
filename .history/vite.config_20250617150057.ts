import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// npm install --save-dev @types/node

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // 필요하면 pathRewrite도 설정 가능
      }
    }
  }
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  }
})
