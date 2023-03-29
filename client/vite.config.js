import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      components: path.resolve(__dirname, "./src/components/"),
      assets: path.resolve(__dirname, "./src/assets/"),
      pages: path.resolve(__dirname, "./src/pages"),
      state: path.resolve(__dirname, "./src/state/"),
      theme: path.resolve(__dirname, "./src/theme/"),
    },
  },
});
