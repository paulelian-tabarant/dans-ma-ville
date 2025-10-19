import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "@tailwindcss/vite";
import * as path from "node:path";
import { BASE_API_URL } from "./src/hooks/useApi.ts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Permet au front d'être sur le même origin que le back en local
  // (erreurs CORS)
  server: {
    proxy: {
      [BASE_API_URL]: {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
})
