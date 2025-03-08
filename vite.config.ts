import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), tsconfigPaths(), tailwindcss()],
    build: {
      commonjsOptions: { transformMixedEsModules: true },
    },
    server: {
      port: Number(env.VITE_APP_PORT) || 5173,
      cors: {
        origin: true,
        preflightContinue: true,
      },
    },
    publicDir: 'public',
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  };
});
