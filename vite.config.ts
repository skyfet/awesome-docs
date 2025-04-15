// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ghPages } from "vite-plugin-gh-pages";

export default defineConfig((config) => ({
  plugins: [react(), ghPages()],
  base: config.mode === "production" ? "/awesome-docs/" : "/",
  server: {
    port: 3000,
  },
}));
