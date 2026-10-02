import { projects } from '@/lib/content';
import { posts } from '@/lib/journal';
import { services } from '@/lib/services';
import { abs, SITE_UPDATED } from '@/lib/seo';

// Fixed dates, not `new Date()`: a lastModified that changes on every build
// tells crawlers everything changed when nothing did.
export default function sitemap() {
  const entry = (path, lastModified, priority, changeFrequency = 'monthly') => ({
    url: abs(path),
    lastModified,
    changeFrequency,
    priority,
  });
  const latestPost = posts.reduce((d, p) => ((p.updated || p.date) > d ? p.updated || p.date : d), SITE_UPDATED);

  return [
    entry('/', SITE_UPDATED, 1),
    entry('/projects', SITE_UPDATED, 0.9),
    ...projects.map((p) => entry(`/projects/${p.path}`, SITE_UPDATED, 0.8)),
    entry('/services', SITE_UPDATED, 0.9),
    ...services.map((s) => entry(`/services/${s.slug}`, SITE_UPDATED, 0.9)),
    entry('/sappy', SITE_UPDATED, 0.8),
    entry('/blog', latestPost, 0.7, 'weekly'),
    ...posts.map((p) => entry(`/blog/${p.slug}`, p.updated || p.date, 0.7)),
    entry('/contact', SITE_UPDATED, 0.6, 'yearly'),
  ];
}
