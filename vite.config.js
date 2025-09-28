import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    cors: true, // Enable CORS
  },
  plugins: [
    laravel({
      input:[ "resources/js/app.tsx",
      'resources/css/app.css',
      'resources/css/filament/admin/theme.css', // Add Filament theme if using custom CSS
      ],
      refresh: true,
    }),
    react(),
  ],
  css: {
        postcss: './postcss.config.js',
    },
});
