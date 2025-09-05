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

  // ✅ Use absolute asset paths for Vercel
  base: "/",

  // Dev server proxy (only for local development)
  server: {
    proxy: {
      "/user": "http://localhost:4001",
      "/book": "http://localhost:4001",
    },
  },
});
