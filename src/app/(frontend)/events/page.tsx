import { fetchAllUpcomingEvents } from '@/utils/serverFunctions';
import EventsDisplay from '../components/eventsDisplay';

const EventsPage = async () => {
  const events = await fetchAllUpcomingEvents();
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
      <EventsDisplay events={events} page="events" />
    </main>
  );
};

export default EventsPage;
