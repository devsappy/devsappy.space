import Header from '@/components/Header';

const projects = [
  {
    title: "Pixel Forge",
    url: "https://pixelforge-tau.vercel.app",
    description: <>A creative digital forge emphasizing <span className="caveat-text">pixel-perfect</span> design and modern web development.</>
  },
  {
    title: "Coffee 3D",
    url: "https://cofee3d.vercel.app",
    description: <>An interactive, immersive 3D coffee shop experience built with WebGL to showcase <span className="caveat-text">advanced</span> front-end capabilities.</>
  },
  {
    title: "Vanta",
    url: "https://vanta-ruddy.vercel.app",
    description: <>A sleek, dark-themed digital product landing page featuring <span className="caveat-text">dynamic</span> Vanta.js background animations.</>
  },
  {
    title: "Kiln Forge",
    url: "https://kilnforge.vercel.app",
    description: <>A robust web platform tailored for artisans and industrial design, featuring a <span className="caveat-text">solid</span> and clean interface.</>
  },
  {
    title: "Cafe Kaleido",
    url: "https://cafekaleido.vercel.app",
    description: <>A vibrant and dynamic website designed for a modern cafe, showcasing <span className="caveat-text">lively</span> culinary branding.</>
  },
  {
    title: "Chatterify",
    url: "https://emailautomationchatterify.vercel.app",
    description: <>An automated email marketing tool and SaaS platform built to <span className="caveat-text">streamline</span> communication and user engagement.</>
  }
];

export default function Projects() {
  return (
    <div className="portfolio-container">
      {/* Header */}
      <Header />

      {/* Projects Section */}
      <main className="main-content" style={{ justifyContent: 'flex-start' }}>
        <section className="projects-section" style={{ borderTop: 'none', width: '100%' }}>
          <h2 className="projects-title"><span className="caveat-text">Handpicked</span> Selected Projects</h2>
          <div className="showcase-list">
            {projects.map((proj, idx) => (
              <div className="showcase-item" key={idx}>
                <div className="browser-window">
                  <div className="browser-header">
                    <div className="dot red"></div>
                    <div className="dot yellow"></div>
                    <div className="dot green"></div>
                  </div>
                  <div className="iframe-container">
                    <iframe src={proj.url} title={proj.title} loading="lazy"></iframe>
                  </div>
                </div>
                <div className="project-details">
                  <h3>{proj.title}</h3>
                  <p>{proj.description}</p>
                  <a href={proj.url} target="_blank" rel="noopener noreferrer" className="btn-visit">Visit Site</a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer Logos Placeholder */}
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
