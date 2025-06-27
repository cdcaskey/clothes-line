import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/',
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
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp,woff,woff2,ttf,eot}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.github\.com\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'github-api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 1 day
              },
              networkTimeoutSeconds: 10
            }
          },
          {
            urlPattern: /^https:\/\/dev\.to\/api\//,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'devto-api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 // 1 day
              }
            }
          }
        ]
      },
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'android-chrome-192x192.png',
        'android-chrome-512x512.png'
      ],
      manifest: {
        name: "Arjun Kumar - Full Stack Developer Portfolio",
        short_name: "Arjun Kumar",
        description: "Full Stack Developer specializing in MERN stack, React, Node.js, Next.js, Svelte, SvelteKit, MongoDB, Docker, and modern web technologies",
        theme_color: "#000000",
        background_color: "#000000",
        display: "standalone",
        orientation: "portrait-primary",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable any"
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable any"
          }
        ],
        shortcuts: [
          {
            name: "Projects",
            short_name: "Projects",
            description: "View my projects",
            url: "/#projects",
            icons: [
              {
                src: "favicon-32x32.png",
                sizes: "32x32"
              }
            ]
          },
          {
            name: "Blog",
            short_name: "Blog",
            description: "Read my blog posts",
            url: "/#blog",
            icons: [
              {
                src: "favicon-32x32.png",
                sizes: "32x32"
              }
            ]
          },
          {
            name: "Contact",
            short_name: "Contact",
            description: "Get in touch",
            url: "/#contact",
            icons: [
              {
                src: "favicon-32x32.png",
                sizes: "32x32"
              }
            ]
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
