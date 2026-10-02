import { person } from '@/lib/content';
import { posts } from '@/lib/journal';
import { abs } from '@/lib/seo';

export const dynamic = 'force-static';

const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const rfc822 = (d) => new Date(`${d}T09:00:00+05:30`).toUTCString();

export function GET() {
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${abs(`/blog/${p.slug}`)}</link>
      <guid isPermaLink="true">${abs(`/blog/${p.slug}`)}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <category>${esc(p.category)}</category>
      <description>${esc(p.summary)}</description>
    </item>`
    )
    .join('\n');
  const latest = posts.reduce((d, p) => ((p.updated || p.date) > d ? p.updated || p.date : d), '1970-01-01');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Sappy — Journal</title>
    <link>${abs('/blog')}</link>
    <description>Notes by ${esc(person.name)} on web development, video and design.</description>
    <language>en</language>
    <lastBuildDate>${rfc822(latest)}</lastBuildDate>
    <atom:link href="${abs('/rss.xml')}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
