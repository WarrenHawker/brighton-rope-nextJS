import { events } from '../../lib/eventsData';
import { EventsData } from '../../lib/interfaces';
import { convertToArray, trimString, getShortDate } from '../../lib/functions';

interface EventsDisplayProps {
  showBookingForm: (id: string) => void;
}

const EventsDisplay = ({ showBookingForm }: EventsDisplayProps) => {
  const newEventsData = convertToArray(events);
  return (
    <section className="events-container">
      <h1>Our Upcoming Events</h1>
      {newEventsData.map((event: EventsData) => {
        return (
          <article className="event" key={event.id}>
            <div className="event-date-time">
              <p>
                {event.dateTimes.length < 2
                  ? getShortDate(event.dateTimes[0].date)
                  : `${getShortDate(event.dateTimes[0].date)} - ${getShortDate(
                      event.dateTimes[event.dateTimes.length - 1].date
                    )}`}
              </p>
              <h3>
                {`${event.dateTimes[0].startTime} - ${event.dateTimes[0].endTime}`}{' '}
              </h3>
            </div>
            <div className="event-summary">
              <h2 className="event-title">{event.title}</h2>
              <p className="event-description">
                {trimString(event.description, 100)}
              </p>
            </div>
            <div className="event-buttons">
              <button
                className="btn btn-primary"
                onClick={(e) => showBookingForm(event.id)}
              >
                Book Tickets
              </button>
              <a href="#" className="btn btn-secondary">
                Learn more
              </a>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default EventsDisplay;
