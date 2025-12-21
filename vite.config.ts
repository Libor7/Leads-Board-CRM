import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  build: {
    minify: "esbuild",
    modulePreload: {
      polyfill: false,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react";
            if (id.includes("@tanstack")) return "tanstack";
            return "vendor";
          }
          return undefined;
        },
      },
    },
    sourcemap: false,
    target: "es2020",
  },
  esbuild: {
    legalComments: "none",
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  server: {
    sourcemapIgnoreList: false,
  },
});
