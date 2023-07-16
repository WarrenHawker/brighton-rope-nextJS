import HeaderAdmin from '@/components/admin/layout/HeaderAdmin';
import '../../styles/admin/admin.css';
import FooterAdmin from '@/components/admin/layout/FooterAdmin';
import { Providers } from '@/context/Providers';
import Script from 'next/script';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Event Management NextJS</title>
        <Script
          src="https://kit.fontawesome.com/0de87d0496.js"
          crossOrigin="anonymous"
          defer
        ></Script>
      </head>
      <body suppressHydrationWarning={true}>
        <HeaderAdmin />
        <div className="content-wrapper">
          <Providers>{children}</Providers>
        </div>
        <FooterAdmin />
      </body>
    </html>
  );
}
