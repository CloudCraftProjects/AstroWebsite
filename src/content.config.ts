import {defineCollection} from "astro:content";
import {glob} from "astro/loaders";
import {z} from "zod";

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

const downloadProjects = defineCollection({
    loader: glob({pattern: "*.yml", base: "./src/downloads/projects"}),
    schema: z.object({
        name: z.string(),
        description: z.string(),
        order: z.number(),
        projects: z
            .object({
                id: z.string(),
                title: z.string(),
                description: z.string().optional(),
                start: z.coerce.date().optional(),
                end: z.coerce.date().optional(),
                download: z
                    .object({
                        size: z.coerce.number().optional(),
                        text: z.string().optional(),
                        link: z.string().optional(),
                    })
                    .optional(),
                paths: z.string().array().optional(),
                tags: z.string().array().optional(),
            })
            .array(),
    }),
});
const downloadTools = defineCollection({
    loader: glob({pattern: "*.yml", base: "./src/downloads/tools"}),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        hidden: z.coerce.boolean().optional(),
        archived: z.coerce.boolean().optional(),
        github: z.string(),
        download: z.string().optional(),
        paths: z.string().array().optional(),
        tags: z.string().array().optional(),
    }),
});

export const collections = {categories, projects, downloadProjects, downloadTools};
