import Link from 'next/link';

const InfectionPage = () => {
  return (
    <main>
      <h1 className="page-title">Infection Prevention & Control Policy</h1>
      <section className="policy-container">
        <p>
          The COVID-19 pandemic and the MPX (Monkeypox) outbreak have made
          infection prevention and control measures necessary for groups like
          Brighton Rope, where people are being taught activities that involve
          close contact.
        </p>
        <p>
          We frequently update our infection prevention and control measures in
          response to the ongoing changes in the situation and risks.{' '}
        </p>
        <h2>Currently, our policy is:</h2>
        <ul>
          <li>
            You must take and present a Lateral Flow Test in the 24 hours before
            class in order to be allowed entry to the class
          </li>
          <li>
            We are temporarily suspending singles tickets – you must arrange who
            you will be tying with before the class begins and book tickets as a
            pair
          </li>
          <li>
            We will provide antibacterial wipes, and ask you to wipe mats down
            at the start and end of each class
          </li>
          <li>
            Communal rope will be limited, and will be ‘quarantined’ in-between
            classes to avoid spread of infection
          </li>
          <li>
            We are asking anyone who develops symptoms of COVID-19 within 10-14
            days of a class informs us, so we can make the rest of the group
            aware
          </li>
        </ul>
        <h2>
          If you have questions about any of these measures, please{' '}
          <Link href="/contact">contact us</Link>
        </h2>
      </section>
    </main>
  );
};

export default InfectionPage;
