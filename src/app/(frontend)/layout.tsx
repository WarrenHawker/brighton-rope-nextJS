import { QueryProvider } from '@/lib/react-query/QueryProvider';
import Script from 'next/script';
import FooterFrontend from './components/layout/FooterFrontend';
import HeaderFrontend from './components/layout/HeaderFrontend';
import './styles/frontend.css';

const FrontendLayout = ({ children }: { children: React.ReactNode }) => {
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
        <HeaderFrontend />
        <div className="content-wrapper">
          <QueryProvider>{children}</QueryProvider>
        </div>
        <FooterFrontend />
      </body>
    </html>
  );
};

export default FrontendLayout;
