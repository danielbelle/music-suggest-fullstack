import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@/components": resolve(__dirname, "src/components"),
      "@/pages": resolve(__dirname, "src/pages"),
      "@/contexts": resolve(__dirname, "src/contexts"),
      "@/services": resolve(__dirname, "src/services"),
      "@/lib": resolve(__dirname, "src/lib"),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
});
