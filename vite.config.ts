import { defineConfig } from "vite";
import bundleAnalyzer from "vite-bundle-analyzer";
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
            if (id.includes("react") || id.includes("react-dom")) return "react";
            if (id.includes("@tanstack")) return "tanstack";
            if (id.includes("@mui/material") || id.includes("@mui/icons-material")) return "mui";
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
  plugins: [
    react(),
    bundleAnalyzer({
      analyzerMode: "static",
      openAnalyzer: true,
      fileName: "bundle-report.html",
    }),
  ],
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
