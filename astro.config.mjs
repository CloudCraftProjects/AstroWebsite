import {defineConfig} from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
    site: "https://cloudcraftmc.de",
    output: "static",
    compressHTML: process.env.NODE_ENV === "production",
    trailingSlash: "ignore",
    integrations: [
        sitemap({
            filter: (page) => !page.includes("404") && !page.includes("sponsor"),
            changefreq: "weekly",
            lastmod: new Date(),
        }),
        mdx(),
    ],
    build: {
        inlineStylesheets: "always",
    },
});
