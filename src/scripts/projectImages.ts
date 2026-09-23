import {getImage} from "astro:assets";
import type {ImageMetadata, ImageQuality} from "astro";

export const THUMBNAIL_WIDTH = 1280;
export const FULLSCREEN_WIDTH = 1920;

export interface ProjectImage {
    thumbnail: string;
    fullscreen: string;
    width: number;
    height: number;
}

const pngs = import.meta.glob<{default: ImageMetadata}>("../assets/projects/**/*.png", {eager: true});

const pngMetadata = new Map<string, ImageMetadata>();
for (const [file, module] of Object.entries(pngs)) {
    pngMetadata.set(file.slice("../assets/projects/".length, -".png".length), module.default);
}

const renderWebp = async (metadata: ImageMetadata, targetWidth: number, quality?: ImageQuality) => {
    const width = Math.min(targetWidth, metadata.width);
    return await getImage({src: metadata, format: "webp", width, quality: quality});
};

export async function projectImage(projectId: string, image: string, fallbackWidth: number, fallbackHeight: number): Promise<ProjectImage> {
    const metadata = pngMetadata.get(`${projectId}/${image}`);
    if (!metadata) {
        const src = `/assets/projects/${projectId}/${image}.webp`;
        return {thumbnail: src, fullscreen: src, width: fallbackWidth, height: fallbackHeight};
    }
    const thumbnail = await renderWebp(metadata, THUMBNAIL_WIDTH, "mid");
    const fullscreen = await renderWebp(metadata, FULLSCREEN_WIDTH, "max");
    const height = Math.round((thumbnail.options.width! * metadata.height) / metadata.width);
    return {thumbnail: thumbnail.src, fullscreen: fullscreen.src, width: thumbnail.options.width!, height};
}
