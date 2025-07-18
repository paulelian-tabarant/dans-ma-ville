import { defineConfig } from 'vitest/config'
import * as path from "node:path";

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})