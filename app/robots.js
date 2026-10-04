import { profile } from './data/site';

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${profile.siteUrl}/sitemap.xml`,
  };
}
