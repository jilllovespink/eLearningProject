import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import typography from "@tailwindcss/typography";
import path from "path";

import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss({
      plugins: [typography()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
