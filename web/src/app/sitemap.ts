import type { MetadataRoute } from 'next';

const ROUTES = [
  { path: '/', priority: 1.0 },
  { path: '/menus', priority: 0.9 },
  { path: '/event-catering', priority: 0.9 },
  { path: '/food-partnerships', priority: 0.8 },
  { path: '/about', priority: 0.7 },
  { path: '/reviews', priority: 0.7 },
  { path: '/contact', priority: 0.8 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://piquantcatering.com';
  const lastModified = new Date();
  return ROUTES.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority,
  }));
}
