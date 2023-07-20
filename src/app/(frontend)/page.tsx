import Link from 'next/link';
import EventsDisplay from './components/eventsDisplay';
import { fetchHomeEvents } from '@/lib/serverFunctions';

const HomePage = async () => {
  const events = await fetchHomeEvents();
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
