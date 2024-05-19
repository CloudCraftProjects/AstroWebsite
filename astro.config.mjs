import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import purgecss from "astro-purgecss";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://cloudcraftmc.de",
  output: "static",
  compressHTML: true,
  trailingSlash: "never",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("404"),
      changefreq: "weekly",
      lastmod: new Date(),
    }),
    purgecss(),
    mdx(),
  ],
});
