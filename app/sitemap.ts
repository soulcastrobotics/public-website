import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Add new routes here as pages are added. */
const routes = [""];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
