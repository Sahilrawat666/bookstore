import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
  },

  //froom chat gpt
  server: {
    proxy: {
      "/user": "http://localhost:4001",
      "/book": "http://localhost:4001",
    },
  },
});

// export default {
// server: {
//   proxy: {
//     '/user': 'http://localhost:4001',
//     '/book': 'http://localhost:4001',
//   },
// },
// };
