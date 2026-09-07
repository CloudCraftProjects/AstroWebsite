import {type CollectionEntry, getCollection} from "astro:content";
import path from "node:path";

export const categories = await getCollection("categories");
export const projects = await getCollection("projects");

const activeProjectDirs = projects
    .filter(project => project.data.start && !project.data.end)
    .map(project => path.dirname(project.filePath!));

const compare = (category1: CollectionEntry<"categories">, category2: CollectionEntry<"categories">) => {
    const running1 = isRunning(category1);
    const running2 = isRunning(category2);
    if (running1 !== running2) {
        return running2 ? 1 : -1;
    }
    return category2.data.order - category1.data.order;
};

export const isRunning = (category: CollectionEntry<"categories">) => {
    const categoryDir = path.dirname(category.filePath!);
    return activeProjectDirs.includes(categoryDir);
};

categories.sort(compare);
