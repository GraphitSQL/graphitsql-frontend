import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(({mode})=> {
  const env = loadEnv(mode, process.cwd());

  const allowedHostList: string[] = JSON.parse(env.VITE_APP_ALLOWED_HOSTS ?? "[]");

  const allowedHosts = allowedHostList?.length ? allowedHostList : undefined;

  return {
    base: env.VITE_APP_BASENAME ?? '/',
    plugins: [react(), tsconfigPaths()],
    build: {
      commonjsOptions: { transformMixedEsModules: true },
    },
    server: {
      port: Number(env.VITE_APP_PORT) || 5173,
      cors: {
        origin: true,
        preflightContinue: true,
      },
      host: true,
      strictPort: true,
      allowedHosts
    },
    preview: {
      port: Number(env.VITE_APP_PORT) || 4173,
      cors: {
        origin: true,
        preflightContinue: true,
      },
      host: true,
      strictPort: true,
      allowedHosts
    },
    publicDir: 'public',
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  }
});
