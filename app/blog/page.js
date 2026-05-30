import Header from '@/components/Header';
import SiteFooter from '@/components/SiteFooter';
import Reveal from '@/components/Reveal';

const posts = [
  { title: "The Future of Web Development with Next.js", date: "May 20, 2026", read: "6 min", cat: "Development" },
  { title: "Mastering Video Editing for the Web", date: "April 15, 2026", read: "8 min", cat: "Motion" },
  { title: "Design Systems: Why You Need One", date: "March 02, 2026", read: "5 min", cat: "Design" },
];

export default function Blog() {
  return (
    <div className="apage">
      <Header />

      <main className="apage-main">
        <section className="ap-hero">
          <Reveal as="p" className="ap-eyebrow">[ Journal ]</Reveal>
          <h1 className="ap-title">
            <span className="line-mask"><span className="line-inner is-static">THOUGHTS</span></span>
            <span className="line-mask"><span className="line-inner is-static">&amp; WRITING</span></span>
          </h1>
          <Reveal as="p" className="ap-lead" delay={0.1}>
            Notes on building for the web — development, motion design and the
            craft of digital experiences.
          </Reveal>
        </section>

        <section className="blog-list">
          {posts.map((post, idx) => (
            <Reveal className="blog-row" key={idx} delay={idx * 0.06}>
              <span className="blog-num">{String(idx + 1).padStart(2, '0')}</span>
              <div className="blog-main">
                <h2 className="blog-headline">{post.title}</h2>
                <div className="blog-meta">
                  <span>{post.cat}</span>
                  <span>{post.date}</span>
                  <span>{post.read} read</span>
                </div>
              </div>
              <span className="blog-arrow">↗</span>
            </Reveal>
          ))}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
