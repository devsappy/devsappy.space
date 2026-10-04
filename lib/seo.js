// Structured data and metadata helpers. Every page's JSON-LD links back to one
// Person entity (`#person`) and one WebSite (`#website`), so search engines and
// AI assistants see a single connected graph instead of loose fragments.

import { person, experience, education, projects, domainOf } from './content';

export const SITE = person.site;
export const SITE_NAME = 'Sappy';
// The day the current version of the site's content was published.
export const SITE_UPDATED = '2026-10-02';
export const PERSON_ID = `${SITE}/#person`;
export const WEBSITE_ID = `${SITE}/#website`;

export const abs = (path = '/') => (path === '/' ? SITE : new URL(path, SITE).toString());

const RSS = { 'application/rss+xml': [{ url: '/rss.xml', title: 'Sappy — Journal' }] };

/** Canonical + feed discovery for a page. */
export function alternates(path) {
  return { canonical: path, types: RSS };
}

/** Open Graph block with the site-wide defaults filled in. */
export function openGraph({ path, title, description, image, type = 'website', ...rest }) {
  return {
    type,
    url: path,
    siteName: SITE_NAME,
    locale: 'en_IN',
    title,
    description,
    ...(image ? { images: [{ url: image.url, width: image.width || 1200, height: image.height || 630, alt: image.alt || title }] } : {}),
    ...rest,
  };
}

export function twitter({ title, description, image }) {
  return { card: 'summary_large_image', title, description, ...(image ? { images: [image.url] } : {}) };
}

export function personSchema() {
  const now = experience.find((e) => !e.end);
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: person.name,
    alternateName: [person.short, person.banglaFull],
    url: SITE,
    image: abs('/hero/portrait-1200.webp'),
    email: `mailto:${person.email}`,
    jobTitle: 'Full-stack engineer and video editor',
    description: `${person.name} (${person.short}) is a full-stack engineer and video editor based in ${person.city}, ${person.country}. He builds interactive websites and web apps in React, Next.js and Three.js and edits video and motion graphics in Adobe Premiere Pro and After Effects.`,
    address: { '@type': 'PostalAddress', addressLocality: person.city, addressRegion: person.region, addressCountry: person.countryCode },
    homeLocation: { '@type': 'Place', name: `${person.city}, ${person.country}` },
    worksFor: now ? { '@type': 'Organization', name: now.org } : undefined,
    hasOccupation: [
      { '@type': 'Occupation', name: 'Web developer', occupationLocation: { '@type': 'Country', name: person.country } },
      { '@type': 'Occupation', name: 'Video editor', occupationLocation: { '@type': 'Country', name: person.country } },
    ],
    alumniOf: education.map((e) => ({ '@type': 'EducationalOrganization', name: e.school })),
    knowsAbout: [
      'Web development', 'React', 'Next.js', 'Tailwind CSS', 'Three.js', 'WebGL', 'GSAP', 'Python', 'FastAPI',
      'LLM integration', 'Video editing', 'Motion graphics', 'Adobe Premiere Pro', 'Adobe After Effects',
    ],
    sameAs: [person.linkedin, person.github],
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE,
    name: `${SITE_NAME} — ${person.name}`,
    alternateName: ['devsappy', 'devsappy.space'],
    description: `Portfolio of ${person.name}, a full-stack engineer and video editor in ${person.city}, ${person.country}.`,
    inLanguage: 'en',
    author: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
  };
}

/** items: [{ name, path }] after Home. */
export function breadcrumbSchema(items) {
  const all = [{ name: 'Home', path: '/' }, ...items];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: all.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

export function projectSchemas(p, detail) {
  const page = abs(`/projects/${p.path}`);
  return [
    {
      '@type': 'CreativeWork',
      '@id': `${page}#work`,
      name: p.title,
      headline: `${p.title} — ${p.kind}`,
      description: p.summary,
      url: page,
      image: abs(`/work/${p.slug}.webp`),
      creator: { '@id': PERSON_ID },
      author: { '@id': PERSON_ID },
      genre: p.kind,
      keywords: [...p.stack, p.kind].join(', '),
      about: p.client && p.client !== p.title ? p.client : undefined,
      sameAs: p.url,
      video: { '@id': `${page}#recording` },
      ...(detail && detail.stills ? { associatedMedia: detail.stills.map((s) => ({ '@type': 'ImageObject', contentUrl: abs(s.src), caption: s.caption || s.alt })) } : {}),
    },
    {
      '@type': 'VideoObject',
      '@id': `${page}#recording`,
      name: `${p.title} — screen recording of the live site`,
      description: `A 14-second scroll-through of ${domainOf(p.url)}, recorded from the live site. ${p.summary}`,
      thumbnailUrl: [abs(`/work/${p.slug}.webp`)],
      contentUrl: abs(`/work/${p.slug}.mp4`),
      uploadDate: `${SITE_UPDATED}T00:00:00+05:30`,
      duration: 'PT14S',
      encodingFormat: 'video/mp4',
      width: 1200,
      height: 750,
      creator: { '@id': PERSON_ID },
      isFamilyFriendly: true,
    },
  ];
}

export function projectListSchema() {
  return {
    '@type': 'ItemList',
    name: 'Selected work',
    itemListElement: projects.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/projects/${p.path}`), name: p.title })),
  };
}

export function serviceSchemas(s) {
  const page = abs(`/services/${s.slug}`);
  return [
    {
      '@type': 'Service',
      '@id': `${page}#service`,
      name: s.title,
      serviceType: s.title,
      description: s.answer,
      url: page,
      provider: { '@id': PERSON_ID },
      areaServed: [{ '@type': 'Country', name: person.country }, { '@type': 'Place', name: 'Worldwide' }],
      availableChannel: { '@type': 'ServiceChannel', serviceUrl: abs('/contact'), availableLanguage: 'en' },
    },
    {
      '@type': 'FAQPage',
      '@id': `${page}#faq`,
      mainEntity: s.faq.map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') },
      })),
    },
    ...(s.samples || []).map((c) => ({
      '@type': 'VideoObject',
      '@id': `${page}#${c.slug}`,
      name: c.title,
      description: c.alt,
      thumbnailUrl: abs(`/motion/${c.slug}.webp`),
      contentUrl: abs(`/motion/${c.slug}.mp4`),
      uploadDate: `${c.date}T09:00:00+05:30`,
      duration: `PT${c.seconds}S`,
      creator: { '@id': PERSON_ID },
    })),
  ];
}

export function postSchema(p) {
  const page = abs(`/blog/${p.slug}`);
  return {
    '@type': 'BlogPosting',
    '@id': `${page}#article`,
    headline: p.title,
    description: p.description,
    abstract: p.summary,
    url: page,
    mainEntityOfPage: page,
    image: abs(`/og/blog-${p.slug}.jpg`),
    datePublished: `${p.date}T09:00:00+05:30`,
    dateModified: `${p.updated || p.date}T09:00:00+05:30`,
    author: { '@id': PERSON_ID, '@type': 'Person', name: person.name, url: abs('/sappy') },
    publisher: { '@id': PERSON_ID },
    isPartOf: { '@id': `${abs('/blog')}#blog` },
    articleSection: p.category,
    keywords: (p.tags || []).join(', '),
    wordCount: p.words,
    inLanguage: 'en',
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.post-summary'] },
  };
}

export function blogSchema(posts) {
  return {
    '@type': 'Blog',
    '@id': `${abs('/blog')}#blog`,
    name: 'Sappy — Journal',
    url: abs('/blog'),
    author: { '@id': PERSON_ID },
    blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: abs(`/blog/${p.slug}`), datePublished: p.date })),
  };
}
