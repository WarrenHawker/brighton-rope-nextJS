import EventsDisplay from '../components/eventsDisplay';

const fetchEvents = async () => {
  const res = await fetch(
    'http://localhost:3000/api/events?events=-1&old=false'
  );
  const data = await res.json();
  if (Array.isArray(data.events)) {
    const events = data.events.map((event: any) => {
      return {
        id: event.id,
        title: event.title,
        description: event.description,
        location: JSON.parse(event.location),
        maxTickets: event.maxTickets,
        ticketsSold: event.ticketsSold,
        ticketsRemaining: event.ticketsRemaining,
        dateTimes: JSON.parse(event.dateTimes),
        allowMultipleTickets: event.allowMultipleTickets,
        prices: JSON.parse(event.prices),
      };
    });
    return events;
  } else return [data];
};

const EventsPage = async () => {
  const events = await fetchEvents();
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
