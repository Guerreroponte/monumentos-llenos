import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.monumentosllenos.com',
      lastModified: new Date(),
    },
  ]
}