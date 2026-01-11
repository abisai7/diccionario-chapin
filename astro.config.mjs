import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://www.chapinismos.org",
  output: "static",
  trailingSlash: "always", // Ensure consistent URLs with trailing slashes
  integrations: [
    sitemap({
      filter: (page) => page !== "https://www.chapinismos.org/",
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
