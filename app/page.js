import Image from 'next/image';
import Header from '@/components/Header';
import profilePic from '../DSC_8261.JPG';
import iconPic from '../image.png';
import premierePic from '../premiere pro.png';
import indiaPic from '../India.jpg';

export default function Home() {
  return (
    <div className="portfolio-container">
      {/* Header */}
      <Header />

      {/* Main Hero Section */}
      <main className="main-content">
        <h1 className="headline">
          <span className="headline-line"><span className="caveat-text">Hi there,</span> I'm Sappy <Image src={profilePic} alt="Sappy" className="profile-img" /> <span className="caveat-text">working as a</span></span>
          <span className="headline-line"><span className="serif-text">Website developer</span> <Image src={iconPic} alt="web-icon" className="role-icon" /> <span className="caveat-text">and</span>{" "}
          <span className="serif-text">Video editor</span> <Image src={premierePic} alt="premiere-pro" className="role-icon" /></span>
          <span className="headline-line"><span className="caveat-text">based in</span> India <Image src={indiaPic} alt="India" className="flag-icon" /></span>
        </h1>
        
        <p className="subheading">
          I've spent the past 4+ years working across different areas of digital content creation; <br />
          web development, landing page design, video editing, motion graphics, <br />
          to my current role building immersive digital experiences.
        </p>

        <button className="btn-contact">Get in touch</button>
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
