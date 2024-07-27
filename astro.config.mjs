import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import purgecss from "astro-purgecss";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://cloudcraftmc.de",
  output: "static",
  compressHTML: process.env.NODE_ENV === "production",
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("404"),
      changefreq: "weekly",
      lastmod: new Date(),
    }),
    purgecss(),
    mdx(),
    preact({
      devtools: process.env.NODE_ENV !== "production",
    }),
  ],
});
