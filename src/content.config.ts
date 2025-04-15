import {defineCollection, z} from "astro:content";
import {file, glob} from "astro/loaders";

const categories = defineCollection({
    loader: glob({pattern: "*/meta.yml", base: "./src/projects"}),
    schema: z.object({
        name: z.string(),
        previewImage: z.string(),
        description: z.string(),
        order: z.number().default(0),
    }),
});
const projects = defineCollection({
    loader: glob({pattern: "*/!(meta).mdx", base: "./src/projects"}),
    schema: z.object({
        slug: z.string(),
        title: z.string(),
        previewImage: z.string().optional(),
        pubDate: z.coerce.date().optional(),
        modDate: z.coerce.date().optional(),
        start: z.coerce.date().optional(),
        end: z.coerce.date().optional(),
        keywords: z.string().array().default([]),
        prefetch: z.string().array().default([]),
        preconnect: z.string().array().default([]),
    }),
});

export const collections = {categories, projects};
