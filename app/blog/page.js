import PageCta from '@/components/PageCta';
import Reveal from '@/components/Reveal';
import { posts } from '@/lib/content';

export const metadata = {
  title: 'Journal',
  description: 'Notes from Saptarshi Chattopadhyay on building for the web — development, motion design and the craft of digital experiences.',
  alternates: { canonical: '/blog' },
};

const fmt = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' });

export default function Blog() {
  return (
    <main id="main" className="page page--mist" data-tone="light">
      <section className="wrap" data-clip="Journal" data-clip-color="#D6E3F2" data-tone="light">
        <header className="page-head">
          <Reveal as="p" className="label">Journal</Reveal>
          <h1 className="page-title">
            <Reveal as="span" className="line">Thoughts</Reveal>
            <Reveal as="span" className="line" delay={0.06}>&amp; writing</Reveal>
          </h1>
          <Reveal as="p" className="page-lead" delay={0.12}>
            Notes on building for the web — development, motion design and the craft of digital
            experiences.
          </Reveal>
        </header>

        <ol className="journal">
          {posts.map((post, i) => (
            <Reveal as="li" className="journal-row" key={post.title} delay={i * 0.06}>
              <time className="journal-date" dateTime={post.date}>{fmt.format(new Date(post.date))}</time>
              <h2 className="journal-title">{post.title}</h2>
              <p className="journal-meta">
                <span>{post.cat}</span>
                <span>{post.read} read</span>
              </p>
            </Reveal>
          ))}
        </ol>
      </section>
      <PageCta />
    </main>
  );
}
