import Header from '@/components/Header';

export default function Contact() {
  return (
    <div className="portfolio-container">
      <Header />
      <main className="main-content" style={{ justifyContent: 'center' }}>
        <h1 className="projects-title" style={{ marginBottom: '40px' }}><span className="caveat-text">Let's</span> Get in Touch</h1>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
          <input type="text" placeholder="Name" style={{ padding: '15px', backgroundColor: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-color)', fontSize: '1rem', outline: 'none' }} />
          <input type="email" placeholder="Email" style={{ padding: '15px', backgroundColor: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-color)', fontSize: '1rem', outline: 'none' }} />
          <textarea placeholder="Message" rows="5" style={{ padding: '15px', backgroundColor: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-color)', fontSize: '1rem', outline: 'none', resize: 'vertical' }}></textarea>
          <button type="button" className="btn-contact" style={{ alignSelf: 'flex-start', marginTop: '10px' }}><span className="caveat-text" style={{marginRight: '6px', fontSize: '1.2em'}}>Say hello &</span>Send Message</button>
        </form>
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
