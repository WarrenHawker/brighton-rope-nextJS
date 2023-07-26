'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const HeaderAdmin = () => {
  const [showTopNav, setShowTopNav] = useState<boolean>(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    setShowTopNav(false);
  }, [pathname]);

  return (
    <header>
      <pre>{JSON.stringify(session)}</pre>
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
            <li
              className={
                pathname == '/admin/users'
                  ? 'top-nav-links active'
                  : 'top-nav-links'
              }
            >
              <Link href="/admin/users">Users</Link>
            </li>
            <li className="top-nav-links">
              <Link href="/">To Site</Link>
            </li>
          </ul>
        </nav>

        <div className="profile-dropdown">
          <h2 className="profile-link">
            <i className="fa-solid fa-user"></i>{' '}
            <span className="profile-name">{session?.user?.name}</span>
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
                <button onClick={() => signOut({ callbackUrl: '/signin' })}>
                  Sign Out
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;
