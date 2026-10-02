// Journal posts are plain data, so the same source renders the article page,
// the RSS feed, llms-full.txt and the structured data.
//
// Post shape (one file per post in this folder, exporting `post`):
//
//   export const post = {
//     slug: 'kebab-case-url-segment',
//     title: 'Sentence-case title',
//     description: '150–160 character meta description.',
//     date: 'YYYY-MM-DD',          // first published
//     updated: 'YYYY-MM-DD',       // last meaningful edit
//     category: 'Development' | 'Motion' | 'Design',
//     tags: ['lowercase', 'keywords'],
//     summary: '40–60 word answer-first abstract, shown at the top of the article.',
//     sections: [
//       { id: 'kebab-id', heading: 'Section heading', clip: 'Short', blocks: [ ...blocks ] },
//     ],
//   };
//
// Blocks (strings support inline `code`, **bold**, *em* and [links](/path-or-url)):
//   { type: 'p', text }
//   { type: 'h3', text }
//   { type: 'list', ordered: false, items: [text, ...] }
//   { type: 'code', lang: 'js' | 'css' | 'python' | 'glsl' | 'bash', code, caption? }
//   { type: 'quote', text, cite? }
//   { type: 'table', head: [text, ...], rows: [[text, ...], ...] }
//   { type: 'figure', src, alt, caption?, width, height }
//   { type: 'note', text }

import { post as keying } from './keying-a-title-behind-a-portrait';
import { post as timeline } from './building-a-scrubbable-page-timeline';
import { post as nextjs } from './the-future-of-web-development-with-nextjs';
import { post as video } from './mastering-video-editing-for-the-web';
import { post as design } from './design-systems-why-you-need-one';

const ALL = [keying, timeline, nextjs, video, design];
const WORDS_PER_MINUTE = 220;

export function blockText(b) {
  switch (b.type) {
    case 'list':
      return b.items.join(' ');
    case 'table':
      return [...b.head, ...b.rows.flat()].join(' ');
    case 'code':
      return '';
    case 'figure':
      return b.caption || '';
    default:
      return b.text || '';
  }
}

function countWords(p) {
  const text = [p.summary, ...p.sections.flatMap((s) => [s.heading, ...s.blocks.map(blockText)])].join(' ');
  return text.split(/\s+/).filter(Boolean).length;
}

export const posts = ALL.map((p, i) => {
  const words = countWords(p);
  return { ...p, words, readingTime: `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min`, order: i };
}).sort((a, b) => b.date.localeCompare(a.date) || a.order - b.order);

export function getPost(slug) {
  return posts.find((p) => p.slug === slug);
}

// Markdown rendering of a post, for llms-full.txt.
export function postToMarkdown(p, origin) {
  const abs = (s) => s.replace(/\]\((\/[^)]*)\)/g, `](${origin}$1)`);
  const out = [`# ${p.title}`, '', `${origin}/blog/${p.slug} · ${p.date} · ${p.category}`, '', `> ${p.summary}`, ''];
  for (const s of p.sections) {
    out.push(`## ${s.heading}`, '');
    for (const b of s.blocks) {
      if (b.type === 'p' || b.type === 'note') out.push(abs(b.text), '');
      else if (b.type === 'h3') out.push(`### ${b.text}`, '');
      else if (b.type === 'quote') out.push(`> ${abs(b.text)}${b.cite ? ` — ${b.cite}` : ''}`, '');
      else if (b.type === 'list') out.push(...b.items.map((t, i) => `${b.ordered ? `${i + 1}.` : '-'} ${abs(t)}`), '');
      else if (b.type === 'code') out.push('```' + (b.lang || ''), b.code.trim(), '```', '');
      else if (b.type === 'table') {
        out.push(`| ${b.head.join(' | ')} |`, `| ${b.head.map(() => '---').join(' | ')} |`, ...b.rows.map((r) => `| ${r.join(' | ')} |`), '');
      } else if (b.type === 'figure') out.push(`![${b.alt}](${origin}${b.src})${b.caption ? ` — ${b.caption}` : ''}`, '');
    }
  }
  return out.join('\n');
}
