import Link from 'next/link';

const FooterFrontend = () => {
  return (
    <footer>
      <Link href="/admin" className="btn">
        Admin
      </Link>
    </footer>
  );
};

export default FooterFrontend;
