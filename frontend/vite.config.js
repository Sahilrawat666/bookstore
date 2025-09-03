import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Build output folder
  build: {
    outDir: "dist",
  },

  // Make asset paths relative for deployment
  base: "./", // 👈 important for Vercel

  // Dev server proxy (local development)
  server: {
    proxy: {
      "/user": "http://localhost:4001",
      "/book": "http://localhost:4001",
    },
  },
});
