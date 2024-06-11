import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   https: {
  //     key: fileURLToPath(new URL('./localhost-key.pem', import.meta.url)),
  //     cert: fileURLToPath(new URL('./localhost.pem', import.meta.url)),
  //   }
  // },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
