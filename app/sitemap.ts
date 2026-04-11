import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://monumentosllenos.com",
      lastModified: new Date(),
    },
    {
      url: "https://monumentosllenos.com/eventos",
      lastModified: new Date(),
    },
    {
      url: "https://monumentosllenos.com/participa",
      lastModified: new Date(),
    },
  ];
}