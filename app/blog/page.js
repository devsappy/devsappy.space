import Header from '@/components/Header';

export default function Blog() {
  const posts = [
    { title: "The Future of Web Development with Next.js", date: "May 20, 2026" },
    { title: "Mastering Video Editing for the Web", date: "April 15, 2026" },
    { title: "Design Systems: Why You Need One", date: "March 02, 2026" },
  ];

  return (
    <div className="portfolio-container">
      <Header />
      <main className="main-content" style={{ justifyContent: 'flex-start', paddingTop: '80px' }}>
        <h1 className="projects-title"><span className="caveat-text">My Thoughts &</span> Blog</h1>
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {posts.map((post, idx) => (
            <div key={idx} style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '20px', textAlign: 'left' }}>
              <p style={{ fontSize: '0.9rem', opacity: 0.6, marginBottom: '10px' }}>{post.date}</p>
              <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-playfair), serif', cursor: 'pointer', transition: 'color 0.2s' }} className="blog-title">{post.title}</h2>
            </div>
          ))}
        </div>
      </main>
      <footer className="footer">
        <div className="footer-item">Nblik</div>
        <div className="footer-item">Brianly</div>
        <div className="footer-item">Od Solution</div>
        <div className="footer-item">Vibe Engine</div>
        <div className="footer-item">Chatterify</div>
      </footer>
    </div>
  );
}
