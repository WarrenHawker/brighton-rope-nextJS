import Link from 'next/link';
import EventsDisplay from './components/eventsDisplay';
import { fetchEventsServer } from '@/utils/serverFetch';
import getQueryClient from '@/lib/react-query/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import { ReactQueryHydrate } from '@/lib/react-query/ReactQueryHydrate';

const HomePage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['events'], () =>
    fetchEventsServer({ amount: 3, old: 'false' })
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <main>
        <section className="home-page-banner">
          <div className="home-page-banner-text">
            <h1>Brighton Rope</h1>
            <h2>Learn. Tie. Connect.</h2>
            <h3>Rope Bondage Enthusiasts</h3>
            <p>
              Brighton Rope was formed to help kinksters in Brighton and Hove
              learn and experience the joys of rope bondage. We are all about
              creating meaningful connections through rope in a safe and
              consensual space for all.
            </p>
            <Link href="/about" className="btn btn-primary">
              Learn more about us
            </Link>
          </div>
        </section>
        <ReactQueryHydrate state={dehydratedState}>
          <EventsDisplay page="home" />
        </ReactQueryHydrate>
      </main>
    </>
  );
};

export default HomePage;
