'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

//TODO Implement nextjs Image component

const HeaderFrontend = () => {
  const [showTopNav, setShowTopNav] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setShowTopNav(false);
  }, [pathname]);
  return (
    <header>
      <div className="header-inner">
        <i
          className="fa-solid fa-bars"
          onClick={() => setShowTopNav((prev) => !prev)}
        ></i>

        <nav className={showTopNav ? 'top-nav show' : 'top-nav'}>
          <img src="/images/brighton-rope-icon.png" className="header-logo" />
          <ul>
            <li
              className={
                pathname == '/' ? 'top-nav-links active' : 'top-nav-links'
              }
            >
              <Link href="/">Home</Link>
            </li>

            <li
              className={
                pathname == '/about' ? 'top-nav-links active' : 'top-nav-links'
              }
            >
              <Link href="/about">About Us</Link>
            </li>

            <li
              className={
                pathname == '/events' ? 'top-nav-links active' : 'top-nav-links'
              }
            >
              <Link href="/events">Events</Link>
            </li>

            <li
              className={
                pathname == '/resources'
                  ? 'top-nav-links active'
                  : 'top-nav-links'
              }
            >
              <Link href="/resources">Resources</Link>
            </li>

            <li
              className={
                pathname == '/contact'
                  ? 'top-nav-links active'
                  : 'top-nav-links'
              }
            >
              <Link href="/contact">Contact Us</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderFrontend;
