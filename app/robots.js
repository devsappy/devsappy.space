import { abs, SITE } from '@/lib/seo';

// Everyone may crawl. AI search and assistant crawlers are named explicitly so
// the intent is unambiguous; Bytespider is the one crawler turned away.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'GoogleOther',
  'Applebot',
  'Applebot-Extended',
  'Bingbot',
  'DuckAssistBot',
  'Amazonbot',
  'FacebookBot',
  'meta-externalagent',
  'CCBot',
];

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_CRAWLERS, allow: '/' },
      { userAgent: 'Bytespider', disallow: '/' },
    ],
    sitemap: abs('/sitemap.xml'),
    host: SITE,
  };
}
