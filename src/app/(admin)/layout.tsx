import './styles/admin.css';
import Script from 'next/script';
import FooterAdmin from './components/layout/FooterAdmin';
import HeaderAdmin from './components/layout/HeaderAdmin';
import { QueryProvider } from '@/lib/react-query/QueryProvider';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
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
          <QueryProvider>{children}</QueryProvider>
        </div>
        <FooterAdmin />
      </body>
    </html>
  );
};

export default AdminLayout;
