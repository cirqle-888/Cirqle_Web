import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Add other aliases here if needed based on your imports
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist', // Corrected from 'outDirt' to 'outDir' 
  },
  server: {
    port: 3000,
    open: true,
  },
});
