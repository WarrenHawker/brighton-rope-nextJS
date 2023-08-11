import Link from 'next/link';
import SocialLinks from '../SocialLinks';

const FooterFrontend = () => {
  const date = new Date().getFullYear();
  return (
    <footer>
      <div className="footer-inner">
        <SocialLinks />
        <nav className="footer-links">
          <Link href="/accessibility" className="btn">
            Accessibility Policy
          </Link>
          <Link href="/privacy" className="btn">
            Privacy Policy
          </Link>
          <Link href="/infection" className="btn">
            Infection Prevention & Control
          </Link>
          <Link href="/terms" className="btn">
            Terms of Service
          </Link>
          <Link href="/admin" className="btn">
            Admin
          </Link>
        </nav>
        <p className="copywrite-notice">
          <span>&#169;</span> {date} Brighton Rope. All rights reserved.
          <br /> Site created by Warren Hawker
        </p>
      </div>
    </footer>
  );
};

export default FooterFrontend;
