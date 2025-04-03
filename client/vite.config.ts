import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Allows Vite to work inside Docker
    port: 3000, // Matches the port exposed in Docker
    watch: {
      usePolling: true, // Fixes file watching issues in Docker
    },
    open: true,
  },
})
