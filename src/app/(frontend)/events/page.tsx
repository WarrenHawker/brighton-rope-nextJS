import EventsDisplay from '../components/EventsDisplay';
import getQueryClient from '@/lib/react-query/getQueryClient';
import { dehydrate } from '@tanstack/react-query';
import { ReactQueryHydrate } from '@/lib/react-query/ReactQueryHydrate';
import { decodeEventAdmin, decodeEvent } from '@/utils/functions';
import { headers } from 'next/headers';
import { EventClient, EventClientAdmin } from '@/utils/types/events';

const fetchEventsAll = async (url: string) => {
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

const EventsPage = async () => {
  const host = headers().get('host');
  const protocal = process?.env.NODE_ENV === 'development' ? 'http' : 'https';
  const fetchUrl = `${protocal}://${host}/api/events?type=upcoming`;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['events', 'upcoming all'], () =>
    fetchEventsAll(fetchUrl)
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
