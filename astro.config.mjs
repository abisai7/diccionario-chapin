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
  },
});
