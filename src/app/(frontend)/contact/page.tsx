import ContactForm from '../components/contactForm';
import SocialLinks from '../components/SocialLinks';

const ContactPage = () => {
  return (
    <main>
      <h1 className="page-title">Contact Us</h1>
      <section className="contact-page-banner">
        <div className="contact-page-banner-text">
          <div>
            <h3>Got any questions about rope or our events? </h3>
            <p>
              Fill out the contact form below or message us on our social media
              and we&apos;ll get back to you as soon as we can
            </p>
            <SocialLinks />
          </div>
        </div>
      </section>
      <section>
        <ContactForm />
      </section>
    </main>
  );
};

export default ContactPage;
