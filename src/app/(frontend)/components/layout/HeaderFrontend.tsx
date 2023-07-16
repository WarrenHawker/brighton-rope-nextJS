'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const HeaderFrontend = () => {
  const [showTopNav, setShowTopNav] = useState<boolean>(false);
  const pathname = usePathname();
  return (
    <header>
      <div className="header-inner">
        <i
          className="fa-solid fa-bars"
          onClick={() => setShowTopNav((prev) => !prev)}
        ></i>
        <nav className={showTopNav ? 'top-nav show' : 'top-nav'}>
          <h2>
            <Link href="/">Brighton Rope</Link>
          </h2>
          <ul>
            <li
              className={
                pathname == '/events' ? 'top-nav-links active' : 'top-nav-links'
              }
            >
              <Link href="/admin">Events</Link>
            </li>
            <li className="top-nav-links">
              <Link href="/">To Site</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderFrontend;
