import Link from 'next/link';

const AccessibilityPolicy = () => {
  return (
    <main>
      <h1 className="page-title">Accessibility Policy</h1>
      <section className="policy-container">
        <h2>
          You can find current accessibility information for our primary host,
          <Link href="https://thequeery.co.uk/">The Queery Brighton</Link> on
          their website
        </h2>

        <h2>Additional accessibility information specific to our events:</h2>
        <ul>
          <li>
            Drinks (cold and hot) and (vegan) snacks can be bought from the
            till, where prices are always pay what you can (down to nothing).
            All proceeds from purchases of refreshments, art or books during our
            events go to The Queery
          </li>
          <li>
            No hearing loop technology is available, but presenters can always
            be clearly seen, so lip reading should be possible. We are not BSL
            speakers.
          </li>
          <li>
            We will always be more than happy to repeat information, change the
            way we present information, or change our communication style in any
            way we can
          </li>
          <li>
            Audio/video recording of the class is not permitted due to privacy
            considerations, but you may ask to record specific parts of the
            teaching as an accessibility need, and depending on the request we
            may allow this (on a case by case basis)
          </li>
          <li>
            We use a mixture of demonstrations, explanations and Q&As to teach,
            and with explicit consent on all sides, will demonstrate
            principles/techniques directly on your body
          </li>
          <li>
            We provide a printed out negotiation guide for use during beginners’
            classes, which you are welcome to take home with you. You can also
            ask this to be emailed to you after/before the class
          </li>
          <li>
            Carers are welcome (no fee) and there is a separate area they can
            sit in during the class (out of view) if you wish
          </li>
          <li>
            One side of the space is not used as a tying space, so is a good
            place to retreat to if you need to take a moment
          </li>
          <li>
            All exercises and discussions are optional and no questions will be
            asked if you don’t want to participate in parts of the class. We do
            encourage switching during our classes, but we don’t enforce this
            and will not ask why if you choose not to switch
          </li>
          <li>
            We teach adjustments to exercises as standard to accommodate
            different body types and levels of ability, as well as adjustments
            to communication methods and tying techniques, to accommodate people
            of all neurotypes and dexterities
          </li>
          <li>
            Chairs, cushions and bolsters available, as well as the mats that we
            tie on. However, the floor is concrete, so is still a little hard,
            and amount of space per couple is very limited
          </li>
          <li>
            You are welcome to bring anything that makes class easier for you,
            physically, emotionally, or from a sensory perspective, as long as
            it doesn’t cause sensory or other distress for any other
            participant. If you’re not sure, ask!
          </li>
        </ul>

        <p>
          In addition to the above, we are in the process of adding image
          descriptions to all of our social media posts. This is something that
          is taking a while as we have a lot of posts! But it is underway, and
          future posts will always have these.
        </p>

        <p>
          If you have any ideas for things you think we could be doing better to
          make our events more accessible, please let us know and we will
          endeavour to make it happen.
        </p>
      </section>
    </main>
  );
};

export default AccessibilityPolicy;
