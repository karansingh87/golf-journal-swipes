import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['/lovable-uploads/ff5aafc4-9a66-47d6-baa6-5fe492e237e7.png'],
      manifest: {
        name: 'GolfLog',
        short_name: 'GolfLog',
        description: 'Your personal golf improvement companion',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/lovable-uploads/ff5aafc4-9a66-47d6-baa6-5fe492e237e7.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/lovable-uploads/ff5aafc4-9a66-47d6-baa6-5fe492e237e7.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));