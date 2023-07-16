import HeaderFrontend from '@/components/frontend/HeaderFrontend';
import '../../styles/frontend/frontend.css';
import FooterFrontend from '@/components/frontend/FooterFrontend';
import { Providers } from '@/context/Providers';
import Script from 'next/script';

export default function FrontendLayout({
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
        <HeaderFrontend />
        <div className="content-wrapper">
          <Providers>{children}</Providers>
        </div>
        <FooterFrontend />
      </body>
    </html>
  );
}
