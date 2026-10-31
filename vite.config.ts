import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// 루트 도메인(예: nala-letter.pages.dev, letter.nalapilates.com)에 배포하는 기준입니다.
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
