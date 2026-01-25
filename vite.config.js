import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Source files are in /public, output goes to /dist
  root: 'public',
  
  build: {
    // Output to /dist (relative to project root, not /public)
    outDir: '../dist',
    emptyOutDir: true,
    
    // Generate source maps for debugging
    sourcemap: true,
    
    // Rollup options for code splitting
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html'),
        // Auth callback needs its own entry point
        'auth-callback': resolve(__dirname, 'public/auth/callback/index.html'),
      },
    },
  },
  
  // Dev server settings
  server: {
    port: 3000,
    // Proxy API requests to wrangler dev server
    proxy: {
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
  
  // Resolve aliases (optional, but nice for cleaner imports)
  resolve: {
    alias: {
      '@': resolve(__dirname, 'public'),
    },
  },
});
