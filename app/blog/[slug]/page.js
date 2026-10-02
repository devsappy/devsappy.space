import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import PageCta from '@/components/PageCta';
import Prose from '@/components/Prose';
import { person } from '@/lib/content';
import { posts, getPost } from '@/lib/journal';
import { alternates, breadcrumbSchema, openGraph, postSchema, twitter, abs } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getPost(params.slug);
  if (!p) return {};
  const image = { url: `/og/blog-${p.slug}.jpg`, alt: p.title };
  return {
    title: p.title,
    description: p.description,
    alternates: alternates(`/blog/${p.slug}`),
    authors: [{ name: person.name, url: abs('/sappy') }],
    openGraph: openGraph({
      path: `/blog/${p.slug}`,
      title: p.title,
      description: p.description,
      image,
      type: 'article',
      publishedTime: p.date,
      modifiedTime: p.updated || p.date,
      authors: [abs('/sappy')],
      section: p.category,
      tags: p.tags,
    }),
    twitter: twitter({ title: p.title, description: p.description, image }),
  };
}

const fmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function Post({ params }) {
  const p = getPost(params.slug);
  if (!p) notFound();
  const i = posts.indexOf(p);
  const newer = posts[i - 1];
  const older = posts[i + 1];
  const crumbs = [
    { name: 'Journal', path: '/blog' },
    { name: p.title, path: `/blog/${p.slug}` },
  ];

  return (
    <main id="main" className="page page--mist" data-tone="light">
      <JsonLd data={[postSchema(p), breadcrumbSchema(crumbs)]} />
      <article className="post">
        <header className="wrap post-head" data-clip="Title" data-clip-color="#A9C3E3" data-tone="light">
          <Breadcrumbs items={crumbs} />
          <p className="label">{p.category} · {p.readingTime} read</p>
          <h1 className="post-title">{p.title}</h1>
          <p className="post-meta">
            By <Link href="/sappy" rel="author">{person.name}</Link> ·{' '}
            <time dateTime={p.date}>{fmt.format(new Date(p.date))}</time>
            {p.updated && p.updated !== p.date && (
              <> · Updated <time dateTime={p.updated}>{fmt.format(new Date(p.updated))}</time></>
            )}
          </p>
          <p className="post-summary">{p.summary}</p>
        </header>

        <div className="wrap post-layout">
          <nav className="post-toc" aria-label="On this page">
            <p className="label">On this page</p>
            <ol>
              {p.sections.map((s) => (
                <li key={s.id}><a href={`#${s.id}`}>{s.heading}</a></li>
              ))}
            </ol>
          </nav>
          <div className="post-body">
            <Prose sections={p.sections} />

            <footer className="post-foot">
              <div className="author">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/hero/portrait-720.webp" alt="" width={72} height={90} loading="lazy" />
                <div>
                  <p className="author-name">
                    Written by <Link href="/sappy">{person.name}</Link>
                  </p>
                  <p className="author-bio">
                    Full-stack engineer and video editor in {person.city}, {person.country}. Builds
                    interactive websites in React, Next.js and Three.js, and edits video in Premiere Pro
                    and After Effects.
                  </p>
                  <p className="author-links">
                    <a href={person.linkedin} target="_blank" rel="noopener noreferrer me">LinkedIn ↗</a>
                    <a href={person.github} target="_blank" rel="noopener noreferrer me">GitHub ↗</a>
                    <Link href="/contact">Work with me →</Link>
                  </p>
                </div>
              </div>

              <nav className="post-pager" aria-label="More posts">
                {newer && (
                  <Link href={`/blog/${newer.slug}`} className="pager pager--newer">
                    <span className="label">Newer</span>
                    <span>{newer.title}</span>
                  </Link>
                )}
                {older && (
                  <Link href={`/blog/${older.slug}`} className="pager pager--older">
                    <span className="label">Older</span>
                    <span>{older.title}</span>
                  </Link>
                )}
              </nav>
            </footer>
          </div>
        </div>
      </article>
      <PageCta />
    </main>
  );
}
