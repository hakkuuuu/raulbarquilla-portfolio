import { profile } from './data/site';

export default function sitemap() {
  return [
    {
      url: profile.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
