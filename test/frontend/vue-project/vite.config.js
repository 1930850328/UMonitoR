import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/reportData": {
        target: "http://localhost:8083/",
        changeOrigin: true,
      },
      //   '/getmap': {
      //     target: 'http://localhost:8083/',
      //     changeOrigin: false,
      //     secure: false,
      //   },
      //   '/getmgetRecordScreenIdp': {
      //     target: 'http://localhost:8083/',
      //     changeOrigin: false,
      //     secure: false,
      //   },
    },
  },
});
