import Header from '@/components/Header';
import Image from 'next/image';
import profilePic from '../../DSC_8261.JPG';

export default function Sappy() {
  return (
    <div className="portfolio-container">
      <Header />
      <main className="main-content" style={{ justifyContent: 'center', padding: '80px 40px' }}>
        <h1 className="projects-title" style={{ marginBottom: '40px' }}><span className="caveat-text">A little bit</span> About Sappy</h1>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '250px', height: '250px', marginBottom: '40px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <Image src={profilePic} alt="Sappy Profile" fill style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ fontSize: '1.2rem', lineHeight: '1.8', textAlign: 'left' }}>
          <p style={{ marginBottom: '20px' }}>
            <span className="caveat-text">Hi,</span> I'm Sappy. I'm a <span className="caveat-text">passionate</span> Website Developer and Video Editor based in India.
          </p>
          <p style={{ marginBottom: '20px' }}>
            With over 4 years of experience, I specialize in crafting digital experiences that are not only visually stunning but also <span className="caveat-text">highly</span> functional. Whether it's building a sleek modern web application or editing a fast-paced promotional video, I bring a keen eye for detail and a drive for perfection.
          </p>
          <p>
            When I'm not coding or editing, you can find me exploring new design trends, learning new tech stacks, or working on passion projects. Let's build something <span className="caveat-text">amazing</span> together!
          </p>
          </div>
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
