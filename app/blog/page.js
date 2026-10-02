import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import JsonLd from '@/components/JsonLd';
import PageCta from '@/components/PageCta';
import Reveal from '@/components/Reveal';
import { posts } from '@/lib/journal';
import { alternates, blogSchema, breadcrumbSchema, openGraph, twitter } from '@/lib/seo';

const title = 'Journal — Notes on Web Development, Video and Design';
const description =
  'Notes by Saptarshi Chattopadhyay (Sappy) on building for the web: Next.js, WebGL, video for websites, design systems, and how this site was made.';
const image = { url: '/og/blog.jpg', alt: 'Journal' };

export const metadata = {
  title,
  description,
  alternates: alternates('/blog'),
  openGraph: openGraph({ path: '/blog', title, description, image }),
  twitter: twitter({ title, description, image }),
};

const fmt = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });

export default function Blog() {
  return (
    <main id="main" className="page page--mist" data-tone="light">
      <JsonLd data={[blogSchema(posts), breadcrumbSchema([{ name: 'Journal', path: '/blog' }])]} />
      <section className="wrap" data-clip="Journal" data-clip-color="#D6E3F2" data-tone="light">
        <header className="page-head">
          <Breadcrumbs items={[{ name: 'Journal', path: '/blog' }]} />
          <Reveal as="p" className="label">Journal</Reveal>
          <h1 className="page-title">
            <Reveal as="span" className="line">Thoughts</Reveal>
            <Reveal as="span" className="line" delay={0.06}>&amp; writing</Reveal>
          </h1>
          <Reveal as="p" className="page-lead" delay={0.12}>
            Notes on building for the web — development, motion design and the craft of digital
            experiences, starting with how this site was made.
          </Reveal>
        </header>

        <ol className="journal">
          {posts.map((post, i) => (
            <Reveal as="li" className="journal-item" key={post.slug} delay={i * 0.05}>
              <Link href={`/blog/${post.slug}`} className="journal-row">
                <time className="journal-date" dateTime={post.date}>{fmt.format(new Date(post.date))}</time>
                <span className="journal-main">
                  <span className="journal-title">{post.title}</span>
                  <span className="journal-excerpt">{post.description}</span>
                </span>
                <span className="journal-meta">
                  <span>{post.category}</span>
                  <span>{post.readingTime} read</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </section>
      <PageCta />
    </main>
  );
}
