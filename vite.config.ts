import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // bundle deps into the prerender build (avoids CJS named-export errors in Node)
  ssr: { noExternal: true },
  build: {
    // the prerender bundle only needs JS — public/ is already copied to dist
    copyPublicDir: !isSsrBuild,
  },
  server: {
    host: "::",
    port: 8080,
    watch: { ignored: ["**/dist/**", "**/dist-ssr/**"] },
  },
}));
