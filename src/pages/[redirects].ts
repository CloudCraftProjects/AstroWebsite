import type {APIRoute} from "astro";
import {getCollection} from "astro:content";

export const getStaticPaths = () => {
    // workaround to allow dynamic creation of cloudflare redirects
    return [{params: {redirects: "_redirects"}}];
};

// static redirects, generated into the same file as the dynamic ones below
const staticRedirects = `
/r/downloads /downloads/ 303
/r/youtube https://www.youtube.com/@cloudcraft_mc 303
/r/instagram https://www.instagram.com/cloudcraft_mc/ 303
/r/tiktok https://www.tiktok.com/@cloudcraft.mc 303
/r/discord https://discord.com/invite/e5xE7SqQzh 303
/r/github https://github.com/CloudCraftProjects 303
/r/apply https://docs.google.com/forms/d/e/1FAIpQLSeTKNGccp42iVMKZ7yWAjOyQATOerA2p40aChs9ExZD7Waq-g/viewform 303
/r/status https://status.cloudcraftmc.de 303
/r/ca11/shops https://docs.google.com/spreadsheets/d/1v9UXg4TUvfeeIDs6B4AzspPkyTTAEhtIaxvLOoc5D8Q/edit?usp=sharing 303
`.trim();

export const GET: APIRoute = async () => {
    const redirects = staticRedirects.split("\n");

    const categories = await getCollection("downloadProjects");
    const projects = categories.flatMap((category) =>
        category.data.projects.map((project) => ({
            id: `${category.id}/${project.id}`,
            download: project.download,
            paths: project.paths,
        })),
    );
    redirects.push("\n# project downloads");
    projects
        .filter((project) => project.download?.link)
        .map((project) => `/download/${project.id} ${project.download!.link} 303`)
        .forEach((redirect) => redirects.push(redirect));
    redirects.push("\n# project redirects");
    projects
        .filter((project) => project.paths)
        .flatMap((project) => project.paths!.map((path) => `/${path} /download/${project.id} 301`))
        .forEach((redirect) => redirects.push(redirect));

    const tools = (await getCollection("downloadTools")).filter((tool) => tool.data.download);
    redirects.push("\n# tool downloads");
    tools.map((tool) => `/download/tool/${tool.id} ${tool.data.download!} 303`).forEach((redirect) => redirects.push(redirect));
    redirects.push("\n# tool redirects");
    tools
        .filter((tool) => tool.data.paths)
        .flatMap((tool) => tool.data.paths!.map((path) => `/${path} /download/tool/${tool.id} 301`))
        .forEach((redirect) => redirects.push(redirect));

    return new Response(redirects.join("\n"), {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
};
