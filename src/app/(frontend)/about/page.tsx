import Link from 'next/link';
import TeachersDisplay from '../components/teachersDisplay';

const AboutPage = () => {
  return (
    <main>
      <h1 className="page-title">About Us</h1>
      <section className="about-page-banner">
        <div className="about-page-banner-text">
          <p>
            We are a group of rope enthusiasts, based in Brighton & Hove, UK,
            who love to learn and tie together.​ ​ We aim to be as inclusive,
            accessible, and diverse as we can be, both in our
            organisers/teachers and attendees, and welcome people of all levels
            of rope experience.
          </p>

          <p>
            As long as you follow our principles of mutual respect and
            consideration, you are welcome.
          </p>

          <p>
            If you’re interested in getting involved in the running of Brighton
            Rope please <Link href="/contact">email us!</Link> we’re always
            looking for more volunteers to keep things running. We especially
            welcome team members who are BaME, disabled and/or LGBT+, as well as
            bottoms who teach.
          </p>
        </div>
      </section>
      <TeachersDisplay />
    </main>
  );
};

export default AboutPage;
