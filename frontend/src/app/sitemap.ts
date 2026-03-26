import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

const routes = [
  "",
  "/about",
  "/products",
  "/extraction-process",
  "/founder-note",
  "/inquiry",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
