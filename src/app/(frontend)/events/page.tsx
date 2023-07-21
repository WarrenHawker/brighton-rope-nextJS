import EventsDisplay from '../components/eventsDisplay';
import { fetchEventsServer } from '@/utils/serverFetch';
import getQueryClient from '@/lib/react-query/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import { ReactQueryHydrate } from '@/lib/react-query/ReactQueryHydrate';

const EventsPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['events'], () =>
    fetchEventsServer({ amount: -1, old: 'false' })
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <main>
      <h1 className="page-title">Events</h1>

      <section className="events-page-banner">
        <div className="events-page-banner-text">
          <p>
            We hold a variety of events each month including Beginner&apos;s
            Classes, Speciality Workshops, and Rope Jams. There&apos;s something
            for everyone here!
          </p>
        </div>
      </section>
      <ReactQueryHydrate state={dehydratedState}>
        <EventsDisplay page="events" />
      </ReactQueryHydrate>
    </main>
  );
};

export default EventsPage;
