'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const HeaderAdmin = () => {
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
          <h2>Event Manager</h2>
          <ul>
            <li
              className={
                pathname == '/admin' ? 'top-nav-links active' : 'top-nav-links'
              }
            >
              <Link href="/admin">Events</Link>
            </li>
            <li className="top-nav-links">
              <Link href="/">To Site</Link>
            </li>
          </ul>
        </nav>

        <div className="profile-dropdown">
          <h2 className="profile-link">
            <i className="fa-solid fa-user"></i>{' '}
            <span className="profile-name">Warren</span>
          </h2>
          <nav className="profile-nav">
            <ul>
              <li
                className={
                  pathname == '/admin/profile'
                    ? 'top-nav-links active'
                    : 'top-nav-links'
                }
              >
                <Link href="/admin/profile">Profile</Link>
              </li>
              <li className="top-nav-links">
                <Link href="/admin/login">Logout</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
