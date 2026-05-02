import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

const routes = [
  "",
  "/about",
  "/products",
  "/formats",
  "/sustainability",
  "/extraction-process",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
