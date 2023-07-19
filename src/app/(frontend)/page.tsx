import Link from 'next/link';
import EventsDisplay from './components/eventsDisplay';

const fetchEvents = async () => {
  const res = await fetch(
    'http://localhost:3000/api/events?events=3&old=false',
    { next: { revalidate: 0 } }
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

const HomePage = async () => {
  const events = await fetchEvents();
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
        <EventsDisplay events={events} page="home" />
      </main>
    </>
  );
};

export default HomePage;
