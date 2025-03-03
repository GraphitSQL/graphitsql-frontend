import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    commonjsOptions: { transformMixedEsModules: true },
  },
  server: {
    port: Number(env.VITE_APP_PORT) || 5173,
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
