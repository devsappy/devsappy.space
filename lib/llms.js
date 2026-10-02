// llms.txt (https://llmstxt.org) and llms-full.txt, generated from the same
// content the pages render, so they can't drift out of date.

import { person, projects, experience, education, crafts, domainOf, period } from './content';
import { projectDetails } from './projects-detail';
import { services } from './services';
import { posts, postToMarkdown } from './journal';
import { SITE, abs } from './seo';

const plain = (t = '') => t.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/`([^`]+)`/g, '$1');

function keyFacts() {
  const now = experience.find((e) => !e.end);
  const before = experience.filter((e) => e.end);
  return [
    `- Name: ${person.name} ("${person.short}"; Bengali: ${person.banglaFull})`,
    `- Role: Full-stack engineer and video editor`,
    `- Based in: ${person.city}, ${person.country} — works remotely with clients worldwide`,
    now ? `- Currently: ${now.role} at ${now.org} (since ${period(now.start, null).split(' — ')[0]})` : null,
    `- Previously: ${before.map((e) => `${e.role} at ${e.org} (${period(e.start, e.end)})`).join('; ')}`,
    `- Education: ${education.map((e) => `${e.degree}, ${e.school} (${period(e.start, e.end)})`).join('; ')}`,
    `- Build stack: ${crafts.build.items.map(([, v]) => v).join('; ')}`,
    `- Video tools: Adobe Premiere Pro, Adobe After Effects`,
    `- Services: ${services.map((s) => s.title).join(', ')}`,
  ].filter(Boolean);
}

export function llmsTxt() {
  return [
    `# Sappy — ${person.name}`,
    '',
    `> Portfolio of ${person.name} (Sappy), a full-stack engineer and video editor in ${person.city}, ${person.country}. Websites in Next.js, React and Three.js; video in Premiere Pro.`,
    '',
    `${person.name} designs and builds interactive websites and web apps end to end, and edits video and motion graphics. This site is a working example: a Next.js site whose pages behave like a sequence on a video editor’s timeline, with screen recordings of six live projects.`,
    '',
    '## Services',
    ...services.map((s) => `- [${s.title}](${abs(`/services/${s.slug}`)}): ${plain(s.description)}`),
    '',
    '## Work',
    `- [Selected work](${abs('/projects')}): All six live projects with screen recordings and a live preview.`,
    ...projects.map((p) => `- [${p.title}](${abs(`/projects/${p.path}`)}): ${p.kind} (${p.stack.join(', ')}). ${p.summary}`),
    '',
    '## About',
    `- [About ${person.name}](${abs('/sappy')}): Biography, career timeline, experience and education.`,
    `- [Contact](${abs('/contact')}): Project enquiry form, email and profiles. Replies usually within 24 hours.`,
    '',
    '## Journal',
    ...posts.map((p) => `- [${p.title}](${abs(`/blog/${p.slug}`)}): ${p.description}`),
    '',
    '## Key Facts',
    ...keyFacts(),
    '',
    '## Contact',
    `- Website: ${SITE}`,
    `- Email: ${person.email}`,
    `- LinkedIn: ${person.linkedin}`,
    `- GitHub: ${person.github}`,
    '',
    '## Optional',
    `- [Full text for language models](${abs('/llms-full.txt')}): Every service page, case study and journal post as Markdown.`,
    `- [RSS feed](${abs('/rss.xml')}): Journal posts.`,
    '',
  ].join('\n');
}

export function llmsFullTxt() {
  const out = [llmsTxt(), '', '---', ''];
  for (const s of services) {
    out.push(`# ${s.title}`, '', `${abs(`/services/${s.slug}`)}`, '', `> ${s.answer}`, '', s.lead, '', '## What you get');
    out.push(...s.deliverables.map(([t, d]) => `- **${t}:** ${plain(d)}`), '', '## How it works');
    out.push(...s.process.map(([t, d], i) => `${i + 1}. **${t}:** ${d}`), '', '## Questions');
    for (const [q, a] of s.faq) out.push(`### ${q}`, '', plain(a), '');
    out.push('---', '');
  }
  for (const p of projects) {
    const d = projectDetails[p.slug] || {};
    out.push(`# ${p.title} — ${p.kind}`, '', `${abs(`/projects/${p.path}`)} · live site: ${p.url}`, '', `> ${p.summary}`, '');
    if (d.overview) out.push(...d.overview.flatMap((t) => [t, '']));
    if (d.highlights) out.push(...d.highlights.map((h) => `- **${h.title}:** ${h.text}`), '');
    out.push(`- Built with: ${p.stack.join(', ')}`);
    if (d.specs && d.specs.typefaces) out.push(`- Typefaces: ${d.specs.typefaces.join(', ')}`);
    out.push(`- Live URL: ${domainOf(p.url)}`, '', '---', '');
  }
  for (const p of posts) out.push(postToMarkdown(p, SITE), '', '---', '');
  return out.join('\n');
}
