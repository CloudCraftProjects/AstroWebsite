import {defineConfig} from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
    site: "https://cloudcraftmc.de",
    output: "static",
    compressHTML: process.env.NODE_ENV === "production",
    trailingSlash: "ignore",
    integrations: [
        sitemap({
            filter: (page) => !page.includes("404") && !page.includes("_redirects"),
            changefreq: "weekly",
        }),
        mdx(),
    ],
    vite: {
        plugins: [Icons({compiler: "astro"})],
    },
    build: {
        inlineStylesheets: "always",
        assets: "assets",
    },
});
