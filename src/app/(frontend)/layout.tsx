import { Providers } from '@/context/Providers';
import Script from 'next/script';
import FooterFrontend from './components/layout/FooterFrontend';
import HeaderFrontend from './components/layout/HeaderFrontend';
import './styles/frontend.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

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
          <Providers>{children}</Providers>
        </div>
        <FooterFrontend />
      </body>
    </html>
  );
};

export default FrontendLayout;
