import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import viteCompression from 'vite-plugin-compression';
import preload from 'vite-plugin-preload';
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const allowedHostList: string[] = JSON.parse(env.VITE_APP_ALLOWED_HOSTS ?? '[]');

  const allowedHosts = allowedHostList?.length ? allowedHostList : undefined;

  return {
    base: env.VITE_APP_BASENAME ?? '/',
    plugins: [
      react({
        babel: {
          minified: true,
          generatorOpts: {
            jsescOption: {
              minimal: true,
            },
          },
        },
      }),
      tsconfigPaths(),
      preload(),
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        // deleteOriginFile: false,
      }),
    ],
    build: {
      minify: 'terser',
      commonjsOptions: { transformMixedEsModules: true },
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            vendor: ['lodash', 'axios'],
          },
        },
      },
    },
    server: {
      port: Number(env.VITE_APP_PORT) || 5173,
      cors: {
        origin: true,
        preflightContinue: true,
      },
      host: true,
      strictPort: true,
      allowedHosts,
    },
    preview: {
      port: Number(env.VITE_APP_PORT) || 4173,
      cors: {
        origin: true,
        preflightContinue: true,
      },
      host: true,
      strictPort: true,
      allowedHosts,
    },
    publicDir: 'public',
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  };
});
