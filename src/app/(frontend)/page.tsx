import Link from 'next/link';
import EventsDisplay from './components/EventsDisplay';
import getQueryClient from '@/lib/react-query/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import { ReactQueryHydrate } from '@/lib/react-query/ReactQueryHydrate';
import { headers } from 'next/headers';
import { decodeEventAdmin, decodeEvent } from '@/utils/functions';
import { EventClientAdmin, EventClient } from '@/utils/interfaces';

const fetchEventsHome = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error);
  }
  if (data.events[0].createdOn) {
    const events = data.events.map((event: EventClientAdmin) =>
      decodeEventAdmin(event)
    );
    return events;
  } else {
    const events = data.events.map((event: EventClient) => decodeEvent(event));
    return events;
  }
};

const HomePage = async () => {
  const host = headers().get('host');
  const protocal = process?.env.NODE_ENV === 'development' ? 'http' : 'https';
  const fetchUrl = `${protocal}://${host}/api/events?limit=3&type=upcoming`;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['events', 'upcoming home'], () =>
    fetchEventsHome(fetchUrl)
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
