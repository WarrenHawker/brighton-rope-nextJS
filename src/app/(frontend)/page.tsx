import EventsDisplay from './components/eventsDisplay';

const HomePage = () => {
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
            <button className="btn btn-primary">Learn more about us</button>
          </div>
        </section>
        <EventsDisplay />
      </main>
    </>
  );
};

export default HomePage;
