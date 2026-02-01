import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://chapinismos.org",
  output: "static", // En Astro 5+, static permite SSR selectivo con prerender: false
  adapter: vercel(),
  trailingSlash: "always", // Ensure consistent URLs with trailing slashes
  integrations: [
    sitemap({
      filter: (page) => page !== "https://chapinismos.org/",
      i18n: {
        defaultLocale: "es",
        locales: {
          en: "en-US", // English (United States)
          es: "es-GT", // Spanish (Guatemala)
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: true, // Importante: true para tener /es/ y /en/
      redirectToDefaultLocale: false, // Disable auto-redirect to allow custom redirect page
    },
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true, // Split CSS for better loading
      minify: "esbuild",
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Split vendor chunks for better caching
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
  },
  compressHTML: true,
  build: {
    // Always inline CSS under 10KB to reduce render-blocking requests
    inlineStylesheets: "always",
  },
  prefetch: {
    // Prefetch links on hover for faster navigation
    prefetchAll: false,
    defaultStrategy: "hover",
  },
});
