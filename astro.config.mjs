import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://ccbetasite.pages.dev",
  output: "static",
  compressHTML: false,
  integrations: [
    sitemap({
      filter: (page) => !page.includes("404"),
    }),
  ],
});
