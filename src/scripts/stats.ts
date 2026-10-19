import {type CollectionEntry, getCollection} from "astro:content";
import path from "node:path";

export interface StatsPage {
    name: string;
    slug: string;
    endpoint: string;
}

export const statsUrl = (projectSlug: string, pageSlug?: string): string =>
    pageSlug ? `/projects/${projectSlug}/stats/${pageSlug}/` : `/projects/${projectSlug}/stats/`;

export const statsProjects = async (): Promise<
    {project: CollectionEntry<"projects">; category: CollectionEntry<"categories">; pages: StatsPage[]}[]
> => {
    const [projects, categories] = await Promise.all([getCollection("projects"), getCollection("categories")]);
    const statsByDirectory = new Map(
        categories.map((category) => [path.dirname(category.filePath!), category.data.stats] as const).filter(([, pages]) => pages.length > 0),
    );
    return projects.flatMap((project) => {
        const category = categories.find((entry) => path.dirname(entry.filePath!) === path.dirname(project.filePath!));
        const pages = category ? statsByDirectory.get(path.dirname(category.filePath!)) : undefined;
        return category && pages ? [{project, category, pages}] : [];
    });
};
